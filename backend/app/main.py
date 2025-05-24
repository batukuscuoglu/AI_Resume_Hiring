from fastapi import FastAPI, File, UploadFile, HTTPException, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from uuid import uuid4
import io
import re
from PyPDF2 import PdfReader
import requests
from bs4 import BeautifulSoup

# semantic embeddings imports
from sentence_transformers import SentenceTransformer, util

default_model_name = 'all-MiniLM-L6-v2'
model = SentenceTransformer(default_model_name)

app = FastAPI(title="AI Hiring Backend")

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory stores
jobs: dict[str, dict[str, any]] = {}
results: dict[str, list[dict[str, any]]] = {}
resumes_store: dict[str, dict[str, bytes]] = {}

class URLRequest(BaseModel):
    url: str

@app.post("/fetch-job/")
async def fetch_job(req: URLRequest):
    """
    Scrape LinkedIn job description, embed it, store under job_id.
    """
    try:
        resp = requests.get(req.url, headers={"User-Agent": "Mozilla/5.0"})
        resp.raise_for_status()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to fetch URL: {e}")

    soup = BeautifulSoup(resp.text, "html.parser")
    desc_div = soup.select_one("div.description__text") or soup.select_one(".job-description__content")
    if not desc_div:
        raise HTTPException(status_code=500, detail="Could not find job description on page")
    text = desc_div.get_text(separator="\n").strip()

    job_id = str(uuid4())
    emb = model.encode(text, convert_to_tensor=True)
    jobs[job_id] = {"description": text, "embedding": emb}
    return {"job_id": job_id, "description": text}


def strip_pii(text: str) -> str:
    # remove emails
    text = re.sub(r'\b[\w\.-]+@[\w\.-]+\.\w{2,}\b', '[email]', text)
    # remove phones
    text = re.sub(r'\b\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}\b', '[phone]', text)
    text = re.sub(r'\b\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{3,4}\b','[phone]',text)
    # simple names
    text = re.sub(r'\b[A-Z][a-z]+ [A-Z][a-z]+\b', '[name]', text)
    return text

@app.post("/screen-resumes/")
async def screen_resumes(
    request: Request,
    job_id: str = Form(None),
    description: str = Form(None),
    files: list[UploadFile] = File(...)
):
    """
    Enforce user consent, then screen resumes with anonymization and highlights.
    """
    # Consent enforcement
    consent = request.headers.get("X-User-Consent") == "true"
    if not consent:
        raise HTTPException(status_code=403, detail="User consent required before processing resumes.")

    # Determine or create embedding
    if description:
        desc_text = description
        job_id = job_id or str(uuid4())
        emb = model.encode(desc_text, convert_to_tensor=True)
        jobs[job_id] = {"description": desc_text, "embedding": emb}
    elif job_id in jobs:
        desc_text = jobs[job_id]["description"]
        emb = jobs[job_id]["embedding"]
    else:
        raise HTTPException(status_code=400, detail="Provide description or valid job_id")

    out = []
    resumes_store[job_id] = {}

    for file in files:
        if file.content_type != "application/pdf":
            continue
        data = await file.read()
        resumes_store[job_id][file.filename] = data

        # Extract & anonymize
        reader = PdfReader(io.BytesIO(data))
        full_text = "".join((p.extract_text() or "") + " " for p in reader.pages)
        clean_text = strip_pii(full_text)

        # Semantic score
        res_emb = model.encode(clean_text, convert_to_tensor=True)
        score = util.pytorch_cos_sim(emb, res_emb).item()
        status = "Screened" if score >= 0.6 else "Review"

        # Highlights
        sentences = [s.strip() for s in re.split(r'(?<=[.!?])\s+', clean_text) if s]
        sent_embs = model.encode(sentences, convert_to_tensor=True)
        hits = util.semantic_search(emb, sent_embs, top_k=3)[0]
        highlights = [sentences[h['corpus_id']] for h in hits]

        out.append({
            "resume_name": file.filename,
            "score": round(score, 2),
            "status": status,
            "highlights": highlights
        })

    results[job_id] = out
    return {"job_id": job_id, "results": out}

@app.get("/results/{job_id}")
async def get_results(job_id: str):
    if job_id not in results:
        raise HTTPException(status_code=404, detail="No results for that job_id")
    return {"job_id": job_id, "results": results[job_id]}

@app.get("/resume/{job_id}/{filename}")
async def get_resume(job_id: str, filename: str):
    bucket = resumes_store.get(job_id)
    if not bucket or filename not in bucket:
        raise HTTPException(status_code=404, detail="Resume not found")
    data = bucket[filename]
    return StreamingResponse(
        io.BytesIO(data),
        media_type="application/pdf",
        headers={"Content-Disposition": f'inline; filename="{filename}"'}
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
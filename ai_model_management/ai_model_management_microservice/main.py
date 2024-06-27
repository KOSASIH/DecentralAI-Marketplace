# ai_model_management_microservice/main.py
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.requests import Request
from pydantic import BaseModel
from docker import DockerClient

app = FastAPI()

class AIModel(BaseModel):
    id: str
    name: str
    description: str
    model_type: str
    model_version: str
    model_file: str

docker_client = DockerClient()

@app.post("/ai-models/")
async def create_ai_model(ai_model: AIModel):
    # Create a new Docker container for the AI model
    container = docker_client.containers.run(
        "ai-model-" + ai_model.id,
        detach=True,
        ports={"8080/tcp": 8080},
        environment={"MODEL_TYPE": ai_model.model_type, "MODEL_VERSION": ai_model.model_version}
    )
    return JSONResponse(content={"id": ai_model.id, "container_id": container.id}, status_code=201)

@app.get("/ai-models/{ai_model_id}")
async def get_ai_model(ai_model_id: str):
    # Get the AI model container by ID
    container = docker_client.containers.get(ai_model_id)
    if container:
        return JSONResponse(content={"id": ai_model_id, "status": container.status}, status_code=200)
    else:
        raise HTTPException(status_code=404, detail="AI model not found")

@app.put("/ai-models/{ai_model_id}")
async def update_ai_model(ai_model_id: str, ai_model: AIModel):
    # Update the AI model container
    container = docker_client.containers.get(ai_model_id)
    if container:
        container.exec_run(["update-model", ai_model.model_file])
        return JSONResponse(content={"id": ai_model_id, "status": "updated"}, status_code=200)
    else:
        raise HTTPException(status_code=404, detail="AI model not found")

@app.delete("/ai-models/{ai_model_id}")
async def delete_ai_model(ai_model_id: str):
    # Delete the AI model container
    container = docker_client.containers.get(ai_model_id)
    if container:
        container.stop()
        container.remove()
        return JSONResponse(content={"id": ai_model_id, "status": "deleted"}, status_code=200)
    else:
        raise HTTPException(status_code=404, detail="AI model not found")

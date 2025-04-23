from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

app = FastAPI()

# Directory where your weekly chart image is saved
app.mount(
    "/charts", StaticFiles(directory="generated_charts"), name="charts")


@app.get("/weekly-chart")
async def weekly_chart():
    image_path = "generated_charts/weekly_chart.jpg"
    if os.path.exists(image_path):
        return FileResponse(image_path)
    return {"error": "Weekly chart not available."}

import uvicorn
from Controller.ChatController import app
from Config.Eureka_config import register_with_eureka
import threading

if __name__ == "__main__":
    threading.Thread(target=register_with_eureka())
    uvicorn.run(app, host="localhost", port=8087)



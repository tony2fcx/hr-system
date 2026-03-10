from fastapi import WebSocket
import json


class ConnectionManager:

    def __init__(self):
        self.active_connections = {}

    async def connect(self, manager_id: int, websocket: WebSocket):
        await websocket.accept()

        if manager_id not in self.active_connections:
            self.active_connections[manager_id] = []

        self.active_connections[manager_id].append(websocket)

    def disconnect(self, manager_id: int, websocket: WebSocket):
        connections = self.active_connections.get(manager_id)

        if not connections:
            return

        if websocket in connections:
            connections.remove(websocket)

        if len(connections) == 0:
            del self.active_connections[manager_id]

    async def broadcast(self, manager_id: int, message, exclude: WebSocket = None):
        connections = self.active_connections.get(manager_id, [])

        payload = message if isinstance(message, str) else json.dumps(message)

        for connection in connections:

           
            if connection == exclude:
                continue

            await connection.send_text(payload)

    async def send_to_sender(self, websocket: WebSocket, message):
        payload = message if isinstance(message, str) else json.dumps(message)
        await websocket.send_text(payload)


manager = ConnectionManager()
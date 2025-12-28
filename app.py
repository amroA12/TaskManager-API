from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

tasks = []
task_id = 1

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/tasks", methods=["GET"])
def get_tasks():
    return jsonify(tasks)

@app.route("/tasks", methods=["POST"])
def add_task():
    global task_id
    data = request.get_json()
    task = {
        "id": task_id,
        "title": data["title"]
    }
    tasks.append(task)
    task_id += 1
    return jsonify(task), 201

@app.route("/tasks/<int:id>", methods=["DELETE"])
def delete_task(id):
    global tasks
    tasks = [task for task in tasks if task["id"] != id]
    return jsonify({"message": "Task deleted"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

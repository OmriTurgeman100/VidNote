import subprocess
import os
from multiprocessing import Process

base_path = os.path.dirname(os.path.abspath(__file__))

projects = [
    {
        "path": os.path.join(base_path, "server"),
        "install": "npm install",
        "start": "npm run dev",
    },
    {
        "path": os.path.join(base_path, "client"),
        "install": "npm install",
        "start": "npm run dev",
    },
    {
        "path": os.path.join(base_path, "electron"),
        "install": "npm install",
        "start": "npm start",
    },
]


def execute_program(project):
    folder = project["path"]

    print(f"\n📁 Working in: {folder}")

    subprocess.run(project["install"], cwd=folder, check=True, shell=True)

    subprocess.run(project["start"], cwd=folder, check=True, shell=True)


if __name__ == '__main__':

    processes = []

    for project in projects:
        process = Process(target=(execute_program),  args=(project,))
        process.start()
        processes.append(process)

    for process in processes:
        process.join()


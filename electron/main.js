// main.js
const { app, BrowserWindow } = require('electron');

function CreateWindow() {
    const window = new BrowserWindow(
        {
            width: 1920,
            height: 1080,
            autoHideMenuBar: true,
        }
    )

    window.loadURL('http://localhost:5173')
}

app.on('ready', CreateWindow)
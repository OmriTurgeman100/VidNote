// main.js
const { app, BrowserWindow } = require('electron');

function CreateWindow() {
    const window = new BrowserWindow(
        {
            width: 800,
            height: 600 ,
            webPreferences: {}
        }
    )

    window.loadURL('http://localhost:5173')
}

app.on('ready', CreateWindow)
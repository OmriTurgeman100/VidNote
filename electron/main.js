const { app, BrowserWindow, dialog } = require("electron");
const path = require("path");

function startServer() {
  try {
    // In the packaged app, this file will be at:
    // resources/app/server/dist/index.js
    const serverPath = path.join(__dirname, "server/dist/index.js");
    console.log("Starting server from:", serverPath);
    require(serverPath);
  } catch (err) {
    console.error("Failed to start server:", err);
    dialog.showErrorBox(
      "Server failed to start",
      (err && err.stack) || String(err)
    );
  }
}

function createWindow() {
  // Start backend
  startServer();

  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    autoHideMenuBar: true,
  });

  // Your backend serves the UI on this URL
  win.loadURL("http://localhost:3001");
  // Uncomment while debugging:
  // win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

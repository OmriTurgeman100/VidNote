const { app, BrowserWindow, dialog } = require("electron");
const path = require("path");

function startServer() {
  try {
    
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
  startServer();

  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    autoHideMenuBar: true,
  });

  win.loadURL("http://localhost:3001");

}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

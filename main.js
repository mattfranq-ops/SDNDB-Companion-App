const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const server = require("./server.js");

function worldsDir() {
  return path.join(app.getPath("userData"), "worlds");
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1300,
    height: 860,
    backgroundColor: "#0A0C11",
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.loadFile(path.join(__dirname, "dist", "index.html"));
}

app.whenReady().then(() => {
  ipcMain.handle("lanhost:start", (e, port) => server.start(port, worldsDir()));
  ipcMain.handle("lanhost:stop", () => server.stop());
  ipcMain.handle("lanhost:status", () => server.status());
  ipcMain.handle("lanhost:ips", () => server.localIps());

  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("will-quit", () => server.stop());

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

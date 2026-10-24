const { app, BrowserWindow, ipcMain, shell } = require("electron");
const path = require("path");
const server = require("./server.js");

function worldsDir() {
  return path.join(app.getPath("userData"), "worlds");
}

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1300,
    height: 860,
    minWidth: 760,
    minHeight: 560,
    title: "SDNDBZ Companion",
    backgroundColor: "#0A0C11",
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // The app is a single local page: links to the web open in the real browser,
  // and nothing may navigate the app window itself away from it.
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:\/\//i.test(url)) shell.openExternal(url);
    return { action: "deny" };
  });
  mainWindow.webContents.on("will-navigate", (e, url) => {
    if (!url.startsWith("file://")) e.preventDefault();
  });

  mainWindow.loadFile(path.join(__dirname, "dist", "index.html"));
  mainWindow.on("closed", () => { mainWindow = null; });
}

// One copy at a time: a second launch would fight the first for the host port.
if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (!mainWindow) return;
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  });

  app.whenReady().then(() => {
    ipcMain.handle("lanhost:start", (e, port) => server.start(port, worldsDir(), path.join(__dirname, "dist")));
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
}

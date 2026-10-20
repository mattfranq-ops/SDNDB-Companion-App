// Bridges the renderer to the host-server controls in the main process. Only
// present in the desktop app — the browser preview has no window.lanHost.
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("lanHost", {
  start: (port) => ipcRenderer.invoke("lanhost:start", port),
  stop: () => ipcRenderer.invoke("lanhost:stop"),
  status: () => ipcRenderer.invoke("lanhost:status"),
  ips: () => ipcRenderer.invoke("lanhost:ips"),
});

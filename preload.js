const os = require("os");
const path = require("path");
const { contextBridge, ipcRenderer } = require("electron");
const Toastify = require("toastify-js");

/* Exposing the `os` module to the main world. */
contextBridge.exposeInMainWorld("os", {
  homedir: () => os.homedir(),
});

/* Exposing the `path` module to the main world. */
contextBridge.exposeInMainWorld("path", {
  join: (...args) => path.join(...args),
});

/* Exposing the ipcRenderer to the main world. */
contextBridge.exposeInMainWorld("ipcRenderer", {
  send: (channel, data) => ipcRenderer.send(channel, data),
  on: (channel, func) =>
    ipcRenderer.on(channel, (event, ...args) => func(...args)),
});

/* Exposing the Toastify module to the main world. */
contextBridge.exposeInMainWorld("Toastify", {
  toast: (options) => Toastify(options).showToast(),
});

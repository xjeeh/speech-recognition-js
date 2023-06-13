import { app, BrowserWindow, globalShortcut } from "electron";
import path from "path";

const createMainWindow = async () => {
  const win = new BrowserWindow({
    width: 490,
    height: 550,
    x: 1920,
    y: 0,
    // resizable: false,
    icon: path.join(__dirname, "../assets/jehrisos.ico"),
    title: "xJeeh's Speech Recognition",
    fullscreen: false,
    fullscreenable: false,
    darkTheme: true,
    // backgroundColor: "transparent",
    opacity: 0.95,
    webPreferences: {
      // devTools: false,
      nodeIntegration: true,
      //   preload: path.join(__dirname, "preload.js"),
    },
  });
  win.setMenuBarVisibility(false);
  win.loadFile(`${path.join(__dirname, "../index.html")}`);
  // win.loadURL("http://localhost:5555");
  globalShortcut.register("F8", () => {});
};

app.requestSingleInstanceLock();

app.on("ready", createMainWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

import { app, BrowserWindow }from "electron";
import { join } from "path";
import { format } from "url";
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";

let mainWindow: BrowserWindow | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "OttoLauncher",
    webPreferences: {
      nodeIntegration: true,
    }
  });

  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:8000");
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(
      format({
        pathname: join(__dirname, "../public/index.html"),
        protocol: "file:",
        slashes: true
      })   
    );
  }
}
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  })
});

// if (process.env.NODE_ENV === "development") {
//   installExtension(REACT_DEVELOPER_TOOLS).then((name) => {
//     console.log(`Added Extension ${name}`);
//   }).catch((err) => {
//     console.error(err);
//   })
// }

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

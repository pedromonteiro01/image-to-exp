const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs');

function createWindow() {
    const win = new BrowserWindow({
        width: 400,
        height: 300,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipcMain.on('save-file', (event, sourceFilePath) => {
    const options = {
        title: 'Save .exp file',
        filters: [
            { name: '.exp', extensions: ['exp'] }
        ]
    };

    dialog.showSaveDialog(options).then(result => {
        if (!result.canceled && result.filePath) {
            const newFilePath = result.filePath.endsWith('.exp') ? result.filePath : result.filePath + '.exp';

            // This just copies the file for the sake of the example.
            fs.copyFileSync(sourceFilePath, newFilePath);

            event.sender.send('file-saved', 'File converted and saved successfully!');
        }
    });
});

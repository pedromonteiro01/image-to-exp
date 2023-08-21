const { ipcRenderer } = require('electron');

document.getElementById('convertBtn').addEventListener('click', () => {
    const files = document.getElementById('imageSelector').files;

    if (files.length === 0) {
        alert('Error: No image selected!');
        return;
    }
    
    const file = files[0];

    ipcRenderer.send('save-file', file.path);
});

ipcRenderer.on('file-saved', (event, message) => {
    alert(message);
});

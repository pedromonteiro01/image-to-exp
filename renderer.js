const { ipcRenderer } = require('electron');

document.getElementById('convertBtn').addEventListener('click', () => {
    const fileInput = document.getElementById('imageSelector');
    const files = fileInput.files;

    if (files.length === 0) {
        alert('Error: No image selected!');
        return;
    }
    
    const file = files[0];

    ipcRenderer.send('save-file', file.path);

    // Reset the file input after processing the file
    fileInput.value = '';
});

ipcRenderer.on('file-saved', (event, message) => {
    alert(message);
});

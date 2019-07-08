const { app, ipcMain, globalShortcut } = require('electron');
const noteTray = require('./app/note-tray');
const browserWindow = require('./app/browser-window');
const { useCapture } = require('./src/renderer/dragsnip/capture-main');

// // Make Win10 notification available
// app.setAppUserModelId(process.execPath);

let controlbar = null;
let text = null;
let main = null;

app.on('ready', (event) => {
    controlbar = browserWindow.createControlBarWindow();
    useCapture(controlbar);
    let tray = noteTray.enable(controlbar);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (controlbar === null) {
        controlbar = browserWindow.createControlBarWindow();
    }
})

ipcMain.on('register-shortcuts', () => {
    globalShortcut.register('F1', () => {
        controlbar.webContents.send('F1');
        console.log('F1 pressed');
    });

    globalShortcut.register('F2', () => {
        controlbar.webContents.send('F2');
        console.log('F2 pressed');
    });

    globalShortcut.register('F3', () => {
        controlbar.webContents.send('F3');
        console.log('F3 pressed');
    });

    globalShortcut.register('F4', () => {
        controlbar.webContents.send('F4');
        console.log('F4 pressed');
    });
});

ipcMain.once('unregister-shortcuts', () => {
    globalShortcut.unregisterAll();
});

ipcMain.on('audio-click', () => {
    console.log('audio click');
})

ipcMain.on('video-click', () => {
    console.log('video click');
})

ipcMain.on('text-click', () => {
    text = browserWindow.createTextWindow();
    console.log('text click');
})

ipcMain.on('cancel-click-on-text-window', () => {
    text.close();
    console.log('cancel-click');
})

ipcMain.on('ok-click-on-text-window', (event, textObject) => {
    console.log('ok-click');
    controlbar.webContents.send('save-textarea-value', textObject);
    text.close();
})

ipcMain.on('quit-click', () => {
    app.quit();
});

ipcMain.on('home-click', () => {
    if (main === null) {
        main = browserWindow.createMainWindow();
        main.maximize();
        main.on('closed', () => {
            main = null;
        });
        // main.removeMenu();
    } else {
        main.show();
    }

});

ipcMain.on('timeline-click', () => {
    main = browserWindow.ChangeMainToTimeline();
    main.maximize();
    // main.removeMenu();
    console.log('timeline-click');
});

ipcMain.on('mark-click', () => {
    console.log('mark click');
});

ipcMain.on('initialize-note', () => {
    controlbar.webContents.send('initialize-note');
});

ipcMain.on('sync-with-note', (event, note) => {
    if (main !== null) {  // Only send when the home is open
        main.webContents.send('sync-with-note', note);
    }
});
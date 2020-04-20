const {app,BrowserWindow} = require('electron')

// Permite Hot Reload 
require('electron-reload')(__dirname,{
    electron: require(`${__dirname}/node_modules/electron`)
});

// Funcion para crear la ventana
const createWindow = () =>{
    const mainWindow = new BrowserWindow({
        width:800,
        height:600,
        webPreferences:{
            nodeIntegration: true
        },
        icon: __dirname + '/img/icons/app-icon.png'
    })

    mainWindow.loadFile('./index.html')
    mainWindow.resizable = false
    mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow)


app.on('window-all-closed',()=>{
    app.quit()
})
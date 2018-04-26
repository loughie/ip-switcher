const electron = require('electron')
const network = require('network')
const netsh = require('./netshCommands')
const configCRUD = require('./configCRUD')


const ipcMain = electron.ipcMain


// Queries which the active adapter is and returns an Object
function queryActiveInterface() {
  return new Promise((resolve, reject) => {
    network.get_active_interface((err, response) => {
      if (err) reject(err)
      else resolve(response)
    })
  })
}
// Gets list of interfaces available on pc
function getInterfaceList() {
  console.log('hit');
  return new Promise((resolve, reject) => {
    network.get_interfaces_list((err, response) => {
      if (err) reject(err);
      else resolve(response);
    });
  });
}

// Reply to front end with active adapter Object
ipcMain.on('get-active-interface', (event) => {
  queryActiveInterface()
    .then((interfaceList) => {
    event.sender.send('interface', interfaceList);
  }).catch((err) => {
    console.error(err);
  });
})

// Reply to front end with active adapter Object
ipcMain.on('get-interface-list', (event) => {
  getInterfaceList()
  .then((interfaceList) => {
    event.sender.send('interface-list', interfaceList)
  }).catch((err) => {
    console.error(err);
  });
})

ipcMain.on('set-static', (event, adapter, settings) => {
  netsh.setStatic(adapter, ...settings)
  console.log('setting static');
})

ipcMain.on('set-dhcp', (event, adapter) => {
  netsh.setDHCP(adapter)
  console.log('setting dhcp');
})

ipcMain.on('save-config-entry', (event, entry) => {
  configCRUD.create(entry)
  console.log('saving new config entry');
})

ipcMain.on('delete-config-entry', (event, entry) => {
  configCRUD.delete(entry)
  console.log('deleting new config entry');
})


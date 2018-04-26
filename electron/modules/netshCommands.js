const elevate = require('node-windows').elevate;

module.exports = {
  // Command sent to powershell to set selected adapter to DHCP
  setDHCP: (adapter) => {
    elevate(`netsh interface ip set address ${adapter} dhcp`)
  },
  // Command sent to powershell to set ip of selected adapter
  setStatic: (adapter, ip, gateway, subnet) => {
    elevate(`netsh interface ip set address ${adapter} static ${ip} ${subnet} ${gateway}"`)
  }
}


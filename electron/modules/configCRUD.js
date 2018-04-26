const fs = require('fs');

module.exports = {
  // Command sent to powershell to set selected adapter to DHCP
  create: (entry) => {
    fs.readFile('src/configs.json', (err, data) => {
      const test = JSON.parse(data)
      test.push(entry)

      fs.writeFile('src/configs.json', JSON.stringify(test, null, 2))
    })
  },
  delete: (entry) => {
    fs.readFile('configs.json', (err, data) => {
      const test = JSON.parse(data)

      const withoutRemoved = test.configs.filter((e) => {
        return e.name !== entry.name
      })

      fs.writeFile('src/configs.json', JSON.stringify(withoutRemoved, null, 2))
    })
  },
}

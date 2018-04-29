const fs = require('fs');

module.exports = {
  // Reads JSON file and creates new config entries
  create: (config) => {
    fs.readFile('src/configs.json', (err, data) => {
      const configs = JSON.parse(data)

      configs.push(config)

      fs.writeFile('src/configs.json', JSON.stringify(configs, null, 2))
    })
  },
  // Reads JSON file, removes the deleted config and pushes new list back to file
  delete: (config) => {
    fs.readFile('src/configs.json', (err, data) => {
      const configs = JSON.parse(data)

      const notDeleted = configs.filter((e) => {
        return e.name !== config.name
      })

      fs.writeFile('src/configs.json', JSON.stringify(notDeleted, null, 2))
    })
  },
}

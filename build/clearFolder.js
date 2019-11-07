const fs = require('fs-extra')

const { resolve } = require('./utils')

fs.emptyDirSync(resolve('dist'))

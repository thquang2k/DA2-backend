const dbConnect = require('./utils/dbConnect')
const importBrand = require('./utils/importBrand')
const importCategory = require('./utils/importCategory')
const importColor = require('./utils/importColor')
const importOrigin = require('./utils/importOrigin')
const init = () => {
    importBrand()
    importCategory()
    importColor()
    importOrigin()
}

module.exports = {
    init
}
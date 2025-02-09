const dbConnect = require('./utils/dbConnect')
const superAdminUtil = require('./utils/superAdmin')
const importRole = require('./utils/roleImport')

const init = () => {
    superAdminUtil.CreateSuperAdmin()
    importRole.ImportRole()
}

module.exports = {
    init
}
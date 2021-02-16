// EXECUTE NO CONSOLE DESTA FORMA
// MODEL=MODELNAME npm run automigrate

// const server = require('../server');
// const ds = server.dataSources.db;
const server = require('../server');
const ds = server.dataSources.db;
const discover = require('./discover-models')

module.exports = function autoUpdateAll() {
    const Tables = require('../model-config.json');
    const tables = Object.keys(Tables).filter(key => {
        return (
            key != '_meta' &&
            key != 'User' &&
            key != 'AccessToken' &&
            key != 'ACL' &&
            key != 'RoleMapping' &&
            key != 'Role' &&
            key
            != 'Migration')
    })

    tables.forEach(async table => {
        await ds.isActual(table, (err, actual) => {
            console.log(table, actual)
            if (!actual) ds.autoupdate(table, async (err, result) => {
                console.log(err)
                if (!err) {
                    await discover(table).then(
                        success => process.exit(),
                    );
                }
            });
        });
    })
}

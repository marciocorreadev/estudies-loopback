// EXECUTE NO CONSOLE DESTA FORMA
// MODEL=MODELNAME npm run automigrate


function automigrate(table = '') {
    const server = require('../server');
    const ds = server.dataSources.db;

    ds.isActual(table, (err, actual) => {
        if (!actual) ds.autoupdate(table, (err, result) => { });
    });
}

const nameModel = process.env.MODEL;
if (nameModel) automigrate(nameModel);
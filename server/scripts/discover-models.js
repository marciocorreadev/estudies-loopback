// EXECUTE NO CONSOLE DESTA FORMA
// MODEL=MODELNAME npm run automigrate
const nameModel = process.env.MODEL;

'use strict';
const loopback = require('loopback');
const promisify = require('util').promisify;
const fs = require('fs');
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const mkdirp = promisify(require('mkdirp'));
const DATASOURCE_NAME = 'db'
const dataSourceConfig = require('../datasources.json');
const db = new loopback.DataSource(dataSourceConfig[DATASOURCE_NAME]);

function formatNome(str) {
    return str[0].toUpperCase() + str.toLowerCase().substr(1);
}

async function discover(model = nameModel) {
    const options = { relations: true };
    const empSchema = await db.discoverSchemas(model.toLowerCase(), options);
    console.log(empSchema);
    await mkdirp('./common/models');
    const tableModel = JSON.stringify(empSchema[`public.${model.toLowerCase()}`], null, 2)
    console.log(tableModel)
    if (tableModel) {
        await writeFile(`./common/models/${model.toLowerCase()}.json`, tableModel);
    }
    const configJson = await readFile('./server/model-config.json', 'utf-8');
    console.log('MODEL CONFIG', configJson);
    const config = JSON.parse(configJson);
    delete config[model.toLowerCase()];
    model = formatNome(model)
    config[model] = { dataSource: DATASOURCE_NAME, public: true };
    await writeFile('./server/model-config.json', JSON.stringify(config, null, 2));
}

if (nameModel) {
    discover().then(
        success => process.exit(),
        error => { console.error('UNHANDLED ERROR: \n', error); process.exit(1); },
    );
}

module.exports = async (model = nameModel) => {
    await discover(model).then(
        success => process.exit(),
        error => { console.error('UNHANDLED ERROR: \n', error); process.exit(1); },
    );
}


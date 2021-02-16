// EXECUTE NO CONSOLE DESTA FORMA
// MODEL=MODELNAME npm run automigrate

const nameModel = process.env.MODEL;
const model = require(`../../common/models/${nameModel}.json`)
const server = require('../server');
const ds = server.dataSources.db;

ds.createModel(model.name, model.properties, model.options);
ds.autoupdate(() => ds.discoverModelProperties(nameModel, (err, props) => console.log(props)));
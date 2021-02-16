const server = require('../server');
const ds = server.dataSources.db;

const lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role', 'Migration'];

ds.autoupdate(lbTables, function (er) {
    if (er) throw er;
    console.log('Looback tables [' + lbTables + '] created in ', ds.adapter.name);
    ds.disconnect();
});

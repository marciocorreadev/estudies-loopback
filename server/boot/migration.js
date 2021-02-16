const autoUpdateAll = require('../scripts/autoUpdateAll')

module.exports = function runMigrations(app, callback) {
    autoUpdateAll()

    // if (!process.env.MIGRATION) return callback();

    // var Migrate = app.models.Migration;

    // Migrate.on('error', err => console.log(err));

    // Migrate.migrate('up', err => {
    //     const msg = err ? `Erro ao executar migrations: ${err}` : 'Migrations executadas';
    //     console.log(msg)
    // });

    // Migrate.on('complete', () => callback());

};
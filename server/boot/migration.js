
module.exports = function runMigrations(app, callback) {

    if (process.env.GULP == 'false' || process.env.NOMIGRATION == 'true') return callback();

    var Migrate = app.models.Migration;

    //Para o loopback não parar quando a migration der erro
    Migrate.on('error', (err) => { });

    //Para mais informações sobre como utilizar, ver o link abaixo
    //https://github.com/fullcube/loopback-component-migrate
    //Para criar um novo arquivo de migrations, copiar o arquivo exemplo.js dentro da pasta server/migrations/
    Migrate.migrate('up', function (err) {
        if (err) {
            console.log('[MigrationError] Erro ao executar migrations:', err);
        } else {
            console.log('Migrations executadas');
        }
    });

    Migrate.on('complete', () => {
        callback();
    });

};
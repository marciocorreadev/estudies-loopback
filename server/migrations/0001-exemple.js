module.exports = {
    up: function (app, next) {
        // app.dataSources.mysql.connector.query('CREATE TABLE `my_table` ...;', next);
        console.log('4')
        next();
    },
    down: function (app, next) {
        console.log(5)
        // app.dataSources.mysql.connector.query('DROP TABLE `my_table`;', next);
        next();
    }
};
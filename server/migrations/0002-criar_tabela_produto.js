module.exports = {
    up: function (app, next) {
        const query = `
        CREATE TABLE IF NOT EXISTS public.produto (
            id bigserial not null,
            preco_compra float8,
            preco_venda float8,
            margem_lucro float8,
            descricao VARCHAR (255),
            tipo VARCHAR (255),
            data_inclusao timestamp DEFAULT now()
        )`;
        app.dataSources['db'].connector.query(query, err => next());
    },
    down: function (app, next) {
        next();
    }
};
'use strict';

module.exports = function (Produto) {
    Produto.testando = function (ctx, body, callback) {
        console.log(ctx)
        callback()
    }

    Produto.remoteMethod('testando', {
        description: 'Teste de interceptação de API',
        http: { path: '/testando', verb: 'get' },
        accepts: [
            {
                arg: 'contexto',
                type: 'Object',
                http: {
                    source: 'context',
                },
            },
            {
                arg: 'body',
                type: 'object',
                required: true,
                http: {
                    source: 'body',
                },
            },
        ]
    }
    );

};

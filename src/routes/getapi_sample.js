async function routes(fastify, options) {
    fastify.route({
        method: 'GET',
        url: '/get',
        schema: {
            querystring: {
                name: { type: 'string' },
                excitement: { type: 'integer' },
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        hello: { type: 'string' },
                    },
                },
            },
        },
        handler: function (request, reply) {
            reply.send({ get: 'result' });
        },
    });
}

module.exports = routes;

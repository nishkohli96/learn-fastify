/* Check index2.js for a basic use-case approach */
const Fastify = require('fastify');

async function build() {
    const fastify = Fastify({
        logger: true,
        ignoreTrailingSlash: true,
        caseSensitive: false,
    });

    await fastify.register(require('middie'));
    fastify.use(require('cors')());
    fastify.register(require('./src/plugins/mongo'));
    fastify.register(require('./src/routes/firstroute'), { prefix: '/v1' });
    fastify.register(require('./src/routes/getapi_sample'));

    fastify.get('/', async (request, reply) => {
        return { hello: 'world' };
    });

    return fastify;
}

// Run the server!
const start = async () => {
    build()
        .then((fastify) => fastify.listen(3000))
        .catch((err) => {
            console.error(err);
            process.exit(1);
        });
};

start();

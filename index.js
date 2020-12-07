/* Check index2.js for a basic use-case approach */
const Fastify = require('fastify');

/* Can check fastify-express to run express apps using fastify */
async function build() {
    const fastify = Fastify({
        // logger: true,
        logger: {
            level: 'info',
            prettyPrint: true, // requires pino-pretty pkg
        },
        ignoreTrailingSlash: true,
        caseSensitive: false,
        // http2: true,
        // https: {
        // allowHTTP1: true, // fallback support for HTTP1
        // key: fs.readFileSync(path.join(__dirname, '..', 'https', 'fastify.key')),
        // cert: fs.readFileSync(path.join(__dirname, '..', 'https', 'fastify.cert'))
        // }
    });

    await fastify.register(require('middie'));
    fastify.use(require('cors')());
    fastify.register(require('./src/plugins/mongo'));
    fastify.register(require('./src/routes/firstroute'), { prefix: '/v1' });
    fastify.register(require('./src/routes/getapi_sample'));

    // Decorate request with a 'user' property
    fastify.decorateRequest('user', '');

    // Update our property
    fastify.addHook('preHandler', (req, reply, done) => {
        req.user = 'Bob Dylan';
        // console.log('Reply in hook ',reply);
        done();
    });
    /* Check Request & Reply Methods here - 
        https://www.fastify.io/docs/latest/Request/
        https://www.fastify.io/docs/latest/Reply/  */
    fastify.get('/', (req, reply) => {
        reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send(`Hello, ${req.user}!`);
        // reply.code(303).redirect('/home')
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

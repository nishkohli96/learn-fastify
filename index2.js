/*  Handle promises if there is an 'unhandledRejection', i.e. a Promise without 
    a .catch() handler. 
    https://github.com/mcollina/make-promises-safe 
*/
const fastify = require('fastify')({
    logger: true,
    ignoreTrailingSlash: true, // consider /foo & /foo/ as same , else /foo/ pe error
    caseSensitive: false,
});
/* All other server props at https://www.fastify.io/docs/latest/Server/ */

fastify.register(require('middie'));
// fastify.register(require('cors')());
fastify.register(require('./src/plugins/mongo'));
fastify.register(require('./src/routes/firstroute'), { prefix: '/v1' });
/* Will be acccessed at http://localhost:3000/v1/country */
fastify.register(require('./src/routes/getapi_sample'));

// Declare a route
fastify.get('/', async (request, reply) => {
    return { hello: 'world' };
});

/*  the register API, which is the core of the Fastify framework is the 
    only way to add routes, plugins, etc. 
    
    The Order of registering plugins is as follows -
        └── plugins (from the Fastify ecosystem)
        └── your plugins (your custom plugins)
        └── decorators
        └── hooks
        └── your services
*/

// Run the server!
const start = async () => {
    try {
        await fastify.listen(3000);
        fastify.log.info(
            `server listening on ${fastify.server.address().port}`
        );
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();

/* Without async-await */
// fastify.get('/', (request, reply) => {
//     reply.send({ hello: 'world' })
//   })
//
// fastify.listen(3000, (err, address) => {
//     if (err) {
//       fastify.log.error(err)
//       process.exit(1)
//     }
//     fastify.log.info(`server listening on ${fastify.server.address().port}`) or
//     fastify.log.info(`server listening on ${address}`)
//   })

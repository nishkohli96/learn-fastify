/*  Handle promises if there is an 'unhandledRejection', i.e. a Promise without 
    a .catch() handler. 
    https://github.com/mcollina/make-promises-safe 
*/
const fastify = require('fastify')({ logger: true });

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

fastify.register(require('./src/plugins/mongo'));
fastify.register(require('./src/routes/firstroute'));

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

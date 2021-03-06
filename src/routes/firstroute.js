/* It can be a set of routes */
async function routes(fastify, options) {
    const collection = fastify.mongo.db.collection('countries');

    fastify.get('/country', async (request, reply) => {
        const result = await collection.find().toArray();
        if (result.length === 0) {
            throw new Error('No documents found');
        }
        return result;
    });

    fastify.get('/country/:abbr', async (request, reply) => {
        const result = await collection.findOne({
            abbr: request.params.abbr.toUpperCase(),
        });
        /* Abbr in DB is all caps */
        if (result === null) {
            throw new Error('Invalid value');
        }
        return result;
    });
}

module.exports = routes;

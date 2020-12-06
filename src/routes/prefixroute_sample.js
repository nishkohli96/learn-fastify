fastify.register(
    function (instance, opts, done) {
        instance.get('/foo', function (request, reply) {
            // Will log "prefix: /v1"
            request.log.info('prefix: %s', instance.prefix);
            reply.send({ prefix: instance.prefix });
        });

        instance.register(
            function (instance, opts, done) {
                instance.get('/bar', function (request, reply) {
                    // Will log "prefix: /v1/v2"
                    request.log.info('prefix: %s', instance.prefix);
                    reply.send({ prefix: instance.prefix });
                });

                done();
            },
            { prefix: '/v2' }
        );

        done();
    },
    { prefix: '/v1' }
);

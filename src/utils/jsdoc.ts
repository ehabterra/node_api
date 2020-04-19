import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    swaggerDefinition: {
        // Like the one described here: https://swagger.io/specification/#infoObject
        // openapi: "3.0.0",
        info: {
            version: "1.0.0",
            title: "Todd project",
            description: "Video aggregator API project"
        },
        // securityDefinitions: {
        //     bearerAuth: {
        //         type: 'apiKey',
        //         name: 'Authorization',
        //         scheme: 'bearer',
        //         in: 'header'
        //     }
        // },
        securityDefinitions: {
            bearerAuth: {
                type: 'apiKey',
                name: 'Authorization',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                in: 'header',
            },
        },
        host: "localhost:3000", // the host or url of the app
        basePath: "/", // the basepath of your endpoin
    },
    explorer: true,
    // List of files to be processes. You can also set globs './routes/*.js'
    apis: ['**/*.ts'],
};

export const specs = swaggerJsdoc(options);

const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/routes.js']

swaggerAutogen(outputFile, endpointsFiles)

const doc ={
    info: {
        version: "1.0.0",
        title: "API de usuarios",
        description: "Crud de usuarios usando NdeJS, Typescript, TDD e jwt"
    }
}
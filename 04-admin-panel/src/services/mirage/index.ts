import { createServer, Factory, Model, Response } from 'miragejs'
import { faker } from '@faker-js/faker'

type User = {
    name: string;
    email: string;
    created_at: string;
}


export function makeServer() {
    const server = createServer({
        // models sao tipo tebelas
        models: {
            user: Model.extend<Partial<User>>({})
        },

        // factories sao tipo funcoes para criar dados aleatorios em massa
        factories: {
            user: Factory.extend({
                name() {
                    return faker.name.findName();
                },
                email() {
                    return faker.internet.email().toLowerCase();
                },
                createdAt() {
                    return faker.date.recent(10).toISOString();
                },
            })
        },

        // seeds sao dados iniciais
        seeds(server) {
            // passa o nome do factory e o numero de registros
            server.createList('user', 40);
        },

        routes() {
            this.namespace = 'api';
            this.timing = 750;

            this.get('/users', function (schema, request){
                const { page = 1, per_page = 10 } = request.queryParams;

                const total = schema.all('user').length;

                const pageStart = (Number(page) -1) * Number(per_page);
                const endPage = pageStart + Number(per_page);

                const users = this.serialize(schema.all('user')).users.slice(pageStart, endPage);

                return new Response(
                    200,
                    { 'x-total-count': String(total) },
                    { users }
                );

            });

            this.post('/users');

            this.namespace = '';
            this.passthrough();
        }
    })

    return server;
}
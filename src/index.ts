import Elysia from 'elysia'

new Elysia()
    .get('/', {
        status: true,
        message: 'OK',
    })
    .listen(8000)

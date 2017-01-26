'use strict';

const handleError = require('./errors');
const co = require('co');

const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

// Add initial user
co(function*() {
    try {
        const { users } = app.services;
        const { total } = yield users.find({});
        if (total === 0) {
            const newUser = {
                email: 'admin@admin.com',
                password: 'adminpass'
            };
            yield users.create(newUser);
            console.log(`Recorded user ${newUser.email}`);
        }
    } catch (err1) {
        handleError(err1);
    }
});

server.on('listening', () =>
    console.log(`Feathers application started on ${app.get('host')}:${port}`)
);
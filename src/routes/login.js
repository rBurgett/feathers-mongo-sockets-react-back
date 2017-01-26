const fs = require('fs');
const handleError = require('../errors');

const indexHTML = fs.readFileSync('./public/index.html', 'utf8');

const login = () => (req, res) => {
    try {
        res.send(indexHTML);
    } catch (err) {
        res.sendStatus(500);
        handleError(err);
    }
};

module.exports = login;
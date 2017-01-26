const fs = require('fs');
const handleError = require('../errors');

const indexHTML = fs.readFileSync('./public/index.html', 'utf8');

const home = ({ title, description, image }) => (req, res) => {
    try {
        const html = indexHTML
            .replace(/{{title}}/g, title)
            .replace(/{{url}}/g, `${req.protocol}://${req.get('host')}`)
            .replace(/{{image}}/g, image)
            .replace(/{{description}}/g, description);

        res.send(html);
    } catch (err) {
        res.sendStatus(500);
        handleError(err);
    }
};

module.exports = home;
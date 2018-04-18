'use strict';
const config = require('@trust1team/t1t-config');

function index(req, res) {
    if (config.environment.toLowerCase() === 'local') return res.render("./index-dev.ejs", { config });
    else return res.render("index", { config });
}

module.exports = {
    index: index
};
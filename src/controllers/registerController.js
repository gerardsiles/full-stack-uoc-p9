let http_utils = require('../services/http_utils');
const {createReadStream} = require("fs");
const path = require("path");

const HTML_CONTENT_TYPE = 'text/html';
const CSS_CONTENT_TYPE = 'text/css';
const JS_CONTENT_TYPE = 'text/javascript';


function getUserRegisterData(req, res) {

}

module.exports = {
    getUserRegisterData
}
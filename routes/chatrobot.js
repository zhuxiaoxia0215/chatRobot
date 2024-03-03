var express = require('express');
var router = express.Router();
const checkSignature = require('../controller/checkSignature');
const message = require('../controller/message');

//验证消息来源于微信服务器
router.get('/', checkSignature);
router.post('/', message);

module.exports = router;

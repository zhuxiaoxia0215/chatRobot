var express = require('express');
var router = express.Router();
const checkSignature = require('../controller/checkSignature');
const message = require('../controller/message');
const menuController = require("../controller/menu")

//验证消息来源于微信服务器
router.get('/', checkSignature);
router.post('/', message);

router.get('/menu', menuController.createMenu);

module.exports = router;

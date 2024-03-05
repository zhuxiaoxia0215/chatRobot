var express = require('express');
var router = express.Router();

require('../db')

const checkSignature = require('../controller/checkSignature');
const message = require('../controller/message');
const menuController = require("../controller/menu")
const switchController = require('../controller/switcher')

//验证消息来源于微信服务器
router.get('/', checkSignature);
router.post('/', switchController);

router.get('/menu', menuController.createMenu);

module.exports = router;

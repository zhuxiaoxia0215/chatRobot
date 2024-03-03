const {formatXml} = require('../utils/format');
const customerService = require('../controller/customerService');

async function messageController(req, res, next) {
    //接受微信端发来的信息
    const message = formatXml(req.body.xml);
    console.log(message);
    const {tousername, fromusername} = message;

    const createTime = new Date().getTime();
    const content = '请等待chatgpt消息返回~';

    //回复消息
    res.render('reply', {
        tousername,
        fromusername,
        createTime,
        content
    })

    //等待客服消息回复
    await customerService(fromusername);
}

module.exports = messageController;

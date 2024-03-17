const {formatXml} = require('../utils/format');
const customerService = require('../controller/customerService');
const {deductBalance, findUser, getBalance} = require('../model/user');
const getCompletions = require('./openai');

async function messageController(req, res, next) {
    //接受微信端发来的信息
    const message = formatXml(req.body.xml);
    console.log(message);
    const {tousername, fromusername} = message;
    console.log(message);
    const prompt = message.recognition ? message.recognition : message.content;

    const createTime = new Date().getTime();

    // 获取用户的会话模型
    const model = (await findUser(fromusername)).model;
    console.log(model);

    let content = '';

    //根据用户的会话模型做不同的消息回复
    if (model === 'chatgpt') {
        const balance = await getBalance(fromusername);
        if (balance <= 0) {
            content = '您的余额不足，请充值';
            res.render('reply', {
                tousername,
                fromusername,
                createTime,
                content
            })
            return;
        }
        content = '请等待chatgpt消息返回~';
        //用户账户金额扣除
        await deductBalance(fromusername);

        content = await getCompletions(fromusername, prompt);
        //等待客服消息回复
        await customerService(fromusername, content);
        //回复消息
        res.render('reply', {
            tousername,
            fromusername,
            createTime,
            content
        })
    } else {
        content = '目前坐席忙， 请等待回复';
        //回复消息
        res.render('reply', {
            tousername,
            fromusername,
            createTime,
            content
        })
    }
}

module.exports = messageController;

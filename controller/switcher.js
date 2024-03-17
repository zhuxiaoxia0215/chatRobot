const message = require('./message');
const {formatXml} = require('../utils/format');
const {findUser, createUser, getBalance, changeModel, recharge} = require('../model/user')

async function switchController(req, res, next) {
    console.log(req.body);
    const reqBody = formatXml(req.body.xml);
    const {fromusername} = reqBody
    switch (reqBody.msgtype) {
        //收取用户发送的语音信息
        case "voice":
        case "text":
            await message(req, res, next);
            break;
        case "event":
            //处理用户菜单模式切换
            switch (reqBody.eventkey) {
                case "model_human":
                    await changeModel(fromusername, 'human');
                    res.render('reply', {
                        ...reqBody,
                        createTime: new Date().getTime(),
                        content: '已经切换到人工服务，你可以向平台的坐席提问了'
                    })
                    break;
                case "model_chatgpt":
                    await changeModel(fromusername, 'chatgpt');
                    res.render('reply', {
                        ...reqBody,
                        createTime: new Date().getTime(),
                        content: '已经切换到ChatGPT模式，请直接向它提问'
                    })
                    break;
                case "model_search":
                    const {model} = await findUser(fromusername);
                    res.render('reply', {
                        ...reqBody,
                        createTime: new Date().getTime(),
                        content: `您现在的会话模式是：${model === 'chatgpt' ? 'ChatGPT' : '人工'}`
                    })
                    break;
                case "balance_recharge":
                    //微信支付，获取账号金额
                    const amount = 8;
                    await recharge(fromusername, amount);
                    const newbalance = await getBalance(fromusername);
                    res.render('reply', {
                        ...reqBody,
                        createTime: new Date().getTime(),
                        content: `充值成功，您的账户余额为${newbalance}`
                    })
                    break;
                case "balance_search":
                    const balance = await getBalance(fromusername);
                    res.render('reply', {
                        ...reqBody,
                        createTime: new Date().getTime(),
                        content: `你的账户余额为${balance}`
                    })
                    break;
                default:
                    break;
            }
            //处理用户关注和取消关注的动作
            switch (reqBody.event) {
                case 'subscribe':
                    // 当用户关注公众号的时候，需要到数据库查一下此用户是否存在
                    const result = await findUser(fromusername);
                    if (result) {
                        const balance = await getBalance(fromusername);
                        res.render('reply', {
                            ...reqBody,
                            createTime: new Date().getTime(),
                            content: `欢迎您回来，您的账户余额为 ${balance}, 您现在的会话模式是： ${result.model === 'chatgpt' ? 'ChatGPT' : '人工'}`
                        })
                    } else {
                        const userInfo = await createUser(fromusername);
                        res.render('reply', {
                            ...reqBody,
                            createTime: new Date().getTime(),
                            content: `感谢您的关注，为您奉上 ${userInfo[0].balance} 个金币， 现在的会话模式是： ${result.model === 'chatgpt' ? 'ChatGPT' : '人工'}`
                        })
                    }
                    break;
                case 'subscribe':
                    break;
                default:
                    break;
            }
        default:
            break;
    }
}

module.exports = switchController;

const message = require('./message');
const {formatXml} = require('../utils/format')

async function switchController(req, res, next) {
    console.log(req.body);
    const reqBody = formatXml(req.body.xml);
    switch (reqBody.msgtype) {
        case "text":
            await message(req, res, next);
            break;
        case "event":
            //处理用户菜单模式切换
            switch (reqBody.eventkey) {
                case "model_human":
                    res.render('reply', {
                        ...reqBody,
                        createTime: new Date().getTime(),
                        content: '已经切换到人工服务，你可以向平台的坐席提问了'
                    })
                    break;
                case "model_chatgpt":
                    res.render('reply', {
                        ...reqBody,
                        createTime: new Date().getTime(),
                        content: '已经切换到ChatGPT模式，请直接向它提问'
                    })
                    break;
                default:
                    break;
            }
            //处理用户关注和取消关注的动作
            switch (reqBody.event) {
                case 'subscribe':
                    res.render('reply', {
                        ...reqBody,
                        createTime: new Date().getTime(),
                        content: '感谢关注'
                    })
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

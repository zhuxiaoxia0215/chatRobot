const axios = require('axios');
const {getAccessToken} = require('./accessToken');
const menu = {
    button: [
        {
            name: '模式切换',
            sub_button: [
                {
                    type: 'click',
                    name: 'chatgpt',
                    key: 'model_chatgpt'
                },
                {
                    type: 'click',
                    name: '人工服务',
                    key: 'model_human'
                },
                {
                    type: 'click',
                    name: '模式查询',
                    key: 'model_search'
                }
            ]
        },
        {
            name: '账户',
            sub_button: [
                {
                    type: 'click',
                    name: '账户充值',
                    key: 'balance_recharge'
                },
                {
                    type: 'click',
                    name: '余额查询',
                    key: 'balance_search'
                }
            ]
        }
    ]
}

async function createMenu(req, res, next,) {
    const token = await getAccessToken()
    const url = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${token}`;
    await axios.post(url, menu);
    res.send('菜单创建成功');
}

function removeMenu() {

}

module.exports = {
    createMenu,
    removeMenu
}

const {getAccessToken} = require('./accessToken');
const axios = require('axios');

async function customerServiceController(openid) {
    const access_token = await getAccessToken();
    const url = `https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token= ${access_token}`;
    await axios.post(url, {
        touser: openid,
        msgtype: 'text',
        text: {
            content: '来源于ChatGPT的回答。'
        }
    })
}

module.exports = customerServiceController;

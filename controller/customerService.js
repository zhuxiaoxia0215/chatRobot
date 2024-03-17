const {getAccessToken} = require('./accessToken');
const axios = require('axios');

async function customerServiceController(openid, content) {
    const access_token = await getAccessToken();
    console.log(access_token);
    const url = `https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token= ${access_token}`;
    await axios.post(url, {
        touser: openid,
        msgtype: 'text',
        text: {
            content
        }
    })
}

module.exports = customerServiceController;

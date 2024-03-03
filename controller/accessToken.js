const axios = require('axios');

const APPID = '';
const APPSECRET = '';

async function generateToken() {
    // access_token请求接口GET https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`;
    const result = await axios.get(url);
    console.log(result);
    return result;
}

module.exports = {
    generateToken
}

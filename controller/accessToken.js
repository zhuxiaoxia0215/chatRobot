const axios = require('axios');
const fs = require('fs');

const APPID = 'wx994b88c3debfe07b';
const APPSECRET = 'ed12ff988d1c3a8996fe3a203d29552a';

async function generateToken() {
    // access_token请求接口GET https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`;
    const {access_token} = (await axios.get(url)).data;
    // 将token 和创建时间保存到本地文件里
    const data = {
        access_token,
        create_time: new Date().getTime()
    }
    fs.writeFileSync('./data/access_token.json', JSON.stringify(data));
    return access_token;
}

async function getAccessToken() {
    //读取文件中的关于access_token 相关信息
    const json = fs.readFileSync('./data/access_token.json', 'utf8');
    const {access_token, create_time} = JSON.parse(json || "{}");
    const now = new Date().getTime();
    if (access_token && now - create_time <= 7000 * 1000) {
        return access_token;
    } else {
        const token = await generateToken();
        return token;
    }
}

module.exports = {
    generateToken,
    getAccessToken
}

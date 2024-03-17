//unionId: 一个组织账号，一般一个组织只有一个，
//openId: 一个微信账号，一个组织可以创建多个openId

const {userModel} = require('../db/schema')

// 插入一条用户记录
async function createUser(wxOpenId) {
    const result = userModel.insertMany({
        wxOpenId
    });
    return result;
}

// 查询用户信息
async function findUser(wxOpenId) {
    let result = await userModel.findOne({wxOpenId});
    return result;
}

//查询用户的账户信息
async function getBalance(wxOpenId) {
    let result = await userModel.findOne({wxOpenId});
    return result.balance;
}

//扣除用户账户金额
async function deductBalance(wxOpenId) {
    await userModel.findOneAndUpdate({wxOpenId}, {$inc: {balance: -1}})
}

//切换模式
async function changeModel(wxOpenId, model) {
    await userModel.findOneAndUpdate({wxOpenId}, {model});
}

//账户充值
async function recharge(wxOpenId, amount) {
    await userModel.findOneAndUpdate({wxOpenId}, {$inc: {balance: amount}});
}


module.exports = {
    createUser, findUser, getBalance, deductBalance, changeModel, recharge
}

const {Configuration, OpenAIApi} = require('openai')

const apiKey = ''

const configuration = new Configuration({
    apiKey
})

const openAIApi = new OpenAIApi(configuration)

// 处理给ChatGPT的数据
const promps = {};

function savePropmt(fromusername, content) {
    if (promps[fromusername]) {
        promps[fromusername].push({
            role: 'user', content
        })
    }else{
        promps[fromusername] =[
            {
                role: 'user',
                content
            }
        ]
    }
    return promps[fromusername];

}

//返回答案
async function getCompletions(fromusername, content) {
    const messages =savePropmt(fromusername, content);
    const completion = await openAIApi.createChatCompletion({
        "model": "gpt-3.5-turbo",
        messages,
        "temperature": 0.7
    })
    console.log(completion)
    return completion.data.choices[0].message.content;
}

module.exports = getCompletions

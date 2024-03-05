const mongoose = require('mongoose')

const dburl = `mongodb+srv://<username>:<password>@cluster0.chaxpgl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })

var db = mongoose.connection

db.on('error',()=>{
    console.log("数据库连接失败")
})

db.once('open', function() {
    console.log('数据库连接成功')
})

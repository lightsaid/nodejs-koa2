const Sequelize = require('sequelize')
const {
    dbName,
    host,
    port,
    user,
    password
} = require('../config/config').database

const sequelize = new Sequelize(dbName,user,password,{
    dialect:'mysql',
    host,
    port,
    logging: true, // 是否在控制台打印执行的sql语句
    timezone:'+8:00', // 设置东八区(北京时间)
    define:{

    }
})


module.exports = {
    sequelize
}
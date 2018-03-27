const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_react_db');

const User = conn.define('user', {
    name: Sequelize.STRING,
    score: Sequelize.INTEGER
})

const sync = () => {
    return conn.sync({ force: true })
}

const seed = () => {
    return Promise.all([
        User.create({ name: 'elephant', score: 10 }),
        User.create({ name: 'zebra', score: 5 }),
        User.create({ name: 'cheetah', score: 2 })
    ])
}

module.exports = {
    sync,
    seed,
    models: {
        User
    }
}
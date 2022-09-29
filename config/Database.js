import Sequelize from "sequelize";

const db = new Sequelize('detail_product', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

export default db; 
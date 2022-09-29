import Sequalize from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequalize;

const Product = db.define('product', {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    review: DataTypes.STRING,
    price: DataTypes.STRING,
    desc: DataTypes.STRING,
    filosofi: DataTypes.STRING
},{
    freezeTableName: 'true'
});

export default Product;

(async()=>{
    await db.sync();
})();
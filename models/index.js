// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Importing sequalize datatypes here so the datatypes can be defined when stating the belong to many assocations for the through model
const { DataTypes } = require('sequelize');

Product.belongsTo(Category, { foreignKey: 'category_id' });

Category.hasMany(Product, { foreignKey: 'category_id' });

// Creating foreign key here instead of the ProductTag.js file in order to avoid redundant unique keys
Product.belongsToMany(Tag, { through: ProductTag, foreignKey: { name: 'product_id', type: DataTypes.INTEGER } });

// Creating foreign key here instead of the ProductTag.js file in order to avoid redundant unique keys
Tag.belongsToMany(Product, { through: ProductTag, foreignKey: { name: 'tag_id', type: DataTypes.INTEGER } });

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
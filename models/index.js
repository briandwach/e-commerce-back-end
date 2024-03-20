// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Importing sequalize datatypes here so the datatypes can be defined when stating the belong to many assocations for the through model
const { DataTypes } = require('sequelize');


// Products belongsTo Category
Product.belongsTo(Category, { foreignKey: 'category_id' });

// Categories have many Products
Category.hasMany(Product, { foreignKey: 'category_id' });

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, { through: ProductTag, foreignKey: { name: 'product_id', type: DataTypes.INTEGER } });

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, { through: ProductTag, foreignKey: { name: 'tag_id', type: DataTypes.INTEGER } });

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
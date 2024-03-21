const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Request to view all categories and related product data
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
      order: [['id', 'ASC']]
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Request to view a specific category referenced by ID and related product data
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findOne({
      where: { id: req.params.id },
      include: [{ model: Product }],
      order: [['id', 'ASC']]
    });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Request to create a new category
router.post('/', async (req, res) => {
  try {
    const addCategory = await Category.create(req.body);
    res.status(200).json(addCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Request to update a category referenced by its ID
router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update(
      { category_name: req.body.category_name },
      { where: { id: req.params.id } });

    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Request to delete a category referenced by its ID
router.delete('/:id', async (req, res) => {
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
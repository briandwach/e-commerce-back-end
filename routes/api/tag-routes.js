const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Request to view all tag entries including related product data
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product }],
      order: [['id', 'ASC']]
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Request to view a specific tag reference by ID including related product data
router.get('/:id', async (req, res) => {
  try {
    const tagOne = await Tag.findOne({
      where: { id: req.params.id },
      include: [{ model: Product }],
      order: [['id', 'ASC']]
    });
    res.status(200).json(tagOne);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Request to create a new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Request to update a tag's information referencing it by ID
router.put('/:id', async (req, res) => {
  try {
    const updateTag = await Tag.update(
      { tag_name: req.body.tag_name },
      { where: { id: req.params.id } });

    res.status(200).json(updateTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Request to delete a tag referenced by its ID
router.delete('/:id', async (req, res) => {
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    res.status(200).json(deleteTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
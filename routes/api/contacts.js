const express = require('express');
const router = express.Router();
const model = require('../../model');

router.get('/', async (req, res, next) => {
  const list = await model.listContacts();
  res.json({ message: 'get contacts success', data: list });

  next();
});

router.get('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  const getOneContact = await model.getContactById(+id);

  res.json({ message: 'get ID success', data: getOneContact });

  // next();
});

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;

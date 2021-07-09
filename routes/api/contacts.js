const express = require('express');
const router = express.Router();
const model = require('../../model');
const contactsSchema = require('../../utils/schema');

router.get('/', async (req, res, next) => {
  try {
    const list = await model.listContacts();
    res.status(200).json({ message: 'get contacts success', data: list });
  } catch (error) {
    error.message = 'Cannot get data';
  }
});

router.get('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  try {
    const getOneContact = await model.getContactById(id);
    if (!getOneContact) {
      return res.status(404).json({ message: 'Id not found' });
    }
    res.status(200).json({ message: 'get ID success', data: getOneContact });
  } catch (error) {
    error.message = 'Cannot get ID';
  }
});

router.post('/', async (req, res, next) => {
  const { error } = contactsSchema.validate(req.body);
  try {
    await model.addContact(req.body);

    if (error) {
      return res.status(400).json({ message: 'missing required name field' });
    }

    res
      .status(201)
      .json({ message: `add ${req.body.name} success`, data: req.body });
  } catch (error) {
    error.message = 'Cannot post data';
  }
});

router.delete('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  try {
    const deletedContact = await model.removeContact(id);
    return deletedContact
      ? res.status(200).json({ message: `remove id ${id} success` })
      : res.status(404).json({ message: 'ID not found' });
  } catch (error) {
    error.message = 'Cannot delete data';
  }
});

router.patch('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;

  const body = req.body;

  const { error } = contactsSchema.validate(body);

  try {
    if (error) {
      return res.status(400).json({ message: 'missing fields' });
    }

    const updated = await model.updateContact(id, body);

    return updated === -1
      ? res.status(404).json({ message: 'Incorrect ID' })
      : res.status(200).json({ message: 'Update success', data: { body } });
  } catch (error) {
    error.message = 'Cannot update data';
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const model = require('../../model');

router.get('/', async (req, res, next) => {
  try {
    const list = await model.listContacts();
    res.json({ message: 'get contacts success', data: list });
  } catch (error) {
    error.message = 'Cannot get data';
  }
});

router.get('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  try {
    const getOneContact = await model.getContactById(+id);
    if (!getOneContact) {
      return res.status(404).json({ message: 'Id not found' });
    }
    res.status(200).json({ message: 'get ID success', data: getOneContact });
  } catch (error) {
    error.message = 'Cannot get ID';
  }
});

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;
  const body = {
    name,
    email,
    phone,
  };
  try {
    await model.addContact(body);

    if (!body.name || !body.email || !body.phone) {
      return res.status(400).json({ message: 'missing required name field' });
    }

    res
      .status(201)
      .json({ message: `add ${body.name} success`, data: req.body });
  } catch (error) {
    error.message = 'Cannot post data';
  }
});

router.delete('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  try {
    const newList = await model.removeContact(+id);
    // if (newList.includes(id)) {
    //   return res.status(404).json({ message: 'Not found contact' });
    // }
    return res.status(200).json({ message: `remove id ${id} success` });
  } catch (error) {
    error.message = 'Cannot delete data';
  }
});

router.patch('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  const body = req.body;
  try {
    const updated = await model.updateContact(+id, body);
    // console.log(body);
    // if (body === {}) {
    //   return res.status(400).json({ message: 'missing fields' });
    // }
    res.json({ message: 'Update success', data: body });
  } catch (error) {
    error.message = 'Cannot update data';
  }
});

module.exports = router;

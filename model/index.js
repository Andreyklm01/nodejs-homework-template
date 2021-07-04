const fs = require('fs/promises');
// const contacts = require('./contacts.json');
const path = require('path');
const contactsPath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  try {
    const getFile = await fs.readFile(contactsPath);
    const parsed = JSON.parse(getFile);
    return parsed;
  } catch (error) {
    throw error;
  }
};

const getContactById = async contactId => {
  try {
    const getAll = await fs.readFile(contactsPath);
    const parsed = JSON.parse(getAll);
    const getId = parsed.filter(item => item.id === contactId);

    // if (!getId) {
    //   console.log('not Found');
    // }
    return getId;
  } catch (error) {
    throw error;
  }
};

const removeContact = async contactId => {};

const addContact = async body => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

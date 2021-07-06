const fs = require('fs/promises');
const path = require('path');
const contactsPath = path.join(__dirname, './contacts.json');
const { v4 } = require('uuid');

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
    const getAll = await listContacts();
    return getAll.find(item => item.id === contactId);
  } catch (error) {
    throw error;
  }
};

const fileUpdator = data => {
  try {
    const string = JSON.stringify(data);
    return fs.writeFile(contactsPath, string);
  } catch (error) {
    throw error;
  }
};

const removeContact = async contactId => {
  try {
    const getAll = await listContacts();
    const getContacts = getAll.filter(item => item.id !== contactId);

    await fileUpdator(getContacts);
  } catch (error) {
    throw error;
  }
};

const addContact = async body => {
  try {
    const contacts = await listContacts();
    const newContact = { id: v4(), ...body };
    const addContacts = [...contacts, newContact];
    await fileUpdator(addContacts);
  } catch (error) {
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) return index;

    contacts[index] = { ...contacts[index], ...body };
    await fileUpdator(contacts);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

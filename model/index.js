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
    const contacts = await listContacts();
    return contacts.find(item => item.id === contactId);
  } catch (error) {
    throw error;
  }
};

const fileUpdater = data => {
  try {
    const string = JSON.stringify(data);
    return fs.writeFile(contactsPath, string);
  } catch (error) {
    throw error;
  }
};

const removeContact = async contactId => {
  try {
    const getAllContacts = await listContacts();
    const getContacts = getAllContacts.filter(item => item.id !== contactId);
    const contact = getAllContacts.find(item => item.id === contactId);
    await fileUpdater(getContacts);
    return contact;
  } catch (error) {
    throw error;
  }
};

const addContact = async body => {
  try {
    const contacts = await listContacts();
    const newContact = { id: v4(), ...body };
    const addToContacts = [...contacts, newContact];
    await fileUpdater(addToContacts);
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
    await fileUpdater(contacts);

    return contacts[index];
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

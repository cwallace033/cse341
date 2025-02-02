
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getData = async (req, res, next) => {
  // console.log('getData');
  const result = await mongodb.getDb().db().collection('contacts').find();
  // console.log(result);
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};


const getDataById = async (req, res, next) => {
  // console.log('getDataById');
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').findOne({ _id: userId });
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    
};

const createData = async (req, res, next) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const newContact = {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
    };

    const result = await mongodb.getDb().db().collection('contacts').insertOne(newContact);

    if (result.acknowledged) {
      return res.status(201).json({ id: result.insertedId });
    } else {
      return res.status(500).json({ message: 'Failed to create contact' });
    }

  } catch (error) {
    console.error('Error creating contact', error);
    return res.status(500).json({ message: 'Failed to create contact' });
  };
};

const updateData = async (req, res, next) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName && !lastName && !email && !favoriteColor && !birthday) {
      return res.status(400).json({ message: 'Please provide at least one field to update' });
    }

    const updateInfo = {}
    if (firstName) updateInfo.firstName = firstName;
    if (lastName) updateInfo.lastName = lastName;
    if (email) updateInfo.email = email;
    if (favoriteColor) updateInfo.favoriteColor = favoriteColor;
    if (birthday) updateInfo.birthday = birthday;

    const result = await mongodb.getDb().db().collection('contacts').updateOne(
      { _id: contactId },
      { $set: updateInfo }
    );

    if (result.matchedCount === 1) {
      return res.status(204).json({ message: 'Contact updated' });
    } else {
      return res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    console.error('Error updating contact', error);
    return res.status(500).json({ message: 'Failed to update contact' });
  }
};

const deleteData = async (req, res, next) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const result = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: contactId });

    if (result.deletedCount === 1) {
      return res.status(204).json({ message: 'Contact deleted' });
    } else {
      return res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    console.error('Error deleting contact', error);
    return res.status(500).json({ message: 'Failed to delete contact' });
  }
}

module.exports = { getData, getDataById, createData, updateData, deleteData };

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

module.exports = { getData, getDataById };
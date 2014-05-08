'use strict';

var Mongo = require('mongodb');

exports.index = (req, res)=>{
  var chimeras = global.nss.db.collection('chimeras');

  chimeras.find().toArray((err, records)=>{
    res.render('chimeras/index', {chimeras: records, bg: 'bg3.jpg', title: 'Chimeras'});
  });
};

exports.show = (req, res)=>{
  var chimeras = global.nss.db.collection('chimeras');
  var _id = Mongo.ObjectID(req.params.id);

  chimeras.findOne({_id:_id}, (err, record)=>{
    res.render('chimeras/show', {chimera: record, bg: 'bg3.jpg', title: 'Feature Creature'});
  });
};

exports.new = (req, res)=>{
  res.render('chimeras/new', {bg: 'bg1.jpg', title: 'New Monster'});
};

exports.create = (req, res)=>{
  var head;
  var body;
  var bottom;

  switch(req.body.head){
  case 'Medusa':
    head = 'medusahead.png';
    break;
  case 'Cyclops':
    head = 'cyclopshead.png';
    break;
  case 'Minotaur':
    head = 'minotaurhead.png';
    break;
  case 'Satyr':
    head = 'satyrhead.png';
    break;
  }

  switch(req.body.body){
  case 'Medusa':
    body = 'medusabody.png';
    break;
  case 'Cyclops':
    body = 'cyclopsbody.png';
    break;
  case 'Minotaur':
    body = 'minotaurbody.png';
    break;
  case 'Satyr':
    body = 'satyrbody.png';
    break;
  }

  switch(req.body.bottom){
  case 'Medusa':
    bottom = 'medusabottom.png';
    break;
  case 'Cyclops':
    bottom = 'cyclopsbottom.png';
    break;
  case 'Minotaur':
    bottom = 'minotaurbottom.png';
    break;
  case 'Satyr':
    bottom = 'satyrbottom.png';
    break;
  }

  req.body.head = head;
  req.body.body = body;
  req.body.bottom = bottom;
  var chimeras = global.nss.db.collection('chimeras');
  chimeras.save(req.body, (err, obj)=>{
    res.redirect(`/chimeras/${obj._id}`);
  });
};

exports.destroy = (req, res)=>{
  var chimeras = global.nss.db.collection('chimeras');
  var _id = Mongo.ObjectID(req.params.id);
  chimeras.findAndRemove({_id:_id}, (err, record)=>{
    res.redirect('/chimeras');
  });
};

exports.sort = (req, res)=>{
  var x = {};
  var chimeras = global.nss.db.collection('chimeras');
  x[req.query.position] = req.query.creature+req.query.position + '.png';
  chimeras.find(x).toArray((err, records)=>{
    res.render('chimeras/sort', {chimeras: records, bg: 'bg2.jpg', title: 'Found Creatures'});
  });
};

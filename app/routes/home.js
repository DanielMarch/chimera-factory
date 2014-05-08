'use strict';

exports.index = (req, res)=>{
  res.render('home/index', {bg: 'bg1.jpg', title: 'Chimera Factory'});
};

exports.about = (req, res)=>{
  res.render('home/about', {bg: 'bg2.jpg', title: 'About Chimera Factory'});
};

exports.help = (req, res)=>{
  res.render('home/help', {title: 'Node.js: Help'});
};

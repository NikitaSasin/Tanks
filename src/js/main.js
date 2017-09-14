//= map
//= tank
//= keys

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var map = new Map(canvas, context);
var tank = new Tank(canvas, context);
var keys = new Keys(canvas, context);

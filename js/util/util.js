/*jshint esversion: 9 */


const sleep = ms => new Promise(r => setTimeout(r, ms));

const capitalize = text => text.charAt(0).toUpperCase() + text.slice(1);
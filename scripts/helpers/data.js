var request = require('sync-request');
var fs = require('fs-extra');
var gsjson = require('google-spreadsheet-to-json');
var deasync = require('deasync');
var config = require('../config.json');
var userHome = require('user-home');
var keys = require(userHome + '/.gu/interactives.json');

var json,
    data = {};

function fetchData(callback) {
    gsjson({
        spreadsheetId: config.data.id,
        allWorksheets: true,
        credentials: keys.google
    })
    .then(function(result) {
        callback(result);
    })
    .then(function(err) {
        if (err) {
            console.log(err);
        }
    });
}

function setSheetNames(data) {
    data = {
        'states': data[0]
    }

    return data;
}

function cleanStates(data) {
    for (var state in data.states) {
        delete data.states[state].fullState;
        data[data.states[state].state] = {};
        data[data.states[state].state] = data.states[state];
        delete data[data.states[state].state].state;
    }

    delete data.states;

    return data;
}

module.exports = function getData() {
    var isDone = false;

    fetchData(function(result) {
        data = result;
        data = setSheetNames(data);
        data = cleanStates(data);

        isDone = true;
    });

    deasync.loopWhile(function() {
        return !isDone;
    });

    fs.mkdirsSync('.data');
    fs.writeFileSync('.data/data.json', JSON.stringify(data));

    return data;
};
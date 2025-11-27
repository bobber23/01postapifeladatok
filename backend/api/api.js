const express = require('express');
const router = express.Router();
const database = require('../sql/database.js');
const fs = require('fs/promises');

//!Multer
const multer = require('multer'); //?npm install multer
const path = require('path');
const { request } = require('http');

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, path.join(__dirname, '../uploads'));
    },
    filename: (request, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname); //?egyedi név: dátum - file eredeti neve
    }
});

const upload = multer({ storage });

//!Endpoints:
//?GET /api/test
router.get('/test', (request, response) => {
    response.status(200).json({
        message: 'Ez a végpont működik.'
    });
});

//?GET /api/testsql
router.get('/testsql', async (request, response) => {
    try {
        const selectall = await database.selectall();
        response.status(200).json({
            message: 'Ez a végpont működik.',
            results: selectall
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

//?POST /api/sendMessage
let feladatArray = [];
router.post('/sendMessage', (request, response) => {
    try {
        const sender = request.body.sender;
        const message = request.body.message;

        feladatArray.push({ sender: sender, message: message });
        console.log(feladatArray);
        response.status(200).json({
            message: 'Üzenet fogadva.'
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

//?POST /api/saveData
let nevnapArray = [];
router.post('/saveData', (request, response) => {
    try {
        const inputData = request.body;

        nevnapArray.push(inputData);
        console.log(nevnapArray);
        response.status(200).json({
            message: 'Sikeres mentés'
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

//?GET/POST /api/names
let namesArray = [];
router.get('/names', (request, response) => {
    try {
        const names = request.body;

        response.status(200).json({
            message: 'Adat sikeresen elmentve',
            name: namesArray
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

router.post('/names', (request, response) => {
    try {
        const names = request.body;
        
        namesArray.push(names);

        response.status(200).json({
            message: 'Adat sikeresen elmentve',
            name: namesArray
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

//?POST /api/vote
let vote = [{option1: 0, option2: 0}];
router.post('/vote', (request, response) => {
    try {
        response.status(200).json({
            option1: vote[0].option1,
            option2: vote[0].option2
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});


module.exports = router;

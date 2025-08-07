const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage });

const DATA_FILE = '../src/Data/audio.json';

app.post('/upload', upload.single('audio'), (req, res) => {

    if (!fs.existsSync(DATA_FILE))  return res.status(404).json({error: "JSON file not found"});

    const content = fs.readFileSync(DATA_FILE, 'utf8');
    let data = JSON.parse(content);

    const trigger = req.body.trigger;
    const file = req.file.originalname;
    const ip = req.body.ip;

    if (!trigger || !file) return res.status(400).send('No file received');

    const dupeCheck = data.some(entry => entry.trigger === trigger && entry.ip === ip);
    data = data.filter(entry => !(entry.trigger === trigger && entry.ip === ip));

    const newEntry = {
    trigger: trigger,
    ip: ip,
    filepath: file,
    };

    data.push(newEntry);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 4));

    if (dupeCheck) return res.status(200).send('File uploaded, duplicate trigger overridden'); 
    else return res.status(200).send('File uploaded');

});

app.delete("/delete", (req, res) => {

    const {trigger, filepath, ip} = req.body;

    try {
        if (!fs.existsSync(DATA_FILE))  return res.status(404).json({error: "JSON file not found"});

        const content = fs.readFileSync(DATA_FILE, 'utf8');
        let data = JSON.parse(content);
        data = data.filter(entry => !(entry.trigger === trigger && entry.filepath === filepath && entry.ip === ip));

        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 4));

        return res.json({ success: true });
    }

    catch (err) {
        console.error(err);
        res.status(500).json({error: "Server error"})
    }
});

app.listen(3001, '0.0.0.0'); 
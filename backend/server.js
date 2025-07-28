const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(cors());

const upload = multer({ dest: 'uploads/' });

const DATA_FILE = '../src/Data/audio.json';
let uploadData = [];

if (fs.existsSync(DATA_FILE)) uploadData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

app.post('/upload', upload.single('audio'), (req, res) => {

    const trigger = req.body.trigger;
    const file = req.file;

    if (!trigger || !file) return res.status(400).send('No file received');

    const newEntry = {
    trigger: trigger,
    filename: file.filename,
    filepath: file.originalname,
    };

    uploadData.push(newEntry);

    fs.writeFileSync(DATA_FILE, JSON.stringify(uploadData, null, 4));
    res.status(200).send('File uploaded');

});

app.delete("/delete", (req, res) => {

    const {trigger, filepath} = req.body;

    try {
        if (!fs.existsSync(DATA_FILE))  return res.status(404).json({error: "JSON file not found"});

        const content = fs.readFileSync(DATA_FILE, 'utf8');
        let data = JSON.parse(content);
        data = data.filter(entry => !(entry.trigger === trigger && entry.filepath === filepath));

        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 4));

        return res.json({ success: true });
    }

    catch (err) {
        console.error(err);
        res.status(500).json({error: "Server error"})
    }
});

app.listen(3001, '0.0.0.0'); 
const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();

const PLACEHOLDER = "<!@#$%^&*()*&^%$#@!>";
const CONTENT_DIR = path.join(__dirname , "depo");
app.use(express.static(path.join(__dirname , "aside")));



app.get('/:id', (req, res) => {
    const { id } = req.params;

    if (!/^[\w.-]+$/.test(id) || id.includes('..')) {
        return res.status(400).send('Invalid id');
    }

    let html = fs.readFileSync(path.join(__dirname, "index.html"), 'utf-8');
    const wantedPath = path.join(CONTENT_DIR, id);

    if (!wantedPath.startsWith(__dirname + path.sep)) {
        return res.status(400).send('Invalid path');
    }

    if (fs.existsSync(wantedPath)) {
        const fragment = fs.readFileSync(wantedPath, 'utf-8');
        html = html.replace(PLACEHOLDER, fragment);      
    } else {
        fs.writeFileSync(wantedPath, '', 'utf-8');    
        html = "";
    }

    res.send(html);
});
app.listen(3000, () => console.log('🚀 :3000'));




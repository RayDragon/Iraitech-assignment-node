const express = require('express');
const cors  = require('cors');
const fs = require('fs');
app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

let X = {}; 

try {
    X = JSON.parse(fs.readFileSync('output.json'));
    console.log(X);
} catch (error) {
    
}

app.get('', (req, res)=>{
    res.send(X);
});



async function save() {
    try{
        fs.writeFileSync('output.json', JSON.stringify(X));
        return true;
    } catch {
        return false;
    }
}

app.post('/sol2-x', async (req, res)=>{
    if(req.body.name in X) return res.send({error: true, message: "Another X with same name exists", value: X});
    if(req.body.previousValue in X ){
            X[req.body.name] = X[req.body.previousValue];
            delete X[req.body.previousValue];
    } else X[req.body.name] = [];
    let result = await save();
    if(result)
    return res.send(X);
    else res.send({error: true, message: "error writing the file"});
});

app.post('/sol2-y', async (req, res)=>{
    // x value
    // y value
    let {x, y} = req.body;
    if(! req.body.x in X)  {
        return res.send({error: true, message: "No such X found"});
    } else {
        console.log(X);
        X[String(x)].push(y);

        let result = await save();
    if(result)
    return res.send(X);
    else res.send({error: true, message: "error writing the file"});
        return res.send(X);
    }
});



app.listen(process.env.PORT | 8002, ()=>{
    console.log("App started");
})
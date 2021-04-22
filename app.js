const fs = require('fs');
const express = require('express');
const { response } = require('express');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// load colours data
let rawdata = fs.readFileSync('data/data.json');
colours = JSON.parse(rawdata);
// console.log(colours);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/colours', (req, res) => {
    res.json(colours);
});

app.get('/colours/:id', (req, res) => {
    let currColour = colours.filter(function(colour){
        if(colour.colorId == req.params.id){
           return true;
        }
    });
    
    if(currColour.length == 1){
        res.send(currColour);
     } else {
        res.status(404).send('The colour with the given ID was not found.');
     }
});

app.post('/colours', (req, res) => {
    let newId = colours[colours.length-1].colorId+1;
    let newColour = {
        colorId: newId,
        hexString: req.body.hexString,
        rgb: req.body.rgb,
        hsl: req.body.hsl,
        name: req.body.name
    };
    colours.push(newColour);

    // save to file
    let data = JSON.stringify(colours);
    fs.writeFileSync('data/data.json', data);
    
    res.send(newColour);
});

app.put('/colours/:id', (req, res) => {
    
    // gets index of colour with given id
    // let updateIndex = colours.map(function(colour){
    //     console.log(colour.colorId);
    //     return colour.colorId;
    // }).indexOf(parseInt(req.params.id));

    let updateIndex = -1;
    updateIndex = colours.findIndex(colour => colour.colorId==req.params.id);
    
    if(updateIndex === -1){
        // colour not found, create new
        let newColour = {
            colorId: req.params.id,
            hexString: req.body.hexString,
            rgb: req.body.rgb,
            hsl: req.body.hsl,
            name: req.body.name
        };

        colours.push(newColour);

        // save to file
        let data = JSON.stringify(colours);
        fs.writeFileSync('data/data.json', data)

        res.send(newColour);
    } else {
        // update existing colour
        colours[updateIndex] = {
            colorId: req.params.id,
            hexString: req.body.hexString,
            rgb: req.body.rgb,
            hsl: req.body.hsl,
            name: req.body.name
        };
        // save to file
        let data = JSON.stringify(colours);
        fs.writeFileSync('data/data.json', data)

        res.send(colours[updateIndex]);
    }
});

app.delete('/colours/:id', (req, res) => {

    let removeIndex = colours.map(function(colour){
        return colour.colorId;
    }).indexOf(parseInt(req.params.id));

    if(removeIndex === -1){
        res.status(404).send('The colour with the given ID was not found.');
    } else {
        colours.splice(removeIndex, 1);

        // save to file
        let data = JSON.stringify(colours);
        fs.writeFileSync('data/data.json', data)

        res.send({message: "Colour ID " + req.params.id + " removed."});
    }

})

app.delete('/colours', (req, res) => {
    res.status(400).send('DELETE should specify which resource it is working on');
})

app.put('/colours', (req, res) => {
    res.status(400).send('PUT should specify which resource it is working on');
})

app.listen(8080, () => console.log('Listening on port 8080...'));
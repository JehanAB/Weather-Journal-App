let projectData ={};

const express = require('express');

const app = express();
const port = 8008;
//parse the json files comong from the client side.......
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static("website"));

const cors = require('cors'); 

app.use(cors());

app.post("/add", async function(req, res){
    const body = await req.body;
    projectData = body;
    res.send(projectData);
});

app.get("/all", async (req, res) => {
    console.log(projectData);
    res.send(projectData);
});

app.listen(port, function(){console.log('listening on port' + "" +  port); });



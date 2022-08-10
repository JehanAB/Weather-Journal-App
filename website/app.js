const generate = document.querySelector("#generate");
const zip = document.querySelector("#zip");
const feelings = document.querySelector("#feelings");
const feeling = document.querySelector(".feelings");
const temp = document.querySelector("#temp");
const dateNow = document.querySelector("#dateNow");
const d = new Date();
const date = d.toDateString();
const example = "api.openweathermap.org/data/2.5/weather?zip={zip code}&appid={API key}";
const baseURI = "https://api.openweathermap.org/data/2.5/weather?zip="
const key = "&appid=32ac1dac8a5a922b06bf7c3e27a03f00&units=imperial";


generate.addEventListener("click", (event)=> {
    event.preventDefault();
    const madeURI = `${baseURI}${zip.value}${key}`;
    getData(madeURI)
    .then((data)=> {
        cureData(data)
        .then((info)=> {
            postData("/add" , info)
            .then((data) => {
                retreiveData("/all")
                .then((data) => {
                    updateUI(data);
                });
            });
        });
    });
});


const getData = async (url) => {
    try{
        const result = await fetch(url);
        const data = await result.json();
        if(data.cod == 200){
            return data;
        }else{
            console.log(data.message);
            return data;
        }  
    }catch(e){
        console.log(e);
    }
};


const cureData = async (data)=>{
   try{
    if(data.message){
        return data;
    }else{
    const info = {
        date,
        feelings: feelings.value,
        temp: data.main.temp
    };
    return info;
    }
      }catch(err){
        console.error(err);
      }
};


const postData = async (url='', data={})=>{
    const result = await fetch(url, {
        method: 'POST',
        credentials:"same-origin",
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data),
    });
    try {
        const response = await result.json();
        return response;
    }catch(err) {
        console.error(err);
    }
};



const retreiveData = async (url) => {
    const data = await fetch(url);
    try {
        const response = await data.json();
        return response;
    }catch(err){
        console.error(err);
    }
};

const updateUI = async (data) => {
    const response = await data;
    if(response.date){
        document.querySelector(".output").style.display = "block";
        dateNow.innerHTML = response.date;
        temp.innerHTML = response.temp;
        feeling.innerHTML = response.feelings? response.feelings: "what do you feel?!!";
        document.querySelector("#error").style.display = "none";

    }else{
        document.querySelector(".output").style.display = "none";

        document.querySelector("#error").style.display = "block";
        document.querySelector('#error').innerHTML = response.message;
    }
    
};
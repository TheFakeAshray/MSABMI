var submit3 = $("#my-submit-button");
var pageheader = $("#page-header")[0];


pageheader.innerHTML = "Please Enter Your Details";

function start(){
    // weight, height, sex, waist, hip
    var Weight = document.getElementById('Weight').value + '';
    var Height = document.getElementById('Height').value + '';
    var Sex = document.getElementById('Sex').value + '';
    var Age = document.getElementById('Age').value + '';
    var Waist = document.getElementById('Waist').value + '';
    var Hip = document.getElementById('Hip').value + '';

    sendRequest(Weight, Height, Sex, Age, Waist, Hip, function(bmiscores){
        currentBMI = getbmi(bmiscores);
        changeUI();
    });
}
function getbmi(bmiscores){
    var currentBMI;
    currentBMI = new Beemi(bmiscores.value, bmiscores.status, bmiscores.risk, bmiscores.prime);
    return currentBMI;
}

function changeUI(){
    pageheader.innerHTML = "Your BMI is: " + currentBMI.value + "\n Your status is: "+currentBMI.status + "\n Your risk is: "+ currentBMI.risk;

}

// var BMI = (function(){
    function Beemi(value, status, risk, prime){
        this.value =value;
        this.status = status;
        this.risk = risk;
        this.prime = prime;
    }
    
// })

function sendRequest(Weight, Height, Sex, Age, Waist, Hip, callback){
    $.ajax({
        url: "https://bmi.p.mashape.com/",
        headers: {"X-Mashape-Key": "cBgMIhx5LXmshpZvHQbkIcHLsj2jp1fznVijsnUqp1nCtFICSf", "Content-Type":"application/json", "Accept": "application/json"},
        // beforesend: function(xhrObj){
        //     xhrObj.setRequestHeader('X-Mashape-Key', "cBgMIhx5LXmshpZvHQbkIcHLsj2jp1fznVijsnUqp1nCtFICSf");
        //     xhrObj.setRequestHeader('Content-Type", "application/json"');
        //     xhrObj.setRequestHeader('"Accept", "application/json"');
        // },
        type:"POST",
        data: JSON.stringify({"weight":{"value":Weight,"unit":"kg"},"height":{"value":Height,"unit":"cm"},"sex":Sex,"age":Age,"waist":Waist,"hip":Hip}),
        // processData: false
    })
        .done(function(data){
            if (data.length != 0){
                var bmi = data.bmi;
                callback(bmi)
            }
        })
        .fail(function(error){
            pageheader.innerHTML = "Ya something dun goofed soz";
            console.log(error.getAllResponseHeaders());
        })
}
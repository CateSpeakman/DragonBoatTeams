"use strict";
//Description:  this script will run the add team page
//Author:Cate Speakman

$(function () {


    $("#cancelBtn").prop("href", "search.html");


    //this function will call the JSON file and populate the dropdown for the leagues based on the call to 
    //restful API

    let objs;
    $.getJSON("/api/leagues", function (leagues) {

        objs = leagues;

        for (let i = 0; i < objs.length; i++) {

            //put league type into ddl

            let option = document.createElement("option");
            option.text = objs[i].Name;
            option.value = objs[i].Code;

            $("#leagueList").append(option);

            
        };//end of the for loop for populating dropdown of leagues

    })//ends Json function

   
    const allInputTextFields =
        document.querySelectorAll("input[type='text'], input[type='email'], input[type='tel']");

    //this will make all fields have a beige background when user is in text box
    for (let i = 0; i < allInputTextFields.length; i++) {
        allInputTextFields[i].onfocus = function () {
            this.style.backgroundColor = "beige";
        };

        allInputTextFields[i].onblur = function () {
            this.style.backgroundColor = "";
        };

    }//ends for loop


    //this onclick function will trigger form validation and will post the new team to be added provided
    //the form passes validation 

    $("#submitBtn").on("click", function () {

        let isValid = formValidation();
        
        if (isValid == false) {
            return false;
        }
       
        $.post("/api/teams", $("#addTeamForm").serialize(), function (data) {
            data = JSON.parse(data);
            window.location.href = "teamDetails.html?teamid=" + data.TeamId;;
            
        });

        return false;

    });//ends on click function for submit button


})//ends ready function

//this function will perform the form validation

function formValidation() {

    $("#errorMessages").empty();

    let errMsg = [];

    if ($("#teamname").val().trim() == "") {
        errMsg[errMsg.length] = "Team Name is required";
    }

    if ($("#managername").val().trim() == "") {
        errMsg[errMsg.length] = "Manager Name is required";
    }

    if ($("#managerphone").val().trim() == "") {
        errMsg[errMsg.length] = "Manager Phone is required";
    }


    let emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    let email = $("#manageremail").val();


    if (emailPattern.test(email) == false) {
        errMsg[errMsg.length] = "Valid email address is required";
    }//ends if statement for email validation


    if ($("#maxteammembers").val().trim() == "") {
        errMsg[errMsg.length] = "Maximum # Team Members is required";
    }

    
    if (errMsg.length == 0) {
        return true;
    }
    else {
        for (let i = 0; i < errMsg.length; i++) {
            $("<li>" + errMsg[i] + "</li>").appendTo($("#errorMessages"));
        }
        return false;
    }
}//ends on validation function


//this function will populate the minimum age, maximum age and team gender based on the league chosen
$("#leagueList").on("change", ()=> {

    let obj;

    let leaguecode =$('#leagueList').val();

    $.getJSON("/api/leagues/" + leaguecode, function (league) {
        obj = league;

        $("#minmemberage").val(obj.MinAge)
                        .attr("readonly", true);
        $("#maxmemberage").val(obj.MaxAge)
                        .attr("readonly", true);
        $("input[name='teamgender'][value='" + obj.Gender + "']").prop("checked", true)

    })//ends JSON function to find league and insert league requirements

});//ends on change function for league list 
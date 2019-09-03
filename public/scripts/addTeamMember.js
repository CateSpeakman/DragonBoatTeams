"use strict";

//Description: This script will add a member to team  based on team being viewed by user on the previous page.
//This information will be posted from a restful API server. 
//Author:Cate Speakman



//this function is the ready function for jQuery that executes as the page loads
$(function () {

    let urlParams = new URLSearchParams(location.search);
    let id = urlParams.get("teamid");


    $("#cancelBtn").prop("href", "teamDetails.html?teamid=" + id);


    let obj;

     $.getJSON("/api/teams/" + id, function (team) {
        obj = team;

        $("#teamName").val(obj.TeamName);


        $.getJSON("/api/leagues/" + obj.League, function(league){
            obj = league;
            $("#league").val(obj.Name);
        })//ends JSON function to find the team name and insert into form

    })//ends JSON function to find team name and insert into form 
            
    const allInputTextFields = document.querySelectorAll("input[type='text'], input[type='email']");

    //this will make all fields have a beige background when user is in text box
    for (let i = 0; i < allInputTextFields.length; i++) {
        allInputTextFields[i].onfocus = function () {
            this.style.backgroundColor = "beige";
        };

        allInputTextFields[i].onblur = function () {
            this.style.backgroundColor = "";
        };

    }
   //this posts the new team member information to the server
    $("#saveBtn").on("click", function () {


        let isValid = formValidation();

        if(isValid == false)
        {
            return;
        }
       
        $.post("/api/teams/" + id + "/members", $("#registerForm").serialize(), function (data) {
            window.location.href = "teamDetails.html?teamid=" + id;
            alert("register successful");
        });

        return false;
    });//end of on click
});//end of ready function

function formValidation() {

    $("#errorMessages").empty();

    let emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    let email = $("#email").val();
    let errMsg = [];

    if ($("#memberName").val().trim() == "") {
        errMsg[errMsg.length] = "Member Name is required";
    }//ends if statement for membername validation

    if ($("#contactName").val().trim() == "") {
        errMsg[errMsg.length] = "Contact Name is required";
    }//ends if statement for contactname validation


    if (emailPattern.test(email) == false) {
        errMsg[errMsg.length] = "Valid email address is required";
    }//ends if statement for email validation


    if ($("#age").val().trim() == "") {
        errMsg[errMsg.length] = "Age is required";
    }//ends if statement for age validation

    // if ($("#gender").val().trim() == "") {
    //     errMsg[errMsg.length] = "Gender is required";
    // }//ends if statement for age validation

    if ($("#phone").val().trim() == "") {
        errMsg[errMsg.length] = "Phone is required";
    }//ends if statement for age validation

    if (errMsg.length == 0) {
        return true;
    } 
    else {
        for (let i = 0; i < errMsg.length; i++) {
            $("<li>" + errMsg[i] + "</li>").appendTo($("#errorMessages"));
        }
        return false;
    }
}
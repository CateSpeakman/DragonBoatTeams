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
//this will pull the team name and populate on the form

    $.getJSON("/api/teams/" + id, function (team) {
        obj = team;

        $("#teamName").val(obj.TeamName);

        $.getJSON("/api/leagues/" + obj.League, function (league) {

            //gets the full name of the league
            $("#league").val(league.Name);
        })//ends JSON function to find the team name and insert into form

    })//ends JSON function to find team name and insert into form 


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

    }// this ends for loop for on focus/blur


    $("#saveBtn").on("click", function () {

        //this posts the new team member information to the server upon passing validation
        let isValid = formValidation();

        if (isValid == false) {
            return;
        }

        $.post("/api/teams/" + id + "/members", $("#registerForm").serialize(), function (data) {
            window.location.href = "teamDetails.html?teamid=" + id;
          
        });//ends post call

        return false;
    });//end of on click for save button


    $("#registerForm").on("reset", function (e) {
//this will override the reset to make sure the pre-populated fields do not get cleared when user
//hits the reset button
        e.preventDefault();

        $("#memberName").val("");
        $("#contactName").val("");
        $("#email").val("");
        $("#age").val("");
        $("#phone").val("");

    });//ends of on click for reset button

    function formValidation() {
//this function performs the form validation

        $("#errorMessages").empty();

        let emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        let email = $("#email").val();

        let phonePattern = /^\(?[\d]{3}\)?[\s-]?[\d]{3}[\s-]?[\d]{4}$/;
        let phone = $("#phone").val();

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

        if (isNaN($("#age").val())) {
            errMsg[errMsg.length] = "Age must be a numeric value";
        }
        else if ((Number($("#age").val()) < obj.MinMemberAge) || (Number($("#age").val()) > obj.MaxMemberAge)) {
            errMsg[errMsg.length] = "Member's age is outside of bounds of team age rules";

        }//ends if statement for Age verification comparing to team requirements

        if (isNaN($("#phone").val())) {
            errMsg[errMsg.length] = "Phone must be a numeric value";

        } else if (phonePattern.test(phone) == false) {
            errMsg[errMsg.length] = "Valid email address is required";
              }//ends if statement for Phone validation


        if (errMsg.length == 0) {
            return true;
        }
        else {
            for (let i = 0; i < errMsg.length; i++) {
                $("<li>" + errMsg[i] + "</li>").appendTo($("#errorMessages"));
            }
            return false;
        }
    }//ends form validation 

});//end of ready function
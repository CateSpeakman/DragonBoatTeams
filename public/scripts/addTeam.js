"use strict";
//Description:  this script will run the add team page
//Author:Cate Speakman

$(function () {

    //this function will call the JSON file and populate the table based on the call to 
    //restful API

    let objs;
    $.getJSON("/api/leagues", function (leagues) {

        objs = leagues;

        for (let i = 0; i < objs.length; i++) {
        
            //put league type into ddl

            let option = document.createElement("option");
            option.text = objs[i].Name;
            option.value = objs[i].Name;

            $("#leagueList").append(option);

        };//end of the for loop for populating dropdown of leagues


    })//ends Json function


    //this onclick function will trigger form validation and will post the new team to be added provided
    //the form passes validation 

    $("#submitBtn").on("click", function () {

        console.log("we in");

        let isValid = formValidation();

        if (isValid == false) {
            return false;
        }
        let str = $("#addTeamForm").serialize()
        $.post("/api/teams", $("#addTeamForm").serialize(), function (data) {
            data = JSON.parse(data);
            window.location.href = "teamDetails.html?teamid=" + data.TeamId;;
            alert("Add Team successful");
        });

        return false;
    });//end of on click

})//ends ready function


function formValidation() {

    $("#errorMessages").empty();

    let errMsg = [];

    if ($("#teamName").val().trim() == "") {
        errMsg[errMsg.length] = "Team Name is required";
    }

    if ($("#managerName").val().trim() == "") {
        errMsg[errMsg.length] = "Manager Name is required";
    }

    if ($("#managerPhone").val().trim() == "") {
        errMsg[errMsg.length] = "Manager Phone is required";
    }


    let emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    let email = $("#managerEmail").val();


    if (emailPattern.test(email) == false) {
        errMsg[errMsg.length] = "Valid email address is required";
    }//ends if statement for email validation



    if ($("#maxTeamMembers").val().trim() == "") {
        errMsg[errMsg.length] = "Maximum # Team Members is required";
    }

    if ($("#minMemberAge").val().trim() == "") {
        errMsg[errMsg.length] = "Minimum Member Age is required";
    }

    if ($("#maxMemberAge").val().trim() == "") {
        errMsg[errMsg.length] = "Maximum Member Age is required";
    }

//placeholder for team gender pending Dana clarification


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
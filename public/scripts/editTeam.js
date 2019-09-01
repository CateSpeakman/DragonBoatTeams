"use strict";
//Description: This script will dynamically populate the page with all team information based on user
//selection of a table that generated on a previous page.  This information will be pulled from a restful API server. 
//Author:Cate Speakman


//this is the ready function for Jquery for the onload
$(function () {

    let urlParams = new URLSearchParams(location.search);
    let teamId = urlParams.get("teamId");

    let obj;
    $("#editBtn").on("click", function () {
        let isValid = formValidation();

        if (isValid == false) {
            return false;
        }

        let str = alert($("#editTeamForm").serialize());
        $.ajax({
            url: '/api/teams', // your api url
            // jQuery < 1.9.0 -> use type
            // jQuery >= 1.9.0 -> use method
            data: $("#editTeamForm").serialize(),
            method: 'PUT', // method is any HTTP method
            success: function () {
                alert("Working");
                window.location.href = "teamDetails.html?teamid=" + $("#teamId").val();
            }
        });

        return false;
    });//end of on click


    //this function will pull the team ID and list the team details 

    $.getJSON("/api/teams/" + teamId, function (team) {

        obj = team;

        $("#teamName").val(obj.TeamName);
        $("#league").val(obj.League);
        $("#managerName").val(obj.ManagerName);
        $("#managerPhone").val(obj.ManagerPhone);
        $("#managerEmail").val(obj.ManagerEmail);
        $("#maxTeamMembers").val(obj.MaxTeamMembers);
        $("#minMemberAge").val(obj.MinMemberAge);
        $("#maxMemberAge").val(obj.MaxMemberAge);
        $("#teamGender").val(obj.TeamGender);

    });//ends JSON function

});//ends the onload function           


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
}//ends on click function

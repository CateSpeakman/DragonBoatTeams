"use strict";
//Description: This script will dynamically populate the page with all team information based on user
//selection of a table that generated on a previous page.  This information will be pulled from a restful API server. 
//Author:Cate Speakman


//this is the ready function for Jquery for the onload
$(function () {

    let urlParams = new URLSearchParams(location.search);
    let teamid = urlParams.get("teamid");

    let obj;

    $.getJSON("/api/teams/" + teamid, function (team) {
        obj = team;
        $("#teamid").val(obj.TeamId);
        $("#teamname").val(obj.TeamName);
        $("#league").val(obj.League);
        $("#managername").val(obj.ManagerName);
        $("#managerphone").val(obj.ManagerPhone);
        $("#manageremail").val(obj.ManagerEmail);
        $("#maxteammembers").val(obj.MaxTeamMembers);
        $("#minmemberage").val(obj.MinMemberAge);
        $("#maxmemberage").val(obj.MaxMemberAge);

      
        $("input[name='teamgender'][value='" +obj.TeamGender+ "']").prop("checked", true)
        //$("#teamgender").val(obj.TeamGender);
        //  $("input[name='teamgender'][value='Any']").prop("checked", true)

    })//ends JSON function to find team name and insert into form 


    $("#editBtn").on("click", function () {
        let isValid = formValidation();

        if (isValid == false) {
            return false;
        }


        alert("About to send changes...")
        $.ajax({
            url: '/api/teams', // your api url
            // jQuery < 1.9.0 -> use type
            // jQuery >= 1.9.0 -> use method
            data: $("#editTeamForm").serialize(),
            method: 'PUT', // method is any HTTP method
            success: function () {
                alert("change confirmed")
                window.location.href = "teamDetails.html?teamid=" + $("#teamid").val();
            }
        });

        return false;
    });//end of on click function


});//ends the onload function           


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

    if ($("#minmemberage").val().trim() == "") {
        errMsg[errMsg.length] = "Minimum Member Age is required";
    }

    if ($("#maxmemberage").val().trim() == "") {
        errMsg[errMsg.length] = "Maximum Member Age is required";
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
}//ends form validation function

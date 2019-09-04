"use strict";
//Description: This script will dynamically populate the page with all team information based on user
//selection of a table that generated on a previous page.  This information will be pulled from a restful API server. 
//Author:Cate Speakman


//this is the ready function for Jquery for the onload
$(function () {

    let urlParams = new URLSearchParams(location.search);
    let teamId = urlParams.get("teamid");

    $("#registerBtn").prop("href", "addTeamMember.html?teamid=" + teamId);
    $("#backBtn").prop("href", "search.html");

    let obj;
    //this will populate the card for team info and for the team rules
    $.getJSON("/api/teams/" + teamId, function (team) {
        obj = team;
        $("#teamInfoCard").html(obj.TeamName);
        $("#cardText1").html("League: " + obj.League);
        $("#cardText2").html("Manager Name: " + obj.ManagerName);
        $("#cardText3").html("Manager Phone: " + obj.ManagerPhone);
        $("#cardText4").html("Manager Email: " + obj.ManagerEmail);
        $("#rulesCard").html("Team Rules");
        $("#cardText5").html("Maximum # Team Members: " + obj.MaxTeamMembers);
        $("#cardText6").html("Minimum Member Age: " + obj.MinMemberAge);
        $("#cardText7").html("Maximum Member Age: " + obj.MaxMemberAge);
        $("#cardText8").html("Team Gender: " + obj.TeamGender);


        //this if statement will look to see if any team members are registered and if so display the list
        if (obj.Members.length == 0) {
            $("#memberListDiv").hide();
        }
        else {
            $("#memberListDiv").show();
        }
        for (let i = 0; i < obj.Members.length; i++) {

            let memberRow = "<tr><td>" + obj.Members[i].MemberName
                + "</td><td>" + obj.Members[i].Email
                + "</td><td>" + obj.Members[i].Phone
                + "</td></tr>";
            $("#memberTable tbody").append(memberRow);

        }//ends for loop

    })//ends JSON function

});//ends the onload function           



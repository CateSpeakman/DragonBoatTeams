"use strict";
//Description: This script will dynamically populate the page with all team information based on user
//selection of a table that generated on a previous page.  This information will be pulled from a restful API server. 
//Author:Cate Speakman


//this is the ready function for Jquery for the onload
$(function () {

    let urlParams = new URLSearchParams(location.search);
    let teamId = urlParams.get("teamid");

    $("#registerBtn").prop("href", "register.html?teamid=" + teamId);

    let obj;

//this function will pull the team ID and list the team details 

    $.getJSON("/api/teams/" + teamId, function (team) {

        obj = team;

        let teamNameRow = "<tr><td>" + "Team name: "
            + "</td><td>" + obj.teamname
            + "</td></tr>";
        $("#teamDetailsTable tbody").append(teamNameRow);

        let leagueRow = "<tr><td>" + "League: "
            + "</td><td>" + obj.leaguecode
            + "</td></tr>";
        $("#teamDetailsTable tbody").append(leagueRow);

        let managerNameRow = "<tr><td>" + "Manager name: "
            + "</td><td>" + obj.managername
            + "</td></tr>";
        $("#teamDetailsTable tbody").append(managerNameRow);

        let managerPhoneRow = "<tr><td>" + "Manager phone: "
            + "</td><td>" + obj.managerphone
            + "</td></tr>";
        $("#teamDetailsTable tbody").append(managerPhoneRow);

        let managerEmailRow = "<tr><td>" + "Manager email: "
            + "</td><td>" + obj.manageremail
            + "</td></tr>";
        $("#teamDetailsTable tbody").append(managerEmailRow);

        let maxTeamMembersRow = "<tr><td>" + "Maximum # team members: "
            + "</td><td>" + obj.maxteammembers
            + "</td></tr>";
        $("#teamDetailsTable tbody").append(maxTeamMembersRow);

        let minMemberAgeRow = "<tr><td>" + "Minimum member age: "
            + "</td><td>" + obj.minmemberage
            + "</td></tr>";
        $("#teamDetailsTable tbody").append(minMemberAgeRow);

        let maxMemberAgeRow = "<tr><td>" + "Maximum member age: "
            + "</td><td>" + obj.maxmemberage
            + "</td></tr>";
        $("#teamDetailsTable tbody").append(maxMemberAgeRow);

        let teamGenderRow = "<tr><td>" + "Team gender: "
            + "</td><td>" + obj.teamgender
            + "</td></tr>";
        $("#teamDetailsTable tbody").append(teamGenderRow);

        //this if statement will look to see if any team members are registered and if so display the list
        if (obj.members.length == 0) {
            $("#memberListDiv").hide();
        }
        else {
            $("#memberListDiv").show();
        }
        for (let i = 0; i < obj.members.length; i++) {
           
            let memberRow = "<tr><td>" + obj.members[i].membername
                + "</td><td>" + obj.members[i].Email
                + "</td><td>" + obj.members[i].phone
                + "</td></tr>";
            $("#memberTable tbody").append(memberRow);

        }//ends for loop

    });//ends JSON function

});//ends the onload function           

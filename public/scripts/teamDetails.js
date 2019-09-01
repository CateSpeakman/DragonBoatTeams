"use strict";
//Description: This script will dynamically populate the page with all team information based on user
//selection of a table that generated on a previous page.  This information will be pulled from a restful API server. 
//Author:Cate Speakman


//this is the ready function for Jquery for the onload
$(function () {

    let urlParams = new URLSearchParams(location.search);
    let teamId = urlParams.get("teamid");
    

    $("#registerBtn").prop("href", "addTeamMember.html?teamid=" + teamId);

    let obj;

//this function will pull the team ID and list the team details 

    $.getJSON("/api/teams/" + teamId, function (team) {

        obj = team;

        let teamNameRow = "<tr><td>" + "Team name: "
            + "</td><td>" + obj.TeamName
            + "</td></tr>";
        $("#teamDetailsTable tbody").append(teamNameRow);

        let leagueRow = "<tr><td>" + "League: "
            + "</td><td>" + obj.League
            + "</td></tr>";
        $("#teamDetailsTable tbody").append(leagueRow);

        let managerNameRow = "<tr><td>" + "Manager name: "
            + "</td><td>" + obj.ManagerName
            + "</td></tr>";
        $("#teamDetailsTable tbody").append(managerNameRow);

        let managerPhoneRow = "<tr><td>" + "Manager phone: "
            + "</td><td>" + obj.ManagerPhone
            + "</td></tr>";
        $("#teamDetailsTable tbody").append(managerPhoneRow);

        let managerEmailRow = "<tr><td>" + "Manager email: "
            + "</td><td>" + obj.ManagerEmail
            + "</td></tr>";
        $("#teamDetailsTable tbody").append(managerEmailRow);

        let maxTeamMembersRow = "<tr><td>" + "Maximum # team members: "
            + "</td><td>" + obj.MaxTeamMembers
            + "</td></tr>";
        $("#teamDetailsTable tbody").append(maxTeamMembersRow);

        let minMemberAgeRow = "<tr><td>" + "Minimum member age: "
            + "</td><td>" + obj.MinMemberAge
            + "</td></tr>";
        $("#teamDetailsTable tbody").append(minMemberAgeRow);

        let maxMemberAgeRow = "<tr><td>" + "Maximum member age: "
            + "</td><td>" + obj.MaxMemberAge
            + "</td></tr>";
        $("#teamDetailsTable tbody").append(maxMemberAgeRow);

        let teamGenderRow = "<tr><td>" + "Team gender: "
            + "</td><td>" + obj.TeamGender
            + "</td></tr>";
        $("#teamDetailsTable tbody").append(teamGenderRow);

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

    });//ends JSON function

});//ends the onload function           

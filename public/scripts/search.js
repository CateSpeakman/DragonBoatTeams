"use strict";
//Description: this script will dynamically add leagues to a dropdown and managers to a 
// dropdown and then build a table of teams based on selection of the user.
//Author:Cate Speakman

//this is for populating the league dropdown

$(function () {

    //this function will call the JSON file and populate the table based on the call to 
    //restful API

    $("#addTeamBtn").prop("href", "addTeam.html");

    let objs;
    $.getJSON("/api/leagues", function (leagues) {

        objs = leagues;

        for (let i = 0; i < objs.length; i++) {

            let league = objs[i];
            //put league type into ddl

            let option = document.createElement("option");
            option.text = league.Category;
            option.value = league.Value;

            $("#leagueList").append(option);

        };//end of the for loop for populating dropdown for leagues


    })//ends Json function

    $("#leagueList").on("change", showTeamByLeague)
    $("#managerList").on("change", showTeamByManager)
    $("#allTeams").on("click", showAllTeams)

})//ends ready function

//this function will call the JSON file and populated the table based on user selection within dropdown

function showTeamByLeague() {
    let objs;

    if ($("#leagueList").val() != "-1"){
    $.getJSON("/api/teams/byleague/" + $('#leagueList').val(), function (teams) {

        objs =teams;
        $("#teamTable tbody").empty();

        for (let i = 0; i < objs.length; i++) {
            
                let teamRow = "<tr><td>" + objs[i].teamname
                    + "</td><td>" + objs[i].leaguecode
                    + "</td><td><a href='teamDetails.html?teamid=" + objs[i].teamid + "'>Details</a>"
                    + "</td><td><a href='editTeam.html?teamid=" + objs[i].teamid + "'>Edit</a>"
                    + "</td></tr>";
                $("#teamTable tbody").append(teamRow);
          

        }//ends for loop for populating table based on DDL selection
    });//ends JSON function
    }//ends if statement for league list
}//ends show Team By League function

function showTeamByManager() {
    let obj;

    if ($("#managerList").val() != "-1"){
    $.getJSON("/api/teams/teammanager/" + $('#managerList').val(), function (team) {

        obj = team;
        $("#teamTable tbody").empty();

        for (let i = 0; i < obj.length; i++) {
            
                let teamRow = "<tr><td>" + obj[i].teamname
                    + "</td><td>" + obj[i].leaguecode
                    + "</td><td><a href='teamDetails.html?teamid=" + obj[i].teamid + "'>Details</a>"
                    + "</td><td><a href='editTeam.html?teamid=" + obj[i].teamid + "'>Edit</a>"
                    + "</td></tr>";
                $("#teamTable tbody").append(teamRow);
          

        }//ends for loop for populating table based on DDL selection
    });//ends JSON function
    }//ends if statement for manager list 
}//ends show team by manager function



function showAllTeams() {
    let objs;

    $.getJSON("/api/teams/", function (teams) {

        objs = teams;
        $("#teamTable tbody").empty();

        for (let i = 0; i < objs.length; i++) {
            
                let teamRow = "<tr><td>" + objs[i].teamname
                    + "</td><td>" + objs[i].leaguecode
                    + "</td><td><a href='teamDetails.html?teamid=" + objs[i].teamId + "'>Details</a>"
                    + "</td><td><a href='editTeam.html?teamid=" + objs[i].teamid + "'>Edit</a>"
                    + "</td></tr>";
                $("#teamTable tbody").append(teamRow);
          

        }//ends for loop for populating table based on DDL selection
    });//ends JSON function
}//ends function for show all teams
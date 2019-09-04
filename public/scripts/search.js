"use strict";
//Description: this script will dynamically add leagues to a dropdown and managers to a 
// dropdown and then build a table of teams based on selection of the user.
//Author:Cate Speakman

//this is for populating the league dropdown

$(function () {

    //this function will call the JSON file and populate the table based on the call to 
    //restful API

    $("#addTeamBtn").prop("href", "addTeam.html");
    $("#teamListDiv").hide();
    let objs;
    $.getJSON("/api/leagues", function (leagues) {

        objs = leagues;

        for (let i = 0; i < objs.length; i++) {

            //put league type into ddl

            let option = document.createElement("option");
            option.text = objs[i].Name;
            option.value = objs[i].Code;

            $("#leagueList").append(option);

        };//end of the for loop for populating dropdown for leagues


    })//ends Json function

    $("#leagueList").on("change", showTeamByLeague)

    $("#allTeamsBtn").on("click", showAllTeams)

})//ends ready function

//this function will call the JSON file and populated the table with team list based on user selection 
//within dropdown

function showTeamByLeague() {
    let objs;

    if ($("#leagueList").val() != "-1") {

        $("#teamListDiv").show();
        $.getJSON("/api/teams/byleague/" + $('#leagueList').val(), function (teams) {

            objs = teams;
            $("#teamTable tbody").empty();

            for (let i = 0; i < objs.length; i++) {

                let teamRow = "<tr><td>" + objs[i].TeamName
                    + "</td><td>" + objs[i].League
                    + "</td><td><a href='teamDetails.html?teamid=" + objs[i].TeamId + "'>Details</a>"
                    + "</td><td><a href='editTeam.html?teamid=" + objs[i].TeamId + "'>Edit</a>"
                    + "</td></tr>";
                $("#teamTable tbody").append(teamRow);


            }//ends for loop for populating table based on DDL selection
        });//ends JSON function
    }//ends if statement for league list
}//ends show Team By League function


//this function will display all teams when the select all teams buttons is clicked on screen

function showAllTeams() {
    let objs;
    $("#teamListDiv").show();

    $.getJSON("/api/teams/", function (teams) {

        objs = teams;
        $("#teamTable tbody").empty();

        for (let i = 0; i < objs.length; i++) {

            let teamRow = "<tr><td>" + objs[i].TeamName
                + "</td><td>" + objs[i].League
                + "</td><td><a href='teamDetails.html?teamid=" + objs[i].TeamId + "'>Details</a>"
                + "</td><td><a href='editTeam.html?teamid=" + objs[i].TeamId + "'>Edit</a>"
                + "</td></tr>";
            $("#teamTable tbody").append(teamRow);

        }//ends for loop for populating table based on DDL selection
    });//ends JSON function
}//ends function for show all teams
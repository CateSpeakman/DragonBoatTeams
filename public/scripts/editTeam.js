"use strict";
//Description: This script will dynamically populate the page with all course information based on user
//selection of a table that generated on a previous page.  This information will be pulled from a restful API server. 
//Author:Cate Speakman


//this is the ready function for Jquery for the onload
$(function () {

    let urlParams = new URLSearchParams(location.search);
    let courseId = urlParams.get("courseid");

    let obj;


    $("#editBtn").on("click", function () {

      
       /* $.ajax("/api/courses", $("#registForm").serialize(), function (data) {
            window.location.href = "details.html?courseid=" + id;
            alert("edit successful");
        });*/
            alert($("#editCourseForm").serialize());
        $.ajax({
            url: '/api/courses', // your api url
            // jQuery < 1.9.0 -> use type
            // jQuery >= 1.9.0 -> use method
            data: $("#editCourseForm").serialize(),
            method: 'PUT', // method is any HTTP method
            success: function() {
              alert("Working");
             window.location.href = "details.html?courseid=" +  $("#courseid").val();
            }
          });







        return false;
    });//end of on click


//this function will pull the course ID and list the course details 

    $.getJSON("/api/courses/" + courseId, function (course) {

        obj = course;

        $("#courseid").val(obj.CourseId);
     
        $("#title").val(obj.Title);
        $("#category").val(obj.Category);
        $("#location").val(obj.Location);
        $("#startDate").val(obj.StartDate);
        $("#endDate").val(obj.EndDate);
        $("#meets").val(obj.Meets);
        $("#fee").val(obj.Fee);
        

       });//ends JSON function

});//ends the onload function           




// var queryURL = ""; 
// var apiKey = "5d9e2294-8fed-4b9d-ac40-b10721c8e6e9"; 
// Tw6y0f81zYApuWpXS6TF4o1Dk43VdxyD
// var searchTerm; 
// var numResults; 
// var startYear; 
// var endYear; 

// $.ajax({

// }).then(function(response) {

// }); 

//set up variables
//============================================
var authKey = "Tw6y0f81zYApuWpXS6TF4o1Dk43VdxyD";
var queryTerm = "";
var numResults = 0;
var startYear = 0;
var endYear = 0;

// URL Base
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey;

//Article counter, variable to track number of articles
var articleCounter = 0;
//functions
//============================================
function runQuery(numArticles, queryURL) {

    //AJAX function
    $.ajax({ url: queryURL, method: "GET" })
        .done(function (NYTData) {

            //clear the wells from the previous run
            $("#wellSection").empty();

            for (var i = 0; i < NYTData.response.docs.length; i++) {
                console.log("HEADLINE");
                console.log("----------------------------");
                // console.log(NYTData.response.docs[i].headlines.main);
                console.log("----------------------------");
                console.log(NYTData.response.docs[i].section_name);
                console.log("----------------------------");
                console.log(NYTData.response.docs[i].pub_date);
                console.log("----------------------------");
                console.log(NYTData.response.docs[i].byline.original);
                console.log("----------------------------");
                console.log(NYTData.response.docs[i].web_url);

//start dumping to HTML here
var wellSection = $("<div>");
wellSection.addClass("well");
wellSection.attr("id", "articlewell-" + i)
$("#wellSection").append(wellSection);

console.log(NYTData);

if(NYTData.response.docs[i].headline != "null"){
    console.log(NYTData.response.docs[i].headline.main);
    wellSection.append("<h3>" +NYTData.response.docs[i].headline.main + "</h3>")

}

if(NYTData.response.docs[i].byline.original && NYTData.response.docs[i].byline.hasOwnProperty("original")){
    console.log(NYTData.response.docs[i].byline.original)
    wellSection.append("<h5>" +NYTData.response.docs[i].byline.original + "</h5>")
}


//attach the content to the appropriate well
wellSection.append("<h5>" +NYTData.response.docs[i].ection_name + "</h5>")
wellSection.append("<h5>" +NYTData.response.docs[i].pub_date + "</h5>")
wellSection.append("<a href=" +NYTData.response.docs[i].web_url+ ">"+NYTData.response.docs[i].web_url+ "</a>")

            }
            //logging to console
            console.log(queryURL);
            console.log(numArticles);
            console.log(NYTData);
        })
}

//main processes
//============================================

$("#searchBtn").on('click', function () {

    // alert: ("test");
    var searchTerm = $("#search").val().trim();
    console.log(searchTerm);


    // add in the seach term
    var newURL = queryURLBase + "&q=" + searchTerm;
    console.log(newURL);
    // runQuery(10, "http://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=Tw6y0f81zYApuWpXS6TF4o1Dk43VdxyD");

    //Get the number of records
    numResults = $("#numRecords").val();

    //Get the start year and End year
    startYear = $("#startYear").val().trim();
    endYear = $("#endYear").val().trim();

    if (parseInt(startYear)) {
        //add the date information to the URL
        startYear = startYear + "0101";

        //add the date information to the URL
        newURL = newURL + "&begin_date=" + startYear;

    }

    if (parseInt(endYear)) {

        //add the date information to the URL
        endYear = endYear + "0101";

        //add the date inforamtion to the URL
        newURL = newURL + "&end_date=" + endYear;
    }

    // console.log(newURL)

    // newURL = newURL + "&begin_date" + startYear + "$end_date=" + endYear;



    // console.log(newURL);



    //send the AJAX call the newly assembled URL
    runQuery(numResults, newURL)

    return false;
})


//1. Retrieve user inputs and convert to variables
//2. Use those variable to run on AJAX call to the New York Times
//3. Break down the NYT object into useable fields
//4. Dynamically generate html content

//5. Dealing with "edge cases" --- bugs or situations that are not intuitive

function getFeatureStage() {
    
    var e = document.getElementById("stageBox");
    console.log("---------------");
    console.log(e);
    var strSelect = e.options[e.selectedIndex].text;
    console.log("---------------");
    console.log(strSelect);
    var requestURL = createXmlHttpRequest();
   // requestURL = 'http://localhost:32020/Track/updateStageSelected';
   requestURL = 'http://localhost:32020/Track/responseFeatures';
     
   requestURL = addURLParam(requestURL, "stage", strSelect);
    console.log(requestURL);
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            data = xmlhttp.responseText;
            console.log("hello for feature2");
            console.log(data);
            sss = JSON.parse(xmlhttp.responseText);
            console.log("sssssssssssssssssssssssssssssss");
            console.log(sss);
            data = sss;
           
            setTimeout("tiem", 4000);
            var d = JSON.parse(data, function (key, value) {
                //  console.log("key = %s", key);
                //  console.log(" value = %s\n", value);
                if (key == "delay") {
                    return Boolean(value);
                }
                return value;
            });
           /* */
            

            console.log(d);
            var features = "";
            for (var i = 0; i < d.length; i++) {
                var feature =  "<p1 style=\"font-size:16px;\";>" + d[i]["name"] + "</p1>" + "</br>";
                feature += "<pre class=\"arrows-and-boxes\" >";
                var delay = d[i]["delay"];
                var curStatus = true;
                // dedtermine the color of node 'new'
                if (d[i]["status"] == "New" && delay == true) {
                    feature += "(((New " + " | {{ " + d[i]["date"][0] + " }}　)))";
                }
                else {
                    feature += "((New " + " | {{ " + d[i]["date"][0] + " }} ))";
                }

                // dedtermine the color of arrow 'new'
                if (d[i]["status"] == "New" && delay == true) {
                    feature += " >>> ";
                    //     feature += " " + d[i]["weeks"] + " ";
                }
                else if (curStatus == true) {
                    feature += " >> ";
                    //   feature += " " + d[i]["weeks"] + " ";
                }
                else {
                    feature += " > ";
                    // feature += " " + d[i]["weeks"] + " ";
                }
                if (d[i]["status"] == "New") {
                    feature += " {{ " + d[i]["weeks"] + " }} ";
                }

                if (d[i]["status"] == "New")
                    curStatus = false;

                if (curStatus == true) {
                    feature += " {{ " + d[i]["newToActiveWeeks"] + " }} ";
                }
                // dedtermine the color of node 'Active'
                if (d[i]["status"] == "Active" && delay == true) {
                    feature += "(((Active " + " | {{ " + d[i]["date"][1] + " }} )))";
                }
                else if (curStatus == true) {
                    feature += "((Active " + " | {{ " + d[i]["date"][1] + " }} ))";
                }
                else {
                    feature += "(Active " + " | {{ " + d[i]["date"][1] + " }} )";
                }

                // dedtermine the color of arrow 'Active'
                if (d[i]["status"] == "Active" && delay == true) {
                    feature += " >>> ";
                    //   feature += " " + d[i]["weeks"] + " ";
                }
                else if (curStatus == true) {
                    feature += " >> ";
                    // feature += " " + d[i]["weeks"] + " ";
                }
                else {
                    feature += " > ";
                    // feature += " " + d[i]["weeks"] + " ";
                }
                if (d[i]["status"] == "Active") {
                    feature += " {{ " + d[i]["weeks"] + " }} ";
                }

                if (d[i]["status"] == "Active") {
                    curStatus = false;
                    //    feature += " " + d[i]["process"] + " ";
                }

                if (curStatus == true) {
                    feature += " {{ " + d[i]["activeToDoogfoodWeeks"] + " }} ";
                }

                // dedtermine the color of node 'dogfood'
                if (d[i]["status"] == "Dogfood" && delay == true) {
                    feature += "(((Dogfood " + " | {{ " + d[i]["date"][2] + " }} )))";
                }
                else if (curStatus == true) {
                    feature += "((Dogfood " + " | {{ " + d[i]["date"][2] + " }} ))";
                }
                else {
                    feature += "(Dogfood " + " | {{ " + d[i]["date"][2] + " }} )";
                }

                // dedtermine the color of arrow 'dogfood'
                if (d[i]["status"] == "Dogfood" && delay == true) {
                    // feature += " --- ";

                    //   feature += " () ";
                    feature += " >>> ";
                    //    feature += " " + d[i]["weeks"] + " ";

                }
                else if (curStatus == true) {
                    feature += " >> ";
                    //     feature += " " + d[i]["weeks"] + " ";
                }
                else {
                    feature += " > ";
                    //    feature += " " + d[i]["weeks"] + " ";
                }
                if (d[i]["status"] == "Dogfood") {
                    feature += " {{ " + d[i]["weeks"] + " }} ";
                }
                if (d[i]["status"] == "Dogfood")
                    curStatus = false;

                if (curStatus == true) {
                    feature += " {{ " + d[i]["dogfoodToProdWeeks"] + " }} ";
                }

                // dedtermine the color of node 'prod'
                if (d[i]["status"] == "Prod" && delay == true) {
                    feature += "(((Prod " + " | {{ " + d[i]["date"][3] + " }} )))";
                }
                else if (curStatus == true) {
                    feature += "((Prod " + " | {{ " + d[i]["date"][3] + " }} ))";
                }
                else {
                    feature += "(Prod " + " | {{ " + d[i]["date"][3] + " }} )";
                }

                // dedtermine the color of arrow 'prod'
                if (d[i]["status"] == "Prod" && delay == true) {
                    feature += " >>> ";
                    //     feature += " " + d[i]["weeks"] + " ";
                }
                else if (curStatus == true) {
                    feature += " >> ";
                    //     feature += " " + d[i]["weeks"] + " ";
                }
                else {
                    feature += " > ";
                    //      feature += " " + d[i]["weeks"] + " ";
                }
                if (d[i]["status"] == "Prod") {
                    feature += " {{ " + d[i]["weeks"] + " }} ";
                }

                if (d[i]["status"] == "Prod")
                    curStatus = false;

                if (curStatus == true) {
                    feature += " {{ " + d[i]["prodToExitreviewWeeks"] + " }} ";
                }

                // dedtermine the color of node 'exit review'
                if (d[i]["status"] == "Exit review" && delay == true) {
                    feature += "(((Exit review " + " | {{ " + d[i]["date"][4] + " }} )))";
                }
                else if (curStatus == true) {
                    feature += "((Exit review " + " | {{ " + d[i]["date"][4] + " }} ))";
                }
                else {
                    feature += "(Exit review " + " | {{ " + d[i]["date"][4] + " }} )";
                }

                // dedtermine the color of arrow 'exit review'
                if (d[i]["status"] == "Exit review" && delay == true) {
                    feature += " >>> ";
                    //     feature += " " + d[i]["weeks"] + " ";

                }
                else if (curStatus == true) {
                    feature += " >> ";
                    //      feature += " " + d[i]["weeks"] + " ";
                }
                else {
                    feature += " > ";
                    //      feature += " " + d[i]["weeks"] + " ";
                }
                if (d[i]["status"] == "Exit review") {
                    feature += " {{ " + d[i]["weeks"] + " }} ";
                }

                if (d[i]["status"] == "Exit review")
                    curStatus = false;

                if (curStatus == true) {
                    feature += " {{ " + d[i]["exitreviewToDoneWeeks"] + " }} ";
                }

                // dedtermine the color of node 'done'
                if (d[i]["status"] == "Done" && delay == true) {
                    feature += "(((Done " + " | {{ " + d[i]["date"][5] + " }} )))";
                }
                else if (curStatus == true) {
                    feature += "((Done " + " | {{ " + d[i]["date"][5] + " }} ))";
                }
                else {
                    feature += "(Done " + " | {{ " + d[i]["date"][5] + " }} )";
                }

                feature += "</pre>";
                features += feature;
            }
        path1 = "../../Scripts/arrowsandboxes.js";
            path2 = "../../Scripts/jquery.wz_jsgraphics.js";

            includeLinkStyle(path1);
            includeLinkStyle(path2);
        /*        */
         //   setTimeout("timeout", 10000);

            console.log("$$$$$$$$$$$$$$$$$$$$$$$22");

            console.log(document.getElementById("features").innerHTML);
            //    document.getElementById("features").innerHTML = "";
            console.log("$$$$$$$$$$$$$$$$$$$$$$$2");
            console.log(document.getElementById("features").innerHTML);


            ///   console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
            $("#features").empty();
            console.log(features);
            //   url = "../../Content/arrowsandboxes.css";
            //  includeLinkStyle(url);
           
            $("#features").append(features);//.arrows_and_boxes();;//.arrows_and_boxes()

            //  console.log(document.getElementById("features").innerHTML);
            console.log("$$$$$$$$$$$$$$$$$$$$$$$3");
            console.log(document.getElementById("features").innerHTML);
        }
    }
    xmlhttp.open("post", requestURL, true);
    
    xmlhttp.send();
 //   console.log("$$$$$$$$$$$$$$$$$$$$$$$1");
  //  console.log(document.getElementById("features").innerHTML);
    // $.getJSON('./Track/getJson', function (data) {
 /*  $.ajax({
        url: "/Track/responseFeatures",
        dataType: 'json',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            

        }
 })*/ 

}

function handleFeature()
{
    
    data = xmlhttp.responseText;
    console.log("hello for feature2");
    console.log(data);


    var d = JSON.parse(data, function (key, value) {
        //  console.log("key = %s", key);
        //  console.log(" value = %s\n", value);
        if (key == "delay") {
            return Boolean(value);
        }
        return value;
    });

    console.log(d);
    var features = "";
    for (var i = 0; i < d.length; i++) {
        var feature = "<p1 style=\"font-size:16px;\";>" + d[i]["name"] + "</p1>" + "</br>";
        feature += "<pre class=\"arrows-and-boxes\">";
        var delay = d[i]["delay"];
        var curStatus = true;
        // dedtermine the color of node 'new'
        if (d[i]["status"] == "New" && delay == true) {
            feature += "(((New " + " | " + d[i]["date"][0] + ")))";
        }
        else {
            feature += "((New " + " | " + d[i]["date"][0] + "))";
        }

        // dedtermine the color of arrow 'new'
        if (d[i]["status"] == "New" && delay == true) {
            feature += " >>> ";
            //     feature += " " + d[i]["weeks"] + " ";
        }
        else if (curStatus == true) {
            feature += " >> ";
            //   feature += " " + d[i]["weeks"] + " ";
        }
        else {
            feature += " > ";
            // feature += " " + d[i]["weeks"] + " ";
        }
        if (d[i]["status"] == "New") {
            feature += " " + d[i]["weeks"] + " ";
        }

        if (d[i]["status"] == "new")
            curStatus = false;
        // dedtermine the color of node 'Active'
        if (d[i]["status"] == "Active" && delay == true) {
            feature += "(((Active " + " | " + d[i]["date"][1] + ")))";
        }
        else if (curStatus == true) {
            feature += "((Active " + " | " + d[i]["date"][1] + "))";
        }
        else {
            feature += "(Active " + " | " + d[i]["date"][1] + ")";
        }

        // dedtermine the color of arrow 'Active'
        if (d[i]["status"] == "Active" && delay == true) {
            feature += " >>> ";
            //   feature += " " + d[i]["weeks"] + " ";
        }
        else if (d[i]["status"] == "Active") {
            feature += " >> ";
            // feature += " " + d[i]["weeks"] + " ";
        }
        else {
            feature += " > ";
            // feature += " " + d[i]["weeks"] + " ";
        }
        if (d[i]["status"] == "Active") {
            feature += " " + d[i]["weeks"] + " ";
        }

        if (d[i]["status"] == "Active") {
            curStatus = false;
            //    feature += " " + d[i]["process"] + " ";
        }

        // dedtermine the color of node 'dogfood'
        if (d[i]["status"] == "Dogfood" && delay == true) {
            feature += "(((Dogfood " + " | " + d[i]["date"][2] + ")))";
        }
        else if (curStatus == true) {
            feature += "((Dogfood " + " | " + d[i]["date"][2] + "))";
        }
        else {
            feature += "(Dogfood " + " | " + d[i]["date"][2] + ")";
        }

        // dedtermine the color of arrow 'dogfood'
        if (d[i]["status"] == "Dogfood" && delay == true) {
            // feature += " --- ";

            //   feature += " () ";
            feature += " >>> ";
            //    feature += " " + d[i]["weeks"] + " ";

        }
        else if (curStatus == true) {
            feature += " >> ";
            //     feature += " " + d[i]["weeks"] + " ";
        }
        else {
            feature += " > ";
            //    feature += " " + d[i]["weeks"] + " ";
        }
        if (d[i]["status"] == "Dogfood") {
            feature += " " + d[i]["weeks"] + " ";
        }
        if (d[i]["status"] == "Dogfood")
            curStatus = false;

        // dedtermine the color of node 'prod'
        if (d[i]["status"] == "Prod" && delay == true) {
            feature += "(((Prod " + " | " + d[i]["date"][3] + ")))";
        }
        else if (curStatus == true) {
            feature += "((Prod " + " | " + d[i]["date"][3] + "))";
        }
        else {
            feature += "(Prod " + " | " + d[i]["date"][3] + ")";
        }

        // dedtermine the color of arrow 'prod'
        if (d[i]["status"] == "Prod" && delay == true) {
            feature += " >>> ";
            //     feature += " " + d[i]["weeks"] + " ";
        }
        else if (curStatus == true) {
            feature += " >> ";
            //     feature += " " + d[i]["weeks"] + " ";
        }
        else {
            feature += " > ";
            //      feature += " " + d[i]["weeks"] + " ";
        }
        if (d[i]["status"] == "Prod") {
            feature += " " + d[i]["weeks"] + " ";
        }

        if (d[i]["status"] == "Prod")
            curStatus = false;

        // dedtermine the color of node 'exit review'
        if (d[i]["status"] == "Exit review" && delay == true) {
            feature += "(((Exit review " + " | " + d[i]["date"][4] + ")))";
        }
        else if (curStatus == true) {
            feature += "((Exit review " + " | " + d[i]["date"][4] + "))";
        }
        else {
            feature += "(Exit review " + " | " + d[i]["date"][4] + ")";
        }

        // dedtermine the color of arrow 'exit review'
        if (d[i]["status"] == "Exit review" && delay == true) {
            feature += " >>> ";
            //     feature += " " + d[i]["weeks"] + " ";

        }
        else if (curStatus == true) {
            feature += " >> ";
            //      feature += " " + d[i]["weeks"] + " ";
        }
        else {
            feature += " > ";
            //      feature += " " + d[i]["weeks"] + " ";
        }
        if (d[i]["status"] == "Exit review") {
            feature += " " + d[i]["weeks"] + " ";
        }

        if (d[i]["status"] == "Exit review")
            curStatus = false;

        // dedtermine the color of node 'done'
        if (d[i]["status"] == "Done" && delay == true) {
            feature += "(((Done " + " | " + d[i]["date"][5] + ")))";
        }
        else if (curStatus == true) {
            feature += "((Done " + " | " + d[i]["date"][5] + "))";
        }
        else {
            feature += "(Done " + " | " + d[i]["date"][5] + ")";
        }

        feature += "</pre>";
        features += feature;
    }
    console.log("$$$$$$$$$$$$$$$$$$$$$$$22");
    console.log(document.getElementById("features").innerHTML);
    //    document.getElementById("features").innerHTML = "";
    console.log("$$$$$$$$$$$$$$$$$$$$$$$2");
    console.log(document.getElementById("features").innerHTML);


    ///   console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    $("#features").empty();
    console.log(features);
    //   url = "../../Content/arrowsandboxes.css";
    //  includeLinkStyle(url);
    

    $("#features").append(features);//.arrows_and_boxes();;//.arrows_and_boxes()

    //  console.log(document.getElementById("features").innerHTML);
    console.log("$$$$$$$$$$$$$$$$$$$$$$$3");
    console.log(document.getElementById("features").innerHTML);
}
//});
//XmlHttpRequest对象    
function createXmlHttpRequest() {
    if (window.ActiveXObject) { //如果是IE浏览器    
        return new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) { //非IE浏览器    
        return new XMLHttpRequest();
    }
}

function addURLParam(url, name, value) {
    url += (url.indexOf("?") == -1 ? "?" : "&");
    url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
    return url;
}

function includeLinkStyle(url) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}


function includeLinkStyle(path) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.src = path;
    script.type = 'text/javascript';
    script.async = "async";
    head.appendChild(script);
}

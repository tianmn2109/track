//$(function () {
    console.log("hello for feature1");
    // $.getJSON('./Track/getJson', function (data) {
    $.ajax({
        url: "/Track/responseFeatures",
        dataType: 'json',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log("hello for feature2");
            console.log(data);


            var d = JSON.parse(data, function (key, value) {
                console.log("key = %s", key);
                console.log(" value = %s\n", value);
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
                    feature += "(((New)))";
                }
                else {
                    feature += "((New))";
                }

                // dedtermine the color of arrow 'new'
                if (d[i]["status"] == "New" && delay == true) {
                    feature += " >>> ";
                    feature += " " + d[i]["delayWeeks"] + " week(s) ";
                }
                else if (curStatus == true) {
                    feature += " >> ";
                }
                else {
                    feature += " > ";
                }

                if (d[i]["status"] == "new")
                    curStatus = false;
                // dedtermine the color of node 'approved'
                if (d[i]["status"] == "Approved" && delay == true)
                {
                    feature += "(((Approved)))";
                }
                else if (curStatus == true) {
                    feature += "((Approved))";
                }
                else {
                    feature += "(Approved)";
                }

                // dedtermine the color of arrow 'approved'
                if (d[i]["status"] == "Approved" && delay == true) {
                    feature += " >>> ";
                    feature += " " + d[i]["delayWeeks"] + " week(s) ";
                }
                else if (curStatus == true) {
                    feature += " >> ";
                }
                else {
                    feature += " > ";
                }

                if (d[i]["status"] == "Approved")
                {
                    curStatus = false;
                    feature += " " + d[i]["process"]　+ " ";
                }

                // dedtermine the color of node 'dogfood'
                if (d[i]["status"] == "Dogfood" && delay == true) {
                    feature += "(((Dogfood)))";
                }
                else if (curStatus == true) {
                    feature += "((Dogfood))";
                }
                else {
                    feature += "(DogFood)";
                }

                // dedtermine the color of arrow 'dogfood'
                if (d[i]["status"] == "Dogfood" && delay == true) {
                    feature += " --- ";
                    feature += "" + d[i]["delayWeeks"] + " week ";
                   // feature += " () ";
                    feature += " >>> ";
                }
                else if (curStatus == true) {
                    feature += " >> ";
                }
                else {
                    feature += " > ";
                }

                if (d[i]["status"] == "Dogfood")
                    curStatus = false;

                // dedtermine the color of node 'prod'
                if (d[i]["status"] == "Prod." && delay == true) {
                    feature += "(((Prod)))";
                }
                else if (curStatus == true) {
                    feature += "((Prod.))";
                }
                else {
                    feature += "(Prod)";
                }

                // dedtermine the color of arrow 'prod'
                if (d[i]["status"] == "Prod." && delay == true) {
                    feature += " >>> ";
                    feature += " " + d[i]["delayWeeks"] + " week(s) ";
                }
                if (curStatus == true) {
                    feature += " >> ";
                }
                else {
                    feature += " > ";
                }

                if (d[i]["status"] == "Prod.")
                    curStatus = false;

                // dedtermine the color of node 'exit review'
                if (d[i]["status"] == "Exit review" && delay == true) {
                    feature += "(((Exit review)))";
                }
                if (curStatus == true) {
                    feature += "((Exit review))";
                }
                else {
                    feature += "(Exit review)";
                }

                // dedtermine the color of arrow 'exit review'
                if (d[i]["status"] == "Exit review" && delay == true) {
                    feature += " >>> ";
                    feature += " " + d[i]["delayWeeks"] + " week(s) ";
                }
                else if (curStatus == true) {
                    feature += " >> ";
                }
                else {
                    feature += " > ";
                }
                

                if (d[i]["status"] == "Exit review")
                    curStatus = false;

                // dedtermine the color of node 'done'
                if (d[i]["status"] == "Done" && delay == true) {
                    feature += "(((Done)))";
                }
                else if (curStatus == true) {
                    feature += "((Done))";
                }
                else {
                    feature += "(Done)";
                }

                feature += "</pre>";
                features += feature;
            }
         //   document.getElementById("features").innerHTML = "";
            
         ///   console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
            console.log(features);
            
            $("#features").append(features);//.arrows_and_boxes();;//.arrows_and_boxes();
          //  console.log(document.getElementById("features").innerHTML);

        }
    })


//});

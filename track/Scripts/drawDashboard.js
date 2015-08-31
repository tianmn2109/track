
function getWeeks() {
    console.log("hello for test1");
    // $.getJSON('./Track/getJson', function (data) {
    $.ajax({
        url: "/Track/responseFeatureWeeks",
        async: false,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (data) {
           // console.log("hello for test");
           // console.log(data);

          //  var d = JSON.parse(data, function (key, value) {
           
            //        return value;
       
           // });

            drawWeeks(data);
     //       drawWeeks2(data);

        }
    })

}

function getWeeks2() {
    console.log("hello for test1");
    // $.getJSON('./Track/getJson', function (data) {
    $.ajax({
        url: "/Track/responseFeatureWeeks",
        async: false,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            // console.log("hello for test");
            // console.log(data);

            //  var d = JSON.parse(data, function (key, value) {

            //        return value;

            // });

            drawWeeks2(data);
            

        }
    })

}


function getPercents() {
    console.log("hello for test1");
    // $.getJSON('./Track/getJson', function (data) {
    $.ajax({
        url: "/Track/responseFeaturePercents",
        async: false,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            // console.log("hello for test");
             console.log(data);

            //  var d = JSON.parse(data, function (key, value) {

            //        return value;

            // });

            drawPercents(data);
            //       drawWeeks2(data);

        }
    })

}

function getFC() {
    console.log("hello for test1");
    // $.getJSON('./Track/getJson', function (data) {
    $.ajax({
        url: "/Track/responseFC",
        async: false,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            // console.log("hello for test");
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~");
            console.log(data);

            //  var d = JSON.parse(data, function (key, value) {

            //        return value;

            // });
            var parseData = JSON.parse(data, function (key, value) {
               if (key == "releaseDate") {
                    var re = /-?\d+/;
                    var m = re.exec(value);
                    var dd = new Date(parseInt(m[0]));
                    return dd;
                }
               /* */ return value;
            });
            console.log(parseData);
           // drawBubble(parseData);
            drawBubble(parseData);
           // drawPercents(data);
            //       drawWeeks2(data);

        }
    })

}

function drawWeeks(data) {
    console.log("XXXXXX");
    console.log(data);
    var parseData = JSON.parse(data, function (key, value) {        
        if (key == "currentStageWeek") {
            return parseInt(value);
        }
        else if (key == "nextStageWeek") {
            return parseInt(value);
        }
        else if (key == "delayWeek") {
            return parseInt(value);
        }
        else {
            return value;
        }
    });
    console.log("()()()(");
    console.log(parseData);
    var featureName = new Array();
    var currentStageWeeks = new Array();
    var nextStageWeeks = new Array();
    var delayStageWeeks = new Array();
    var dataWeeks = new Array();
    console.log("*************");
    console.log(parseData[0]["featureName"]);
    console.log(parseData[0]["currentStageWeek"]);
    console.log("**********");
    for (i = 0; i < parseData.length; i++) {
        featureName[i] = parseData[i]["featureName"];
        currentStageWeeks[i] = parseData[i]["currentStageWeek"];
        nextStageWeeks[i] = parseData[i]["nextStageWeek"];
        delayStageWeeks[i] = parseData[i]["delayWeek"];
    }
    dataWeeks[2] = {name: 'Current Stage Weeks',
        data: currentStageWeeks };
    dataWeeks[1] = {
        name: 'Next Stage Weeks',
        color: "#90ed7d",
        data: nextStageWeeks
    }; 
    dataWeeks[0] = {
        name: 'Delay weeks',
        color:"#f15c80",
        data: delayStageWeeks
    };
    console.log("%%%%%%%");
//    console.log(dataWeeks[0]["name"].toString());
//    console.log(dataWeeks[0]["currentStageWeeks"].toString());
    /*featureName = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];
    dataWeeks = [{
        name: 'Year 1800',
        data: [107, 31, 635, 203, 2]
    }, {
        name: 'Year 1900',
        data: [133, 156, 947, 408, 6]
    }, {
        name: 'Year 2012',
        data: [1052, 954, 4250, 740, 38]
    }];
    */
    $('#container1').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Feature Scheduce Status'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: featureName,
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'time (weeks)',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' weeks'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: dataWeeks
    });
}

function drawWeeks2(data) {
    console.log("XXXXXX");
    console.log(data);
    var parseData = JSON.parse(data, function (key, value) {
        if (key == "currentStageWeek") {
            return parseInt(value);
        }
        else if (key == "nextStageWeek") {
            return parseInt(value);
        }
        else if (key == "delayWeek") {
            return parseInt(value);
        }
        else {
            return value;
        }
    });
    console.log("()()()(");
    console.log(parseData);
    var featureName = new Array();
    var currentStageWeeks = new Array();
    var nextStageWeeks = new Array();
    var delayStageWeeks = new Array();
    var dataWeeks = new Array();
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@");
    console.log(parseData[0]["featureName"]);
    console.log(parseData[0]["currentStageWeek"]);
    console.log("@@@@@@@@@@@@@@@@@@@");
    for (i = 0; i < parseData.length; i++) {
        featureName[i] = parseData[i]["featureName"];
        currentStageWeeks[i] = parseData[i]["currentStageWeek"];
        nextStageWeeks[i] = parseData[i]["nextStageWeek"];
        delayStageWeeks[i] = parseData[i]["delayWeek"];
    }
    dataWeeks[2] = {
        name: 'Current Stage Weeks',
        data: currentStageWeeks
    };
    dataWeeks[1] = {
        name: 'Next Stage Weeks',
        color: "#90ed7d",
        data: nextStageWeeks
    };
    dataWeeks[0] = {
        name: 'Delay weeks',
        color: "#f15c80",
        data: delayStageWeeks
    };
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@");
    //    console.log(dataWeeks[0]["name"].toString());
    //    console.log(dataWeeks[0]["currentStageWeeks"].toString());
    /*featureName = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];
    dataWeeks = [{
        name: 'Year 1800',
        data: [107, 31, 635, 203, 2]
    }, {
        name: 'Year 1900',
        data: [133, 156, 947, 408, 6]
    }, {
        name: 'Year 2012',
        data: [1052, 954, 4250, 740, 38]
    }];
    */
    //$(function () {
    $('#container2').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Features Schedule status'
            },
            xAxis: {
                categories: featureName
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'weeks'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: 25,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                        style: {
                            textShadow: '0 0 3px black'
                        }
                    }
                }
            },
            series: dataWeeks,
        });
   // });
}

function drawPercents(data)
{
    console.log("&&&&&&&&&&&&&&&&&&&&&");
    console.log(data);
    var parseData = JSON.parse(data, function (key, value) {
        if (key == "prevPercent") {
            return parseFloat(value);
        }
        else if (key == "curPercent") {
            return parseFloat(value);
        }
        else {
            return value;
        }
    });
   
    var featureName = new Array();
    var prevPercentArr = new Array();
    var curPercentArr = new Array();
    
    for (i = 0; i < parseData.length; i++) {
        featureName[i] = parseData[i]["featureName"];
        prevPercentArr[i] = parseData[i]["prevPercent"];
        curPercentArr[i] = parseData[i]["curPercent"];
    }
    console.log("%%%%%%%");

    /*
    var featureName = [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                    'Sunday'
    ];
    var featureData = [{
        name: 'John',
        data: [3, 4, 3, 5, 4, 10, 12]
    }, {
        name: 'Jane',
        data: [1, 3, 4, 3, 3, 5, 4]
    }];
    */
    var featureData = new Array();
    featureData[0] = {
        name: 'previous',
        color: "##0094ff",
        data : prevPercentArr
    };
    featureData[1] = {
        name: 'current',
        data: curPercentArr
    };

    console.log(featureName);
    console.log(featureData);
    $(function () {
        $('#container3').highcharts({
            chart: {
                type: 'area',
                inverted: true
            },
            title: {
                text: 'Features experiments update'
            },
            subtitle: {
                style: {
                    position: 'absolute',
                    right: '0px',
                    bottom: '10px'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -150,
                y: 100,
                floating: true,
                borderWidth: 1,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
            },
            xAxis: {
                categories: featureName
            },
            yAxis: {
                title: {
                    text: 'percents'
                },
                labels: {
                    formatter: function () {
                        return this.value;
                    }
                },
                min: 0,
                max:100
            },
            plotOptions: {
                area: {
                    fillOpacity: 0.5
                }
            },
            series:featureData
        });
    });
}

function parseFeartureName(featureName, name) {
    num = 0;
    for (num = 1; num < featureName.length; num++)
        if (featureName[num] == name)
            return num;
}

function drawBubble(data)
{
    console.log("$$$$$$$$$$$$$$$$$$$");
    console.log(data);
    
  /*
    console.log("$$$$$$$$$$$$$$$$$$$");
    console.log(parseData);
    */
    //var featureName = ["", "feature 1", "feature 2", "feature 3", "feature 4", "feature 5"];
    var featureName = new Array();
    featureName[0] = "";
    for (i = 0; i < data.length; i++) {
        featureName[i + 1] = data[i]["featureName"];
    }
    var personName = new Array();
    k = 0;
    for (i = 0; i < data.length; i++) {
        j = 0;
        for (j = 0; j < k; j++) {
            if (data[i]["personName"] == personName[j])
                break;
        }
        if (j != k)
            continue;
        personName[k ++] = data[i]["personName"];

    }
    var seri = new Array();
    size = 12;
    for (i = 0; i < personName.length; i++) {
        size ++;
        var val = new Array();
        var count = 0;
        for (j = 0; j < data.length; j++) {
            if (data[j]["personName"] == personName[i]) {
                var temp = new Array();
                temp[0] = Date.UTC(data[j]["releaseDate"].getUTCFullYear(), data[j]["releaseDate"].getUTCMonth(), data[j]["releaseDate"].getUTCDate());
                console.log("&&&time&&&&");
                console.log(temp[0]);
                temp[1] = parseFeartureName(featureName, data[j]["featureName"]);
                temp[2] = size;
                val[count] = temp;
                count++;
            }
        }
        seri[i] = {
            name : personName[i],
            data: val,
            marker : {
                fillColor: {
                    radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
                    stops: [
                        [0, 'rgba(255,255,255,0.5)'],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[i]).setOpacity(0.5).get('rgba')]
                    ]
                },
            }
        }
        console.log(seri[i]);
    }
    for (i = 0; i < seri.length; i++) {
        console.log("$$$$$$$$$$$$$$$$$###############");
        console.log(seri[i]["data"]);
    }
        $('#container4').highcharts({

            chart: {
                type: 'bubble',
                plotBorderWidth: 1,
                zoomType: 'xy'
            },

            title: {
                text: 'person in features'
            },

            xAxis: {
                type: 'datetime'
            },

            plotOptions: {
                series: {
                    pointStart: Date.UTC(2015, 0, 1),
                    pointInterval: 24 * 3600 * 1000 // one day
                }
            },

            yAxis: {
                categories: featureName,
                startOnTick: false,
                endOnTick: false
            },
            tooltip:{
                formatter:function(){
		
                    return Highcharts.dateFormat("%b %e, %Y", this.x) + "<br/>" + "feature name: " + featureName[this.y];
                }
            },

            series: seri,
               

        });

}
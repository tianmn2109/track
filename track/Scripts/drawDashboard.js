
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
//获取每个feature在new active  done 三个阶段经历的时间数据  并调用画图函数画图
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
             drawPercents2(data);
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
//获取tfs的版本号
function getTFSRelease() {
    console.log("hello for tfs release");
    // $.getJSON('./Track/getJson', function (data) {
    $.ajax({
        url: "/Track/responseTFSRelease",
        async: false,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (data) {
             console.log("hello for tfs");
             console.log(data);

            //  var d = JSON.parse(data, function (key, value) {

            //        return value;

            // });

            TFSReleaseTable(data);
            //       drawWeeks2(data);

        }
    })

}

function getCommingWeek()
{
    $.ajax({
        url: "/Track/responseCommingTable",
        async: false,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            //      drawWeeks(data);
            console.log("hello for get comming week");
            console.log(data);
            drawWeeks3(data);

        }
    })
}
//获取本月每一周将要goout的feature
function getGoOutWeek() {
    $.ajax({
        url: "/Track/responseGoOutTable",
        async: false,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            //      drawWeeks(data);
            console.log("hello for get go out week");
            console.log(data);
            //画图函数
            drawWeeks4(data);

        }
    })
}
//每个人都在哪些feature  什么时候被释放

function getPersonFeatures() {
    console.log("hello for get person f1");
    $.ajax({
        url: "/Track/responsePersonFeature",
        async: false,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            //      drawWeeks(data);
            console.log("hello for get person feature");
            console.log(data);
            //drawWeeks4(data);
            drawPersonTable(data);
        }
    })
}
//获取每个feature中每个人的release date
function getProjFeatures() {
    console.log("hello for get person f1");
    $.ajax({
        url: "/Track/responseFeatureAttr",
        async: false,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            //      drawWeeks(data);
            console.log("hello for get person feature");
            console.log(data);
            //drawWeeks4(data);
            // drawPersonTable(data);
            drawFeatureTable(data);
        }
    })
}
//获取 每个人在哪个feature  什么时候可以被释放
function getNeedResources() {
    console.log("hello for resources");
    // $.getJSON('./Track/getJson', function (data) {
    $.ajax({
        url: "/Track/responseNeedResource",
        async: false,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            // console.log("hello for test");
            // console.log(data);

            //  var d = JSON.parse(data, function (key, value) {

            //        return value;

            // });

            drawPie(data);
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
            },
            
        },
        yAxis: {
            min: 0,
            title: {
                text: 'time (weeks)',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            },
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
        if (key == "newWeeks") {
            return parseInt(value);
        }
        else if (key == "activeWeeks") {
            return parseInt(value);
        }
        else if (key == "delayWeeks") {
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
    var featureID = new Array();
    var featureDis = new Array();
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@");
    console.log(parseData[0]["featureName"]);
    console.log(parseData[0]["newWeeks"]);
    console.log("@@@@@@@@@@@@@@@@@@@");
    for (i = 0; i < parseData.length; i++) {
        featureName[i] = parseData[i]["name"];
        currentStageWeeks[i] = parseData[i]["newWeeks"];
        nextStageWeeks[i] = parseData[i]["activeWeeks"];
        delayStageWeeks[i] = parseData[i]["delayWeeks"];
        featureID[i] = parseData[i]["ID"];
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        console.log(featureName[i]);
        console.log("-------------------------------");
        featureDis[i] = { "id": featureID[i], "name": featureName[i] };
    }
    dataWeeks[2] = {
        name: 'New stages:',
        data: currentStageWeeks
    };
    dataWeeks[1] = {
        name: 'Active stage:',
        color: "#90ed7d",
        data: nextStageWeeks
    };
    dataWeeks[0] = {
        name: 'Exit review stage:',
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
                type: 'column',
                inverted: true
            },
            title: {
                text: 'Features Schedule status'
            },
            xAxis: {
                categories: featureDis,
                labels: {
                    formatter: function () {
                        return this.value.id;//这里设置x轴显示的内容,Y轴同理设置yAxis的这个属性
                    }
                }
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
                },
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
               // pointFormat: 'this.: {point.y} weeks<br/>Total: {point.stackTotal} weeks'
                formatter: function () {
                    return '<span style="font-size: 12px">' + this.x.name + '<br/>' + "weeks spend in three stages" + '</span>';
                }
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

function drawWeeks3(data) {
    console.log("XXXXXX draw weeks 3");
    console.log(data);
    var parseData = JSON.parse(data, function (key, value) {
        if (key == "week") {
            return parseInt(value);
        }
        else {
            return value;
        }
    });
    console.log("()()()(");
    console.log(parseData);
    var featureName = new Array();
    var comming = new Array();
    var dataWeeks = new Array();
   
    for (i = 0; i < parseData.length; i++) {
        featureName[i] = parseData[i]["featureName"];
        comming[i] = parseData[i]["week"];
    }
    console.log(featureName);
    console.log(comming);
    var com = new Array();
    com[0] = comming;
    dataWeeks[0] = {
        name: 'Comming features',
        data: comming
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
    $('#container8').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Features will come'
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
            tickInterval: 1,
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


function drawWeeks4(data) {
    console.log("XXXXXX draw weeks 4");
    console.log(data);
    var parseData = JSON.parse(data, function (key, value) {
        if (key == "week") {
            return parseInt(value);
        }
        else {
            return value;
        }
    });
    console.log("()()()(");
    console.log(parseData);
    var featureName = new Array();
    var goout = new Array();
    var dataWeeks = new Array();
    var featureID = new Array();
    var featureX = new Array();
    var featureGoOutDate = new Array();
    // featureID[0] = "";
    var currentWeek;
    for (i = 0; i < parseData.length; i++) {
        featureName[i] = parseData[i]["featureName"];
        goout[i] = parseData[i]["week"];
        featureID[i] = parseData[i]["id"];
        featureGoOutDate[i] = parseData[i]["goOutDate"];
        featureX[i] = { "id": featureID[i], "name": featureName[i], "GoOutDate": featureGoOutDate[i] };
        currentWeek = parseData[i]["weekOfMonth"];
    }
    
    console.log(featureName);
    //console.log(comming);
    dataWeeks[0] = {
        name: 'Go out features',
        data: goout
    };
    console.log("%%%%%%%");

    $('#container9').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Features will go out in this month'
        },
        subtitle: {
            text: 'current week is the ' + currentWeek + 'th week of this month'
        },
        xAxis: {
            categories: featureX,
            labels : {
                formatter : function(){
                    return this.value.id;//这里设置x轴显示的内容,Y轴同理设置yAxis的这个属性
                },
                style: { 
                    fontSize:'12px'
                }
            },
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            tickInterval: 1,
            title: {
                text: 'time (weeks)',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            },
            plotBands: [{
                from: 3,               // 标示区开始值
                to: 4,                 // 标示区结束值
                
            }]
        },
        tooltip: {
            valueSuffix: ' weeks',
            formatter: function () {
                return '<span style="font-size: 12px">' + this.x.name + '<br/>' + "will go out in the "+ this.y + 'th week of this month. <br/> Go out date: ' + this.x.GoOutDate + '</span>';
            }
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


function drawPercents2(data) {
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
        data: prevPercentArr
    };
    featureData[1] = {
        name: 'current',
        data: curPercentArr
    };

    console.log(featureName);
    console.log(featureData);
    $(function () {
        $('#container3_2').highcharts({
            chart: {
                type: 'area',
                inverted: false
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
                max: 100
            },
            plotOptions: {
                area: {
                    fillOpacity: 0.5
                }
            },
            series: featureData
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
                text: 'Person in features'
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
		
                    return "free until: " + Highcharts.dateFormat("%b %e, %Y", this.x) + "<br/>" + "feature name: " + featureName[this.y];
                }
            },

            series: seri,
               

        });

}
function testh()
{}

function TFSReleaseTable(data) {
    // 使用 $("<table></table>") 生成一个 table
    var parseData = JSON.parse(data, function (key, value) {

        return value;
    });
    console.log(parseData);
    console.log("table--------");
    var tab = $("<table class=\"table\"></table>");
    tab.append("<p>TFS Release Information </p>");
    var headTitle = $("<tr></tr>");
    headTitle.append("<th>Release Number</th>");
    headTitle.append("<th>Release Date</th>");
    tab.append(headTitle);
    for (var i = 0; i < parseData.length; i++) {
        // 每次生成一个 <tr></tr>
        var row = $("<tr></tr>");


        row.append($("<td>" + parseData[i]["releaseNum"] + "</td>"));
        row.append($("<td>" + parseData[i]["releaseDate"] + "</td>"));

        // 给 <table></table> 每次循环添加上边的 <tr>****</tr>
        tab.append(row);
    }

    console.log(tab);
    $("#tableTFS").append(tab);

}

function drawPie(data) {
    console.log("@@@##############@@@@@");
    console.log(data);

    var parseData = JSON.parse(data, function (key, value) {
        if (key == "personNeed") {
            return parseInt(value);
        }
        else {
            return value;
        }
    });
    console.log(parseData);
    var arr = new Array();
    for (i = 0; i < parseData.length; i++) {
        arr[i] = {
            name: parseData[i]["featureName"],
            y: parseData[i]["personNeed"]
        };
        console.log(arr[i]);
    }
 /*   parseData = [{
        name: "Microsoft Internet Explorer",
        y: 56.33
    }, {
        name: "Chrome",
        y: 24.03,
        sliced: true,
        selected: true
    }, {
        name: "Firefox",
        y: 10.38
    }, {
        name: "Safari",
        y: 4.77
    }, {
        name: "Opera",
        y: 0.91
    }, {
        name: "Proprietary or Undetectable",
        y: 0.2
    }];
   */
    console.log(arr);
    seri = [{
        name: "Person: ",
        colorByPoint: true,
        data: arr
    }];
  //  console.log(seri);
    $(function () {
        $('#container6').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Features need resources'
            },
            tooltip: {
                pointFormat: ' {series.name}: <b>{point.y} person</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.y} person',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: seri
        });
    });
}


function drawPersonTable(data) {
    // 使用 $("<table></table>") 生成一个 table
    var parseData = JSON.parse(data, function (key, value) {

        return value;
    });
    console.log(parseData);
    console.log("table--------");
    var tab = $("<table class=\"table\"></table>");
    tab.append("<p>Person information </p>");
    var headTitle = $("<tr></tr>");
    headTitle.append("<th>Person name</th>");
    headTitle.append("<th>Feature Name</th>");
    headTitle.append("<th>Release Date</th>");
    tab.append(headTitle);
    for (var i = 0; i < parseData.length; i++) {
        // 每次生成一个 <tr></tr>
        
        var row = "<tr>";
        var num = parseData[i]["pair"].length;
        
        //row.append($("<td rowspan=" + num + ">" + parseData[i]["name"] + "</td>"));
     //   row.append($("<td >" + parseData[i]["name"] + "</td>"));
     //   row.append($("<td>" + parseData[i]["pair"][0]["featureName"] + "</td>"));
        //  row.append($("<td>" + parseData[i]["pair"][0]["releaseDate"] + "</td>"));
        num = parseData[i]["pair"].length;
        for (j = 0; j < parseData[i]["pair"].length; j++) {
            if (j == 0) {
                row += "<td rowspan=" + num  + ">" + parseData[i]["name"] + "</td>";
            }
            row += "<td>" + parseData[i]["pair"][j]["featureName"] + "</td>";
            row += "<td>" + parseData[i]["pair"][j]["releaseDate"] + "</td>";
            row += "</tr>";
    }
       

        // 给 <table></table> 每次循环添加上边的 <tr>****</tr>
        tab.append(row);
    }
    // 最后把生成的 <table>***</table> 放到 id=div 的控件中
   // document.getElementById("tablePerson").innerHTML = "";
    //     document.getElementById("table").write(features);
    // document.getElementById("table").innerHTML = tab;
    console.log(tab);
    $("#tablePerson").append(tab);

}

function drawFeatureTable(data) {
    // 使用 $("<table></table>") 生成一个 table
    var parseData = JSON.parse(data, function (key, value) {

        return value;
    });
    console.log(parseData);
    console.log("table--------");
    var tab = $("<table class=\"table\"></table>");
    tab.append("<p>Features' information </p>");
    var headTitle = $("<tr></tr>");
    headTitle.append("<th>Feature name</th>");
    headTitle.append("<th>Person Name</th>");
    headTitle.append("<th>Release Date</th>");
    tab.append(headTitle);
    for (var i = 0; i < parseData.length; i++) {
        // 每次生成一个 <tr></tr>

        var row = "<tr>";
        var num = parseData[i]["pair"].length;

        //row.append($("<td rowspan=" + num + ">" + parseData[i]["name"] + "</td>"));
        //   row.append($("<td >" + parseData[i]["name"] + "</td>"));
        //   row.append($("<td>" + parseData[i]["pair"][0]["featureName"] + "</td>"));
        //  row.append($("<td>" + parseData[i]["pair"][0]["releaseDate"] + "</td>"));
        num = parseData[i]["pair"].length;
        for (j = 0; j < parseData[i]["pair"].length; j++) {
            if (j == 0) {
                row += "<td rowspan=" + num + ">" + parseData[i]["featureName"] + "</td>";
            }
            row += "<td>" + parseData[i]["pair"][j]["personName"] + "</td>";
            row += "<td>" + parseData[i]["pair"][j]["releaseDate"] + "</td>";
            row += "</tr>";
        }


        // 给 <table></table> 每次循环添加上边的 <tr>****</tr>
        tab.append(row);
    }
    // 最后把生成的 <table>***</table> 放到 id=div 的控件中
  //  document.getElementById("tableFeature").innerHTML = "";
    //     document.getElementById("table").write(features);
    // document.getElementById("table").innerHTML = tab;
    console.log(tab);
    $("#tableFeature").append(tab);

}
//创建日历框，根据用户选择的时间段查询某个时间段内的goout的feature，并以表格形式展示
function createCalendar() {
    new Calendar({
        element: $(".daterange--double"),
        earliest_date: new Date("January 1, 2000"),
        latest_date: new Date, start_date:new Date("May 1, 2015"),
        end_date: new Date("May 30, 2015"),
        callback: function () {
            //起始时间
            var ee = moment(this.start_date).format("ll"),
                a = moment(this.end_date).format("ll");
 //          console.log("Start Date: " + e + "\nEnd Date: " + a);
            //var requestURL = 'http://localhost:32020/Track/refreshComming';
/*
            var e = document.getElementById("dropbox");
            console.log("---------------");
            console.log(e);
            var strSelect = e.options[e.selectedIndex].text;
            console.log("---------------");
            console.log(strSelect);
  */        strSelect = "Go Out";
             var requestURL = createXmlHttpRequest();
            //之前有goout和comming选项，现在只保留goout选项
            if (strSelect == "Comming") {
                requestURL = 'http://localhost:32020/Track/refreshComming';
                //   requestURL.onreadystatechange = createCommingTable();
            }
            else if (strSelect == "Go Out") {
                requestURL = 'http://localhost:32020/Track/responseGoOutTable';
                // requestURL.onreadystatechange = createGoOutTable();
            }
            else {
            }
            requestURL = addURLParam(requestURL, "startDate", ee);
            requestURL = addURLParam(requestURL, "endDate", a);
            console.log(requestURL);
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("get", requestURL, false);
            //回调函数处理服务器返回的数据
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                 //   data = xmlhttp.responseText;
                    sss = JSON.parse(xmlhttp.responseText);
                    data = sss;
                    //产生goout查询表格
                    goOutTable(data);
                }
            }
            xmlhttp.send();
         /*   
                if (strSelect == "Comming") {
                    createCommingTable();
                }
                else if (strSelect == "Go Out") {
                    createGoOutTable();
                }
                else {
                }
                */
            //     createTable();
        }
    });
}

function createStageCalendar() {
    new Calendar({
        element: $(".daterange--double"),
        earliest_date: new Date("January 1, 2000"),
        latest_date: new Date, start_date:
            new Date("May 1, 2015"),
        end_date: new Date("May 31, 2015"),
        callback: function () {
           
           

            //     createTable();
        }
    });
}


var global_i = 9;

function createTable() {

    // 使用 $("<table></table>") 生成一个 table
    console.log("table--------");
    var tab = $("<table class=\"table\"></table>");

    var headTitle = $("<tr></tr>");
    headTitle.append("<th>feature</th>");
    headTitle.append("<th>current stage</th>");
    headTitle.append("<th>expected stage</th>");
    headTitle.append("<th>delay weeks</th>");
    tab.append(headTitle);
    // 3 行循环3次'
    global_i--;
    for (var i = 1; i <= global_i; i++) {
        // 每次生成一个 <tr></tr>
        var row = $("<tr></tr>");
        // 4 列循环 4 次
        for (var j = 1; j <= 4; j++) {
            // 给 <tr></tr> append（添加）  <td>i行j列</td>
            row.append($("<td>" + i + "行" + j + "列" + "</td>"));
        }
        // 给 <table></table> 每次循环添加上边的 <tr>****</tr>
        tab.append(row);
    }
    // 最后把生成的 <table>***</table> 放到 id=div 的控件中
    document.getElementById("table").innerHTML = "";
    //     document.getElementById("table").write(features);
    // document.getElementById("table").innerHTML = tab;
    $("#table").append(tab);
}

function createCommingTable() {
    console.log("hello for comming");
    // $.getJSON('./Track/getJson', function (data) {
    $.ajax({
        url: "/Track/responseCommingTable",
        async: false,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            //      drawWeeks(data);

            console.log(data);
            commingTable(data);

        }
    })
}

function createGoOutTable() {
    console.log("hello for go out");
    // $.getJSON('./Track/getJson', function (data) {
    $.ajax({
        url: "/Track/responseGoOutTable",
        async: false,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            //      drawWeeks(data);
            console.log(data);
     //       if (this.status == 200) {
                goOutTable(data);
       //     }
        }
    })
}

function commingTable(data) {
    // 使用 $("<table></table>") 生成一个 table
    var parseData = JSON.parse(data, function (key, value) {

        return value;
    });
    console.log(parseData);
    console.log("table--------");
    var tab = $("<table class=\"table\"></table>");

    var headTitle = $("<tr></tr>");
    headTitle.append("<th>Feature</th>");
    headTitle.append("<th>Comming Date</th>");
    tab.append(headTitle);
    for (var i = 0; i < parseData.length; i++) {
        // 每次生成一个 <tr></tr>
        var row = $("<tr></tr>");


        row.append($("<td>" + parseData[i]["featureName"] + "</td>"));
        row.append($("<td>" + parseData[i]["commingDate"] + "</td>"));

        // 给 <table></table> 每次循环添加上边的 <tr>****</tr>
        tab.append(row);
    }
    // 最后把生成的 <table>***</table> 放到 id=div 的控件中
    document.getElementById("table").innerHTML = "";
    //     document.getElementById("table").write(features);
    // document.getElementById("table").innerHTML = tab;
    console.log(tab);
    $("#table").append(tab);

}

function goOutTable(data) {
    // 使用 $("<table></table>") 生成一个 table
    var parseData = JSON.parse(data, function (key, value) {

        return value;
    });
    console.log(parseData);
    console.log("table--------");
    var tab = $("<table class=\"table\"></table>");

    var headTitle = $("<tr></tr>");
    headTitle.append("<th>Feature</th>");
    headTitle.append("<th>Go Out Date</th>");
    tab.append(headTitle);
    for (var i = 0; i < parseData.length; i++) {
        // 每次生成一个 <tr></tr>
        var row = $("<tr></tr>");


        row.append($("<td>" + parseData[i]["featureName"] + "</td>"));
        row.append($("<td>" + parseData[i]["goOutDate"] + "</td>"));

        // 给 <table></table> 每次循环添加上边的 <tr>****</tr>
        tab.append(row);
    }
    // 最后把生成的 <table>***</table> 放到 id=div 的控件中
    document.getElementById("table").innerHTML = "";
    //     document.getElementById("table").write(features);
    // document.getElementById("table").innerHTML = tab;
    console.log(tab);
    $("#table").append(tab);

}



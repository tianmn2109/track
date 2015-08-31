console.log("hello for test0");
$(function () {
    console.log("hello for test1");
   // $.getJSON('./Track/getJson', function (data) {
    $.ajax( {
        url:"/Track/getJson",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log("hello for test");
            console.log(data);
            
            var d = JSON.parse(data, function (key, value) {
                console.log("key = %s value = %s", key, value);
                if (key == "date") {
                    var re = /-?\d+/;
                    var m = re.exec(value);
                    var dd = new Date(parseInt(m[0]));
                    return dd;
            }
            else {
                    return value;
        }
            });
          //  console.log(d["date"]);
            //  console.log(d["week"]);
            for (var i = 0; i < d.length; i++) {
                console.log(d[i]["date"] + "   "  + d[i]["week"]);
            }
            var d;


            $('#container').highcharts({
                chart: {
                    zoomType: 'x'
                },
                title: {
                    text: 'USD to EUR exchange rate over time'
                },
                subtitle: {
                    text: document.ontouchstart === undefined ?
                            'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
                },
                xAxis: {
                    type: 'datetime'
                },
                yAxis: {
                    title: {
                        text: 'Exchange rate'
                    }
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    area: {
                        fillColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, Highcharts.getOptions().colors[0]],
                                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                            ]
                        },
                        marker: {
                            radius: 2
                        },
                        lineWidth: 1,
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        threshold: null
                    }
                },

                series: [{
                    type: 'area',
                    name: 'USD to EUR',
                    data: d
                }]
            });


        }
        })
       // console.log("hello for test");
        
       
});
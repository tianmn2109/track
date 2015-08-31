
$(function ()
{   
    var jData = [{ "time": Date.UTC(2013, 5, 2), "value": 0.7695 },
    {"time":Date.UTC(2013,9,4), "value":1.7695 },
    ];
    console.log("json test");
    var result = JSON.stringify(jData);
    return result;
})


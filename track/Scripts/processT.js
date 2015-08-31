console.log("hello for test0");
/*

var myList = [{ "name": "abc", "age": 50 },
                          { "age": "25", "hobby": "swimming" },
                          { "name": "xyz", "hobby": "programming" }];

String.prototype.format = function () {
    var args = arguments;

    return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined' ? args[number] :
                                                    '{' + number + '}';
    });
};

jsonHtmlTable = ConvertJsonToTable(myList);
function ConvertJsonToTable(parsedJson, tableId, tableClassName, linkText) {
    //Patterns for links and NULL value
    var italic = '<i>{0}</i>';
    var link = linkText ? '<a href="{0}">' + linkText + '</a>' :
                          '<a href="{0}">{0}</a>';

    //Pattern for table
    var idMarkup = tableId ? ' id="' + tableId + '"' :
                             '';

    var classMarkup = tableClassName ? ' class="' + tableClassName + '"' :
                                       '';

    var tbl = '<table border="1" cellpadding="1" cellspacing="1"' + idMarkup + classMarkup + '>{0}{1}</table>';

    //Patterns for table content
    var th = '<thead>{0}</thead>';
    var tb = '<tbody>{0}</tbody>';
    var tr = '<tr>{0}</tr>';
    var thRow = '<th>{0}</th>';
    var tdRow = '<td>{0}</td>';
    var thCon = '';
    var tbCon = '';
    var trCon = '';

    console.log("%%%%%%%%%%%%%%%");

    if (parsedJson) {
        var isStringArray = typeof (parsedJson[0]) == 'string';
        var headers;

        // Create table headers from JSON data
        // If JSON data is a simple string array we create a single table header
        if (isStringArray)
            thCon += thRow.format('value');
        else {
            // If JSON data is an object array, headers are automatically computed
            if (typeof (parsedJson[0]) == 'object') {
                headers = array_keys(parsedJson[0]);

                for (i = 0; i < headers.length; i++)
                    thCon += thRow.format(headers[i]);
            }
        }
        th = th.format(tr.format(thCon));

        // Create table rows from Json data
        if (isStringArray) {
            for (i = 0; i < parsedJson.length; i++) {
                tbCon += tdRow.format(parsedJson[i]);
                trCon += tr.format(tbCon);
                tbCon = '';
            }
        }
        else {
            if (headers) {
                var urlRegExp = new RegExp(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&#\/%?=~_|!:,.;]*[-A-Z0-9+&#\/%=~_|])/ig);
                var javascriptRegExp = new RegExp(/(^javascript:[\s\S]*;$)/ig);

                for (i = 0; i < parsedJson.length; i++) {
                    for (j = 0; j < headers.length; j++) {
                        var value = parsedJson[i][headers[j]];
                        var isUrl = urlRegExp.test(value) || javascriptRegExp.test(value);

                        if (isUrl)   // If value is URL we auto-create a link
                            tbCon += tdRow.format(link.format(value));
                        else {
                            if (value) {
                                if (typeof (value) == 'object') {
                                    //for supporting nested tables
                                    tbCon += tdRow.format(ConvertJsonToTable(eval(value.data), value.tableId, value.tableClassName, value.linkText));
                                } else {
                                    tbCon += tdRow.format(value);
                                }

                            } else {    // If value == null we format it like PhpMyAdmin NULL values
                                tbCon += tdRow.format(italic.format(value).toUpperCase());
                            }
                        }
                    }
                    trCon += tr.format(tbCon);
                    tbCon = '';
                }
            }
        }
        tb = tb.format(trCon);
        tbl = tbl.format(th, tb);
        console.log(tbl);
        return tbl;
    }
    return null;
}


function array_keys(input, search_value, argStrict) {
    var search = typeof search_value !== 'undefined', tmp_arr = [], strict = !!argStrict, include = true, key = '';

    if (input && typeof input === 'object' && input.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array
        return input.keys(search_value, argStrict);
    }

    for (key in input) {
        if (input.hasOwnProperty(key)) {
            include = true;
            if (search) {
                if (strict && input[key] !== search_value)
                    include = false;
                else if (input[key] != search_value)
                    include = false;
            }
            if (include)
                tmp_arr[tmp_arr.length] = key;
        }
    }
    return tmp_arr;
};

 


 */






$(function () {
    console.log("hello for test1");
   // $.getJSON('./Track/getJson', function (data) {
    $.ajax({
        url: "/Track/getJson",
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

            for (var i = 0; i < d.length; i++) {
                console.log(d[i]["date"] + "   " + d[i]["week"]);
            }
            jsonHtmlTable = ConvertJsonToTable(myList);

        }
    })
       
});
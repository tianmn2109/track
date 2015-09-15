function createCalendar() {
    new Calendar({
        element: $(".daterange--double"),
        earliest_date: new Date("January 1, 2000"),
        latest_date: new Date, start_date:
            new Date("May 1, 2015"),
        end_date: new Date("May 31, 2015"),
        callback: function () {
            var ee = moment(this.start_date).format("ll"),
                a = moment(this.end_date).format("ll");
            console.log("Start Date: " + e + "\nEnd Date: " + a);
            //var requestURL = 'http://localhost:32020/Track/refreshComming';

            var e = document.getElementById("dropbox");
            console.log("---------------");
            console.log(e);
            var strSelect = e.options[e.selectedIndex].text;
            console.log("---------------");
            console.log(strSelect);
            var requestURL = createXmlHttpRequest();
            if (strSelect == "Comming") {
                requestURL = 'http://localhost:32020/Track/refreshComming';
                //   requestURL.onreadystatechange = createCommingTable();
            }
            else if (strSelect == "Go Out") {
                requestURL = 'http://localhost:32020/Track/refreshGoOut';
                // requestURL.onreadystatechange = createGoOutTable();
            }
            else {
            }
            requestURL = addURLParam(requestURL, "startDate", ee);
            requestURL = addURLParam(requestURL, "endDate", a);
            console.log(requestURL);
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("get", requestURL, false);
            xmlhttp.send();
            if (strSelect == "Comming") {
                createCommingTable();
            }
            else if (strSelect == "Go Out") {
                createGoOutTable();
            }
            else {
            }
            //     createTable();
        }
    });
}
//XmlHttpRequest对象    
function createXmlHttpRequest(){    
    if(window.ActiveXObject){ //如果是IE浏览器    
        return new ActiveXObject("Microsoft.XMLHTTP");    
    }else if(window.XMLHttpRequest){ //非IE浏览器    
        return new XMLHttpRequest();    
    }    
}

function addURLParam(url, name, value)
{
    url += (url.indexOf("?") == -1 ? "?" : "&");
    url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
    return url;
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
       global_i --;
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
               goOutTable(data);
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



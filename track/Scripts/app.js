
new Calendar({
    element: $(".daterange--double"),
    earliest_date: new Date("January 1, 2000"),
    latest_date: new Date, start_date:
        new Date("May 1, 2015"),
    end_date: new Date("May 31, 2015"),
    callback: function () {
        var e = moment(this.start_date).format("ll"),
            a = moment(this.end_date).format("ll");
        console.log("Start Date: " + e + "\nEnd Date: " + a);
        var requestURL = 'http://localhost:32020/Track/refreshComming';
        requestURL = addURLParam(requestURL, "startDate", e);
        requestURL = addURLParam(requestURL, "endDate", a);
        console.log(requestURL);
        var xmlhttp = new XMLHttpRequest();
    //    xmlhttp.open("get", requestURL, false);
   //     xmlhttp.send();
        createTable();
    }
});
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



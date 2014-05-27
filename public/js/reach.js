var reachfunc = $(function reachgraph(reachdate) {
    var margin = {top: 20, right: 30, bottom: 30, left: 45},
        width = 716 - margin.left - margin.right,
        height = 303 - margin.top - margin.bottom;

    //var reachdata =  $.ajax("/reachdata/25-05-2014");

    var data;

    data = [
        {"timestamp": 1, "value": 500},
        {"timestamp": 2, "value": 450},
        {"timestamp": 3, "value": 400},
        {"timestamp": 4, "value": 380},
        {"timestamp": 5, "value": 360},
        {"timestamp": 6, "value": 350},
        {"timestamp": 7, "value": 350},
        {"timestamp": 8, "value": 340},
        {"timestamp": 9, "value": 330},
        {"timestamp": 10, "value": 320},
        {"timestamp": 11, "value": 310},
        {"timestamp": 12, "value": 310},
        {"timestamp": 13, "value": 295},
        {"timestamp": 14, "value": 290},
        {"timestamp": 15, "value": 280},
        {"timestamp": 16, "value": 300},
        {"timestamp": 17, "value": 300},
        {"timestamp": 18, "value": 300},
        {"timestamp": 19, "value": 190},
        {"timestamp": 20, "value": 200},
        {"timestamp": 21, "value": 210},
        {"timestamp": 22, "value": 220},
        {"timestamp": 23, "value": 230},
        {"timestamp": 24, "value": 240},
        {"timestamp": 25, "value": 250},
        {"timestamp": 26, "value": 260},
        {"timestamp": 27, "value": 270},
        {"timestamp": 28, "value": 280},
        {"timestamp": 29, "value": 290},
        {"timestamp": 30, "value": 300},
        {"timestamp": 31, "value": 310},
        {"timestamp": 32, "value": 500},
        {"timestamp": 33, "value": 600},
        {"timestamp": 34, "value": 700},
        {"timestamp": 35, "value": 800},
        {"timestamp": 36, "value": 900},
        {"timestamp": 37, "value": 1000},
        {"timestamp": 38, "value": 1100},
        {"timestamp": 39, "value": 1200},
        {"timestamp": 40, "value": 1300},
        {"timestamp": 41, "value": 1400},
        {"timestamp": 42, "value": 1500},
        {"timestamp": 43, "value": 1600},
        {"timestamp": 44, "value": 1700},
        {"timestamp": 45, "value": 1800},
        {"timestamp": 46, "value": 1900},
        {"timestamp": 47, "value": 2000},
        {"timestamp": 48, "value": 2100},
        {"timestamp": 49, "value": 2200},
        {"timestamp": 50, "value": 2300},
        {"timestamp": 51, "value": 2400},
        {"timestamp": 52, "value": 2500},
        {"timestamp": 53, "value": 2600},
        {"timestamp": 54, "value": 2700},
        {"timestamp": 55, "value": 2800},
        {"timestamp": 56, "value": 2900},
        {"timestamp": 57, "value": 3000},
        {"timestamp": 58, "value": 3100},
        {"timestamp": 59, "value": 3200},
        {"timestamp": 60, "value": 3300},
        {"timestamp": 61, "value": 3400},
        {"timestamp": 62, "value": 4500},
        {"timestamp": 63, "value": 3200},
        {"timestamp": 64, "value": 3100},
        {"timestamp": 65, "value": 3000},
        {"timestamp": 66, "value": 2900},
        {"timestamp": 67, "value": 2800},
        {"timestamp": 68, "value": 2700},
        {"timestamp": 69, "value": 2600},
        {"timestamp": 70, "value": 2500},
        {"timestamp": 71, "value": 2400},
        {"timestamp": 72, "value": 2300},
        {"timestamp": 73, "value": 2200},
        {"timestamp": 74, "value": 2100},
        {"timestamp": 75, "value": 2000},
        {"timestamp": 76, "value": 2100},
        {"timestamp": 77, "value": 2200},
        {"timestamp": 78, "value": 2300},
        {"timestamp": 79, "value": 2400},
        {"timestamp": 80, "value": 2500},
        {"timestamp": 81, "value": 2600},
        {"timestamp": 82, "value": 2700},
        {"timestamp": 83, "value": 2800},
        {"timestamp": 84, "value": 2900},
        {"timestamp": 85, "value": 3000},
        {"timestamp": 86, "value": 2900},
        {"timestamp": 87, "value": 2800},
        {"timestamp": 88, "value": 2700},
        {"timestamp": 89, "value": 2500},
        {"timestamp": 90, "value": 2000},
        {"timestamp": 91, "value": 1900},
        {"timestamp": 92, "value": 1600},
        {"timestamp": 93, "value": 1400},
        {"timestamp": 94, "value": 1100},
        {"timestamp": 95, "value": 800},
        {"timestamp": 96, "value": 599}
    ];

    $.getJSON("/reachdata/25-05-2014",
        function(jsondata) {
            console.log(jsondata);
            data = jsondata.reachdata;
        }
    );
    $.ajax({
        url: 'http://localhost:3030/reachdata/25-05-2014',
        type: 'get',
        success: function (rdata) {
            console.log('success', rdata);
            data = rdata;
            console.log(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('error', errorThrown);
        }
    });

    function makeAjaxCall() {
        $.get('/reachdata/25-05-2014', function(result) {
            //alert(result);
        });
    }

    makeAjaxCall(); // this will alert the result


    //data = reachdata.responseJSON;
    //console.log(reachdata);
// Scale bar
    var yMin = d3.min(data.map(function (d) {
        return d.value;
    }));
    var yMax = d3.max(data.map(function (d) {
        return d.value;
    }));
    var xMin = d3.min(data.map(function (d) {
        return d.timestamp;
    }));
    var xMax = d3.max(data.map(function (d) {
        return d.timestamp;
    }));

    var y = d3.scale.linear()
        .domain([0, yMax])
        .range([height, 0]);
    var x = d3.scale.linear()
        .domain([0, xMax])
        .range([margin.left, width + margin.left]);

    var xAxis = d3.svg.axis().scale(x).orient("bottom");
    var yAxis = d3.svg.axis().scale(y).orient("left");

    var padding = 2;

    var svg = d3.select("#reach-plot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    var h = height + margin.top;

    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d, i) {
            return x(i);
        })
        .attr("y", function (d) {
            return margin.top + y(d.value);
        })
        .attr("width", width / data.length - padding)
        .attr("height", function (d) {
            return height - y(d.value);
        })
        .attr("fill", "#52b9e9")
        .append("title")
        .transition()
        .duration(750)
        .text(function (d, i) {
            return d.value + " " + i;
        })
    ;

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(yAxis);


    svg.append("g").attr("class", "x axis")
        .attr("transform", "translate(0," + h + ")")
        .call(xAxis);
});
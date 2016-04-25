/** MOCK DATA **/

var data_hourly = {
    labels: ["9:00am", "10:00am", "11:00am", "12:00am", "1:00pm", "2:00pm", "3:00pm", "4:00pm"],
    datasets: [
        {
            label: "",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [1, 4, 3, 5, 7, 6, 8, 9]
        },
    ]
};

var data_daily = {
    labels: ["Apr 3", "Apr 4", "Apr 5", "Apr 6", "Apr 7", "Apr 8", "Apr 9", "Apr 10"],
    datasets: [
        {
            label: "",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [5, 8, 7, 16, 8, 14, 15, 19]
        },
    ]
};


var data_weekly = {
    labels: ["Apr 3 - 9", 
            "Apr 10 - 16", 
            "Apr 17 - 23", 
            "Apr 24 - 30", 
            "May 1 - 7", 
            "May 8 - 14",
            "May 15 - 21",
            "May 22 - 28"],
    datasets: [
        {
            label: "",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [22, 25, 26, 27, 21, 19, 20, 19]
        },
    ]
};

var data_monthly = {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov"],
    datasets: [
        {
            label: "",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data:[89, 76, 73, 81, 89, 90, 91, 88]
        },
    ]
};

var user = {
        "firstName": "Brendan",
        "lastName": "Whiting",
        "avatar": "http://lorempixel.com/40/40/",
        "alert": {"text": "Nullam quis risus eget urna mollis ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit. Curabitur blandit tempus porttitor."},
        "notifs": [{"text": "JJ invited you to Showshoe Party"}, {"text": "Allie accepted your friend request"}],
        "data": {
            "hourly": data_hourly,
            "daily": data_daily,
            "weekly": data_weekly,
            "monthly": data_monthly
        }
    };

/** YOUR APP **/

var app = angular.module('yourApp', []);
app.controller('yourCtrl', function($scope) {
    $scope.user = user;
})

var $menu = $('.menu');
var $side_nav = $('.side-nav');
var $header = $('header');
var $heading_container = $('.heading-container');
var $x = $('.x');
var $main = $('main');

/* Toggle menu between hamburger and x */

$menu.click(function() {
    console.log("hey");
    $side_nav.toggleClass('show-nav');
    $header.toggleClass('show-nav');
    $menu.toggleClass('fa fa-times');
    $menu.toggleClass('fa fa-bars');
    $x.toggleClass('show-nav');
    $heading_container.toggleClass('show-nav');
    $main.toggleClass('show-nav');
});

/* Make notifs dropdown appear on click */

var $notifs_container = $('.notifs-container');
var $notifs_dropdown = $('.notifs-dropdown');
$notifs_container.click(function() {
    $notifs_dropdown.toggleClass('visible');
    $notifs_container.removeClass('new');
})

/* Hide alert div when x is clicked */

var $alertx = $('.alertx');
$alertx.click(function() {
    $(this).parent().hide();
})

/* LINE CHART */

function updateChart(new_data, step_width) {
    $("#lineChart").empty();
    $("#lineChart").html('<canvas id="lineChart"><canvas>');
    var ctx = $("#lineChart").get(0).getContext("2d");
    var myNewChart = new Chart(ctx).Line(new_data, {
        responsive: true,
        bezierCurve : true,
        scaleOverride: true,
        scaleStepWidth: step_width,
        scaleStartValue: 0,
        scaleSteps: 5,
        maintainAspectRatio: true
    });
}

updateChart(user.data.weekly, 10);

/* Fancy chart radio toggle */

$labels = $('.label');
$floating_bg = $('.floating-bg');
$labels.click(function() {
    $labels.removeClass('selected');
    $(this).addClass('selected');
    var index = $(this).attr("data-index");
    var new_margin = "{}px".replace("{}", 85 * index);
    $floating_bg.css('margin-left', new_margin);
    if (index === "0") {
        updateChart(user.data.hourly, 2);
    } else if (index === "1") {
        updateChart(user.data.daily, 4);
    } else if (index === "2") {
        updateChart(user.data.weekly, 10);
    } else if (index === "3") {
        updateChart(user.data.monthly, 20);
    }
})

/* BAR CHART */

var bar_daily = {
    labels: ["Apr 3", "Apr 4", "Apr 5", "Apr 6", "Apr 7", "Apr 8", "Apr 9", "Apr 10"],
    datasets: [
        {
            label: "",
            fillColor: "#7479BD",
            strokeColor: "#7479BD",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [5, 8, 7, 16, 8, 14, 15, 19]
        },
    ]
};

var ctx2 = $("#barChart").get(0).getContext("2d");
var myNewChart = new Chart(ctx2).Bar(bar_daily, {
    responsive: true
});

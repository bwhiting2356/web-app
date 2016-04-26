var hourly_labels = ["9:00am", 
                    "10:00am", 
                    "11:00am", 
                    "12:00am", 
                    "1:00pm", 
                    "2:00pm", 
                    "3:00pm"];


var daily_labels = ["Apr 3", 
                    "Apr 4", 
                    "Apr 5", 
                    "Apr 6", 
                    "Apr 7", 
                    "Apr 8", 
                    "Apr 9"];

var weekly_labels = ["Apr 3 - 9", 
                    "Apr 10 - 16", 
                    "Apr 17 - 23", 
                    "Apr 24 - 30", 
                    "May 1 - 7", 
                    "May 8 - 14",
                    "May 15 - 21"];

var monthly_labels = ["Apr", 
                    "May", 
                    "Jun", 
                    "Jul", 
                    "Aug", 
                    "Sept", 
                    "Oct"];


Chart.defaults.global.responsive = true;

function drawLineChart(labels, data, step_width) {
    $("#lineChart").empty();
    $("#lineChart").html('<canvas id="lineChart" height="100"><canvas>');
    var ctx = $("#lineChart");
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: "",
                    backgroundColor: "rgba(116, 121, 189, 0.2)",
                    borderColor: "rgba(116, 121, 189, 1)",
                    borderWidth: 1,
                    pointBorderColor: "rgba(116, 121, 189, 1)",
                    pointBorderWidth: 1.5,
                    pointBackgroundColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: data
                },
            ]
        },
        options: {
            bezierCurve : true,
            // scaleOverride: true,
            scaleStepWidth: step_width,
            scaleStartValue: 0,
            scaleSteps: 5,
            maintainAspectRatio: true,
            legend: {
                display: false
            }
        }
    });
}

function drawBarChart(labels, data) {
    var ctx = $("#barChart");
    var myBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: "",
                    backgroundColor: "#7479BD",
                    borderColor: "#7479BD",
                    strokeColor: "#7479BD",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: data
                },
            ],
        },
        options: {
            legend: {
                display: false
            }
        }
    });
}

function drawDoughnutChart(data) {
    var ctx = $("#doughnutChart");
    var myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["Phones", "Tablets", "Desktop"],
            datasets: [
                {
                    data: data,
                    backgroundColor: [
                        "#7479BD",
                        "#83C991",
                        "#76B2BE"
                    ],
                    hoverBackgroundColor: [
                        "#7479BD",
                        "#83C991",
                        "#76B2BE"
                    ]
                }]
        },
        options: {
            legend: {
                position: "bottom",
                labelsboxWidth: 25 // why isn't this working?
            }
        }
    });
}

var app = angular.module('yourApp', []);
app.controller('yourCtrl', function($scope, $http) {
    $http.get('/mock/user_data.js', {}).then(function successCallback(response) {
        $scope.user = response.data;
        // Put in weekly chart as default //
        drawLineChart(weekly_labels, $scope.user.data.weekly, 10);
        // Draw daily traffic and mobile users charts
        drawBarChart(daily_labels, $scope.user.data.daily);
        drawDoughnutChart($scope.user.mobile_users);
    }, function errorCallback(response) {
        console.log(response);
    });
});

app.controller('chartToggle', function($scope) {
    $labels = $('.toggle-label');
    $floating_bg = $('.floating-bg');
    $labels.click(function() {
        $labels.removeClass('selected');
        $(this).addClass('selected');
        var index = $(this).attr("data-index");
        var new_margin = "{}px".replace("{}", 85 * index);
        $floating_bg.css('margin-left', new_margin);
        if (index === "0") {
            drawLineChart(hourly_labels, $scope.user.data.hourly, 2);
        } else if (index === "1") {
            drawLineChart(daily_labels, $scope.user.data.daily, 4);
        } else if (index === "2") {
            drawLineChart(weekly_labels, $scope.user.data.weekly, 10);
        } else if (index === "3") {
            drawLineChart(monthly_labels, $scope.user.data.monthly, 20);
        }
    });
});

$(document).ready(function() {
    var $menu = $('.menu');
    var $side_nav = $('.side-nav');
    var $header = $('header');
    var $heading_container = $('.heading-container');
    var $x = $('.x');
    var $main = $('main');

    /* Toggle menu between hamburger and x */

    $menu.click(function() {
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
    });

    /* Hide alert div when x is clicked */

    var $alertx = $('.alertx');
    $alertx.click(function() {
        $(this).parent().hide();
    });
});
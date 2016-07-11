String.prototype.supplant = function (o) {
    return this.replace(/{([^{}]*)}/g,
        function (a, b) {
            var r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
};

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

function drawBarChart(labels, user, avg_user) {
    var ctx = $("#barChart");
    var myBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: "You",
                    backgroundColor: "#7479BD",
                    strokeColor: "#7479BD",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: user
                },
                {
                    label: "Average User",
                    backgroundColor: "#76B2BE",
                    strokeColor: "#76B2BE",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: avg_user
                },
            ],
        },
        options: {
            legend: {
                position: "top",
                labelsboxWidth: 25 // why isn't this working?
            }
        }
    });
}

function drawDoughnutChart(data) {
    var ctx = $("#doughnutChart");
    var myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["Phones", "Tablets", "Desktop", "Magic"],
            datasets: [
                {
                    data: data,
                    backgroundColor: [
                        "#7479BD",
                        "#83C991",
                        "#76B2BE",
                        "#ff8080"
                    ],
                    hoverBackgroundColor: [
                        "#7479BD",
                        "#83C991",
                        "#76B2BE",
                        "#ff8080"
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

function makeNameList(members) {
    var list = [];
    for (var i = 0; i < members.length; i++) {
        var fullName = "{first} {last}".supplant(
            {first: members[i].firstName, 
            last: members[i].lastName});
        list.push(fullName);
    }
    return list;
}

function findMatches(term, members) {
    var results = [];  
    var member_list = makeNameList(members);
    for (var i = 0; i < member_list.length; i++) {
        if ((member_list[i].toLowerCase().indexOf(term.toLowerCase()) !== -1) && (term !== ""))  {
            results.push(member_list[i]);
        }
    } 
    return results;
}

var app = angular.module('yourApp', []);
app.controller('yourCtrl', function($scope, $http) {
    $http.get('./mock/user_data.js', {}).then(function successCallback(response) {
        $scope.user = response.data;
        // Put in weekly chart as default //
        drawLineChart(weekly_labels, $scope.user.data.weekly, 10);
        // Draw daily traffic and mobile users charts
        drawBarChart(daily_labels, $scope.user.data.daily, $scope.user.data.daily_avg);
        drawDoughnutChart($scope.user.mobile_users);
    }, function errorCallback(response) {
        console.log(response);
    });

    $scope.autoComplete = function() {
        $scope.user.suggested_users = findMatches($scope.message.recipient, $scope.user.members);
    };

    $scope.choose = function(user) {
        $scope.message.recipient = user;
        $scope.user.suggested_users = [];
    };

    $scope.submit = function() {
        if ((angular.isUndefined($scope.message)) || 
            (angular.isUndefined($scope.message.text) || $scope.message.text === "") && 
            (angular.isUndefined($scope.message.recipient) || $scope.message.recipient === "")) {
            $('.status').removeClass('success').addClass('error');
            $scope.status = "You need to fill out both fields.";
            console.log($scope.message);
        } else if (angular.isUndefined($scope.message.text) || $scope.message.text === "") {
            $('.status').removeClass('success').addClass('error');
            $scope.status = "You need to say something in your message.";
        } else if (angular.isUndefined($scope.message.recipient) || $scope.message.recipent === "") {
            $('.status').removeClass('success').addClass('error');
            $scope.status = "Your message needs a recipient.";
        } else {
            $('.status').removeClass('error').addClass('success');
            $scope.status = "Your message was sent successfully.";
            delete $scope.message; // message was deleted but in real life will be sent to the server
        }
    };

    $scope.reset = function() {
        if (localStorage.saved !== "true") {
            // set default settings
            $scope.settings = {
                "public": true,
                "email_notifs": true
            };
        } else {
            $scope.settings = {
                "public": localStorage.public,
                "email_notifs": localStorage.email_notifs,
                "time_zone": localStorage.time_zone
            };

            if ($scope.settings.public === "true") {
                $scope.settings.public = true;
            } else if ($scope.settings.public === "false") {
                $scope.settings.public = false;
            }

            if ($scope.settings.email_notifs === "true") {
                $scope.settings.email_notifs = true;
            } else if ($scope.settings.email_notifs === "false") {
                $scope.settings.email_notifs = false;
            }
        }
        $scope.saved_message = "";
    };

    $scope.reset();

    $scope.saveSettings = function(settings) {
        localStorage.setItem("saved", "true");
        localStorage.setItem("email_notifs", settings.email_notifs);
        localStorage.setItem("public", settings.public);
        localStorage.setItem("time_zone", settings.time_zone);
        $scope.saved_message = "Your settings are saved.";
    };

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

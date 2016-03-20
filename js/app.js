var data = {
    first_name: "Brendan",
    last_name: "Whiting",
    avatar_src: "http://lorempixel.com/45/45/",
    alerts: ["Nullam quis risus eget urna mollis ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit. Curabitur blandit tempus porttitor."],
    social_stats: {"twitter": 10345, "facebook": 8739, "google_plus": 2530},
    new_members: [
        {"name": "Victoria Chambers",
        "email": "victoria.chambers80@example.com",
        "date_joined": "10/15/15",
        "avatar_src": "http://lorempixel.com/47/47/"},
        {"name": "Dale Byrd",
        "email": "dale.bird52@example.com",
        "date_joined": "10/15/15",
        "avatar_src": "http://lorempixel.com/46/46/"},
        {"name": "Dawn Wood",
        "email": "dawn.wood16@example.com",
        "date_joined": "10/15/15",
        "avatar_src": "http://lorempixel.com/48/48/"},
        {"name": "Dan Oliver",
        "email": "dan.oliver82@example.com",
        "date_joined": "10/15/15",
        "avatar_src": "http://lorempixel.com/49/49/"},
    ],
    recent_activity: [
        {"name": "Victoria Chambers",
        "avatar_src": "http://lorempixel.com/47/47/",
        "action": "commented on",
        "target": "YourApp's SEO Tips",
        "time": "4 hours ago"},
        {"name": "Dale Byrd",
        "action": "liked the post",
        "target": "Facebook's Changes for 2016",
        "avatar_src": "http://lorempixel.com/46/46/",
        "time": "5 hours ago"},
        {"name": "Dawn Wood",
        "avatar_src": "http://lorempixel.com/48/48/",
        "action": "commented on",
        "target": "Facebook's Changes for 2016",
        "time": "5 hours ago"},
        {"name": "Dan Oliver",
        "avatar_src": "http://lorempixel.com/49/49/",
        "action": "posted",
        "target": "YourApp's SEO Tips",
        "time": "1 day ago"},
    ],
};

var alert_html = "\
<div class='alert-item'>\
    <div class='alert'>Alert</div>\
    <div class='text'>{text}</div>\
    <div class='x'>\
        <svg preserveAspectRatio='xMinYMin meet' viewBox='0 0 12 12' height='15px' width='15px'>\
            <g>\
                <path d='M8.2,6l3.3-3.3c0.6-0.6,0.6-1.6,0-2.2s-1.6-0.6-2.2,0L6,3.8L2.7,0.5c-0.6-0.6-1.6-0.6-2.2,0s-0.6,1.6,0,2.2L3.8,6L0.5,9.3   c-0.6,0.6-0.6,1.6,0,2.2c0.6,0.6,1.6,0.6,2.2,0L6,8.2l3.3,3.3c0.6,0.6,1.6,0.6,2.2,0c0.6-0.6,0.6-1.6,0-2.2L8.2,6z'></path>\
            </g>\
        </svg>\
    </div>\
</div>";

var new_member_html = "\
<div class='new-member'>\
    <div class='avatar-container'>\
        <img src='{avatar_src}' class='avatar'>\
    </div>\
    <div class='name-email-container'>\
        <div class='name'>{name}</div>\
        <div class='email'><a href='mailto:{email}'>{email}</a></div>\
    </div>\
    <div class='date'>{date}</div>\
</div>\
";

var recent_activity_html = "\
<div class='event'>\
    <div class='avatar-container'>\
        <img src='{avatar_src}' class='avatar'>\
    </div>\
    <div class='event-container'>\
        <span class='description'>{name} {action}</span>\
        <span class='target'>{target}</span>\
        <div class='time'>{time}</div>\
    </div>\
    <a href=''><i class='fa fa-chevron-right b-chevron'></i></a>\
</div>\
";

var chart_data = {
    labels: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"],
    datasets: [
        // {
        //     label: "My First dataset",
        //     fillColor: "rgba(220,220,220,0.2)",
        //     strokeColor: "rgba(220,220,220,1)",
        //     pointColor: "rgba(220,220,220,1)",
        //     pointStrokeColor: "#fff",
        //     pointHighlightFill: "#fff",
        //     pointHighlightStroke: "rgba(220,220,220,1)",
        //     data: [65, 59, 80, 81, 56, 55, 40]
        // },
        {
            label: "My Second dataset",
            fillColor: "rgba(116,121,189,0.2)",
            strokeColor: "rgba(116,121,189,1)",
            pointColor: "#fff",
            pointStrokeColor: "rgba(116,121,189,1)",
            pointHighlightFill: "rgba(116,121,189,1)",
            pointHighlightStroke: "rgba(116,121,189,1)",
            data: [500, 1000, 40, 19, 86, 27, 90, 11, 36, 39, 87]
        }
    ]
};

function withCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function prepare_newmember_html(member) {
    var html_copy = new_member_html;
    html_copy = html_copy.replace("{avatar_src}", member.avatar_src);
    html_copy = html_copy.replace("{email}", member.email);
    html_copy = html_copy.replace("{email}", member.email);
    html_copy = html_copy.replace("{name}", member.name);
    html_copy = html_copy.replace("{date}", member.date_joined);
    return html_copy;
}

function prepare_newevent_html(event) {
    var html_copy = recent_activity_html;
    html_copy = html_copy.replace("{name}", event.name);
    html_copy = html_copy.replace("{avatar_src}", event.avatar_src);
    html_copy = html_copy.replace("{action}", event.action);
    html_copy = html_copy.replace("{target}", event.target);
    html_copy = html_copy.replace("{time}", event.time);
    return html_copy;
}

$(document).ready(function() {
    var $avatar = $('#user_avatar');
    $avatar.html('<img src="' + data.avatar_src + '" alt="avatar" class="avatar">');

    var $name = $('#name');
    $name.html(data.first_name + " " + data.last_name);

    var $notifs = $('#notifs');

    var $alert_container = $('#alert-container');
    var alerts = "";
    $.each(data.alerts, function(index, value) {
        var copy = alert_html;
        alerts += copy.replace("{text}", value);
    });
    $alert_container.html(alerts);
    $( ".x" ).each(function() {
        $(this).on("click", function(){
            $(this).parent().hide();
        });
    });


    var ctx = $("#myChart").get(0).getContext("2d");
    var myLineChart = new Chart(ctx).Line(chart_data, {
        bezierCurve: false,
        pointDotStrokeWidth : 2,
        datasetStrokeWidth : 1,
        responsive: true,
        maintainAspectRatio: false
    });

    var $twitter = $('#twitter');
    $twitter.find('.social_number').html(withCommas(data.social_stats.twitter));

    var $facebook = $('#facebook');
    $facebook.find('.social_number').html(withCommas(data.social_stats.facebook));

    var $google_plus = $('#google-plus');
    $google_plus.find('.social_number').html(withCommas(data.social_stats.google_plus));

    var $new_members = $('#newmembers-container');
    var newmembers_html = '<div class="heading">New Members</div>';
    for (var i = 0; i < data.new_members.length; i++) {
        newmembers_html += prepare_newmember_html(data.new_members[i])
    }
    $new_members.html(newmembers_html);

    var $recent_activity = $('#recentactivity-container');
    var event_html = '<div class="heading">Recent Activity</div>';
    for (var i = 0; i < data.recent_activity.length; i++) {
        event_html += prepare_newevent_html(data.recent_activity[i])
    }
    $recent_activity.html(event_html);

    $.ajax({
      url: 'https://randomuser.me/api/',
      dataType: 'json',
      success: function(data){
        console.log(data);
      }
    });
});

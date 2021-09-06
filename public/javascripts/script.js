function toggleResetPswd(e) {
    e.preventDefault();
    $('#logreg-forms .form-signin').toggle() // display:block or none
    $('#logreg-forms .form-reset').toggle() // display:block or none
}

function toggleSignUp(e) {
    e.preventDefault();
    $('#logreg-forms .form-signin').toggle(); // display:block or none
    $('#logreg-forms .form-signup').toggle(); // display:block or none
}

$(() => {
    // Login Register Form
    $('#logreg-forms #forgot_pswd').click(toggleResetPswd);
    $('#logreg-forms #cancel_reset').click(toggleResetPswd);
    $('#logreg-forms #btn-signup').click(toggleSignUp);
    $('#logreg-forms #cancel_signup').click(toggleSignUp);
})

function get_url_list(email) {

    var settings = {
        "url": "http://localhost:3000/shorten_url_list?email=" + email,
        "method": "POST",
        "timeout": 0,
        "headers": {
            "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJib2J5IiwiaWF0IjoxNjMwOTYzMjc1fQ.DPsST-tT637blXrTY5QRT4TLHMh0q-8aX6RFHehGsZQ",
            "Content-Type": "application/x-www-form-urlencoded"
        }

    };

    $.ajax(settings).done(function(table) {


        table.data.map(function(row, i) {
            $("#urltable").append("<tr id=row" + i + 1 + "><th scope='row'>" + (i + 1) + "</th><td>" + row.LongUrl + "</td><td>" + row.ShortUrl + "</td><td>" + row.Hits + "</td></tr>")







        })

    });
}

function logout() {

    var settings = {
        "url": "http://localhost:3000/logout",
        "method": "get",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        },

    };

    $.ajax(settings).done(function(response) {

        console.log("Logged out")
        window.location.href = "http://localhost:3000/"


    });
}

function redirecturl(url) {
    return "http://localhost:3000/" + url
}

function geturls(email) {
    var longurl = $("#longurlinput").val()
    if (longurl.length != 0) {

        var settings = {
            "url": "http://localhost:3000/shorten_url",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            "data": {
                "longurl": longurl,
                "email": email
            }
        };

        $.ajax(settings).done(function(response) {

            var row = response.data
            $("#urltable").append("<tr id=row" + row.Id + "><th scope='row'>" + (row.Id) + "</th><td>" + row.LongUrl + "</td><td><a href=" + redirecturl(row.ShortUrl) + ">" + row.ShortUrl + "</a></td><td>" + row.Hits + "</td></tr>")



        });

    }

}

function getrandom() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function genhash() {
    if (window.location.hash == "") {
        window.location.hash = getrandom();
    }
}
let menuIcon = document.querySelector('.menuIcon');
let nav = document.querySelector('.overlay-menu');

menuIcon.addEventListener('click', () => {
    if (nav.style.transform != 'translateX(0%)') {
        nav.style.transform = 'translateX(0%)';
        nav.style.transition = 'transform 0.2s ease-out';
    } else {
        nav.style.transform = 'translateX(-100%)';
        nav.style.transition = 'transform 0.2s ease-out';
    }
});


// Toggle Menu Icon ========================================
let toggleIcon = document.querySelector('.menuIcon');

toggleIcon.addEventListener('click', () => {
    if (toggleIcon.className != 'menuIcon toggle') {
        toggleIcon.className += ' toggle';
    } else {
        toggleIcon.className = 'menuIcon';
    }
});

function apidocs() {

    $("#apidocspage").css("display", "block")
    $("#mainpage").css("display", "none")

}

function home() {

    $("#apidocspage").css("display", "none")
    $("#mainpage").css("display", "block")

}
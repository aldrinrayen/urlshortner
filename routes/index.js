var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');

const siteConfig = require(process.cwd() + '/config/site.config');

const { Users } = require('../models/userModel');

const { UrlShortner } = require('../models/UrlShortnerModel');

const isAuthorized = (req, res, next) => {

    if (req.headers.authorization) {
        var headerAuth = req.headers.authorization;
        var headerAuthList = headerAuth.split(" ");
        var token = headerAuthList[1]
        if (headerAuthList[0] == 'Bearer') {
            var privateKey = fs.readFileSync(process.cwd() + '/cert/public.pem', 'utf8');
            jwt.verify(token, privateKey, { algorithms: 'HS256' }, function(err, payload) {
                if (err) {
                    res.status(500).json({ error: "Not Authorized" })
                } else {
                    return next()
                }
            });
        } else {
            res.status(500).json({ error: "Not Authorized" })
        }
    } else {
        res.status(500).json({ error: "Not Authorized" })
    }
}

const loginValidation = (req, res, next) => {
    try {


        // console.log(req)

        const {
            email: EmailAddress,
            pass: Password
        } = req.query;

        if (EmailAddress && Password) {

            Users.findOne({
                where: {
                    EmailAddress
                    // Password
                }
            }).then(result => {



                if (result) {

                    bcrypt.compare(Password, result.dataValues.Password, function(err, pass) {


                        if (pass) {

                            // const token = jwt.sign({
                            //     data: result.dataValues.EmailAddress
                            // }, 'LNJn2VzBiiJUxU382BHA', { expiresIn: '24h' });
                            // // save user token
                            // user.token = token;

                            url_list(EmailAddress).then(function(response) {
                                res.redirect("/");

                            }).catch(err =>
                                res.status(200).json({ err: err })
                            )
                            console.log(result)
                            localStorage.setItem('UserId', result.dataValues.Id)
                            localStorage.setItem('EmailAddress', result.dataValues.EmailAddress)


                        } else {
                            res.render("login", {
                                message: "Invalid Password",
                                loader: !0

                            });
                        }
                    });
                } else {
                    res.render("login", {
                        message: "Invalid Details",
                        loader: !0

                    });

                }




            }).catch((err) => {

                res.render("login", {
                    message: "Invalid Credentials",
                    loader: !0,
                    showBGSlide: !0
                });
            })
        } else {
            res.render("login", {
                message: "Invalid Credentials",
                loader: !0,
                showBGSlide: !0
            });
        }
    } catch (err) {
        res.render("login", { message: "Invalid Credentials" });
    }
}

const url_list = (email) => {

    return new Promise((resolve, reject) => {


        UrlShortner.findAll({

            where: {
                EmailAddress: email,

            },
            order: [
                ['CreatedAt', 'ASC']
            ]


        }).then(result => {


            resolve(result)


        }).catch(err => { reject(err) })
    })

}


const add_hits = (shorturl) => {

        return new Promise((resolve, reject) => {


            UrlShortner.findOne({

                    where: {
                        ShortUrl: shorturl
                    }


                }).then(result => {

                    console.log(result.dataValues, "resultresult")
                    UrlShortner.update({ Hits: (result.dataValues.Hits + 1) }, {
                            where: {
                                ShortUrl: shorturl

                            }
                        })
                        .then(result1 =>
                            resolve(result1)
                        )
                        .catch(err =>
                            reject(err)
                        )

                })
                .catch(err =>
                    reject(err)
                )
        })

    }
    /* GET home page. */
router.get('/', function(req, res, next) {
    var email = localStorage.getItem('EmailAddress')

    if (email) {


        console.log(email)
        url_list(email).then(function(response) {

            console.log(response)
            res.render('index', { url_list: response, email: email, action: "logout" });
        }).catch(err =>
            res.status(200).json({ err: err })
        )


    } else {

        res.redirect('login');

    }

});


router.get('/login', loginValidation);



router.get('/logout', (req, res, next) => {
    try {


        console.log(req)
        res.redirect('login');


        localStorage.clear()


    } catch (err) {
        res.render("login", { message: "Invalid Credentials" });
    }
});


router.get('/signup', function(req, res, next) {

    try {
        var user = req.query
        console.log(user)

        if (user.email && user.pass && user.name) {

            Users.findOne({

                where: {
                    EmailAddress: user.email,
                }


            }).then(async result => {

                // console.log(result)

                if (result) {



                    res.redirect('login');

                } else {

                    encryptedPassword = await bcrypt.hash(user.pass, 10);



                    Users.create({
                        EmailAddress: user.email,
                        UserName: user.name,
                        Password: encryptedPassword
                    }).then((result1) => {


                        console.log(result1)

                        const token = jwt.sign({
                            data: user.email
                        }, 'LNJn2VzBiiJUxU382BHA', { expiresIn: '24h' });
                        // save user token
                        user.token = token;
                        console.log(token)

                        res.redirect("/");

                    })
                }

            })



        } else {


        }

    } catch (err) {

    }

});


function getrandom() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 6; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}



router.get('/:shorturl', function(req, res, next) {

    var shorturl = req.params.shorturl


    if (shorturl) {

        UrlShortner.findOne({

                where: {
                    ShortUrl: shorturl

                }

            }).then(result => {

                res.redirect(result.dataValues.LongUrl)

                add_hits(shorturl)


            })
            .catch(err =>
                res.status(200).json({ err: err })
            )



    } else {

        res.status(500).json({ error: "Parameter missing" })
    }

});

router.post('/shorten_url', isAuthorized, function(req, res, next) {

    // console.log(getrandom())
    var details = req.body




    if (details.longurl && details.email) {

        UrlShortner.create({
            LongUrl: details.longurl,
            EmailAddress: details.email,
            ShortUrl: getrandom(),
            Hits: 0
        }).then(result => {


            res.status(200).json({ data: result })

        }).catch(err =>
            res.status(200).json({ err: err })
        )



    } else {

        res.status(500).json({ error: "Parameter missing" })
    }

});

router.post('/shorten_url_add_hits', isAuthorized, function(req, res, next) {


    var details = req.query

    if (details.shorturl) {

        add_hits(details.shorturl).then(function(res) {
            res.status(200).json({ data: res })
        }).catch(err =>
            res.status(200).json({ err: err })
        )

    } else {
        res.status(500).json({ error: "Parameter missing" })

    }
});


router.get('/shorten_url_list', isAuthorized, function(req, res, next) {

    var details = req.query

    if (details.email) {

        url_list(details.email).then(function(res) {
            res.status(200).json({ data: res })
        }).catch(err =>
            res.status(200).json({ err: err })
        )
    } else {


        res.status(500).json({ error: "Parameter missing" })

    }

});

router.post('/jwt', function(req, res, next) {
    var authKey = req.headers.authkey;

    console.log(authKey)
    if (authKey == 'GQv1cjMGDu') {
        console.log("enterer")
        var privateKey = fs.readFileSync(process.cwd() + '/cert/public.pem', 'utf8');
        jwt.sign({ foo: 'boby' }, privateKey, { algorithm: 'HS256' }, function(err, token) {

            res.status(200).json({ token: token })
        });
    } else {
        res.status(500).json({ error: "Not Authorized" })
    }

});



module.exports = router;
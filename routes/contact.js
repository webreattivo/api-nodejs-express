var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Contact = mongoose.model('contact');

router.route('/contact')

    /* POST create new contact */
    .post(function (req, res, next) {

        new Contact({
            name: req.body.name,
            surname: req.body.surname,
            phone: req.body.phone
        }).save(function (err, contact) {

                if (err) {

                    res.status(500).json({
                        status: "error",
                        code: 500,
                        message: err
                    });

                    return;
                }

                res.status(201).json({
                    status: "success",
                    code: 201,
                    message: "Contact created successfully",
                    data: contact
                });

            });
    })

    /* GET all contacts */
    .get(function (req, res, next) {

        Contact.find(function(err, contacts) {

            if (err) {
                res.status(500).json({
                    status: "error",
                    code: 500,
                    message: err
                });

                return;
            }

            if(contacts === null) {

                res.status(404).json({
                    status: "error",
                    code: 404,
                    message: "no contact saved"
                });

                return;
            }

            if(contacts != null) {

                res.status(200).json({
                    status: "success",
                    code: 200,
                    data: contacts
                });
            }
        });
    });

router.route('/contact/:id')

    /* Update contact */
    .post(function (req, res, next) {

        Contact.findOne({"_id": req.params.id}, function(err, contact) {

            if (err) {
                res.status(500).json({
                    status: "error",
                    code: 500,
                    message: "Error finding a contact."
                });

                return;
            }

            if(contact === null) {
                res.status(404).json({
                    status: "error",
                    code: 404,
                    message: "Contact not found"
                });

                return;
            }

            if(contact != null) {
                contact.name = req.body.name;
                contact.surname = req.body.surname;
                contact.phone = req.body.phone;
                contact.save(function (err) {

                    if (err) {

                        res.status(500).json({
                            status: "error",
                            code: 500,
                            message: "Error update a contact."
                        });

                        return;
                    }

                    res.status(200).json({
                        status: "success",
                        code: 200,
                        message: "Contact modified successfully"
                    });
                });
            }
        });
    })

    /* GET Single contact */
    .get(function (req, res, next) {

        Contact.findOne({"_id": req.params.id}, function(err, contact) {

            if (err) {
                res.status(500).json({
                    status: "error",
                    code: 500,
                    message: "Error finding a contact."
                });

                return;
            }

            if(contact === null) {
                res.status(404).json({
                    status: "error",
                    code: 404,
                    message: "Contact not found"
                });

                return;
            }

            if(contact != null) {

                res.status(200).json({
                    status: "success",
                    code: 200,
                    data: contact
                });
            }
        });
    })

    /* DELETE all contacts */
    .delete(function (req, res, next) {

        Contact.findOne({"_id": req.params.id}, function (err, contact) {

            if (err) {
                res.status(500).json({
                    status: "error",
                    code: 500,
                    message: "Error finding a contact."
                });

                return;
            }

            if (contact === null) {
                res.status(404).json({
                    status: "error",
                    code: 404,
                    message: "Contact not found"
                });

                return;
            }

            if (contact != null) {

                contact.remove(function (err) {

                    if (err) {
                        res.status(500).json({
                            status: "error",
                            code: 500,
                            message: "Error removed contact."
                        });

                        return;
                    }

                    res.status(200).json({
                        status: "success",
                        code: 200,
                        message: "Contact removed with successfully"
                    });
                });
            }
        });
    });

module.exports = router;

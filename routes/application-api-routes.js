var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the applications
    app.get("/api/applications/", function(req, res) {
        db.Application.findAll({})
        .then(function(result) {
            res.json(result);
        });
    });

    // GET route for getting single application
    // app.get("/api/applications/:id", function(req, res) {
    //     db.Application.findAll({where: {id: req.params.id}})
    //         .then(function(result) {
    //         res.json(result);
    //     });
    // });

    // GET route for getting single application
    app.get("/api/applications/", function(req, res) {
      db.Application.findAll({where: {id: req.body}})
          .then(function(result) {
          res.json(result);
      });
    });

    // GET route for getting all applications for a single user
    app.get("/api/applications/user/:userid", function(req, res) {
      db.Application.findAll({where: {UserId: req.params.userid}})
          .then(function(result) {
          res.json(result);
      });
    });

    // GET route for getting all applications for a single company for a single user
    app.get("/api/applications/company/:userid", function(req, res) {
      console.log(req.query);
      db.Application.findAll({where:
        {company: req.query.company,
        UserId: req.params.userid}
      }).then(function(result) {
          res.json(result);
      });
    });

    app.put("/api/applications/edit/:id", function(req, res) {
        db.Application.update(
          {company: req.body.company,
          role: req.body.role,
          jobsitelink: req.body.jobsitelink,
          status: req.body.status
          }, 
          {where: {id: req.params.id}
        }).then(function(result) {
            res.json(result);
        });
    });

    app.post("/api/newapp", function(req, res) {
      var noteBody = req.body.noteBody;
        // Create a User with the data available to us in req.body
        db.Application.create(req.body).then(function(result) {
          res.json(result);
          db.Note.create({
            body: noteBody,
            ApplicationId: result.id
          }).then(function(result) {
            res.json(result);
          });
        });
    });
    
    app.delete("/api/applications/:id", function(req, res) {
        // Delete the Author with the id available to us in req.params.id
        db.Application.destroy({
          where: {
            id: req.params.id
          }
        }).then(function(result) {
          res.json(result);
        });
    });
};
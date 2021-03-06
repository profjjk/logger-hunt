$(document).ready(function () {
    $("#save-edits").on("click", function(event) {
        event.preventDefault();
        var status = $('input[name="flexRadioDefault"]:checked').val();
        console.log(status);
        var source = $("#edit-source").val().trim();
        var company = $("#edit-company").val().trim();
        var role = $("#edit-role").val().trim();
        var appID = window.location.href.split("/").slice(-1)[0];

        // Confirm input fields not empty.
        if (!status || !source || !company || !role) {
            return alert("All input fields are required");
        }

        var appEdits = {
            status: status,
            jobsitelink: source,
            company: company,
            role: role
        }

        
        $.ajax(`/api/applications/edit/${appID}`, {
            type: "PUT",
            data: appEdits
        }).then(function(result) {
            console.log(result);
            location.reload();
        });   
    });

    $("#note-edits").on("click", function(event) {
        event.preventDefault();
        var noteID = $("#note-edits").data("noteid");
        var body = {};
        body.body = $("#edit-noteBody").val().trim();
        // console.log(noteID);
        // console.log(body);
        $.ajax(`/api/notes/edit/${noteID}`, {
            type: "PUT",
            data: body
        }).then(function(result) {
            // console.log(result);
            location.reload();
        });   
    });

    $("#add-note").on("click", function(event) {
        event.preventDefault();
        var body = {};
        var appid;
        appid = window.location.href.split("/").slice(-1)[0];
        body.body = $("#new-noteBody").val().trim();
        body.ApplicationId = appid;
        $.ajax("/api/notes/new", {
            type: "POST",
            data: body
        }).then(function(result) {
            console.log(result);
            location.reload();
        });   
    });
    

    $("#back-btn").on("click", function(event) {
        event.preventDefault();
        var user;
        user = window.location.href.split("/").slice(-2)[0];
        var user2 = window.location.href.split("/")
        console.log(user2);
        window.location.pathname = (`/dashboard/${user}`);
    });

    $(".note-edit-modal-btn").on("click", function(event) {
        event.preventDefault();
        $("#note-edits").data("noteid", event.target.id);
    });
});

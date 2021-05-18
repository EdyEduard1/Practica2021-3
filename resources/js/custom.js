//CUSTOM JS
$("#userEditModal").on("shown.bs.modal", function (event) {
    let button = $(event.relatedTarget); // Button that triggered the modal
    let user = button.data("user");

    let modal = $(this);

    modal.find("#userEditId").val(user.id);
    modal.find("#userEditName").text(user.name);
    modal.find("#userEditRole").val(user.role);
});

$("#userEditModalAjax").on("shown.bs.modal", function (event) {
    let button = $(event.relatedTarget); // Button that triggered the modal
    let user = button.data("user");

    let modal = $(this);

    modal.find("#userEditIdAjax").val(user.id);
    modal.find("#userEditNameAjax").text(user.name);
    modal.find("#userEditRoleAjax").val(user.role);
});

$("#userDeleteModal").on("shown.bs.modal", function (event) {
    let button = $(event.relatedTarget); // Button that triggered the modal
    let user = button.data("user");

    let modal = $(this);

    modal.find("#userDeleteId").val(user.id);
    modal.find("#userDeleteName").text(user.name);
});

/**
 * Update user using ajax
 */
$(document).ready(function () {
    $("#userEditButtonAjax").on("click", function () {
        $("#userEditAlert").addClass("hidden");

        let id = $("#userEditIdAjax").val();
        let role = $("#userEditRoleAjax").val();

        $.ajax({
            method: "POST",
            url: "/user-update/" + id,
            data: { role: role },
        }).done(function (response) {
            if (response.error !== "") {
                $("#userEditAlert").text(response.error).removeClass("hidden");
            } else {
                window.location.reload();
            }
        });
    });

    $("#userDeleteButton").on("click", function () {
        $("#userDeleteAlert").addClass("hidden");
        let id = $("#userDeleteId").val();

        $.ajax({
            method: "POST",
            url: "/user/delete/" + id,
        }).done(function (response) {
            if (response.error !== "") {
                $("#userDeleteAlert")
                    .text(response.error)
                    .removeClass("hidden");
            } else {
                window.location.reload();
            }
        });
    });
});

// BOARDS

$("#boardEditModalAjax").on("shown.bs.modal", function (event) {
    let button = $(event.relatedTarget); // Button that triggered the modal
    let board = button.data("board");
    let modal = $(this);

    modal.find("#boardEditIdAjax").val(board.id);
    modal.find("#boardEditNameAjax").val(board.name);
});

$("#boardDeleteModal").on("shown.bs.modal", function (event) {
    let button = $(event.relatedTarget); // Button that triggered the modal
    let board = button.data("board");

    let modal = $(this);

    modal.find("#boardDeleteId").val(board.id);
    modal.find("#boardDeleteName").text(board.name);
});

/**
 * Update board using ajax
 */
$(document).ready(function () {
    $("#boardEditButtonAjax").on("click", function () {
        $("#boardEditAlert").addClass("hidden");

        let id = $("#boardEditIdAjax").val();
        let name = $("#boardEditNameAjax").val();
        $.ajax({
            type: "POST",
            url: "/board-update/" + id,
            data: { name: name },
        }).done(function (response) {
            if (response.error !== "") {
                $("#boardEditAlert").text(response.error).removeClass("hidden");
            } else {
                window.location.reload();
            }
        });
    });

    $("#boardDeleteButton").on("click", function () {
        $("#boardDeleteAlert").addClass("hidden");
        let id = $("#boardDeleteId").val();

        $.ajax({
            type: "POST",
            url: "/board/delete/" + id,
        }).done(function (response) {
            if (response.error !== "") {
                $("#userDeleteAlert")
                    .text(response.error)
                    .removeClass("hidden");
            } else {
                window.location.reload();
            }
        });
    });

    $("#changeBoard").on("change", function () {
        let id = $(this).val();

        window.location.href = "/board/" + id;
    });
});

// TASKS

$("#taskEditModalAjax").on("shown.bs.modal", function (event) {
    let button = $(event.relatedTarget); // Button that triggered the modal
    let task = button.data("task");
    let modal = $(this);

    modal.find("#taskEditIdAjax").val(task.id);
    modal.find("#taskEditNameAjax").val(task.name);
});

$("#taskDeleteModal").on("shown.bs.modal", function (event) {
    let button = $(event.relatedTarget); // Button that triggered the modal
    let task = button.data("task");

    let modal = $(this);

    modal.find("#taskDeleteId").val(task.id);
    modal.find("#taskDeleteName").text(task.name);
});

/**
 * Update task using ajax
 */
$(document).ready(function () {
    $("#taskEditButtonAjax").on("click", function () {
        $("#taskEditAlert").addClass("hidden");

        let id = $("#taskEditIdAjax").val();
        let name = $("#taskEditNameAjax").val();
        let description = $("#taskEditDescriptionAjax").val();
        let assignment = $("#taskEditAssignmentAjax").val();

        $.ajax({
            type: "POST",
            url: "/task-update/" + id,
            data: {
                name: name,
                description: description,
                assignment: assignment,
            },
        }).done(function (response) {
            if (response.error !== "") {
                $("#taskEditAlert").text(response.error).removeClass("hidden");
            } else {
                return redirect("/");
            }
        });
    });

    $("#taskDeleteButton").on("click", function () {
        $("#taskDeleteAlert").addClass("hidden");
        let id = $("#taskDeleteId").val();

        $.ajax({
            type: "POST",
            url: "/task/delete/" + id,
        }).done(function (response) {
            if (response.error !== "") {
                $("#taskDeleteAlert")
                    .text(response.error)
                    .removeClass("hidden");
            } else {
                window.location.reload();
            }
        });
    });
});

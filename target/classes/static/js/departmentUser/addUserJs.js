function saveUserBtn(Id) {

   var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
   //var departmentUserName = departmentElement.data("department_name"); // Fetch data-department_name
   var departmentUserName = departmentElement.data("departmentuser-name"); // Fetch data-departmentuser-name
   // var userId = departmentElement.data("user-id"); // Fetch data-user-Id


   // var departmentUserName = $(".departmentName").text();
    var userName = $("#userName").val();
    var userId = $("#userId").val();
    var userJoinDate = $("#userJoinDate").val();
    var userDesignation = $("#designation").val();

    $.ajax({
        type: "POST",
        url: "/departmentUser/addUser",
        data: {
            departmentUserName: departmentUserName,
            userName: userName,
            userId: userId,
            userJoinDate: userJoinDate,
            userDesignation: userDesignation
        },
         headers: {


                              'Authorization': 'Bearer ' + getAuthToken()
                          },
        success: function(response) {
              CustomAlert(response);
               $('#globalCustomAlertModal').on('hidden.bs.modal', function () {
                   location.reload();
               });
        },
        error: function(error) {
            console.error("Error saving category:", error);
        }
    });
}

function editUserBtn($row, userIdData) {
    var newUserName = $("#userNameEdit").val();
    var newUserId = $("#userIdEdit").val();
    var newUserJoinDate = $("#userJoinDateEdit").val();
    var newUserDesignation = $("#userDesignationEdit").val();
     var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
      //var departmentUserName = departmentElement.data("department_name"); // Fetch data-department_name
      var departmentUserName = departmentElement.data("departmentuser-name"); // Fetch data-departmentuser-name
      // var userId = departmentElement.data("user-id"); // Fetch data-user-Id

    $.ajax({
        type: "POST",
        url: "/departmentUser/editUser",
        data: {
            userId: userIdData,
            branchName: departmentUserName,
            newUserName: newUserName,
            newUserId: newUserId,
            newUserJoinDate: newUserJoinDate,
            newUserDesignation: newUserDesignation
        },
         headers: {


                              'Authorization': 'Bearer ' + getAuthToken()
                          },
        success: function(response) {
            CustomAlert(response);
              $('#globalCustomAlertModal').on('hidden.bs.modal', function () {
                  location.reload();
              });
        },
        error: function(error) {
            console.error("Error updating user:", error);
        }
    });
}

window.initAddUserGeneral = function () {
    $('#branchUserTable tbody tr').click(function(event) {

      $(document).off('click', '.action-button-container .Edit');
       $(document).off('click', '.action-button-container .Delete');

        var $row = $(this);
        var userName = $row.find('td:nth-child(2)').text();
        var userId = $row.find('td:nth-child(3)').text();
        var userJoinDate = $row.find('td:nth-child(4)').text();
        var userDesignation = $row.find('td:nth-child(5)').text();
        var buttonPressed = $(event.target).closest('button').text();
        const button = $(event.target).closest('button');
         var buttonId = button.data('buttonId');

                // ---------- EDIT ----------
          $(document).on('click', '.action-button-container .Edit', async function (event) {
            event.preventDefault();
              const userIdData = button.data('userId');
                if (!userIdData) {
                    console.error("Missing data-user-id attribute on delete button!");
                    return;
                }

                var htmlToAdd = `
                    <div class="mb-3">
                        <label for="userNameEdit" class="form-label">User Name</label>
                        <input type="text" class="form-control" id="userNameEdit" value="${userName}">
                    </div>
                    <div class="mb-3">
                        <label for="userIdEdit" class="form-label">User Id</label>
                        <input type="text" class="form-control" id="userIdEdit" value="${userId}">
                    </div>
                    <div class="mb-3">
                        <label for="userJoinDateEdit" class="form-label">User Join Date</label>
                        <input type="date" class="form-control" id="userJoinDateEdit" value="${userJoinDate}">
                    </div>
                    <div class="mb-3">
                          <label for="userDesignationEdit" class="form-label">User Designation</label>
                          <select class="form-select" id="userDesignationEdit" disabled>
                            <option>Loading…</option>
                            // #optionDiv
                          </select>
                        </div>

                    <div class="mb-3">
                        <button type="button" class="btn btn-primary" id="saveEditBtn">Save</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                `;

                $('.ModalMedium').html(htmlToAdd);
                $('#publicModalMediumLabel').text("Edit User Information");
                 showModalMedium();
              //  $('#publicModal').modal('show');
               // --- Load designations from DB and populate the <select> ---
                const $sel = $('#userDesignationEdit');

                     print('designations', function (designations) {
                          $sel.empty();
                          if (Array.isArray(designations) && designations.length) {
                            $sel.append('<option value="">Select designation</option>');
                            designations.forEach(function (d) {
                              const name = (d && d.designationName) ? d.designationName : (typeof d === 'string' ? d : '');
                              if (name) $sel.append($('<option>').val(name).text(name));
                            });
                          } else {
                            $sel.append('<option value="">No designations found</option>');
                          }
                          $sel.prop('disabled', false).val(userDesignation);
                        });

                $('#saveEditBtn').click(function() {
                    editUserBtn($row, userIdData);
                });
           });
        // ---------- DELETE ----------
          $(document).on('click', '.action-button-container .Delete', async function (event) {
            event.preventDefault();
             const button = $(this);
            const userId = button.data('userId');
            if (!userId) { console.error("Missing data-user-id on delete button!"); return; }

            const userName = button.closest('tr').find('td').eq(1).text().trim() || 'this user';

            // Use the promise-based confirm modal if available (from earlier), else native confirm
            let confirmed;
            if (window.bootstrap && typeof askConfirm === 'function') {
              confirmed = await askConfirm(
                `Do you really want to delete "${userName}"? This action cannot be undone.`,
                'Delete'
              );
            } else {
              confirmed = window.confirm(`Do you really want to delete "${userName}"?`);
            }
            if (!confirmed) return;

            // Prevent double-clicks
            button.prop('disabled', true).addClass('disabled');

            $.ajax({
              url: '/departmentUser/deleteUser',
              type: 'POST',
              data: { userId: userId },
              headers: { 'Authorization': 'Bearer ' + getAuthToken() },
              success: function (result) {
                CustomAlert(result);
                $('#globalCustomAlertModal')
                  .off('hidden.bs.modal')
                  .on('hidden.bs.modal', function () { location.reload(); });
              },
              error: function (xhr, status, error) {
                console.error("Error deleting user:", error, xhr?.responseText);
                CustomAlert("Delete failed! Please try again.");
                button.prop('disabled', false).removeClass('disabled');
              }
            });
          });
    });
};

function addUerToggle() {
    var content = document.getElementById("userForm");
    if (content.style.display === "none") {
        content.style.display = "block";
    } else {
        content.style.display = "none";
        $("#userName").val("");
    }
}

function closeToggle(id) {
    var element = document.getElementById(id);
    element.style.display = "none";
    $("#userName").val("");
}

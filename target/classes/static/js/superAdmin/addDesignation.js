    function saveDesignationBtn(Id) {
  // Capture the category name from the input field
          var designationName = $("#designationName").val();
          var designationTableBody = $('#designationTableBody');
          var totalRows = designationTableBody.children('tr').length+1;
           console.log("Total Rows: " + totalRows);

        // Send AJAX request to add category
        $.ajax({
            type: "POST",
            url: "/superAdmin/addDesignation", // URL to your controller method
            data: { designationName: designationName },
            headers: {
                               'Content-Type': 'application/json',
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
 window.initAddDesignationGeneral = function () {
     $('#designationTable tbody tr').click(function(event) {
       var $row = $(this); // Store the clicked row element
        var designationName = $row.find('td:nth-child(2)').text(); // Extract category name from the second column
        var buttonPressed = $(event.target).closest('button'); // Get the clicked button element
        console.log("Button Pressed: " + buttonPressed);

        var rowIndex = $(this).index();

        if (buttonPressed.hasClass('Edit')) { // i want to check accept,denied, view and chat button
            // Perform actions for Edit button
            console.log("Edit action here");

            // Display category name in a text field
            var newDesignationName = prompt("Edit Designation Name:", designationName);
            if (newDesignationName !== null) {
                alert("New Designation Name: " + newDesignationName);

                // AJAX request to update the category
                $.ajax({
                    url: '/superAdmin/updateDesignation', // URL to your update endpoint
                    type: 'POST',
                    data: {
                        oldDesignationName: designationName,
                        newDesignationName: newDesignationName
                    },
                    headers: {
                                       'Content-Type': 'application/json',
                                      'Authorization': 'Bearer ' + getAuthToken()
                                  },
                    success: function(result) {
                         CustomAlert(result);
                           $('#globalCustomAlertModal').on('hidden.bs.modal', function () {
                               location.reload();
                           });

                    },
                    error: function(xhr, status, error) {
                        console.error("Error updating category: " + error);
                    }
                });
            } else {
                // User cancelled the edit
                CustomAlert("Edit cancelled");
            }
        }  else if (buttonPressed.hasClass('Delete')) {
         console.log("Row Index: " + rowIndex);
            // Perform actions for Delete button
            console.log("Designation Name: " + designationName);
            $.ajax({
                url: '/superAdmin/deleteDesignation', // URL to your delete endpoint
                type: 'POST',
                data: { designationName: designationName }, // Send category name as data
                headers: {
                                   'Content-Type': 'application/json',
                                  'Authorization': 'Bearer ' + getAuthToken()
                              },
                success: function(result) {
                               CustomAlert(result);
                                 $('#globalCustomAlertModal').on('hidden.bs.modal', function () {
                                     location.reload();
                                 });
                },
                error: function(xhr, status, error) {
                    console.error("Error deleting category: " + error);
                }
            });
        } else {
            // Perform actions for other buttons, if needed
            console.log("Other action here");
        }
    });
};

function addDesignationToggle() {
        var content = document.getElementById("designationForm");
        if (content.style.display === "none") {
            content.style.display = "block";
        } else {
            content.style.display = "none";
             $("#designationName").val(" ");
        }
    }

     function closeToggle(id) {
            var element = document.getElementById(id);
            element.style.display = "none";
              $("#designationName").val(" ");
        }






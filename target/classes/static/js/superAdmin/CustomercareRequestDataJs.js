
function saveFormData(requestId) {
    var formData = $("#linkForm").serialize();

    // Debugging: Check the serialized form data
    console.log(formData);

    // Append the requestId to the form data
    formData += '&requestId=' + encodeURIComponent(requestId);

    $.ajax({
        url: '/purchase/addPurchaseProposal',
        type: 'POST',
        data: formData,
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
        error: function(xhr, status, error) {
            console.error("Error saving data: " + error);
        }
    });
}


function listRequest(requestId,deviceIds) {
    // AJAX code
    $.ajax({
        url: '/inventory/addListRequest', // Replace with your endpoint URL
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({requestId: requestId, deviceIds: deviceIds }),
        headers: {
                           'Content-Type': 'application/json',
                          'Authorization': 'Bearer ' + getAuthToken()
                      },
        success: function(response) {
            console.log("AJAX request successful:", response);
            // Handle success response
        },
        error: function(error) {
            console.log("AJAX request failed:", error);
            // Handle error response
        }
    });
}

function setRequestStatusApprove(requestId,status){

            $.ajax({
                url: '/superAdmin/approveDeliveryProductRequestStatus',
                type: 'POST',
                data: {
                requestId: requestId,
                status:status

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
                    console.error("Error deleting user:", error);
                }
            });

}
function setCancelRequest(requestId,status){

            $.ajax({
                url: '/superAdmin/setCancelRequestCustomerCare',
                type: 'POST',
                data: {
                requestId: requestId,
                status:status,
                cause:$('#rejectCause').val()

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
                    console.error("Error deleting user:", error);
                }
            });

}
 window.initCustomerCareRequestDataGeneral = function () {
    $('#requestCustomerCareTable tbody tr').click(function(event) {
        var $row = $(this); // Store the clicked row element
        var button = $(event.target).closest('button');
        var buttonPressed = button.text().trim(); // Get the HTML inside the button
        var requestId = button.data('requestId');
        var buttonId = button.data('buttonId');
        var categoryName = $row.find('th:nth-child(3)').text();

        if (!requestId) {
            console.error("Missing data-request-id attribute on button!");
            return;
        }

        if (!buttonId) {
            console.error("Missing data-button-id attribute on button!");
            return;
        }

        console.log(`Button Pressed: ${buttonPressed}`);
        console.log(`Button ID: ${buttonId}`);
        console.log(`Request ID: ${requestId}`);
        if(buttonId==="viewAlternative"){
         print('requestData', function(requestData) {
                    if (requestData) {
                        // Search for the specific ID using the find method
                        const result = requestData.find(function(data1) {
                            return data1.id === requestId;
                        });
                        if(result.inventory.cooAns=="Accepted")
                        {

                         var selectedDevices = [];
                          print('universalColumns', function(universalColumns) {
                         var categoriesHtml = '';
                         if (universalColumns) {
                             universalColumns.forEach(function(category) {
                                 categoriesHtml += `<th scope="col" style="background-color: gray;">${category.columnName}</th>`;
                             });
                         }

                         var htmlToAdd = `
                             <div class="mb-9" style="margin-left: 0%; text-align: left;">
                                 <table id="deviceInformationTable" class="table table-gray table-bordered table-hover">
                                     <thead>
                                         <tr>
                                             <th scope="col" style="background-color: gray;">SN1</th>
                                              <th scope="col" style="background-color: gray;display: none;">Device Id</th>
                                             <th scope="col" style="background-color: gray;">Category Name</th>
                                             ${categoriesHtml}
                                             <th scope="col" style="background-color: gray;">Description</th>

                                         </tr>
                                     </thead>
                                     <tbody id="listDeviceInformationBody">

                                     </tbody>
                                 </table>
                             </div>

                         `;
                         $('.ModalExtraLarge').html(htmlToAdd);

                         $('#publicModalExtraLargeLabel').text("Alternative Device Information");

                          print('requestData', function(requestData) {
                                 if (requestData) {
                                     // Search for the specific ID using the find method
                                     const result = requestData.find(function(data1) {
                                         return data1.id === requestId;
                                     });

                                     if (result) {
                                      var rowsHtml = '';
                                         // Corrected the for loop syntax to iterate over the deviceIds array

                                             let deviceIdCheck=result.inventory.acceptedId;
                                            // alert(result.inventory.deviceIds[i]);
                                             print('allAddData', function(allAddData) {
                                                 if (allAddData) {
                                                     // First, fetch individual columns
                                                     print('individualColumns', function(individualColumns) {

                                                         allAddData.forEach(function(data, index) {
                                                          if (data.id=== deviceIdCheck) {
                                                             rowsHtml += `<tr>
                                                                 <td>${index + 1}</td>
                                                                  <td style="display: none;">${data.id}</td>
                                                                 <td>${data.categoryName}</td>`;
                                                             universalColumns.forEach(function(column) {
                                                                 rowsHtml += `<td >${data.allData[column.columnName]}</td>`;
                                                             });

                                                             rowsHtml += `<td>
                                                                 <ul style="list-style: none; padding-left: 0; text-align: left;">`;

                                                             if (individualColumns) {
                                                                 individualColumns.forEach(function(individualColumn) {
                                                                    if (individualColumn.categoryName=== categoryName) {

                                                                     rowsHtml += `<li>${individualColumn.columnName} : ${data.allData[individualColumn.columnName]}</li>`;
                                                                     }
                                                                 });
                                                             }


                                                              }
                                                         });

                                                         $('#listDeviceInformationBody').html(rowsHtml);
                                                     });
                                                 }
                                             });


                                     } else {
                                         console.warn(`No data found for Device ID ${requestId}`);
                                     }
                                 }

                             });

                         showModalExtraLarge();
                     });


                        }
                       else if(result.inventory.cooAns=="Rejected")
                       {
                       CustomAlert("Rejected Cause: \n"+result.inventory.rejectedCause);
                       }
                       else{

                       }

                        }});
        }
       else  if (buttonId === "accepted"){

         var htmlToAdd = `
            <div class="mb-3" style="margin-right: 0%; text-align: center;">
                <button type="button" class="btn btn-primary" id="AcceptBtn">Yes</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
            </div>
        `;
        $('.ModalMedium').html(htmlToAdd);
        $('#publicModalMediumLabel').text("Do you want to  Approve the Request ?");
        $('#AcceptBtn').click(function() {

            setRequestStatusApprove(requestId, "Approved");

        });
        showModalMedium();
         }
         else if (buttonId === "cancel") {
          var htmlToAdd = `
             <div class="mb-3" style="margin-left: 0%; text-align: left;">
                 <label for="rejectCause" class="form-label">Reject Cause</label>
                 <input type="text" class="form-control" id="rejectCause" placeholder="Cause"  required>
             </div>
                <div class="mb-3" style="margin-right: 0%; text-align: center;">
                    <button type="button" class="btn btn-primary" id="DeniedBtn">Yes</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                </div>
            `;

            // Add the HTML code to the modal body using jQuery
             $('.ModalMedium').html(htmlToAdd);
            // edit individual column header
             $('#publicModalMediumLabel').text("Do you want to Denny this request ?");

              $('#DeniedBtn').click(function() {

                      setCancelRequest(requestId,"Denied");
               });

             showModalMedium();
       }


    });
};




function sendDeliveryDeviceAccept(requestId,deviceId){
 // Define the Service class

         var mergedFormData = {}; // Object to hold all form data based on formId


          var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
          var departmentName = departmentElement.data("departmentname");//it
          var departmentUserName = departmentElement.data("departmentuser-name");//saho
          var departmentUserId = departmentElement.data("departmentuser-id");//s


         // Send AJAX request to backend
         $.ajax({
             url: "/inventory/sendDeliveryDevicePurchaseToInventoryAccept",
             type: "POST",
             contentType: "application/json",
             data: JSON.stringify({
                  requestId: requestId,
                  deviceId: deviceId ,
                  departmentName:departmentName,
                  departmentUserName:departmentUserName,
                  departmentUserId:departmentUserId
                  }),
              headers: {
                                    'Content-Type': 'application/json',
                                   'Authorization': 'Bearer ' + getAuthToken()
                               },
             success: function (response) {
                        CustomAlert(response);
                          $('#globalCustomAlertModal').on('hidden.bs.modal', function () {
                              location.reload();
                          });
             },
             error: function (xhr, status, error) {
                 CustomAlert("Error: " + error); // Display error response
                 console.error("Error:", error);
             }
         });
}
function  editRequestColumnBtn(requestId){

           var columnName=$('#requestNameEdit').val();
           var dataType=$('#requestDataTypeEdit').val();
           var requiredType=$('#requiredTypeRequestEdit').val();

           $.ajax({
               url: '/superAdmin/updateRequestColumn', // URL to your update endpoint
               type: 'POST',
               data: {
                   requestId: requestId,
                   columnName:columnName,
                   dataType: dataType,
                   requiredType:requiredType
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
function setRequestStatusCheckAvailability(requestId,status){
            $.ajax({
                    url: '/inventory/checkProductAvailability',
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
function setRequestStatus(requestId,status){
    var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
                var departmentName = departmentElement.data("departmentname");//it
                var departmentUserName = departmentElement.data("departmentuser-name");//saho
                var departmentUserId = departmentElement.data("departmentuser-id");//s
            if(status=="Direct Delivery"){

             $.ajax({
                     url: '/inventory/deliverRequestStatus',
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
            else if(status=="Purchased"){

            $.ajax({
                     url: '/inventory/purchaseRequestStatus',
                     type: 'POST',
                     data: {
                     requestId: requestId,
                     departmentName:departmentName,
                     departmentUserName:departmentUserName,
                     departmentUserId:departmentUserId,
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


}
window.initRequestDataProposalGeneral = function () {
    $('#requestInventoryProposalTable tbody tr').click(function(event) {
        var $row = $(this); // Store the clicked row element
        var button = $(event.target).closest('button');
        var buttonPressed = button.text().trim(); // Get the HTML inside the button
        var requestId = button.data('requestId');
        var deviceId=button.data('purchasedevice-id')
        var buttonId = button.data('buttonId');
        var categoryName = $row.find('td:nth-child(3)').text();
        var category=categoryName;
        if (!requestId) {
            console.error("Missing data-request-id attribute on button!");
            return;
        }

        if (!buttonId) {
            console.error("Missing data-button-id attribute on button!");
            return;
        }



  if (buttonId === "deliver") {


        var selectedDevices = [];

        print('universalColumns', function(universalColumns) {
            var categoriesHtml = '';
            if (universalColumns) {
                universalColumns.forEach(function(category) {
                    categoriesHtml += `<th scope="col" style="background-color: gray;color:white">${category.columnName}</th>`;
                });
            }

            var htmlToAdd = `
                <div class="mb-9" style="margin-left: 0%; text-align: left;">
                    <table id="deviceInformationTable" class="table table-gray table-bordered table-hover">
                        <thead>
                            <tr>
                                <th scope="col" style="background-color: gray;color:white">SN</th>
                                <th scope="col" style="background-color: gray; display: none;color:white">Device Id</th>
                                <th scope="col" style="background-color: gray;color:white">Category Name</th>
                                ${categoriesHtml}
                                <th scope="col" style="background-color: gray;color:white">Description</th>
                                  <th scope="col" style="background-color: gray;color:white">Action</th>
                            </tr>
                        </thead>
                        <tbody id="listDeviceInformationBody"></tbody>
                    </table>
                    <div class="d-flex justify-content-center mb-2">
                    <button class="btn btn-success btn-sm  btnSave" data-request-id="${requestId}"  style="width: 10%; margin-top: 20px; margin-right:5px;">Accept</button>
                     <button class="btn btn-danger btn-sm  btnReject" data-request-id="${requestId}"  style="width: 10%; margin-top: 20px;">Reject</button>
                    </div>
                </div>
            `;

            $('.modal-body').html(htmlToAdd);
            $('#publicModalLabel').text("Have you receive this device?");

            var rowsHtml = '';
                print('requestData', function(requestData){
                 if(requestData){

                    const requestInfo = requestData.find(item => item.id === requestId);
                    // Assuming you already have `rowsHtml` to construct your HTML.
                     let ids = deviceId || []; // Ensure it's a valid array.deviceIds || []; // Ensure it's a valid array
                     print('allAddData', function(allAddData) {
                        if (allAddData) {
                            print('individualColumns', function(individualColumns) {
                                allAddData.forEach(function(data, index) {
                                    if (data.categoryName === category && data.id===deviceId) {
                                        rowsHtml += `<tr>
                                            <td>${data.visibleId}</td>
                                            <td style="display: none;">${data.id}</td>
                                            <td>${data.categoryName}</td>`;

                                        universalColumns.forEach(function(column) {
                                            rowsHtml += `<td>${data.allData[column.columnName]}</td>`;
                                        });

                                        rowsHtml += `<td>
                                            <ul style="list-style: none; padding-left: 0; text-align: center;">`;

                                        if (individualColumns) {
                                            individualColumns.forEach(function(individualColumn) {
                                                if (individualColumn.categoryName === category) {
                                                    rowsHtml += `<li>${individualColumn.columnName} : ${data.allData[individualColumn.columnName]}</li>`;
                                                }
                                            });
                                        }



                                        rowsHtml += `
                                            <td>
                                                <input
                                                     name="selectDevice"
                                                    type="checkbox"
                                                    data-device-id="${data.id}"
                                                    data-button-id="accepted"
                                                    style="background-color: green; transform: scale(1.5); width: 12px; height: 12px;"
                                                    title="Delivery Device"
                                                    ${ids.includes(data.id) ? 'checked' : ''}>
                                            </td>
                                        </tr>`;

                                    }
                                });

                                // Populate the table only if rowsHtml has content
                                if (rowsHtml) {
                                    $('#listDeviceInformationBody').html(rowsHtml);

                                    // Show modal only if rows were added
                                    showModal();
                                } else {
                                    CustomAlert("No data found to display in the modal.");
                                }
                            });
                        }
                    });
                 }
                });

               $('.btnSave').click(function(event) {
                           event.preventDefault(); // Prevent the default action (form submission)
                            var requestId=$(this).data('request-id');

                           const checkboxes = document.querySelectorAll('input[name="selectDevice"]:checked');
                           const selectedRows = Array.from(checkboxes).map(checkbox => {
                               const row = checkbox.closest('tr'); // Get the parent row of the checkbox
                               const secondColumn = row.querySelector('td:nth-child(2)'); // Get the second column (assuming columns are indexed from 1)

                               if (secondColumn) {
                                   const secondColumnValue = secondColumn.textContent.trim(); // Get the text content of the second column
                                   return secondColumnValue;
                               } else {
                                   return null;
                               }
                           });

                           if(selectedRows.length==0){
                             CustomAlert("Please select a device.");
                           }
                           else if(selectedRows.length==1){
                            // Show a confirmation alert
                            const userConfirmed = confirm("Do you want to proceed with the selected device?");
                            if (userConfirmed) {
                                 hideModal();
                                 sendDeliveryDeviceAccept(requestId,selectedRows);
                            } else {
                                console.log("User canceled.");
                                // Handle the cancel action here
                            }
                           }
                           else{
                            CustomAlert("Please select only one device.");
                           }

                       });

        });
        }
        else if (buttonId === "purchase") {
            var htmlToAdd = `
                <div class="mb-3" style="margin-right: 0%; text-align: center;">
                    <button type="button" class="btn btn-primary" id="AcceptBtn">Yes</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                </div>
            `;
            $('.ModalMedium').html(htmlToAdd);
            $('#publicModalMediumLabel').text("Do you want to Purchase this Product ?");
            $('#AcceptBtn').click(function() {
                setRequestStatus(requestId, "Purchased");
            });
            showModalMedium();
        }

    });
};


 $(document).ready(function() {
                    $('.hideButton').click(function() {
                        // Hide the second column
                        $('.secondDiv').hide();

                        // Show the showButton and set display to inline-block
                        $('.showButton').css('display', 'inline-block');

                        // Change the class of the first column to make it full-width
                        $('.firstDiv').removeClass('col-sm-9').addClass('col-sm-12');
                    });

                    $('.showButton').click(function() {
                        // Show the second column
                        $('.secondDiv').show();

                        // Hide the showButton again
                        $('.showButton').hide();

                        // Revert the class of the first column back to original
                        $('.firstDiv').removeClass('col-sm-12').addClass('col-sm-9');
                        $('.secondDiv').addClass('col-sm-3');
                    });
                });




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
window.initRequestDataAlternativeGeneral = function () {
    $('#requestInventoryAlternativeTable tbody tr').click(function(event) {
        var $row = $(this); // Store the clicked row element
        var button = $(event.target).closest('button');
        var buttonPressed = button.text().trim(); // Get the HTML inside the button
        var requestId = button.data('requestId');
          var deviceId=button.data('alternativedevice-id');
        var buttonId = button.data('buttonId');
        var categoryName = $row.find('td:nth-child(3)').text();

        if (!requestId) {
            console.error("Missing data-request-id attribute on button!");
            return;
        }

        if (!buttonId) {
            console.error("Missing data-button-id attribute on button!");
            return;
        }



        if (buttonId === "deliver") {
            var htmlToAdd = `
                <div class="mb-3" style="margin-right: 0%; text-align: center;">
                    <button type="button" class="btn btn-primary" id="AcceptBtn">Yes</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                </div>
            `;
            $('.ModalMedium').html(htmlToAdd);
            $('#publicModalMediumLabel').text("Do you want to deliver this Product ?");
            $('#AcceptBtn').click(function() {
                setRequestStatus(requestId, "Direct Delivery");
            });
            showModalMedium();
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
        else if (buttonId === "chat") {
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
                                     <th scope="col" style="background-color: gray;color:white">SN1</th>
                                      <th scope="col" style="background-color: gray;display: none;color:white">Device Id</th>
                                     <th scope="col" style="background-color: gray;color:white">Category Name</th>
                                     ${categoriesHtml}
                                     <th scope="col" style="background-color: gray;color:white">Description</th>
                                     <th scope="col" style="background-color: gray;color:white">Action</th>
                                 </tr>
                             </thead>
                             <tbody id="deviceInformationBody">

                             </tbody>
                         </table>
                     </div>
                      <div class="mb-3" style="margin-left: 0%; text-align: center;">
                            <button type="button" class="btn btn-primary" id="saveEditBtn">Send</button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                 `;
                 $('.modal-body').html(htmlToAdd);

                 $('#publicModalLabel').text("Select Alternative Device");

                 print('allAddData', function(allAddData) {
                     if (allAddData) {
                         // First, fetch individual columns
                         print('individualColumns', function(individualColumns) {
                             var rowsHtml = '';
                             allAddData.forEach(function(data, index) {
                              if (data.categoryName=== categoryName) {
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

                                 rowsHtml += `</ul>
                                     </td>
                                     <td ><input type="checkbox" style="transform: scale(1.5);margin: 10px;" name="selectDevice"  th:data-selected-id="${data.id}" class="action-checkbox"></td>
                                 </tr>`;
                                  }
                             });

                             $('#deviceInformationBody').html(rowsHtml);
                         });
                     }
                 });


         $('#saveEditBtn').click(function(event) {
             event.preventDefault(); // Prevent the default action (form submission)

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

             // Show a confirmation alert
             const userConfirmed = confirm("Do you want to proceed with the selected rows?");
             if (userConfirmed) {
                 hideModal();
                 listRequest(requestId,selectedRows);
             } else {
                 console.log("User canceled.");
                 // Handle the cancel action here
             }
         });


                 showModal();
             });
         }
         else if (buttonId === "view") {
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
                          categoriesHtml += `<th scope="col" style="background-color: gray;color:white">${category.columnName}</th>`;
                      });
                  }

                  var htmlToAdd = `
                      <div class="mb-9" style="margin-left: 0%; text-align: left;">
                          <table id="deviceInformationTable" class="table table-gray table-bordered table-hover">
                              <thead>
                                  <tr>
                                      <th scope="col" style="background-color: gray;color:white">SN1</th>
                                       <th scope="col" style="background-color: gray;display: none;color:white">Device Id</th>
                                      <th scope="col" style="background-color: gray;color:white">Category Name</th>
                                      ${categoriesHtml}
                                      <th scope="col" style="background-color: gray;color:white">Description</th>

                                  </tr>
                              </thead>
                              <tbody id="listDeviceInformationBody">

                              </tbody>
                          </table>
                      </div>

                  `;
                  $('.modal-body').html(htmlToAdd);

                  $('#publicModalLabel').text("Select Alternative Device");

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

                  showModal();
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
        else if(buttonId==="CheckAvailability"){
          var htmlToAdd = `
                 <div class="mb-3" style="margin-right: 0%; text-align: center;">
                     <button type="button" class="btn btn-primary" id="AcceptBtn">Yes</button>
                     <button type="button" class="btn btn-primary" id="AcceptBtnNot">No</button>
                     <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                 </div>
             `;
             $('.ModalMedium').html(htmlToAdd);
             $('#publicModalMediumLabel').text(" Available  this Product ?");
             $('#AcceptBtn').click(function() {
                 setRequestStatusCheckAvailability(requestId, "Yes");
             });
              $('#AcceptBtnNot').click(function() {
                  setRequestStatusCheckAvailability(requestId, "No");
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


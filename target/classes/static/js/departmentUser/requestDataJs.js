function  saveTableInformationOfRequest(){
         var formData=$("#dynamicFormAddRequest").serialize();
          var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
          var departmentName = departmentElement.data("departmentuser-name");
             // Append the category name to the form data
             formData += '&departmentName=' + encodeURIComponent(departmentName);

             $.ajax({
                 url: '/departmentUser/addRequestInformation', // URL to your endpoint for saving data
                 type: 'POST',
                 data: formData, // Send serialized form data and category name
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
function addRequest(){

   var htmlToAdd = `
               <form   id="dynamicFormAddRequest">
               <div class="mb-3" style="margin-left: 0%; text-align: left;">
                       <div class="dropdown">
                           <label for="deviceInputFieldAdd" class="form-label">Category Name</label>
                           <input type="text"  name="category" class="form-control dropdown-toggle custom-width" id="deviceInputFieldAdd" data-bs-toggle="dropdown" placeholder="Category" aria-expanded="false">
                           <ul class="dropdown-menu custom-dropdown-menu" aria-labelledby="dropdownTextFieldPopupBox" id="deviceInputAddUlList">
                              <div id="listItemAddDevice"></div>
                           </ul>
                       </div>
                   </div>
               <div id="requestDiv" >

              </div>
               </form>
                <div class="mb-3" style="margin-left: 0%; text-align: left;">
                    <button type="button" class="btn btn-primary" id="saveEditBtn">Save</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            `;

            // Add the HTML code to the modal body using jQuery
            $('.ModalMedium').html(htmlToAdd);
            $('#publicModalMediumLabel').text("Add Request Information");
             print('categories', function(categories) {
                   if (categories) {
                       // Generate HTML for categories
                       var categoriesHtml = '';
                       categories.forEach(function(category) {
                           categoriesHtml += `<li><a class="dropdown-item deviceInputEachItem" href="#" th:text="${category.categoryName}">${category.categoryName}</a></li>`;
                       });

                       // Insert evaluated Thymeleaf expression
                       $('#listItemAddDevice').html(categoriesHtml);
                   }
               });
             print('requestColumns', function(requestColumns) {
                        if (requestColumns) {
                            // Generate HTML for categories
                                 var categoriesHtml = '';
                            requestColumns.forEach(function(column) {
                                console.log(column.dataType);

                                 switch (column.dataType) {
                                     case 'text':
                                         categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="text" class="form-control" placeholder="Text" name="${column.columnName}"></div>`;
                                         break;
                                     case 'password':
                                         categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="password" class="form-control" placeholder="Password" name="${column.columnName}"></div>`;
                                         break;
                                     case 'email':
                                         categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="email" class="form-control" placeholder="Email" name="${column.columnName}"></div>`;
                                         break;
                                     case 'url':
                                         categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="url" class="form-control" placeholder="URL" name="${column.columnName}"></div>`;
                                         break;
                                     case 'search':
                                         categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="search" class="form-control" placeholder="Search" name="${column.columnName}"></div>`;
                                         break;
                                     case 'tel':
                                         categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="tel" class="form-control" placeholder="Telephone" name="${column.columnName}"></div>`;
                                         break;
                                     case 'number':
                                         categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="number" class="form-control" placeholder="Number" name="${column.columnName}"></div>`;
                                         break;
                                     case 'range':
                                         categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="range" class="form-control" name="${column.columnName}"></div>`;
                                         break;
                                     case 'date':
                                         categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="date" class="form-control" name="${column.columnName}"></div>`;
                                         break;
                                     case 'month':
                                         categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="month" class="form-control" name="${column.columnName}"></div>`;
                                         break;
                                     case 'week':
                                         categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="week" class="form-control" name="${column.columnName}"></div>`;
                                         break;
                                     case 'time':
                                         categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="time" class="form-control" name="${column.columnName}"></div>`;
                                         break;
                                     case 'datetime-local':
                                         categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="datetime-local" class="form-control" name="${column.columnName}"></div>`;
                                         break;
                                     case 'color':
                                         categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="color" class="form-control" name="${column.columnName}"></div>`;
                                         break;
                                     case 'file':
                                         categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="file" class="form-control" name="${column.columnName}"></div>`;
                                         break;
                                     case 'checkbox':
                                         categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="checkbox" class="form-check-input" name="${column.columnName}"></div>`;
                                         break;
                                     case 'radio':
                                         categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="radio" class="form-check-input" name="${column.columnName}"></div>`;
                                         break;
                                     case 'button':
                                         categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="button" class="btn btn-secondary" value="Click me" name="${column.columnName}"></div>`;
                                         break;
                                     case 'submit':
                                         categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="submit" class="btn btn-primary" value="Submit" name="${column.columnName}"></div>`;
                                         break;
                                     case 'reset':
                                         categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="reset" class="btn btn-danger" value="Reset" name="${column.columnName}"></div>`;
                                         break;
                                     case 'textarea':
                                             categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><textarea class="form-control" placeholder="Enter text here" name="${column.columnName}"></textarea></div>`;
                                             break;
                                     default:
                                         categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label></div>`;
                                         break;
                                 }


                            });

                            // Insert evaluated Thymeleaf expression
                            $('#requestDiv').html(categoriesHtml); // Corrected line
                        }
                    });



             $('#saveEditBtn').click(function() {

                saveTableInformationOfRequest();
                });
           selectionAndInputDevice();
          showModalMedium();
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
function setReceivedStatus(requestId,status){
                $.ajax({
                     url: '/departmentUser/updateDeviceReceivedStatus',
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
            if(status=="Accepted"){

             $.ajax({
                     url: '/superAdmin/updateRequestStatus',
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
            else if(status=="Denied"){

              $.ajax({
                     url: '/superAdmin/updateRequestStatus',
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

}
function acceptDeliveryDevice(requestId,deviceId){
 // Define the Service class

         var mergedFormData = {}; // Object to hold all form data based on formId


          var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
          var departmentName = departmentElement.data("departmentname");//it
          var departmentUserName = departmentElement.data("departmentuser-name");//saho
          var departmentUserId = departmentElement.data("departmentuser-id");//s


         // Send AJAX request to backend
         $.ajax({
             url: "/departmentUser/acceptDeliveryDeviceCustomerCareToDepartment",
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

function EditTableInformationOfRequest(requestId){
           var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
          var departmentName = departmentElement.data("departmentuser-name");

         var formData=$("#dynamicFormAddRequestEdit").serialize();

             // Append the deviceId and category name to the form data
             formData += '&requestId=' + encodeURIComponent(requestId);
             formData += '&departmentName=' + encodeURIComponent(departmentName);

             $.ajax({
                 url: '/departmentUser/editRequestInformation', // URL to your endpoint for saving data
                 type: 'POST',
                 data: formData, // Send serialized form data and category name
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

window.initRequestDataGeneral = function () {
    $('#requestTable tbody').on('click', 'tr', function(event) {

        var $row = $(this);
        var categoryName = $row.find('td:nth-child(2)').text();
        var buttonPressed = $(event.target).closest('button');
        const button = $(event.target).closest('button');
        var requestId=button.data('request-id');
         var deviceId=button.data('buyingdevice-id');
           if(deviceId==null){
           deviceId=button.data('alternativedevice-id');
           }
        var category=button.data('category-id');

        if (buttonPressed.hasClass('Edit')) {
            const requestIdData = button.data('requestId');

           var htmlToAdd = `
                          <form   id="dynamicFormAddRequestEdit">

                          <div class="mb-3" style="margin-left: 0%; text-align: left;">
                                     <div class="dropdown">
                                         <label for="deviceInputFieldAddEdit2" class="form-label">Category Name</label>
                                         <input type="text"  name="category" class="form-control dropdown-toggle custom-width" id="deviceInputFieldAddEdit2" data-bs-toggle="dropdown" placeholder="Category" aria-expanded="false">
                                         <ul class="dropdown-menu custom-dropdown-menu" aria-labelledby="dropdownTextFieldPopupBoxEdit" id="deviceInputAddUlListEdit2">
                                            <div id="listItemAddDeviceEdit2"></div>
                                         </ul>
                                     </div>
                                 </div>

                           <div id="requestDivEdit" >

                           </div>
                          </form>
                           <div class="mb-3" style="margin-left: 0%; text-align: left;">
                               <button type="button" class="btn btn-primary" id="saveEditBtn">Save</button>
                               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                           </div>
                       `;

                       // Add the HTML code to the modal body using jQuery
                       $('.ModalMedium').html(htmlToAdd);
                       $('#publicModalMediumLabel').text("Edit Request Information");
                        $('#deviceInputFieldAddEdit2').val(categoryName);
                        print('categories', function(categories) {
                                  if (categories) {
                                      // Generate HTML for categories
                                      var categoriesHtml = '';
                                      categories.forEach(function(category) {
                                          categoriesHtml += `<li><a class="dropdown-item deviceInputEachItemEdit2" href="#" th:text="${category.categoryName}">${category.categoryName}</a></li>`;
                                      });

                                      // Insert evaluated Thymeleaf expression
                                      $('#listItemAddDeviceEdit2').html(categoriesHtml);
                                  }
                              });
                       print('requestColumns', function(requestColumns) {
                                   if (requestColumns) {
                                       // Generate HTML for categories
                                            var categoriesHtml = '';
                                       requestColumns.forEach(function(column) {
                                           console.log(column.dataType);

                                            switch (column.dataType) {
                                                case 'text':
                                                    categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="text" class="form-control" placeholder="Text" name="${column.columnName}"></div>`;
                                                    break;
                                                case 'password':
                                                    categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="password" class="form-control" placeholder="Password" name="${column.columnName}"></div>`;
                                                    break;
                                                case 'email':
                                                    categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="email" class="form-control" placeholder="Email" name="${column.columnName}"></div>`;
                                                    break;
                                                case 'url':
                                                    categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="url" class="form-control" placeholder="URL" name="${column.columnName}"></div>`;
                                                    break;
                                                case 'search':
                                                    categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="search" class="form-control" placeholder="Search" name="${column.columnName}"></div>`;
                                                    break;
                                                case 'tel':
                                                    categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="tel" class="form-control" placeholder="Telephone" name="${column.columnName}"></div>`;
                                                    break;
                                                case 'number':
                                                    categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="number" class="form-control" placeholder="Number" name="${column.columnName}"></div>`;
                                                    break;
                                                case 'range':
                                                    categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="range" class="form-control" name="${column.columnName}"></div>`;
                                                    break;
                                                case 'date':
                                                    categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="date" class="form-control" name="${column.columnName}"></div>`;
                                                    break;
                                                case 'month':
                                                    categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="month" class="form-control" name="${column.columnName}"></div>`;
                                                    break;
                                                case 'week':
                                                    categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="week" class="form-control" name="${column.columnName}"></div>`;
                                                    break;
                                                case 'time':
                                                    categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="time" class="form-control" name="${column.columnName}"></div>`;
                                                    break;
                                                case 'datetime-local':
                                                    categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="datetime-local" class="form-control" name="${column.columnName}"></div>`;
                                                    break;
                                                case 'color':
                                                    categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="color" class="form-control" name="${column.columnName}"></div>`;
                                                    break;
                                                case 'file':
                                                    categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="file" class="form-control" name="${column.columnName}"></div>`;
                                                    break;
                                                case 'checkbox':
                                                    categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="checkbox" class="form-check-input" name="${column.columnName}"></div>`;
                                                    break;
                                                case 'radio':
                                                    categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="radio" class="form-check-input" name="${column.columnName}"></div>`;
                                                    break;
                                                case 'button':
                                                    categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="button" class="btn btn-secondary" value="Click me" name="${column.columnName}"></div>`;
                                                    break;
                                                case 'submit':
                                                    categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="submit" class="btn btn-primary" value="Submit" name="${column.columnName}"></div>`;
                                                    break;
                                                case 'reset':
                                                    categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><input type="reset" class="btn btn-danger" value="Reset" name="${column.columnName}"></div>`;
                                                    break;
                                                case 'textarea':
                                                        categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label><textarea  class="form-control plain-textarea" placeholder="Enter text here" name="${column.columnName}" value="asaa"></textarea></div>`;
                                                        break;
                                                default:
                                                    categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label></div>`;
                                                    break;
                                            }


                                           // set value
                                                columnValue(requestIdData, column.columnName, function(value) {
                                                  // console.log(column.columnName+':', value);
                                                  console.log(value);
                                                    $(`[name="${column.columnName}"]`).val(value); // Update this line


                                               });

                                       });

                                       // Insert evaluated Thymeleaf expression
                                       $('#requestDivEdit').html(categoriesHtml); // Corrected line
                                   }
                               });



                        $('#saveEditBtn').click(function() {

                           EditTableInformationOfRequest(requestIdData );
                           });

                     showModalMedium();
                     selectionAndInputDeviceEdit2();
        }
        else if (buttonPressed.hasClass('Delete')) {
        const requestId = button.data('requestId');
            if (!requestId) {
                console.error("Missing data-request-id attribute on delete button!");
                return;
            }

            $.ajax({
                url: '/departmentUser/deleteRequest',
                type: 'POST',
                data: { requestId: requestId },
                success: function(result) {
                   // alert(result);
                    CustomAlert(result);
                    // use CustomAlert(result)
                    location.reload();
                },
                error: function(xhr, status, error) {
                    console.error("Error deleting user:", error);
                }
            });
        }
        else if (buttonPressed.hasClass('receiveButton')) {

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
                                          <th scope="col" style="background-color: gray;">SN</th>
                                          <th scope="col" style="background-color: gray; display: none;">Device Id</th>
                                          <th scope="col" style="background-color: gray;">Category Name</th>
                                          ${categoriesHtml}
                                          <th scope="col" style="background-color: gray;">Description</th>
                                            <th scope="col" style="background-color: gray;">Action</th>
                                      </tr>
                                  </thead>
                                  <tbody id="listDeviceInformationBody"></tbody>
                              </table>
                              <div class="d-flex justify-content-center mb-2">
                              <button class="btn btn-success btn-sm  btnSave" data-request-id="${requestId}"  style="width: 10%; margin-top: 20px;">Accept</button>
                              </div>
                          </div>
                      `;

                      $('.modal-body').html(htmlToAdd);
                      $('#publicModalLabel').text("Device Information");

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
                                              if (data.categoryName === category && data.id ===deviceId) {
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
                                           acceptDeliveryDevice(requestId,selectedRows);
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
    });
};



    function columnValue(requestId, columnName, callback) {
        print('requestData', function(allAddData) {
            const deviceData = allAddData.find(item => item.id === requestId);

            if (deviceData) {
                const columnData = deviceData.allData;

                if (columnData && columnData.hasOwnProperty(columnName)) {
                    callback(columnData[columnName]);
                } else {
                    console.warn(`Column "${columnName}" not found in request data.`);
                    callback(undefined);
                }
            } else {
                console.warn(`No data found for Device ID ${requestId}`);
                callback(undefined);
            }
        });
    }

   function selectionAndInputDevice(){
   // Event delegation for dynamically added items
          $(document).on('click', '.deviceInputEachItem', function(event) {
              var text = $(this).text();
              $('#deviceInputFieldAdd').val(text);
              });


           // Filter items based on input
               $(document).on('keyup', '#deviceInputFieldAdd', function() {
                   var filter = $(this).val().toUpperCase();
                   $('#deviceInputAddUlList li').each(function() {
                       var text = $(this).text().toUpperCase();
                       if (text.indexOf(filter) > -1) {
                           $(this).show();
                       } else {
                           $(this).hide();
                       }
                   });
               });


   }

   function selectionAndInputDeviceEdit(){
      // Event delegation for dynamically added items
             $(document).on('click', '.deviceInputEachItemEdit', function(event) {
                 var text = $(this).text();
                 $('#deviceInputFieldAddEdit').val(text);
                 });


              // Filter items based on input
                  $(document).on('keyup', '#deviceInputFieldAddEdit', function() {
                      var filter = $(this).val().toUpperCase();
                      $('#deviceInputAddUlListEdit li').each(function() {
                          var text = $(this).text().toUpperCase();
                          if (text.indexOf(filter) > -1) {
                              $(this).show();
                          } else {
                              $(this).hide();
                          }
                      });
                  });


      }

 function selectionAndInputDeviceEdit2(){
      // Event delegation for dynamically added items
             $(document).on('click', '.deviceInputEachItemEdit2', function(event) {
                 var text = $(this).text();
                 $('#deviceInputFieldAddEdit2').val(text);
                 });


              // Filter items based on input
                  $(document).on('keyup', '#deviceInputFieldAddEdit2', function() {
                      var filter = $(this).val().toUpperCase();
                      $('#deviceInputAddUlListEdit2 li').each(function() {
                          var text = $(this).text().toUpperCase();
                          if (text.indexOf(filter) > -1) {
                              $(this).show();
                          } else {
                              $(this).hide();
                          }
                      });
                  });


      }
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



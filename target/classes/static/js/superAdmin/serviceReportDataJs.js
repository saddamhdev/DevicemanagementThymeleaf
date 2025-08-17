function setServiceReportAccept(serviceId, status,comment){
 // Send AJAX request to add category
        $.ajax({
            type: "POST",
            url: "/superAdmin/serviceReportAccept", // URL to your controller method
            data: { serviceId: serviceId,status:status,comment:comment },
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

function   addExtractDeviceToService(categoryName,deviceId){
//dynamicFormAddDeviceExtract form
 // Serialize form data
     var formData = $("#dynamicFormAddDeviceExtract").serialize();
             var departmentElement = $(".departmentName"); // Target element with department data
            var departmentName = departmentElement.data("departmentname"); // e.g., "it"
            var departmentUserName = departmentElement.data("departmentuser-name"); // e.g., "saho"
            var departmentUserId = departmentElement.data("departmentuser-id"); // e.g., "sahoid"


     // Append the category name, department name, starting date, username, and userId to the form data
     formData += '&categoryName=' + encodeURIComponent(categoryName);

     formData += '&departmentName=' + encodeURIComponent(departmentName);
     formData += '&departmentUserName=' + encodeURIComponent(departmentUserName);
     formData += '&departmentUserId=' + encodeURIComponent(departmentUserId);
     formData += '&deviceId=' + encodeURIComponent(deviceId);

     // Debugging: Print the collected data
     console.log("Form Data:", formData);

     // AJAX call to save data
     $.ajax({
         url: '/service/addDeviceInformation', // URL to your endpoint for saving data
         type: 'POST',
         data: formData, // Send serialized form data along with additional fields
         headers: {

                           'Authorization': 'Bearer ' + getAuthToken()
                       },
         success: function(response) {

             hideModalExtract();
             var returnDeviceId=response;
                 var rowsHtmlExtraComponents = '';
                print('universalColumns', function(universalColumns) {

                   print('allAddData', function(allAddData) {
                   if (allAddData) {
                       // First, fetch individual columns
                       print('individualColumns', function(individualColumns) {

                       // device data
                          const data = allAddData.find(item => item.id === returnDeviceId);

                               rowsHtmlExtraComponents += `<tr>
                                   <td>1</td>
                                    <td style="display: none;">${data.id}</td>
                                   <td>${data.categoryName}</td>`;
                               universalColumns.forEach(function(column) {
                                   rowsHtmlExtraComponents += `<td >${data.allData[column.columnName]}</td>`;
                               });

                               rowsHtmlExtraComponents += `<td>
                                   <ul style="list-style: none; padding-left: 0; text-align: center;">`;

                               if (individualColumns) {
                                   individualColumns.forEach(function(individualColumn) {
                                      if (individualColumn.categoryName=== data.categoryName) {

                                       rowsHtmlExtraComponents += `<li>${individualColumn.columnName} : ${data.allData[individualColumn.columnName]}</li>`;
                                       }
                                   });
                               }
                             rowsHtmlExtraComponents += `</ul>
                                     </td>`;

                                 // Add another <td> for the checkbox
                                 rowsHtmlExtraComponents += `
                                     <td>
                                       <input type="checkbox" class="form-check-input" name="deviceCheckbox"
                                          value="${data.id}"
                                          style="width: 20px; height: 20px; border: 2px solid #000; cursor: pointer;">
                                     </td>
                                 </tr>`;


                           $('#listDeviceInformationBodyExtraComponents').append(rowsHtmlExtraComponents);
                       });
                   }
               });
             //

          });

         },
         error: function(xhr, status, error) {
             console.error("Error saving data: " + error);
         }
     });
}


function serviceReport(serviceId,selectedExtractListDeviceIds,selectedNeedAccessoriesDeviceIds,status,deviceId) {

    // add action
     var mergedFormData = {}; // Object to hold all form data based on formId

    // Loop through each form inside the modal-body div
    $("#problemActions form").each(function() {
        var formId = $(this).attr('id'); // Get the form's id
        var formData = $(this).serializeArray(); // Serialize form data as an array of objects

        // Add the form data under the respective formId
        mergedFormData[formId] = formData;
    });

    var departmentElement = $(".departmentName"); // Target element with department data
       var departmentName = departmentElement.data("departmentname"); // e.g., "it"
       var departmentUserName = departmentElement.data("departmentuser-name"); // e.g., "saho"
       var departmentUserId = departmentElement.data("departmentuser-id"); // e.g., "sahoid"


    // Append serviceId and departmentName to the merged data
    mergedFormData['serviceId'] = serviceId;
    mergedFormData['departmentName'] = departmentName;
    mergedFormData['departmentUserName'] = departmentUserName;
    mergedFormData['departmentUserId'] = departmentUserId;
     mergedFormData['deviceId'] = deviceId;

    mergedFormData['selectedExtractListDeviceIds'] = selectedExtractListDeviceIds;
     mergedFormData['selectedNeedAccessoriesDeviceIds'] = selectedNeedAccessoriesDeviceIds;

     mergedFormData['status'] = status;

    $.ajax({
        url: '/service/generateServiceReport', // URL to your endpoint for saving data
        type: 'POST',
        contentType: 'application/json', // Ensure content type is JSON
        data: JSON.stringify(mergedFormData), // Convert mergedFormData object to JSON string
        headers: {

                          'Authorization': 'Bearer ' + getAuthToken()
                      },
        success: function(response) {
                                    CustomAlert(response);
                                      $('#globalCustomAlertModal').on('hidden.bs.modal', function () {
                                          location.reload();
                                      });             },
        error: function(xhr, status, error) {
            console.error("Error saving data: " + error);
        }
    });

}
function addTableInformationOfServiceForEdit(serviceId) {
    // Extract department data
    var departmentElement = $(".departmentName"); // Target element with department data
    var departmentName = departmentElement.data("departmentname"); // e.g., "it"
    var departmentUserName = departmentElement.data("departmentuser-name"); // e.g., "saho"
    var departmentUserId = departmentElement.data("departmentuser-id"); // e.g., "sahoid"

    // Serialize form data and append additional parameters
    var formData = $("#problemForm").serialize();
    formData += '&serviceId=' + encodeURIComponent(serviceId);
    formData += '&departmentName=' + encodeURIComponent(departmentName);
    formData += '&departmentUserName=' + encodeURIComponent(departmentUserName);
    formData += '&departmentUserId=' + encodeURIComponent(departmentUserId);

    // AJAX call to backend
    $.ajax({
        url: '/service/addDeviceInformationOfServiceForEdit', // Backend endpoint
        type: 'POST',
        data: formData,
        headers: {

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

function addTableInformationOfService22(serviceId) {
    var mergedFormData = {}; // Object to hold all form data based on formId

    // Loop through each form inside the modal-body div
    $(".modal-body form").each(function() {
        var formId = $(this).attr('id'); // Get the form's id
        var formData = $(this).serializeArray(); // Serialize form data as an array of objects

        // Add the form data under the respective formId
        mergedFormData[formId] = formData;
    });

    var departmentElement = $(".departmentName"); // Target element with department data
       var departmentName = departmentElement.data("departmentname"); // e.g., "it"
       var departmentUserName = departmentElement.data("departmentuser-name"); // e.g., "saho"
       var departmentUserId = departmentElement.data("departmentuser-id"); // e.g., "sahoid"


    // Append serviceId and departmentName to the merged data
    mergedFormData['serviceId'] = serviceId;
    mergedFormData['departmentName'] = departmentName;
    mergedFormData['departmentUserName'] = departmentUserName;
    mergedFormData['departmentUserId'] = departmentUserId;

    $.ajax({
        url: '/service/addProblemSolutionOfService', // URL to your endpoint for saving data
        type: 'POST',
        contentType: 'application/json', // Ensure content type is JSON
        data: JSON.stringify(mergedFormData), // Convert mergedFormData object to JSON string
        headers: {

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


window.initServiceReportDataGeneral = function () {
  $('#serviceInformationServicingListTable tbody tr').click(function(event) {
    const $row = $(this); // Store the clicked row element
     var categoryName = $row.find('td:nth-child(3)').text();
    // Target the button itself for better accuracy
       const button = $(event.target).closest('button');
       var buttonId = button.data('buttonId');
       var deviceId = button.data('deviceId');

       var  serviceId = button.data('serviceId');
    // Check if a button was clicked (prevents accidental clicks on other elements)
             var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
             var departmentName = departmentElement.data("departmentname");//it
             var departmentUserName = departmentElement.data("departmentuser-name");//saho
             var departmentUserId = departmentElement.data("departmentuser-id");//s
    if (!button.length) {
      return; // Do nothing if not a button click
    }
      if (!buttonId) {
            console.error("Missing data-button-id attribute on button!");
            return;
        }

    const buttonText = button.text().trim(); // Get button text (trimming leading/trailing spaces)
       if(buttonId==="viewServiceReport"){
     var htmlToAdd = `
                      <div class="mb-3" style="margin-right: 0%; text-align: center;">

                        <div class="text-center" style="background-color:#D2E8E3; padding: 10px; border-radius: 5px; margin-bottom:1px">
                            <h4>Service Report</h4>

                        </div>
                        <div id="requestInfo"></div>
                        <div id="actions"></div>
                        <div id="extractComponents"></div>
                        <div id="needAccessories"></div>
                      </div>
                      <div class="mb-3" style="margin-right: 0%; text-align: center;">
                                     <input type="text" class="form-control" placeholder="Enter Comments..."
                                        id="comment" style="width: 50%; display: inline-block; border:1px solid gray" />
                       </div>
                      <div class="mb-3" style="margin-right: 0%; text-align: center;">

                          <button type="button" class="btn btn-primary" id="AcceptBtn">Approve</button>
                          <button type="button" class="btn btn-danger" id="rejectBtn">Reject</button>
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                      </div>
                  `;
                  $('.modal-body').html(htmlToAdd);
                   // $('#publicModalLabel').text("Service Report");
                   requestInfo();
                  function requestInfo() {
                      // Get the current date
                      const currentDate = new Date();

                      // Format the date as YYYY-MM-DD
                      const formattedDate = currentDate.toISOString().split('T')[0];

                      // Simulating data fetch
                      print('serviceRequests', function (serviceRequests) {
                          if (serviceRequests) {
                              // Find the matching service data by serviceId
                              const serviceData = serviceRequests.find(item => item.id === serviceId);

                              // Debugging: Log serviceData to ensure it contains the required fields
                              console.log(serviceData);

                              if (serviceData) {
                                  const tableHtml = `
                                      <table class="table table-bordered">
                                          <tbody>
                                              <tr>
                                                  <th style="width: 20%;">Device Category</th>
                                                  <td style="width: 30%;">${serviceData.categoryName}</td>
                                                  <th style="width: 20%;">Description</th>
                                                  <td style="width: 30%;">
                                                      <button class="btn btn-info btn-sm viewDevice"
                                                              data-device-id="${serviceData.deviceId || 'N/A'}"
                                                              data-button-id="viewDevice">
                                                          View &#128065;
                                                      </button>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <th>Receive Date</th>
                                                  <td>${serviceData.serviceCenterServiceRequestAcceptedTime || 'N/A'}</td>
                                                  <th>Dept. Name</th>
                                                  <td>${serviceData.departmentName || 'N/A'}</td>
                                              </tr>
                                              <tr>
                                                  <th>Delivery Date</th>
                                                  <td>${getCurrentDateTime()}</td>
                                                  <th>Serial No.</th>
                                                  <td>240001</td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  `;

                                  // Insert the table into the element with ID "requestInfo"
                                  $('#requestInfo').html(tableHtml);

                                  // Add click event listener for "viewDevice" buttons
                                  $('.viewDevice').on('click', function () {
                                      const deviceId = $(this).data('device-id');
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
                                          $('.modal-bodyView').html(htmlToAdd);

                                          $('#publicModalLabelView').text("Device Information");
                                          colorChange();
                                           function  colorChange(){
                                                       // When the second modal is shown, add a blur effect to the first modal
                                                        $('#publicModalView').on('show.bs.modal', function () {
                                                          $('#publicModal .modal-content').css('filter', 'blur(200px)'); // Apply blur effect
                                                        });

                                                        // When the second modal is hidden, remove the blur effect from the first modal
                                                        $('#publicModalView').on('hidden.bs.modal', function () {
                                                          $('#publicModal .modal-content').css('filter', ''); // Remove blur effect
                                                        });
                                                      }



                                                       var rowsHtml = '';
                                                          // Corrected the for loop syntax to iterate over the deviceIds array
                                                             // alert(result.inventory.deviceIds[i]);
                                                              print('allAddData', function(allAddData) {
                                                                  if (allAddData) {
                                                                      // First, fetch individual columns
                                                                      print('individualColumns', function(individualColumns) {

                                                                          allAddData.forEach(function(data, index) {
                                                                           if (data.id=== deviceId) {
                                                                              rowsHtml += `<tr>
                                                                                  <td>${data.visibleId}</td>
                                                                                   <td style="display: none;">${data.id}</td>
                                                                                  <td>${data.categoryName}</td>`;
                                                                              universalColumns.forEach(function(column) {
                                                                                  rowsHtml += `<td >${data.allData[column.columnName]}</td>`;
                                                                              });

                                                                              rowsHtml += `<td>
                                                                                  <ul style="list-style: none; padding-left: 0; text-align: center;">`;

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


                                          showModalView();
                                      });

                                  });
                              } else {
                                  console.error('No matching service data found.');
                              }
                          } else {
                              console.error('No service requests available.');
                          }
                      });
                  }

                    actions();
                    // Function to dynamically create a table inside #actions div
                     function actions() {
                       // Generate the initial table structure
                       const tableHtml = `
                         <table class="table table-bordered">
                           <thead>
                             <tr>
                                <th scope="col" style="background-color: gray; text-align: center;" colspan="${ 2}">
                                 Taken   Actions
                                </th>
                          </tr>
                             <tr>
                               <th>Problems</th>
                               <th>Actions</th>
                             </tr>
                           </thead>
                           <tbody id="actionBody">
                             <!-- Dynamic rows will be appended here -->
                           </tbody>
                         </table>
                       `;
                       $('#actions').html(tableHtml);

                       // Fetch and process serviceRequests data
                       print('serviceRequests', function (serviceRequests) {
                         if (serviceRequests) {
                           // Find the matching service data by serviceId
                           const serviceData = serviceRequests.find(item => item.id === serviceId);

                           if (serviceData && serviceData.allProblem) {
                             // Clear the table body before appending new rows
                             const actionBody = $('#actionBody');
                             actionBody.empty();

                 // Iterate through all problems and populate rows
                        serviceData.allProblem.forEach(problem => {
                          const actionsList = problem.proposalSolution
                            .map((solution, index) => `${index + 1}. ${solution.value}`) // Add serial number
                            .join('<br>'); // Combine actions as a list with line breaks

                               const rowHtml = `
                                 <tr>
                                   <td>${problem.name}</td>
                                   <td style="text-align: center;">${actionsList}</td> <!-- Left-align actions -->
                                 </tr>
                               `;
                               actionBody.append(rowHtml); // Append the generated row
                             });
                           }
                         }
                       });
                     }
                     extractComponents();
                     function extractComponents(){
                         var selectedDevices = [];
                          print('universalColumns', function(universalColumns) {
                         var categoriesHtmlAccessories = '';
                         if (universalColumns) {
                             universalColumns.forEach(function(category) {
                                 categoriesHtmlAccessories += `<th scope="col" style="background-color: gray;">${category.columnName}</th>`;
                             });
                         }

                         var htmlToAddAccessories = `
                         <div class="mb-9" style="margin-left: 0%; text-align: left;">
                             <table id="deviceInformationTableAccessories" class="table table-gray table-bordered table-hover">
                                 <thead>
                                     <tr>
                                         <th scope="col" style="background-color: gray; text-align: center;" colspan="${universalColumns.length + 4}">
                                            Extract Components
                                         </th>
                                   </tr>
                                     <tr>
                                         <th scope="col" style="background-color: gray;">SN</th>
                                          <th scope="col" style="background-color: gray;display: none;">Device Id</th>
                                         <th scope="col" style="background-color: gray;">Category Name</th>
                                         ${categoriesHtmlAccessories}
                                         <th scope="col" style="background-color: gray;">Description</th>

                                     </tr>
                                 </thead>
                                 <tbody id="listDeviceExtract">

                                 </tbody>
                             </table>
                         </div>

                     `;
                     $('#extractComponents').html(htmlToAddAccessories);
                      var rowsHtmlAccessories = '';
                         print('allAddData', function(allAddData) {
                                  if (allAddData) {
                                     // First, fetch individual columns
                                      print('individualColumns', function(individualColumns) {
                                        // store all
                                       print('serviceRequests', function (serviceRequests) {
                                               if (serviceRequests) {
                                                 // Find the matching service data by serviceId
                                                const serviceData = serviceRequests.find(item => item.id === serviceId);
                                                const listedExtractsNewComponents=serviceData.extractsNewComponents;

                                                    if (listedExtractsNewComponents && listedExtractsNewComponents.length > 0) {

                                                         listedExtractsNewComponents.forEach((accessory, index) => {

                                                            allAddData.forEach(function(data, index) {

                                                                 if (data.id=== accessory) {
                                                                     rowsHtmlAccessories += `<tr>
                                                                         <td>${data.visibleId}</td>
                                                                          <td style="display: none;">${data.id}</td>
                                                                         <td>${data.categoryName}</td>`;
                                                                     universalColumns.forEach(function(column) {
                                                                         rowsHtmlAccessories += `<td >${data.allData[column.columnName]}</td>`;
                                                                     });

                                                                     rowsHtmlAccessories += `<td>
                                                                         <ul style="list-style: none; padding-left: 0; text-align: center;">`;

                                                                     if (individualColumns) {
                                                                         individualColumns.forEach(function(individualColumn) {
                                                                            if (individualColumn.categoryName=== data.categoryName) {

                                                                             rowsHtmlAccessories += `<li>${individualColumn.columnName} : ${data.allData[individualColumn.columnName]}</li>`;
                                                                             }
                                                                         });
                                                                     }
                                                                   rowsHtmlAccessories += `</ul>
                                                                           </td>` ;
                                                                    // Add another <td> for the checkbox
                                                                       rowsHtmlAccessories += `

                                                                       </tr>`;

                                                                      }
                                                                 });

                                                           });
                                                    }
                                                $('#listDeviceExtract').html(rowsHtmlAccessories);
                                               // console.log('Generated rowsHtmlAccessories:', rowsHtmlAccessories);
                                               }
                                              });

                                      });




                                  }
                              });


                     });

                  }
                  needAccessories();
                  function needAccessories(){

                         var selectedDevices = [];
                          print('universalColumns', function(universalColumns) {
                         var categoriesHtmlAccessories = '';
                         if (universalColumns) {
                             universalColumns.forEach(function(category) {
                                 categoriesHtmlAccessories += `<th scope="col" style="background-color: gray;">${category.columnName}</th>`;
                             });
                         }

                         var htmlToAddAccessories = `
                         <div class="mb-9" style="margin-left: 0%; text-align: left;">
                             <table id="deviceInformationTableAccessories" class="table table-gray table-bordered table-hover">
                                 <thead>
                                     <tr>
                                            <th scope="col" style="background-color: gray; text-align: center;" colspan="${universalColumns.length + 4}">
                                               Accessories/Components
                                            </th>
                                      </tr>
                                     <tr>
                                          <th scope="col" style="background-color: gray;">SN</th>
                                           <th scope="col" style="background-color: gray;display: none;">Device Id</th>
                                          <th scope="col" style="background-color: gray;">Category Name</th>
                                          ${categoriesHtmlAccessories}
                                          <th scope="col" style="background-color: gray;">Description</th>

                                      </tr>
                                 </thead>
                                 <tbody id="listDeviceAccessories">

                                 </tbody>
                             </table>
                         </div>

                     `;
                     $('#needAccessories').html(htmlToAddAccessories);
                      var rowsHtmlAccessories = '';
                         print('allAddData', function(allAddData) {
                                  if (allAddData) {
                                     // First, fetch individual columns
                                      print('individualColumns', function(individualColumns) {
                                        // store all
                                       print('serviceRequests', function (serviceRequests) {
                                               if (serviceRequests) {
                                                 // Find the matching service data by serviceId
                                                const serviceData = serviceRequests.find(item => item.id === serviceId);
                                                const listedAddAccessories=serviceData.addAccessories;

                                                    if (listedAddAccessories && listedAddAccessories.length > 0) {

                                                         listedAddAccessories.forEach((accessory, index) => {

                                                            allAddData.forEach(function(data, index) {

                                                                 if (data.id=== accessory) {
                                                                     rowsHtmlAccessories += `<tr>
                                                                         <td>${data.visibleId}</td>
                                                                          <td style="display: none;">${data.id}</td>
                                                                         <td>${data.categoryName}</td>`;
                                                                     universalColumns.forEach(function(column) {
                                                                         rowsHtmlAccessories += `<td >${data.allData[column.columnName]}</td>`;
                                                                     });

                                                                     rowsHtmlAccessories += `<td>
                                                                         <ul style="list-style: none; padding-left: 0; text-align: center;">`;

                                                                     if (individualColumns) {
                                                                         individualColumns.forEach(function(individualColumn) {
                                                                            if (individualColumn.categoryName=== data.categoryName) {

                                                                             rowsHtmlAccessories += `<li>${individualColumn.columnName} : ${data.allData[individualColumn.columnName]}</li>`;
                                                                             }
                                                                         });
                                                                     }
                                                                   rowsHtmlAccessories += `</ul>
                                                                           </td>` ;
 // Add another <td> for the checkbox
                                                                       rowsHtmlAccessories += `

                                                                       </tr>`;

                                                                      }
                                                                 });

                                                           });
                                                    }
                                                $('#listDeviceAccessories').html(rowsHtmlAccessories);
                                               // console.log('Generated rowsHtmlAccessories:', rowsHtmlAccessories);
                                               }
                                              });

                                      });




                                  }
                              });


                     });
                  }



                  $('#AcceptBtn').click(function() {
                  var comment=$('#comment').val();
                      setServiceReportAccept(serviceId, "Accepted",comment);
                  });
                  $('#rejectBtn').click(function() {
                                    var comment=$('#comment').val();
                                        setServiceReportAccept(serviceId, "Rejected",comment);
                                    });
                  showModal();
    }

       else if(buttonId==="viewAlternative"){

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

                         $('#publicModalExtraLargeLabel').text("Device Information");




                                      var rowsHtml = '';
                                         // Corrected the for loop syntax to iterate over the deviceIds array
                                            // alert(result.inventory.deviceIds[i]);
                                             print('allAddData', function(allAddData) {
                                                 if (allAddData) {
                                                     // First, fetch individual columns
                                                     print('individualColumns', function(individualColumns) {

                                                         allAddData.forEach(function(data, index) {
                                                          if (data.id=== deviceId) {
                                                             rowsHtml += `<tr>
                                                                 <td>${index + 1}</td>
                                                                  <td style="display: none;">${data.id}</td>
                                                                 <td>${data.categoryName}</td>`;
                                                             universalColumns.forEach(function(column) {
                                                                 rowsHtml += `<td >${data.allData[column.columnName]}</td>`;
                                                             });

                                                             rowsHtml += `<td>
                                                                 <ul style="list-style: none; padding-left: 0; text-align: center;">`;

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







                         showModalExtraLarge();
                     });




        }

       else {
      // Perform actions for other buttons, if needed
      console.log(`Other button clicked: ${buttonText}`);
    }
  });
};
function getCurrentDateTime() {
    const now = new Date();

    // Format the date as YYYY-MM-DD
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(now.getDate()).padStart(2, '0');

    // Format the time as HH:mm:ss
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // Combine date and time
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function showModalView(){
$('#publicModalView').modal('show');
}
function showModalExtract(){
$('#publicModalExtract').modal('show');
}
function hideModalExtract(){
$('#publicModalExtract').modal('hide');
}

function selectionAndInputDeviceEdit(deviceId){
// Event delegation for dynamically added items
       $(document).on('click', '.deviceInputEachItemEdit', function(event) {
           var text = $(this).text();
           $('#deviceInputFieldEdit').val(text);
            var categoriesHtml = '';


            $('#universalDivEdit').show();

       });



        // Filter items based on input
            $(document).on('keyup', '#deviceInputFieldEdit', function() {
                var filter = $(this).val().toUpperCase();
                $('#deviceInputEditUlList li').each(function() {
                    var text = $(this).text().toUpperCase();
                    if (text.indexOf(filter) > -1) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                });
            });


}
function selectionAndInputDeviceAddExtract(){
// Event delegation for dynamically added items
       $(document).on('click', '.deviceInputEachItem', function(event) {
           var text = $(this).text();
           $('#deviceInputFieldAdd').val(text);
            var categoriesHtml = '';

            $('#universalDiv').show();

       // do previous data empty
        $('#deviceDiv').empty();

        // Show all Individual column according to category
        print('individualColumns', function(individualColumns) {
            if (individualColumns) {
                individualColumns.forEach(function(column) {
                    if (text === column.categoryName) {
                        console.log(column.columnName);
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
                            case 'customDropDownList':
                                // Call the custom dropdown function and handle it as a promise
                                myFunctionThatHandlesCase(column, text,'dynamicFormAddDeviceExtract').then(function(dropDownHtml) {
                                    categoriesHtml += dropDownHtml; // Append the dropdown HTML
                                    $('#deviceDiv').append(categoriesHtml); // Update the deviceDiv with new HTML
                                }).catch(function(error) {
                                    console.error("Error:", error);
                                });
                                console.log(" last")
                                return; // Prevent further execution in this case

                        }
                    }
                });
                if (categoriesHtml && !categoriesHtml.includes('customDropDownList')) {
                    // Only update if there's no custom dropdown list pending
                    $('#deviceDiv').html(categoriesHtml);
                }
            }
        });
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
function selectionAndInputDeviceAdd(){
// Event delegation for dynamically added items
       $(document).on('click', '.deviceInputEachItem', function(event) {
           var text = $(this).text();
           $('#deviceInputFieldAdd').val(text);
            var categoriesHtml = '';

            $('#universalDiv').show();

       // do previous data empty
        $('#deviceDiv').empty();

        // Show all Individual column according to category
        print('individualColumns', function(individualColumns) {
            if (individualColumns) {
                individualColumns.forEach(function(column) {
                    if (text === column.categoryName) {
                        console.log(column.columnName);
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
                            case 'customDropDownList':
                                // Call the custom dropdown function and handle it as a promise
                                myFunctionThatHandlesCase(column, text,'dynamicFormAddDevice').then(function(dropDownHtml) {
                                    categoriesHtml += dropDownHtml; // Append the dropdown HTML
                                    $('#deviceDiv').append(categoriesHtml); // Update the deviceDiv with new HTML
                                }).catch(function(error) {
                                    console.error("Error:", error);
                                });
                                console.log(" last")
                                return; // Prevent further execution in this case

                        }
                    }
                });
                if (categoriesHtml && !categoriesHtml.includes('customDropDownList')) {
                    // Only update if there's no custom dropdown list pending
                    $('#deviceDiv').html(categoriesHtml);
                }
            }
        });
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
// The function to handle the custom dropdown case
function myFunctionThatHandlesCase(column, text,formId) {
    return new Promise((resolve, reject) => {
        print1('dropDownLists')
            .then(function(dropDownLists) {
                if (dropDownLists) {
                    let dropDownData = null;
                    if (text === null || text === '') {
                        dropDownData = dropDownLists.find(item =>
                            item.dropDownListName === column.columnName
                        );
                    } else {
                        dropDownData = dropDownLists.find(item =>
                            item.dropDownListName === column.columnName && item.categoryName === text
                        );
                    }

                    if (dropDownData) {
                        // Generate the dropdown HTML
                        var categoriesHtml11 = `
                            <div class="mb-3">
                                <label>${column.columnName}</label>
                                <div class="dropdown">
                                    <input type="text" class="form-control dropdown-toggle ${column.columnName}-input"
                                           data-bs-toggle="dropdown" placeholder="Select DropDownList Value"
                                           aria-expanded="false" data-problem-id="${column.columnName}" name="${column.columnName}" >
                                    <ul class="dropdown-menu ${column.columnName}-ul" aria-labelledby="dropdownTextFieldPopupBox">`;

                        // Add the dropdown items
                        dropDownData.allData.forEach(function(option) {
                            categoriesHtml11 += `<li class="dropdown-item ${column.columnName}-customDropDownClick">${option}</li>`;
                        });

                        categoriesHtml11 += `
                                    </ul>
                                </div>
                            </div>`;

                        resolve(categoriesHtml11); // Resolve with the generated HTML

                        const formSelector = `#${formId}`;
                       $(formSelector).off('click', `.${column.columnName}-customDropDownClick`);
                       $(formSelector).on('click', `.${column.columnName}-customDropDownClick`, function() {

                            const selectedValue = $(this).text(); // Get selected value
                            console.log("Dropdown item clicked:", selectedValue); // Print the selected value

                            // Set the selected value in the input field
                            $(this).closest('.dropdown').find(`.${column.columnName}-input`).val(selectedValue);
                        });
                    } else {
                        console.log("Sorry, Not Found");
                        resolve(''); // Resolve with empty if no data found
                    }
                } else {
                    console.error("dropDownLists data is null or undefined");
                    reject("dropDownLists data is null or undefined");
                }
            })
            .catch(function(error) {
                console.error("An error occurred: ", error);
                reject(error); // Reject in case of error
            });
    });
}

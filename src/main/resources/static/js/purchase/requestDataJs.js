function saveFormDataForService(serviceId,problemName,solutionName) {
    var formData = $("#linkForm").serialize();

    var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
     var departmentName = departmentElement.data("departmentname");//it
     var departmentUserName = departmentElement.data("departmentuser-name");//saho
     var departmentUserId = departmentElement.data("departmentuser-id");//s
    // Append the requestId to the form data
    formData += '&serviceId=' + encodeURIComponent(serviceId);
    formData += '&departmentName=' + encodeURIComponent(departmentName);
    formData += '&departmentUserName=' + encodeURIComponent(departmentUserName);
    formData += '&departmentUserId=' + encodeURIComponent(departmentUserId);
     formData += '&problemName=' + encodeURIComponent(problemName);
      formData += '&solutionName=' + encodeURIComponent(solutionName);


    $.ajax({
        url: '/purchase/addPurchaseProposalForService',
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
function saveFormData(requestId) {
    var formData = $("#linkForm").serialize();

     var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
     var departmentName = departmentElement.data("departmentname");//it
     var departmentUserName = departmentElement.data("departmentuser-name");//saho
     var departmentUserId = departmentElement.data("departmentuser-id");//s
    // Append the requestId to the form data
    formData += '&requestId=' + encodeURIComponent(requestId);
    formData += '&departmentName=' + encodeURIComponent(departmentName);
    formData += '&departmentUserName=' + encodeURIComponent(departmentUserName);
    formData += '&departmentUserId=' + encodeURIComponent(departmentUserId);


    $.ajax({
        url: '/purchase/addPurchaseProposal',
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
function addTableInformationOfDeviceForService(categoryName,serviceId,problemName,solutionName) {
     // Serialize form data
     var formData = $("#dynamicFormAddDevice").serialize();


            var departmentElement = $(".departmentName"); // Target element with department data
            var departmentName = departmentElement.data("departmentname"); // e.g., "it"
            var departmentUserName = departmentElement.data("departmentuser-name"); // e.g., "saho"
            var departmentUserId = departmentElement.data("departmentuser-id"); // e.g., "sahoid"

     // Get the selected starting date, username, and userId
     var startingDate = $('#calendar').val(); // Fetch value from the date input

     var deviceType = $('#deviceType').val();


     // Append the category name, department name, starting date, username, and userId to the form data
     formData += '&categoryName=' + encodeURIComponent(categoryName);
     formData += '&departmentName=' + encodeURIComponent(departmentName);
     formData += '&userName=' + encodeURIComponent(departmentUserName);
     formData += '&userId=' + encodeURIComponent(departmentUserId);
     formData += '&deviceType=' + encodeURIComponent(deviceType);
     formData += '&serviceId=' + encodeURIComponent(serviceId);
     formData += '&problemName=' + encodeURIComponent(problemName);
     formData += '&solutionName=' + encodeURIComponent(solutionName);

     // Debugging: Print the collected data
     console.log("Form Data:", formData);

     // AJAX call to save data
     $.ajax({
         url: '/purchase/addDeviceInformationForService', // URL to your endpoint for saving data
         type: 'POST',
         data: formData, // Send serialized form data along with additional fields
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
function addTableInformationOfDevice(categoryName,requestId) {
     // Serialize form data
     var formData = $("#dynamicFormAddDevice").serialize();


            var departmentElement = $(".departmentName"); // Target element with department data
            var departmentName = departmentElement.data("departmentname"); // e.g., "it"
            var departmentUserName = departmentElement.data("departmentuser-name"); // e.g., "saho"
            var departmentUserId = departmentElement.data("departmentuser-id"); // e.g., "sahoid"

     // Get the selected starting date, username, and userId
     var startingDate = $('#calendar').val(); // Fetch value from the date input

     var deviceType = $('#deviceType').val();


     // Append the category name, department name, starting date, username, and userId to the form data
     formData += '&categoryName=' + encodeURIComponent(categoryName);
     formData += '&departmentName=' + encodeURIComponent(departmentName);
     formData += '&userName=' + encodeURIComponent(departmentUserName);
     formData += '&userId=' + encodeURIComponent(departmentUserId);
     formData += '&deviceType=' + encodeURIComponent(deviceType);
     formData += '&requestId=' + encodeURIComponent(requestId);

     // Debugging: Print the collected data
     console.log("Form Data:", formData);

     // AJAX call to save data
     $.ajax({
         url: '/purchase/addDeviceInformation', // URL to your endpoint for saving data
         type: 'POST',
         data: formData, // Send serialized form data along with additional fields
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
 function addTableInformationOfDevicePurchase(categoryName,requestId) {
      // Serialize form data
      var formData = $("#dynamicFormAddDevice").serialize();


             var departmentElement = $(".departmentName"); // Target element with department data
             var departmentName = departmentElement.data("departmentname"); // e.g., "it"
             var departmentUserName = departmentElement.data("departmentuser-name"); // e.g., "saho"
             var departmentUserId = departmentElement.data("departmentuser-id"); // e.g., "sahoid"

      // Get the selected starting date, username, and userId
      var startingDate = $('#calendar').val(); // Fetch value from the date input

      var deviceType = $('#deviceType').val();


      // Append the category name, department name, starting date, username, and userId to the form data
      formData += '&categoryName=' + encodeURIComponent(categoryName);
      formData += '&departmentName=' + encodeURIComponent(departmentName);
      formData += '&userName=' + encodeURIComponent(departmentUserName);
      formData += '&userId=' + encodeURIComponent(departmentUserId);
      formData += '&deviceType=' + encodeURIComponent(deviceType);
      formData += '&requestId=' + encodeURIComponent(requestId);

      // Debugging: Print the collected data
      console.log("Form Data:", formData);

      // AJAX call to save data
      $.ajax({
          url: '/purchase/addDeviceInformationPurchase', // URL to your endpoint for saving data
          type: 'POST',
          data: formData, // Send serialized form data along with additional fields
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
function sendDeliveryDevice22(requestId,deviceId){
 // Define the Service class

         var mergedFormData = {}; // Object to hold all form data based on formId


          var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
          var departmentName = departmentElement.data("departmentname");//it
          var departmentUserName = departmentElement.data("departmentuser-name");//saho
          var departmentUserId = departmentElement.data("departmentuser-id");//s


         // Send AJAX request to backend
         $.ajax({
             url: "/purchase/sendDeliveryDevicePurchaseToInventory",
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
function sendDeliveryDeviceForService(serviceId,deviceId,problemName,solutionName){
 // Define the Service class

         var mergedFormData = {}; // Object to hold all form data based on formId


          var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
          var departmentName = departmentElement.data("departmentname");//it
          var departmentUserName = departmentElement.data("departmentuser-name");//saho
          var departmentUserId = departmentElement.data("departmentuser-id");//s


         // Send AJAX request to backend
         $.ajax({
             url: "/purchase/sendDeliveryDevicePurchaseToInventoryForService",
             type: "POST",
             contentType: "application/json",
             data: JSON.stringify({
                  serviceId: serviceId,
                  deviceId: deviceId ,
                  departmentName:departmentName,
                  departmentUserName:departmentUserName,
                  departmentUserId:departmentUserId,
                  problemName:problemName,
                  solutionName:solutionName

                  }),
                  headers: {

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
function setRequestStatus(requestId,status){

            $.ajax({
                url: '/purchase/deliverRequestStatus',
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
function saveTableInformationOfDevice(requestId,categoryName){
         var formData=$("#dynamicFormSaveDevice").serialize();

             // Append the deviceId and category name to the form data
             formData += '&requestId=' + encodeURIComponent(requestId);
             formData += '&categoryName=' + encodeURIComponent(categoryName);

             $.ajax({
                 url: '/purchase/saveDeviceInformation', // URL to your endpoint for saving data
                 type: 'POST',
                 data: formData, // Send serialized form data and category name
                 success: function(response) {
                        CustomAlert(response);
                          $('#globalCustomAlertModal').on('hidden.bs.modal', function () {
                              location.reload();
                          });
                 },
                 headers: {

                                        'Authorization': 'Bearer ' + getAuthToken()
                                    },
                 error: function(xhr, status, error) {
                     console.error("Error saving data: " + error);
                 }
             });
 }

 window.initRequestDataGeneral= function () {

    const tableBody = document.getElementById("requestPurchaseTableBody");
    if (!tableBody) return;

    // Step 1: Capture current rows
    const currentRows = Array.from(tableBody.querySelectorAll("tr"));
    const currentRowMap = new Map();
    currentRows.forEach(row => {
        const key = Array.from(row.cells).map(cell => cell.textContent.trim()).join('|');
        currentRowMap.set(key, row);
    });

    $.ajax({
        url: '/superAdmin/allDataRange',
        type: 'POST',
        dataType: 'json',
         data: {
                        page: pageNumber,
                        size: localStorage.getItem("pageSize") || 0
                    },
        headers: {

                               'Authorization': 'Bearer ' + getAuthToken()
                           },
        success: function (data) {
            const allData = data['requestData'];
            const requestColumns = data['requestColumns'];
            const allAddData = data['allAddData'];
            const newRowKeys = new Set();

            function getAvailability(categoryName) {
                let count = 0;
                allAddData.forEach(device => {
                    if (device.categoryName === categoryName && device.userName === 'inventory') {
                        count++;
                    }
                });
                return count === 0 ? "Unavailable" : `Available(${count})`;
            }

            allData.forEach(device => {
                 console.log(device);
                if (device.requestMode === "Denied") return;
                if(device.inventory?.inventoryStatus ==='Purchased' && device.purchase?.purchaseDeviceSenderToInventoryStatus !=='Accepted' ){

                const bivagName = device.departmentName || "N/A";
                const categoryName = device.allData["category"] || "N/A";
                const sn = device.visibleRequestId || "N/A";
                const availability = getAvailability(categoryName);

                // Generate row key for comparison
                let rowKeyParts = [
                    sn, bivagName, categoryName,
                    device.inventory?.deliveryMode || "Not Delivered",
                    device.inventory?.inventoryStatus || "N/A",
                    device.inventory?.cooDeliveryAns || 'Pending',
                    device.inventory?.inventoryToCustomerCareDeviceSendingStatus || 'Pending',
                    device.presentTime ? formatDateTimeToAmPm(device.presentTime) : "N/A"
                ];
                const rowKey = rowKeyParts.join('|');
                newRowKeys.add(rowKey);

                if (!currentRowMap.has(rowKey)) {
                    const row = document.createElement("tr");
                    row.setAttribute("onclick", "printRowDataForCustomerCare(this)");

                    let htmlData = `
                        <td>${sn}</td>
                        <td>${bivagName}</td>
                        <td>${categoryName}</td>
                        <td style="text-align: left;" data-request-id="${device.id}" class="viewInfo">
                            <div>
                    `;

                    requestColumns.forEach(column => {
                        if (column.visibleType === "yes") {
                            const columnName = column.columnName || "N/A";
                            const value = device.allData[columnName] || "N/A";
                            htmlData += column.dataType === "textarea" ? `
                                <div><textarea class="plain-textarea">${value}</textarea></div>` : `
                                <div><span>${columnName}</span>: <span>${value}</span></div>`;
                        }
                    });

                    htmlData += `
                            </div>
                            <p data-request-id="${device.id}" data-button-id="viewInfo">&#128065;</p>
                        </td>
                        <td>${device.purchase?.purchaseStatus || "Pending"}</td>
                        <td>${device.purchase?.cooAns || " "}</td>
                        <td>${device.purchase?.purchaseDeviceSenderToInventoryStatus || ' '}</td>
                        <td>${device.presentTime ? formatDateTimeToAmPm(device.presentTime) : "N/A"}</td>
                    `;
                    htmlData += `
                       <td>
                        <div class="d-flex justify-content-center align-items-center action-button-container">
                            ${device.purchase?.deviceBuyingStatus === 'Bought' &&
                              device.purchase?.purchaseDeviceSenderToInventoryStatus !== 'Accepted' &&
                              device.purchase?.purchaseDeviceExportStatus === 'Exported'
                                ? `<button class="btn btn-primary btn-sm text-white fas deliverPurchase"
                                      data-category-id="${device.allData['category']}"
                                      data-request-id="${device.id}"
                                      data-buyingdevice-id="${device.purchase.buyingDeviceId}"
                                      data-button-id="deliverPurchase"
                                      title="Deliver Device">&#xf0d1;</button>`
                                : ''
                            }

                            ${device.purchase?.deviceBuyingStatus !== 'Bought' &&
                              device.purchase?.cooAns === 'Accepted' &&
                              device.purchase?.purchaseDeviceExportStatus === 'Exported'
                                ? `<button class="btn btn-sm text-white"
                                      data-request-id="${device.id}"
                                      data-button-id="addDevice"
                                      style="background-color:green;"
                                      title="Add Device Information info">✔</button>`
                                : ''
                            }

                            ${device.purchase?.cooAns !== 'Accepted'
                                ? `<button class="btn btn-secondary btn-sm chat-button"
                                      data-request-id="${device.id}"
                                      data-button-id="sendProposal"
                                      title="Send Proposal to Coo">&#128172;</button>`
                                : ''
                            }

                            ${device.purchase?.cooAns === 'Accepted'
                                ? `<button class="btn btn-info btn-sm view-button"
                                      data-request-id="${device.id}"
                                      data-button-id="viewLink"
                                      title="View Accepted Link">&#128065;</button>`
                                : ''
                            }
                        </div>
                    </td>
                `;





                    row.innerHTML = htmlData;
                    tableBody.appendChild(row);
                }
                }
            });

            // Step 3: Remove outdated rows (also those starting with "R")
            currentRowMap.forEach((row, key) => {
                const firstCellText = row.cells[0]?.textContent.trim();
                if (!newRowKeys.has(key) || (firstCellText && firstCellText.startsWith("R"))) {
                    row.remove();
                }
            });


          //const myTable = document.getElementById("requestInventoryTable");  // or more specific selector if you want
          const myTable = document.querySelector("table");  // or more specific selector if you want
          sortAndFormatTable(myTable);


         $('#requestPurchaseTable tbody tr').click(function(event) {
        var $row = $(this); // Store the clicked row element
        var button = $(event.target).closest('button');
         var buttonPTag = $(event.target).closest('td');
        var buttonPressed = button.text().trim(); // Get the HTML inside the button
        var requestId = button.data('requestId');
          var category = button.data('category-id');
        var deviceId=button.data('buyingdevice-id');
        var buttonId = button.data('buttonId');
        var categoryName = $row.find('td:nth-child(3)').text();
        var text=categoryName;
      // i want check by class name

        // Check if the button has a specific class
if(buttonId ==="deliverPurchase"){
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
                    <button class="btn btn-success btn-sm  btnSave" data-request-id="${requestId}"  style="width: 10%; margin-top: 20px;">Send</button>
                    </div>
                </div>
            `;

            $('.ModalExtraLarge').html(htmlToAdd);
            $('#publicModalExtraLargeLabel').text("Device Information");

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
                                    if (data.categoryName === category && data.userName==='purchase') {
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
                                    showModalExtraLarge();
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
                                 sendDeliveryDevice22(requestId,selectedRows);
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
       else if (buttonPTag.hasClass('viewInfo')) {

                      print('requestColumns', function(requestColumns) {
                     var categoriesHtml = '';
                     if (requestColumns) {
                         requestColumns.forEach(function(category) {
                             categoriesHtml += `<th scope="col" style="background-color: gray;color:white">${category.columnName}</th>`;
                         });
                     }

                     var htmlToAdd = `
                         <div class="mb-9" style="margin-left: 0%; text-align: left;">
                             <table id="deviceInformationTable" class="table table-gray table-bordered table-hover">
                                 <thead>
                                     <tr>
                                         <th scope="col" style="background-color: gray; color:white">SN</th>
                                          <th scope="col" style="background-color: gray;display: none;color:white">Device Id</th>
                                         <th scope="col" style="background-color: gray;color:white">Category Name</th>
                                         ${categoriesHtml}

                                     </tr>
                                 </thead>
                                 <tbody id="listDeviceInformationBody">

                                 </tbody>
                             </table>
                         </div>

                     `;
                     $('.modal-body').html(htmlToAdd);

                     $('#publicModalLabel').text("Request Information");



                           var rowsHtml = '';

                           print('requestData', function(requestData) {
                             if (requestData) {
                               // Replace requestId with a valid id to search for
                               const requestId = buttonPTag.data('requestId');
                               const Data = requestData.find(item => item.id === requestId);

                               if (Data) {
                                 // Generate the HTML for the found item
                                 rowsHtml += `
                                   <tr>
                                     <td>${Data.visibleRequestId}</td>
                                     <td>${Data.allData['category']}</td>
                                      `;
                                      requestColumns.forEach(function(column) {
                                          rowsHtml += `<td >${Data.allData[column.columnName]}</td>`;
                                      });


                                   rowsHtml += `  </tr>
                                 `;

                                 // Insert the generated HTML into the table body
                                 $('#listDeviceInformationBody').html(rowsHtml);
                               } else {
                                 console.error('No data found with the specified requestId.');
                               }
                             } else {
                               console.error('requestData is null or undefined.');
                             }
                           });



                     showModal();
                 });


        }
        else if (buttonId === "addDevice"){
         var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
         var departmentName = departmentElement.data("departmentuser-name");

             var htmlToAdd = `
                <div class="mb-3" style="margin-left: 0%; text-align: left;">
                   <div class="dropdown">
                       <label for="deviceInputFieldAdd" class="form-label">Category Name</label>
                       <input
                           type="text"
                           value="${text}"
                           class="form-control custom-width"
                           id="deviceInputFieldAdd"
                           placeholder="Category"
                           aria-expanded="false"
                           readonly

                       >

                   </div>

                </div>


               <div class="mb-3" style="margin-left: 0%; text-align: left;">
                   <label for="deviceType" class="form-label">Device Type</label>
                   <select id="deviceType" class="form-control">
                       <option value="Primary">Primary</option>
                       <option value="Secondary">Secondary</option>
                   </select>
               </div>


               <form   id="dynamicFormAddDevice">
             <div id="universalDiv" >

              </div>
              <div id="deviceDiv">

              </div>

               </form>
                <div class="mb-3" style="margin-left: 0%; text-align: left;">
                    <button type="button" class="btn btn-primary" data-request-id="${requestId}" id="saveEditBtn">Save</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>

            `;

            // Add the HTML code to the modal body using jQuery
            $('.ModalMedium').html(htmlToAdd);
            $('#publicModalMediumLabel').text("Add Device Information")

            $('#universalDiv').empty();

             print('universalColumns', function(universalColumns) {
               if (universalColumns) {
                   // Generate HTML for categories
                        var categoriesHtml = '';
                   universalColumns.forEach(function(column) {
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
                            case 'customDropDownList':
                                    // Call the custom dropdown function and handle it as a promise
                                    myFunctionThatHandlesCase(column,null,'dynamicFormAddDevice').then(function(dropDownHtml) {
                                        //categoriesHtml += dropDownHtml; // Append the dropdown HTML
                                        $('#universalDiv').append(dropDownHtml); // Update the deviceDiv with new HTML
                                    }).catch(function(error) {
                                        console.error("Error:", error);
                                    });
                                    break;
                            default:
                                categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label></div>`;
                                break;
                        }


                   });

                  if (categoriesHtml && !categoriesHtml.includes('customDropDownList')) {
                      // Only update if there's no custom dropdown list pending
                      //  console.log(" check "+categoriesHtml);
                      $('#universalDiv').html(categoriesHtml);
                  }
               }
           });
           $('#deviceDiv').empty();
           // Show all Individual column according to category

             print('individualColumns', function(individualColumns) {
                       if (individualColumns) {
                       var categoriesHtml = '';
                           individualColumns.forEach(function(column) {
                               if (text === column.categoryName) {
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




             $('#saveEditBtn').click(function() {

                        var categoryName=$('#deviceInputFieldAdd').val();
                      var requestId=$(this).data('request-id');

                       addTableInformationOfDevicePurchase(categoryName,requestId);
                });

          showModalMedium();
         }

         else if (buttonId === "sendProposal") {

           var htmlToAdd = `
               <form id="linkForm">
                   <div class="mb-3" style="margin-left: 0%; text-align: left;">
                       <label for="details" class="form-label">Details</label>
                       <textarea class="form-control" id="details" name="details" placeholder="Details"></textarea>
                   </div>
                   <div class="mb-3" style="margin-left: 0%; text-align: left;">
                       <label for="budget" class="form-label">Budget</label>
                       <input type="number" class="form-control" name="budget" id="budget" placeholder="Budget">
                   </div>
                   <div class="mb-3" style="margin-left: 0%; text-align: left;">
                       <label class="form-label">Links:</label>
                   </div>
                   <div id="linkDiv" class="mb-3" style="margin-left: 0%; text-align: left;">
                   </div>
                   <div class="mb-3" style="margin-left: 0%; text-align: left;">
                       <button type="button" class="btn btn-primary" id="addLinkBtn">Add Link</button>
                   </div>
               </form>
               <div class="mb-3" style="margin-left: 0%; text-align: center;">
                   <button type="button" class="btn btn-primary" id="saveEditBtn">Save</button>
                   <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
               </div>
           `;
           $('.ModalMedium').html(htmlToAdd);

           $('#publicModalMediumLabel').text("Purchase Request");

           $('#addLinkBtn').click(function(event) {
               var linkCount = $('#linkDiv .input-group').length + 1;
               var linkName = 'link' + linkCount;

               var htmlToAppend = `
                   <div class="input-group mb-3">
                       <input type="text" class="form-control" name="${linkName}" placeholder="link1" aria-label="link1" aria-describedby="basic-addon2">
                       <div class="input-group-append">
                           <button class="btn btn-outline-secondary remove-link" type="button">X</button>
                       </div>
                   </div>
               `;
               $('#linkDiv').append(htmlToAppend);
           });

           $('#linkDiv').on('click', '.remove-link', function() {
               $(this).closest('.input-group').remove();
           });

           $('#saveEditBtn').click(function(event) {
               saveFormData(requestId);
           });

           showModalMedium();
       }

     else if (buttonId === "viewLink") {

          var htmlToAdd = `
                   <div class="mb-3" style="margin-left: 0%; text-align: left;">
                   <h6 id="detailsId"></h6>
                   <h6 id="budgetId"></h6>
                   </div>
                      <div class="mb-9" style="margin-left: 0%; text-align: left;">
                          <table id="deviceInformationTable" class="table table-gray table-bordered table-hover">
                              <thead>
                                  <tr>
                                      <th scope="col" style="background-color: gray;color:white">SN</th>
                                       <th scope="col" style="background-color: gray;display: none;color:white">Link</th>
                                        <th scope="col" style="background-color: gray;color:white">Links</th>
                                       <th scope="col" style="background-color: gray;color:white">Action</th>

                                  </tr>
                              </thead>
                              <tbody id="purchaseRequestInformationBody">

                              </tbody>
                          </table>
                      </div>
                      <div class="mb-3" style="margin-left: 0%; text-align: left;">
                         <label for="comments" class="form-label">Comments</label>
                         <textarea class="form-control" id="comments" name="comments" placeholder="Comments"></textarea>
                     </div>
                       <div class="mb-3" style="margin-left: 0%; text-align: center;">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      </div>

                  `;
                  $('.ModalMedium').html(htmlToAdd);

                  $('#publicModalMediumLabel').text("Accepted Request Form");

                print('requestData', function(requestData) {
                    if (requestData) {
                        const result = requestData.find(function(data1) {
                            return data1.id === requestId;
                        });
                        $("#detailsId").text("Details: " + result.purchase.details);
                        $("#budgetId").text("Budget: " + result.purchase.budget);
                        $("#comments").text( result.purchase.cooComment);

                        var rowsHtml = '';
                            for (let j = 0; j < result.purchase.acceptedLinks.length; j++) {
                             for (let i = 0; i < result.purchase.links.length; i++) {
                              const link = result.purchase.links[i].startsWith('http://') || result.purchase.links[i].startsWith('https://')
                                     ? result.purchase.links[i]
                                     : 'https://' + result.purchase.links[i];
                             if(result.purchase.acceptedLinks[j]===link){
                              // Ensure the link includes the protocol (http:// or https://)
                                 const link = result.purchase.links[i].startsWith('http://') || result.purchase.links[i].startsWith('https://')
                                     ? result.purchase.links[i]
                                     : 'https://' + result.purchase.links[i];

                                 rowsHtml += `<tr>
                                     <td>${i + 1}</td>
                                     <td style="display: none;">${link}</td>
                                     <td>
                                         <a href="${link}" target="_blank" style="text-decoration: none;">
                                             ${link}
                                         </a>
                                     </td>
                                     <td><input type="checkbox" style="transform: scale(1.5); margin: 10px;" name="selectDevice"  class="action-checkbox" checked></td>
                                 </tr>`;

                             }
                            }
                            }


                        $('#purchaseRequestInformationBody').html(rowsHtml);
                    }
                });


                    showModalMedium();
        }
    });


        },
        error: function(xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });
};

window.initRequestDataPurchaseTable = function () {
    const tableBody = document.getElementById("requestPurchaseTableBody");
    if (!tableBody) {
        console.error("Table body with ID 'requestPurchaseTableBody' not found.");
        return;
    }

    function generateRowKeyFromRow(row) {
        return Array.from(row.cells).map(cell => cell.textContent.trim()).join('|');
    }

    function generateRowKeyFromData(sn, bivagName, solution, problemName, inventoryTime) {
        const value = (solution.value || '').trim().replace(/\n/g, '');
        return [
            sn, bivagName, solution.category, value,
            solution.purchaseProposalToCooProposalStatus || '',
            solution.purchaseProposalToCooAns || '',
            inventoryTime
        ].join('|');
    }

    const currentRows = Array.from(tableBody.querySelectorAll("tr"));
    const currentRowMap = new Map();
    currentRows.forEach(row => {
        const key = generateRowKeyFromRow(row);
        currentRowMap.set(key, row);
    });

    $.ajax({
        url: '/superAdmin/allDataRange',
        type: 'POST',
        dataType: 'json',
        data: {
            page: pageNumber,
            size: localStorage.getItem("pageSize") || 0
        },
        headers: {

                   'Authorization': 'Bearer ' + getAuthToken()
               },
        success: function (data) {

            const allData = data['serviceRequests'];
            const allAddData = data['allAddData'];
            const newRowKeys = new Set();

            function getAvailability(categoryName) {
                let count = 0;
                allAddData.forEach(device => {
                    if (device.categoryName === categoryName) {
                        count++;
                    }
                });
                return count === 0 ? "Unavailable" : `Available(${count})`;
            }

            allData.forEach(device => {
                const bivagName = device.departmentName;
                const sn = device.visibleServiceId;
                const inventoryTime = device.presentTime ? formatDateTimeToAmPm(device.presentTime) : "N/A";

                if (!Array.isArray(device.allProblem)) return;

                device.allProblem.forEach(problem => {
                    if (!Array.isArray(problem.proposalSolution)) return;

                    problem.proposalSolution.forEach(solution => {

                       // if (solution.inventoryToServiceCenterDeviceStatus === "Accepted" || !solution.inventoryForPurchaseRequestStatus) return;
                         if(solution.inventoryToServiceCenterDeviceStatus !== "Accepted" && solution.inventoryForPurchaseRequestStatus !==null )
                         {

                        const value = (solution.value || '').trim().replace(/\n/g, "<br>");
                        const rowKey = generateRowKeyFromData(sn, bivagName, solution, problem.name, inventoryTime);
                        newRowKeys.add(rowKey);

                        if (!currentRowMap.has(rowKey)) {
                            const row = document.createElement("tr");
                            const status = solution.purchaseManInfoOfPriceStatus || " ";
                            const availability = getAvailability(solution.category);

                            row.innerHTML = `
                                <td>${sn}</td>
                                <td>${bivagName}</td>
                                <td>${solution.category}</td>
                                <td class="text-start">
                                    <div class="compact-cell bg-light">
                                        <div><strong class="text-success">Category: ${solution.category}</strong></div>
                                        <div>${value}</div>
                                    </div>
                                </td>
                                <td>${solution.purchaseProposalToCooProposalStatus || ''}</td>
                                <td>${solution.purchaseProposalToCooAns || ''}</td>
                                <td>${solution.purchaseDeviceSenderToInventoryStatus || '' } </td>
                                <td>${inventoryTime}</td>
                                <td>
                                    <div class="d-flex justify-content-center align-items-center action-button-container">
                                        ${solution.deviceBuyingStatus === 'Bought' && solution.purchaseDeviceSenderToInventoryStatus !== 'Accepted' && solution.purchaseDeviceExportStatus === 'Exported' ? `
                                            <button class="btn btn-primary btn-sm text-white fas deliverForService"
                                                data-service-id="${device.id}"
                                                data-category-id="${solution.category}"
                                                data-problemname-id="${problem.name}"
                                                data-solutionname-id="${solution.name}"
                                                data-buyingdevice-id="${solution.buyingDeviceId}"
                                                data-button-id="deliver" title="Deliver Device">&#xf0d1;</button>` : ''}

                                        ${solution.deviceBuyingStatus !== 'Bought' && solution.purchaseProposalToCooAns === 'Accepted' && solution.purchaseDeviceExportStatus === 'Exported' ? `
                                            <button class="btn btn-sm text-white accepted"
                                                data-service-id="${device.id}"
                                                data-category-id="${solution.category}"
                                                data-problemname-id="${problem.name}"
                                                data-solutionname-id="${solution.name}"
                                                data-button-id="accepted"
                                                style="background-color: green;" title="Add Device Information">✔</button>` : ''}

                                        ${solution.purchaseProposalToCooAns !== 'Accepted' ? `
                                            <button class="btn btn-secondary btn-sm chat-buttonForService"
                                                data-problemname-id="${problem.name}"
                                                data-solutionname-id="${solution.name}"
                                                data-service-id="${device.id}"
                                                data-button-id="chat"
                                                title="Send Proposal to Coo">&#128172;</button>` : ''}

                                        ${solution.purchaseProposalToCooAns === 'Accepted' ? `
                                            <button class="btn btn-info btn-sm viewAcceptingLink"
                                                data-problemname-id="${problem.name}"
                                                data-solutionname-id="${solution.name}"
                                                data-service-id="${device.id}"
                                                data-button-id="chat"
                                                title="View Accepted Proposal Data">&#128065;</button>` : ''}
                                    </div>
                                </td>
                            `;

                            tableBody.appendChild(row);
                        }
                      }
                    });
                });
            });

            // Remove rows that are no longer in data
           // Remove rows that are no longer in data AND start with 'R'
                  currentRowMap.forEach((row, key) => {
                          const firstCellText = row.cells[0]?.textContent.trim();
                          if (!newRowKeys.has(key) || (firstCellText && ! firstCellText.startsWith("R"))) {
                              row.remove();
                          }
                      });

           sortAndFormatAllTables();
   $(document).on('click', '.deliverForService', function(){
   var deviceId = $(this).data('buyingdevice-id');
   var category = $(this).data('category-id');
   var serviceId = $(this).data('service-id');
   var problemName = $(this).data('problemname-id');
   var solutionName = $(this).data('solutionname-id');
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
                    <button class="btn btn-success btn-sm  btnSave" data-service-id="${serviceId}" data-problemname-id="${problemName}" data-solutionname-id="${solutionName}"  style="width: 10%; margin-top: 20px;">Send</button>
                    </div>
                </div>
            `;

            $('.ModalExtraLarge').html(htmlToAdd);
            $('#publicModalExtraLargeLabel').text("Device Information");

            var rowsHtml = '';
               let ids = deviceId || []; // Ensure it's a valid array.deviceIds || []; // Ensure it's a valid array

               print('allAddData', function(allAddData) {
               if (allAddData) {
                   print('individualColumns', function(individualColumns) {
                       allAddData.forEach(function(data, index) {
                           if (data.categoryName === category && data.userName==='purchase') {
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
                           showModalExtraLarge();
                       } else {
                           CustomAlert("No data found to display in the modal.");
                       }
                   });
               }
           });

               $('.btnSave').click(function(event) {
                           event.preventDefault(); // Prevent the default action (form submission)
                            var serviceId=$(this).data('service-id');
                            var problemName = $(this).data('problemname-id');
                               var solutionName = $(this).data('solutionname-id');
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
                                 sendDeliveryDeviceForService(serviceId,selectedRows,problemName,solutionName);
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
           });
           $(document).on('click', '.viewAcceptingLink', function(){

           var serviceId = $(this).data('service-id');
           var problemName = $(this).data('problemname-id');
           var solutionName = $(this).data('solutionname-id');
          var htmlToAdd = `
                   <div class="mb-3" style="margin-left: 0%; text-align: left;">
                   <h6 id="detailsId"></h6>
                   <h6 id="budgetId"></h6>
                   </div>
                      <div class="mb-9" style="margin-left: 0%; text-align: left;">
                          <table id="deviceInformationTable" class="table table-gray table-bordered table-hover">
                              <thead>
                                  <tr>
                                      <th scope="col" style="background-color: gray;color:white">SN</th>
                                       <th scope="col" style="background-color: gray;display: none;color:white">Link</th>
                                        <th scope="col" style="background-color: gray;color:white">Links</th>
                                       <th scope="col" style="background-color: gray;color:white">Action</th>

                                  </tr>
                              </thead>
                              <tbody id="purchaseRequestInformationBody">

                              </tbody>
                          </table>
                      </div>
                      <div class="mb-3" style="margin-left: 0%; text-align: left;">
                         <label for="comments" class="form-label">Comments</label>
                         <textarea class="form-control" id="comments" name="comments" placeholder="Comments"></textarea>
                     </div>
                       <div class="mb-3" style="margin-left: 0%; text-align: center;">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      </div>

                  `;
                  $('.ModalMedium').html(htmlToAdd);

                  $('#publicModalMediumLabel').text("Accepted Request Form");

                print('serviceRequests', function(requestData) {
                    if (requestData) {
                        const result = requestData.find(function(data1) {
                            return data1.id === serviceId;
                        });
                        result.allProblem.forEach(function(problem){
                          problem.proposalSolution.forEach(function(solution) {
                          if(problem.name===problemName   &&  solution.name===solutionName ){
                           $("#detailsId").text("Details: " + solution.purchaseProposalToCooDetails);
                            $("#budgetId").text("Budget: " + solution.purchaseProposalToCooBudget);
                            $("#comments").text( solution.purchaseProposalToCooComment);

                            var rowsHtml = '';
                                for (let j = 0; j < solution.purchaseProposalToCooAcceptedLinks.length; j++) {
                                 for (let i = 0; i < solution.purchaseProposalToCooLinks.length; i++) {
                                  const link = solution.purchaseProposalToCooLinks[i].startsWith('http://') || solution.purchaseProposalToCooLinks[i].startsWith('https://')
                                         ? solution.purchaseProposalToCooLinks[i]
                                         : 'https://' + solution.purchaseProposalToCooLinks[i];
                                 if(solution.purchaseProposalToCooAcceptedLinks[j]===link){
                                  // Ensure the link includes the protocol (http:// or https://)
                                     const link = solution.purchaseProposalToCooLinks[i].startsWith('http://') || solution.purchaseProposalToCooLinks[i].startsWith('https://')
                                         ? solution.purchaseProposalToCooLinks[i]
                                         : 'https://' + solution.purchaseProposalToCooLinks[i];

                                     rowsHtml += `<tr>
                                         <td>${i + 1}</td>
                                         <td style="display: none;">${link}</td>
                                         <td>
                                             <a href="${link}" target="_blank" style="text-decoration: none;">
                                                 ${link}
                                             </a>
                                         </td>
                                         <td><input type="checkbox" style="transform: scale(1.5); margin: 10px;" name="selectDevice"  class="action-checkbox" checked></td>
                                     </tr>`;

                                 }
                                }
                                }


                            $('#purchaseRequestInformationBody').html(rowsHtml);
                          }

                          });
                        });


                    }
                });


                    showModalMedium();
           });
           $(document).on('click', '.accepted', function(){
           var text = $(this).data('category-id');
           var serviceId = $(this).data('service-id');
           var problemName = $(this).data('problemname-id');
           var solutionName = $(this).data('solutionname-id');
            var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
                    var departmentName = departmentElement.data("departmentuser-name");

                        var htmlToAdd = `
                           <div class="mb-3" style="margin-left: 0%; text-align: left;">
                               <div class="dropdown">
                                   <label for="deviceInputFieldAdd" class="form-label">Category Name</label>
                                   <input type="text" value="${text}"class="form-control dropdown-toggle custom-width" id="deviceInputFieldAdd" data-bs-toggle="dropdown" placeholder="Category" aria-expanded="false" readonly>

                               </div>
                           </div>


                          <div class="mb-3" style="margin-left: 0%; text-align: left;">
                              <label for="deviceType" class="form-label">Device Type</label>
                              <select id="deviceType" class="form-control">
                                  <option value="Primary">Primary</option>
                                  <option value="Secondary">Secondary</option>
                              </select>
                          </div>


                          <form   id="dynamicFormAddDevice">
                        <div id="universalDiv" >

                         </div>
                         <div id="deviceDiv">

                         </div>

                          </form>
                           <div class="mb-3" style="margin-left: 0%; text-align: left;">
                               <button type="button" class="btn btn-primary" data-service-id="${serviceId}" data-problemname-id="${problemName}" data-solutionname-id="${solutionName}"id="saveEditBtn">Save</button>
                               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                           </div>

                       `;

                       // Add the HTML code to the modal body using jQuery
                       $('.ModalMedium').html(htmlToAdd);
                       $('#publicModalMediumLabel').text("Add Old Device Information")


                        print('universalColumns', function(universalColumns) {
                          if (universalColumns) {
                              // Generate HTML for categories
                                   var categoriesHtml = '';
                              universalColumns.forEach(function(column) {
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
                                       case 'customDropDownList':
                                               // Call the custom dropdown function and handle it as a promise
                                               myFunctionThatHandlesCase(column,null,'dynamicFormAddDevice').then(function(dropDownHtml) {
                                                   //categoriesHtml += dropDownHtml; // Append the dropdown HTML
                                                   $('#universalDiv').append(dropDownHtml); // Update the deviceDiv with new HTML
                                               }).catch(function(error) {
                                                   console.error("Error:", error);
                                               });
                                               break;
                                       default:
                                           categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label></div>`;
                                           break;
                                   }


                              });

                             if (categoriesHtml && !categoriesHtml.includes('customDropDownList')) {
                                 // Only update if there's no custom dropdown list pending
                                   console.log(" check "+categoriesHtml);
                                 $('#universalDiv').html(categoriesHtml);
                             }
                          }
                      });
                      // Show all Individual column according to category
                        print('individualColumns', function(individualColumns) {
                                  if (individualColumns) {
                                  var categoriesHtml = '';
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




                        $('#saveEditBtn').click(function() {
                            var categoryName=$('#deviceInputFieldAdd').val();
                                 var serviceId=$(this).data('service-id');
                                 var problemName = $(this).data('problemname-id');
                                 var solutionName = $(this).data('solutionname-id');

                                addTableInformationOfDeviceForService(categoryName,serviceId,problemName,solutionName);
                           });

                     showModalMedium();
           });
            $(document).on('click', '.chat-buttonForService', function() {

                  var serviceId = $(this).data('service-id');
                   var problemName = $(this).data('problemname-id');
                    var solutionName = $(this).data('solutionname-id');
                       var htmlToAdd = `
                         <form id="linkForm">
                             <div class="mb-3" style="margin-left: 0%; text-align: left;">
                                 <label for="details" class="form-label">Details</label>
                                 <textarea class="form-control" id="details" name="details" placeholder="Details"></textarea>
                             </div>
                             <div class="mb-3" style="margin-left: 0%; text-align: left;">
                                 <label for="budget" class="form-label">Budget</label>
                                 <input type="number" class="form-control" name="budget" id="budget" placeholder="Budget">
                             </div>
                             <div class="mb-3" style="margin-left: 0%; text-align: left;">
                                 <label class="form-label">Links:</label>
                             </div>
                             <div id="linkDiv" class="mb-3" style="margin-left: 0%; text-align: left;">
                             </div>
                             <div class="mb-3" style="margin-left: 0%; text-align: left;">
                                 <button type="button" class="btn btn-primary" id="addLinkBtn">Add Link</button>
                             </div>
                         </form>
                         <div class="mb-3" style="margin-left: 0%; text-align: center;">
                             <button type="button" class="btn btn-primary" id="saveEditBtnForService">Save</button>
                             <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                         </div>
                     `;
                     $('.ModalMedium').html(htmlToAdd);

                     $('#publicModalMediumLabel').text("Purchase Request");

                     $('#addLinkBtn').click(function(event) {
                         var linkCount = $('#linkDiv .input-group').length + 1;
                         var linkName = 'link' + linkCount;

                         var htmlToAppend = `
                             <div class="input-group mb-3">
                                 <input type="text" class="form-control" name="${linkName}" placeholder="link1" aria-label="link1" aria-describedby="basic-addon2">
                                 <div class="input-group-append">
                                     <button class="btn btn-outline-secondary remove-link" type="button">X</button>
                                 </div>
                             </div>
                         `;
                         $('#linkDiv').append(htmlToAppend);
                     });

                     $('#linkDiv').on('click', '.remove-link', function() {
                         $(this).closest('.input-group').remove();
                     });

                     $('#saveEditBtnForService').click(function(event) {
                         saveFormDataForService(serviceId,problemName,solutionName);
                     });

                     showModalMedium();
                   });
 // Add event listener for the availability button click
            $(document).on('click', '.view-button-selected-device', function() {
                                var category = $(this).data('category');
                                var deviceId=$(this).data('deviceId');
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
                                                                           if (individualColumn.categoryName=== category) {

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


            });
            $(document).on('click', '.clock-button', function() {
            var serviceId = $(this).data('serviceId');  // Corrected to 'service-id'
            var problemName = $(this).data('problemName');
            var solutionName = $(this).data('solutionName');
            var date = $(this).data('date');

            var htmlToAdd = `
                <div class="mb-3" style="margin-left: 0%; text-align: left;">
                    <label for="deliveryDate" class="form-label">Change Delivery Date:</label>
                    <input type="date" class="form-control" id="deliveryDate" name="deliveryDate" value="${date}">
                </div>
                <div class="mb-3" style="margin-left: 0%; text-align: center;">
                    <button type="button" class="btn btn-primary" id="saveEditBtn">Yes</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            `;

            // Add the HTML code to the modal body using jQuery
            $('.ModalMedium').html(htmlToAdd);
            $('#publicModalMediumLabel').text("Do you want to update delivery date?");

            // Add event listener for save button
            $('#saveEditBtn').click(function() {
                var updatedDate = $('#deliveryDate').val();

                // Send data to the controller using AJAX
               $.ajax({
                           type: "POST",
                           url: "/inventory/updateDeliveryDate",  // Replace with your controller endpoint
                           data: {
                               serviceId: serviceId,
                               problemName: problemName,
                               solutionName: solutionName,
                               date: updatedDate
                           },
                           success: function(response) {
                               // Handle success (e.g., show a message or close the modal)
                               CustomAlert("Delivery date updated successfully!");
                               hideModal();
                               location.reload();
                           },
                           error: function(error) {
                               // Handle error (e.g., show an error message)
                               CustomAlert("Error updating delivery date!");
                           }
                       });
                    });

            showModalMedium();
        });
        // Add event listener for the availability button click


            // Add event listener for the availability button click
            $(document).on('click', '.view-button-pending', function() {
                       var category = $(this).data('category');
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
                                           </tr>
                                       </thead>
                                       <tbody id="listDeviceInformationBody"></tbody>
                                   </table>
                               </div>
                           `;

                           $('.ModalExtraLarge').html(htmlToAdd);
                           $('#publicModalExtraLargeLabel').text("Device Information");

                           var rowsHtml = '';

                           print('allAddData', function(allAddData) {
                               if (allAddData) {
                                   print('individualColumns', function(individualColumns) {
                                       allAddData.forEach(function(data, index) {
                                           if (data.categoryName === category) {
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

                                               rowsHtml += `</ul></td></tr>`;
                                           }
                                       });

                                       // Populate the table only if rowsHtml has content
                                       if (rowsHtml) {
                                           $('#listDeviceInformationBody').html(rowsHtml);

                                           // Show modal only if rows were added
                                           showModalExtraLarge();
                                       } else {
                                           CustomAlert("No data found to display in the modal.");
                                       }
                                   });
                               }
                           });
                       });
                   });


        },
        error: function(xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });
};


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



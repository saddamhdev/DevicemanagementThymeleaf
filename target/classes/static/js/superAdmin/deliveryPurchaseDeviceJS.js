function addTableInformationAlternativeDeviceRequest(requestId){
 // Define the Service class


         var mergedFormData = {}; // Object to hold all form data based on formId

         const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

         // Create an empty array to store service IDs
         let selectedDeviceIds = [];


         // Loop through each checked checkbox and get the data-service-id
         checkboxes.forEach(function(checkbox) {
           // Get the serviceId from the checkbox's data-service-id attribute
             const deviceId = checkbox.getAttribute('data-device-id');


           // Add the serviceId to the selectedServiceIds array
           if (deviceId) {

             selectedDeviceIds.push(deviceId);

           }

         });

          var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
          var departmentName = departmentElement.data("departmentname");//it
          var departmentUserName = departmentElement.data("departmentuser-name");//saho
          var departmentUserId = departmentElement.data("departmentuser-id");//s


         // Send AJAX request to backend
         $.ajax({
             url: "/inventory/addAlternativeDeviceList",
             type: "POST",
             headers: {

                               'Authorization': 'Bearer ' + getAuthToken()
                           },
             data: JSON.stringify({
                  requestId: requestId,
                  deviceIds: selectedDeviceIds ,
                  departmentName:departmentName,
                  departmentUserName:departmentUserName,
                  departmentUserId:departmentUserId
                  }),
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
function sendDeliveryDevice(requestId,deviceId){
 // Define the Service class

         var mergedFormData = {}; // Object to hold all form data based on formId


          var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
          var departmentName = departmentElement.data("departmentname");//it
          var departmentUserName = departmentElement.data("departmentuser-name");//saho
          var departmentUserId = departmentElement.data("departmentuser-id");//s


         // Send AJAX request to backend
         $.ajax({
             url: "/inventory/sendDeliveryDeviceInventoryToCustomerCare",
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
function approveFinalPurchaseDeviceDelivery(requestId,deviceId){
 // Define the Service class

         var mergedFormData = {}; // Object to hold all form data based on formId


          var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
          var departmentName = departmentElement.data("departmentname");//it
          var departmentUserName = departmentElement.data("departmentuser-name");//saho
          var departmentUserId = departmentElement.data("departmentuser-id");//s


         // Send AJAX request to backend
         $.ajax({
             url: "/superAdmin/approveFinalPurchaseDeviceDelivery",
             type: "POST",
             headers: {

                               'Authorization': 'Bearer ' + getAuthToken()
                           },
             data: JSON.stringify({
                  requestId: requestId,
                  deviceId: deviceId ,
                  departmentName:departmentName,
                  departmentUserName:departmentUserName,
                  departmentUserId:departmentUserId
                  }),
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
function printRejectCause(element) {
        var rejectCause = element.getAttribute("data-reject-cause");

 var htmlToAdd = `
        <div class="mb-3" style="margin-left: 0%; text-align: left;">
           <h1>${rejectCause}
           </h1>
        </div>
           <div class="mb-3" style="margin-right: 0%; text-align: center;">
               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
           </div>
       `;

       // Add the HTML code to the modal body using jQuery
        $('.ModalMedium').html(htmlToAdd);
       // edit individual column header
        $('#publicModalMediumLabel').text("Rejected Cause:");

         $('#DeniedBtn').click(function() {

                 setRequestStatus(requestId,"Denied");
          });

        showModalMedium();
    }
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
window.initDeliveryPurchaseDeviceGeneral = function (allData, requestColumns, allAddData) {
    const tableBody = document.getElementById("deliveryDeviceTableBody");
    if (!tableBody) {
        console.error("Table body element with id 'deliveryDeviceTableBody' not found.");
        return;
    }

    // Step 1: Capture current rows
    const currentRows = Array.from(tableBody.querySelectorAll("tr"));
    const currentRowMap = new Map();
    currentRows.forEach(row => {
        const key = Array.from(row.cells).map(cell => cell.textContent.trim()).join('|');
        currentRowMap.set(key, row);
    });

    const newRowKeys = new Set();

    // Helper: Check availability
    function getAvailability(categoryName) {
        let count = 0;
        allAddData.forEach(device => {
            if (device.categoryName === categoryName && device.userName === 'inventory') {
                count++;
            }
        });
        return count === 0 ? "Unavailable" : `Available(${count})`;
    }

    // Step 2: Add or update rows
    allData.forEach(device => {
        if (device.inventory?.inventoryStatus === 'Purchased' &&
            device.inventory?.inventoryToCustomerCareDeviceSendingStatus === 'Pending') {

            const bivagName = device.departmentName || "N/A";
            const categoryName = device.allData["category"] || "N/A";
            const sn = device.visibleRequestId || "N/A";

            let content = '';
            if (device.inventory?.inventoryStatus === "Purchased") {
                content = device.inventory?.inventoryToCustomerCareDeviceSendingStatus || ' ';
            } else if (device.inventory?.inventoryStatus === "Alternative Proposal Accepted") {
                content = device.inventory?.cooDeliveryAns || ' ';
            }

            const availability = getAvailability(categoryName);

            // Unique row key
            const rowKey = [sn, bivagName, categoryName, content, availability].join('|');
            newRowKeys.add(rowKey);
            if (currentRowMap.has(rowKey)) return; // already present

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
                    const columnType = column.dataType || "text";
                    const value = device.allData[columnName] || "N/A";
                    htmlData += columnType === "textarea"
                        ? `<div><textarea class="plain-textarea">${value}</textarea></div>`
                        : `<div><span>${columnName}</span>: <span>${value}</span></div>`;
                }
            });

            htmlData += `
                    </div>
                    <p data-request-id="${device.id}" data-button-id="viewInfo">&#128065;</p>
                </td>
                <td>${device.inventory?.deliveryMode || "Not Delivered"}</td>
                <td>${device.inventory?.inventoryStatus || "N/A"}</td>
                <td>${device.inventory?.cooDeliveryAns || 'Pending'}</td>
                <td>${device.inventory?.inventoryToCustomerCareDeviceSendingStatus || 'Pending'}</td>
                <td>
                    <button class="btn btn-info btn-sm viewAvailability"
                        data-category-id="${categoryName}"
                        data-request-id="${device.id}"
                        data-button-id="viewAlternative"
                        title="View Available Same Accessories Category Devices">
                        ${availability}
                    </button>
                </td>
                <td>${device.presentTime ? formatDateTimeToAmPm(device.presentTime) : "N/A"}</td>
                <td onclick="window.trackDeviceRequestData(this.closest('tr'), this)" class="view-device-status"
                    data-request-id="${device.id}"
                    style="background-color:#007bff;color:#fff;text-align:center;padding:10px;border-radius:5px;cursor:pointer;font-weight:500;font-size:14px;"
                    onmouseover="this.style.backgroundColor='#0056b3'"
                    onmouseout="this.style.backgroundColor='#007bff'"
                    title="View Request data tracking information">View</td>
                <td>
                    <div class="d-flex justify-content-center align-items-center action-button-container">
                        ${device.inventory?.inventoryToCustomerCareDeviceSendingStatus === "Pending" ? `
                        <button class="btn btn-primary btn-sm text-white approveDeliveryDevice"
                            data-category-id="${device.allData['category']}"
                            data-buyingdevice-id="${device.inventory.acceptedId}"
                            data-request-id="${device.id}"
                            data-button-id="deliver"
                            title="Approve device delivery">✔</button>` : ""}
                    </div>
                </td>
            `;

            row.innerHTML = htmlData;
            tableBody.appendChild(row);
        }
    });

    // Step 3: Remove outdated rows
    currentRowMap.forEach((row, key) => {
        if (!newRowKeys.has(key)) {
            row.remove();
        }
    });

    // Step 4: Attach action listener
    $(document).off('click', '.approveDeliveryDevice').on('click', '.approveDeliveryDevice', function () {
        const requestId = $(this).data('request-id');
        const deviceId = $(this).data('buyingdevice-id');
        if (confirm("Are you sure you want to approve delivery for this device?")) {
            approveFinalPurchaseDeviceDelivery(requestId, deviceId);
        }
    });
};


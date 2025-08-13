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
function confirmExport(){
  // Define the Service class
          class Service {
          constructor(serviceId, problemName, solutionName) {
              this.serviceId = serviceId;
              this.problemName = problemName;
              this.solutionName = solutionName;
          }

          toString() {
              return `Service { serviceId: ${this.serviceId}, problemName: ${this.problemName}, solutionName: ${this.solutionName} }`;
          }
          }

         var mergedFormData = {}; // Object to hold all form data based on formId

         const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

         // Create an empty array to store service IDs
         let selectedServiceIds = [];
           let selectedRequestIds = [];

         // Loop through each checked checkbox and get the data-service-id
         checkboxes.forEach(function(checkbox) {
           // Get the serviceId from the checkbox's data-service-id attribute
             const serviceId = checkbox.getAttribute('data-service-id');
             const problemName = checkbox.getAttribute('data-problem-name');
             const solutionName = checkbox.getAttribute('data-solution-name');

           // Add the serviceId to the selectedServiceIds array
           if (serviceId) {

             selectedServiceIds.push(new Service(serviceId, problemName, solutionName));

           }
           else{
            selectedRequestIds.push(checkbox.getAttribute('data-request-id'))
           }
         });

         // Print all services

       //  selectedServiceIds.forEach(service => console.log(service.toString()));

          var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
          var departmentName = departmentElement.data("departmentname");//it
          var departmentUserName = departmentElement.data("departmentuser-name");//saho
          var departmentUserId = departmentElement.data("departmentuser-id");//s

      // Build the request payload
         const requestData = {
             departmentName: departmentName,
             departmentUserName: departmentUserName,
             departmentUserId: departmentUserId,
             services: selectedServiceIds,
             requests:selectedRequestIds
         };

         // Send AJAX request to backend
         $.ajax({
             url: "/purchase/addPaymentListExport",
             type: "POST",
             contentType: "application/json",
             data: JSON.stringify(requestData),
             success: function (response) {
                // alert(response); // Display success response
                 confirmExport1(); // pdf download

             },
             headers: {

                    'Authorization': 'Bearer ' + getAuthToken()
                },
             error: function (xhr, status, error) {
                 CustomAlert("Error: " + error); // Display error response
                 console.error("Error:", error);
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
window.initRequestDataForPaymentExportGeneral = function () {

};


window.initRequestDataForPaymentExportTable = function () {
    const tableBody = document.getElementById("requestForPaymentExportTableBody");
    if (!tableBody) {
        console.error("Table body element with id 'requestForPaymentExportTableBody' not found.");
        return;
    }

    // Step 1: Track current rows to remove outdated ones
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

                if (!device.allProblem || !Array.isArray(device.allProblem)) return;

                device.allProblem.forEach(problem => {
                    if (!problem.proposalSolution || !Array.isArray(problem.proposalSolution)) return;

                    problem.proposalSolution.forEach(solution => {
                        let cooAnswer = solution.purchaseProposalToCooAns || " ";
                        let paymentAnswer = solution.purchasePaymentToCooRequestStatus || " ";

                        if (cooAnswer === 'Accepted') {
                            const rowKey = `${sn}|${solution.name}|${solution.category}|${cooAnswer}|${solution.price}`;
                            newRowKeys.add(rowKey);
                            if (currentRowMap.has(rowKey)) return;

                            const row = document.createElement("tr");

                            row.innerHTML = `
                                <td>${sn}</td>
                                <td>${bivagName}</td>
                                <td>${solution.category}</td>
                                <td class="text-start">
                                    <div class="compact-cell bg-light">
                                        <div><strong class="text-success">Category: ${solution.category}</strong></div>
                                        <div>${solution.value?.trim().replace(/\n/g, "<br>") || ""}</div>
                                    </div>
                                </td>
                                <td>${solution.price || 'N/A'}</td>
                                <td>${cooAnswer}</td>
                                <td>${solution.purchaseDeviceExportStatus ?? 'Not Exported'}</td>
                                <td>${solution.inventoryForPurchaseRequestTime ? formatDateTimeToAmPm(solution.inventoryForPurchaseRequestTime) : 'N/A'}</td>
                                <td>
                                    <div class="d-flex justify-content-center align-items-center action-button-container">
                                        <input type="checkbox"
                                            data-category="${solution.category}"
                                            data-solution-name="${solution.name}"
                                            data-problem-name="${problem.name}"
                                            data-service-id="${device.id}"
                                            data-button-id="accepted"
                                            style="background-color: green; transform: scale(1.5); width: 12px; height: 12px;"
                                            title="Select For Payment">
                                    </div>
                                </td>
                            `;

                            tableBody.appendChild(row);
                        }
                    });
                });
            });

            // Step 3: Remove old rows that are no longer in the new data
            currentRowMap.forEach((row, key) => {
               const firstCellText = row.cells[0]?.textContent.trim();
                  if (!newRowKeys.has(key) || (firstCellText && firstCellText.startsWith("R"))) {
                      row.remove();
                  }
            });


            sortAndFormatAllTables();
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
                     $('.modal-body').html(htmlToAdd);

                     $('#publicModalLabel').text("Purchase Request");

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

                     showModal();
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
                                $('.modal-body').html(htmlToAdd);

                                $('#publicModalLabel').text("Device Information");




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







                                showModal();
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
                            CustomAlert(response);
                              $('#globalCustomAlertModal').on('hidden.bs.modal', function () {
                                  location.reload();
                              });
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
                                           </tr>
                                       </thead>
                                       <tbody id="listDeviceInformationBody"></tbody>
                                   </table>
                               </div>
                           `;

                           $('.modal-body').html(htmlToAdd);
                           $('#publicModalLabel').text("Device Information");

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
                                           showModal();
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

function addTableInformationOfServiceForPaymentExportModal() {
    const mainTable = document.getElementById("requestForPaymentExportTable");
      const modalHeader = document.getElementById("modalHeaderRow");
          const modalBody = document.getElementById("modalBodyRows");
          const totalPriceDisplay = document.getElementById("totalPriceDisplay");

          // Clear previous content
          modalHeader.innerHTML = "";
          modalBody.innerHTML = "";
          totalPriceDisplay.textContent = "";

          const originalHeaderRow = mainTable.querySelector("thead tr");
          const headerClone = originalHeaderRow.cloneNode(true);
          const headerCells = [...headerClone.cells];

          const removeIndexes = [];
          let priceColumnIndex = -1;

          headerCells.forEach((cell, index) => {
              const text = cell.textContent.trim().toLowerCase();
              if ( text === "components") {
                  removeIndexes.push(index);
              }
              if (text.startsWith("price")) {
                     priceColumnIndex = index;
                 }
          });

          removeIndexes.reverse().forEach(i => headerClone.deleteCell(i));
          modalHeader.appendChild(headerClone);

          // Sum price from selected rows
          let totalPrice = 0;

          const checkboxes = document.querySelectorAll('input[type="checkbox"][data-button-id="accepted"]:checked');
          checkboxes.forEach((checkbox) => {
              const row = checkbox.closest("tr");
              const rowClone = row.cloneNode(true);

              // Get price before deleting columns
              const cells = row.querySelectorAll("td");
              if (priceColumnIndex !== -1 && cells[priceColumnIndex]) {
                  const priceText = cells[priceColumnIndex].textContent.trim().replace(/[^\d.]/g, "");
                  const price = parseFloat(priceText);
                  if (!isNaN(price)) totalPrice += price;
              }

              // Remove unwanted columns
              removeIndexes.forEach(i => rowClone.deleteCell(i));
             const checkboxInClone = rowClone.querySelector('input[type="checkbox"]');
             if (checkboxInClone) {
                 checkboxInClone.disabled = true; // Properly disable the checkbox
             }

              modalBody.appendChild(rowClone);
          });

          if (checkboxes.length > 0) {
              totalPriceDisplay.textContent = "Total Price: $" + totalPrice.toFixed(2);
              const modal = new bootstrap.Modal(document.getElementById("exportModal"));
              modal.show();
          } else {
              CustomAlert("Please select at least one row.");
          }
}

function confirmExport1() {

    const modalRows = document.querySelectorAll("#modalBodyRows tr");
    const headerCells = document.querySelectorAll("#modalHeaderRow th");

    const exportData = [];

    modalRows.forEach(row => {
        const rowData = {};
        const cells = row.querySelectorAll("td");

        cells.forEach((cell, index) => {
            const key = headerCells[index].textContent.trim();
            const value = cell.textContent.trim();
            rowData[key] = value;
        });

        exportData.push(rowData);
    });

    fetch("/purchase/exportDataForOrderedDevice", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + getAuthToken()
        },
        body: JSON.stringify(exportData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to export PDF");
        }
        return response.blob();  // <-- Get PDF blob
    })
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "exported-data For Ordered.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        location.reload(); // Refresh the page
    })
    .catch(error => {
        console.error("Error:", error);
        CustomAlert("Error occurred during export.");
    });
}

window.initRequestDataDirectExportTable = function () {
    const tableBody = document.getElementById("requestForPaymentExportTableBody");
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
               // if (device.requestMode === "Denied") return;
               if(device.purchase !== null && device.purchase.cooAns === 'Accepted'){

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
                        <td>${device.purchase?.budget || " "}</td>
                        <td>${device.purchase?.cooAns || " "}</td>
                        <td>${device.purchase?.purchaseDeviceExportStatus || 'Not Exported'}</td>
                        <td>${device.purchase?.requestTime ? formatDateTimeToAmPm(device.purchase?.requestTime) : "N/A"}</td>
                    `;
                    htmlData += `
                       <td>
                       <div class="d-flex justify-content-center align-items-center action-button-container">
                            ${device.purchase?.cooAns ==='Accepted'
                                ? ` <input type="checkbox"  data-request-id="${device.id}" data-button-id="accepted" style="background-color: green; transform: scale(1.5); width: 12px; height: 12px;"  title="Select For Payment" >
                                `
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


       $('#requestForPaymentExportTable tbody tr').click(function(event) {
              var $row = $(this); // Store the clicked row element
              var button = $(event.target).closest('button');
               var buttonPTag = $(event.target).closest('td');
              var buttonPressed = button.text().trim(); // Get the HTML inside the button
              var requestId = button.data('requestId');
              var buttonId = button.data('buttonId');
              var categoryName = $row.find('td:nth-child(3)').text();
            // i want check by class name

              // Check if the button has a specific class
              if (buttonPTag.hasClass('viewInfo')) {

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

              else if (buttonId === "accepted"){
                var htmlToAdd = `
                           <div class="mb-3" style="margin-left: 0%; text-align: left;">
                               <input type="text" class="form-control  custom-width" id="deviceInputFieldEdit" value="${categoryName}" placeholder="Category" readonly >
                           </div>
                          <form   id="dynamicFormSaveDevice">
                        <div id="universalDivEdit" >

                         </div>
                         <div id="deviceDivEdit">

                         </div>

                          </form>
                           <div class="mb-3" style="margin-left: 0%; text-align: left;">
                               <button type="button" class="btn btn-primary" id="saveEditBtn">Deliver</button>
                               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                           </div>
                       `;

                       // Add the HTML code to the modal body using jQuery
                       $('.modal-body').html(htmlToAdd);
                         $('#publicModalLabel').text("Add New Device Information")
                        print('categories', function(categories) {
                              if (categories) {
                                  // Generate HTML for categories
                                  var categoriesHtml = '';
                                  categories.forEach(function(category) {
                                      categoriesHtml += `<li><a class="dropdown-item deviceInputEachItemEdit" href="#" th:text="${category.categoryName}">${category.categoryName}</a></li>`;
                                  });

                                  // Insert evaluated Thymeleaf expression
                                  $('#listItemEditDevice').html(categoriesHtml);
                              }
                          });
                       print('universalColumns', function(universalColumns) {
                          if (universalColumns) {


                                   var categoriesHtml = '';
                                   universalColumns.forEach(function(column) {

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
                                       default:
                                           categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label></div>`;
                                           break;
                                     }




                              });

                              // Insert evaluated Thymeleaf expression
                              $('#universalDivEdit').html(categoriesHtml); // Corrected line
                          }
                      });


                     // add individual column

                       // show all Individual column according to category
                    print('individualColumns', function(individualColumns) {
                        if (individualColumns) {
                            // Generate HTML for categories
                            var categoriesHtml = '';
                            individualColumns.forEach(function(column) {
                              if(categoryName===column.categoryName){
                              console.log(column.columnName)
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
                                 default:
                                     categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label></div>`;
                                     break;
                                }


                            }

                      });

                            // Insert evaluated Thymeleaf expression
                            $('#deviceDivEdit').html(categoriesHtml); // Corrected line
                        }
                    });


                         $('#saveEditBtn').click(function() {
                             saveTableInformationOfDevice(requestId,categoryName);
                           });

                     showModal();
               }
               else if (buttonId === "chat") {

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
                 $('.modal-body').html(htmlToAdd);

                 $('#publicModalLabel').text("Purchase Request");

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

                 showModal();
             }

           else if (buttonId === "view") {

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
                        $('.modal-body').html(htmlToAdd);

                        $('#publicModalLabel').text("Accepted Request Form");

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


                          showModal();
              }
          });


        },
        error: function(xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });
};
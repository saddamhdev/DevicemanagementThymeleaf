

function addTableInformationOfServiceCheckBox() {

 if (!confirm('Are you sure you want to send device Purchase Request?')) return;
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
       });

       // Print all services
       selectedServiceIds.forEach(service => console.log(service.toString()));

        var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
        var departmentName = departmentElement.data("departmentname");//it
        var departmentUserName = departmentElement.data("departmentuser-name");//saho
        var departmentUserId = departmentElement.data("departmentuser-id");//s

    // Build the request payload
       const requestData = {
           departmentName: departmentName,
           departmentUserName: departmentUserName,
           departmentUserId: departmentUserId,
           services: selectedServiceIds
       };

       // Send AJAX request to backend
       $.ajax({
           url: "/inventory/addPurchaseList",
           type: "POST",
           contentType: "application/json",
           data: JSON.stringify(requestData),
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

window.initServiceAccessoriesPendingDataTable = function () {
    const tableBody = document.getElementById("serviceAccessoriesPendingDataTableBody");
    if (!tableBody) {
        console.error("Table body not found.");
        return;
    }

    const departmentElement = $(".departmentName");
    const departmentName = departmentElement.data("departmentname");
    const departmentUserName = departmentElement.data("departmentuser-name");
    const departmentUserId = departmentElement.data("departmentuser-id");

    // Generate row signature from <tr>
    function generateRowKeyFromRow(row) {
        return Array.from(row.cells).map(cell => cell.textContent.trim()).join('|');
    }

    // Generate row signature from data
    function generateRowKeyFromData(sn, bivagName, categoryName, problemName, solution, time) {
        const value = (solution.value || '').trim().replace(/\n/g, '');
        return [
            sn, bivagName, categoryName, problemName,
            solution.category, value, solution.deviceManageType || '',
            solution.deliveryDate || '', solution.inventoryToServiceCenterDeviceStatus || '',
            time || ''
        ].join('|');
    }

    // Step 1: Capture current rows
    const currentRows = Array.from(tableBody.querySelectorAll("tr"));
    const currentRowMap = new Map();
    currentRows.forEach(row => {
        const key = generateRowKeyFromRow(row);
        currentRowMap.set(key, row);
    });

    // Step 2: Fetch data
    $.ajax({
        url: '/superAdmin/allDataRange',
        type: 'POST',
        dataType: 'json',
         data: {
                page: pageNumber,
                size: localStorage.getItem("pageSize") || 0
            },
           headers: {
                                 'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + getAuthToken()
                            },
        success: function (data) {
            const allData = data['serviceRequests'];
            const allAddData = data['allAddData'];
            const newRowKeys = new Set();

            function getAvailability(categoryName) {
                let count = 0;
                allAddData.forEach(device => {
                    if (device.categoryName === categoryName && device.userName === departmentName) {
                        count++;
                    }
                });
                return count === 0 ? "Unavailable" : `Available(${count})`;
            }

            allData.forEach(device => {
                const bivagName = device.departmentName || "N/A";
                const categoryName = device.categoryName || "N/A";
                const sn = device.visibleServiceId || "N/A";
                const time = device.customerCareSendDeviceToServiceTime
                    ? formatDateTimeToAmPm(device.customerCareSendDeviceToServiceTime)
                    : "";

                if (!Array.isArray(device.allProblem)) return;

                device.allProblem.forEach(problem => {
                    if (!Array.isArray(problem.proposalSolution)) return;

                    problem.proposalSolution.forEach(solution => {
                        if (solution?.serviceCenterToInventoryAccessoriesRequestStatus !== 'Pending') return;

                        const availability = getAvailability(solution.category);
                        const rowKey = generateRowKeyFromData(sn, bivagName, categoryName, problem.name, solution, time);
                        newRowKeys.add(rowKey);

                        if (!currentRowMap.has(rowKey)) {
                            const row = document.createElement("tr");
                            row.innerHTML = `
                                <td>${sn}</td>
                                <td>${bivagName}</td>
                                <td>${categoryName}</td>
                                <td>${problem?.name || ''}</td>
                                <td class="text-start">
                                    <div class="compact-cell bg-light">
                                        <div><strong class="text-success">Category: ${solution.category}</strong></div>
                                        <div>${solution.value.trim().replace(/\n/g, "<br>")}</div>
                                    </div>
                                </td>
                                <td>
                                    <button class="btn btn-info btn-sm view-button-pending"
                                        data-category="${solution.category}"
                                        data-device-id="${device.deviceId}"
                                        data-button-id="viewAlternative"
                                        title="View Available Same Accessories Category Devices">
                                        ${availability}
                                    </button>
                                </td>
                                <td>${solution.deviceManageType || ''}</td>
                                <td>${solution.deliveryDate || ''}</td>
                                <td>${solution.inventoryToServiceCenterDeviceStatus || ''}</td>
                                <td>${time}</td>
                                <td>
                                    <div class="d-flex justify-content-center align-items-center action-button-container">
                                        ${
                                            solution.deviceManageType === 'Purchased' &&
                                            availability !== "Unavailable" &&
                                            solution.inventoryToServiceCenterDeviceStatus !== 'Accepted'
                                            ? `<button class="btn btn-sm text-white delivery-button"
                                                  data-category="${solution.category}"
                                                  data-solution-name="${solution.name}"
                                                  data-problem-name="${problem.name}"
                                                  data-service-id="${device.id}"
                                                  style="background-color:green;"
                                                  data-buyingdevice-id="${solution.buyingDeviceId}"
                                                  title="Purchased Device Delivery To Service Center">✔</button>`
                                            : ''
                                        }

                                        ${
                                            solution.deviceManageType !== 'Purchased' &&
                                            availability !== "Unavailable" &&
                                            solution.inventoryToServiceCenterDeviceStatus !== 'Accepted'
                                            ? `<button class="btn btn-sm text-white delivery-button"
                                                  data-category="${solution.category}"
                                                  data-solution-name="${solution.name}"
                                                  data-problem-name="${problem.name}"
                                                  data-service-id="${device.id}"
                                                  style="background-color:green;"
                                                  title="Existing Device Delivery">✔</button>`
                                            : ''
                                        }

                                        ${
                                            availability === "Unavailable" &&
                                            solution.inventoryToServiceCenterDeviceStatus !== 'Accepted'
                                            ? `<button class="btn btn-sm text-white clock-button"
                                                  data-date="${solution.deliveryDate}"
                                                  data-solution-name="${solution.name}"
                                                  data-problem-name="${problem.name}"
                                                  data-service-id="${device.id}"
                                                  style="background-color:#f44336;"
                                                  title="Edit delivery Date">
                                                  <i class="fas fa-clock"></i>
                                               </button>`
                                            : ''
                                        }

                                        ${
                                            availability !== "Unavailable"
                                            ? `<button class="btn btn-info btn-sm view-button-selected-device"
                                                  data-category="${solution.category}"
                                                  data-service-id="${device.id}"
                                                  data-button-id="view"
                                                  data-device-id="${solution.inventoryToServiceCenterDeviceId}">
                                                  &#128065;
                                              </button>`
                                            : ''
                                        }

                                        ${
                                            availability === "Unavailable" &&
                                            solution.inventoryToServiceCenterDeviceStatus !== 'Accepted'
                                            ? `<input type="checkbox"
                                                  data-category="${solution.category}"
                                                  data-solution-name="${solution.name}"
                                                  data-problem-name="${problem.name}"
                                                  data-service-id="${device.id}"

                                                  style="background-color:green; transform: scale(1.5); width: 12px; height: 12px;"
                                                  title="Delivery Device">`
                                            : ''
                                        }
                                    </div>
                                </td>
                            `;
                            tableBody.appendChild(row);
                        }
                    });
                });
            });

            // Step 3: Remove outdated rows
            currentRowMap.forEach((row, key) => {
                if (!newRowKeys.has(key)) {
                    row.remove();
                }
            });



           // const myTable = document.querySelector("table");  // or more specific selector if you want
          // const myTable= document.getElementById("serviceAccessoriesPendingDataTable");
           // sortAndFormatTable(myTable);
            sortAndFormatAllTables() ;
          // globallyFormatAndSortTables();
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
                            headers: {

                                                 'Authorization': 'Bearer ' + getAuthToken()
                                             },
                           success: function(response) {
                               // Handle success (e.g., show a message or close the modal)
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
            $(document).on('click', '.delivery-button', function() {
                                var category = $(this).data('category');
                                var serviceId = $(this).data('serviceId');  // Corrected to 'service-id'
                                var problemName = $(this).data('problemName');
                                var solutionName = $(this).data('solutionName');
                                var buyingDeviceId = $(this).data('buyingdeviceId');
                                 var departmentElement = $(".departmentName"); // Target element with department data
                                var departmentName = departmentElement.data("departmentname"); // e.g., "it"
                                var departmentUserName = departmentElement.data("departmentuser-name"); // e.g., "saho"
                                var departmentUserId = departmentElement.data("departmentuser-id"); // e.g., "sahoid"

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
                                        <table id="selectDeviceInformationTable" class="table table-gray table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th scope="col" style="background-color: gray;color:white">SN</th>
                                                     <th scope="col" style="background-color: gray;display: none;color:white">Device Id</th>
                                                    <th scope="col" style="background-color: gray;color:white">Category Name</th>
                                                    ${categoriesHtml}
                                                    <th scope="col" style="background-color: gray;color:white">Description</th>
                                                    <th scope="col" style="background-color: gray;color:white">Action</th>

                                                </tr>
                                            </thead>
                                            <tbody id="listDeviceInformationBody">

                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="mb-9" style="margin-left: 0%; text-align: center;">
                                            <button type="button" class="btn btn-primary" id="selectBtn">Select</button>
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
                                                                if (data.categoryName === category && data.userName===departmentName) {
                                                                    rowsHtml += `<tr>
                                                                        <td>${index + 1}</td>
                                                                        <td style="display: none;">${data.id}</td>
                                                                        <td>${data.categoryName}</td>`;

                                                                    // Add universal columns
                                                                    universalColumns.forEach(function(column) {
                                                                        rowsHtml += `<td>${data.allData[column.columnName]}</td>`;
                                                                    });

                                                                    // Add individual columns within a list
                                                                    rowsHtml += `<td>
                                                                        <ul style="list-style: none; padding-left: 0; text-align: center;">`;

                                                                    if (individualColumns) {
                                                                        individualColumns.forEach(function(individualColumn) {
                                                                            if (individualColumn.categoryName === category) {
                                                                                rowsHtml += `<li>${individualColumn.columnName} : ${data.allData[individualColumn.columnName]}</li>`;
                                                                            }
                                                                        });
                                                                    }

                                                                    // Close the list
                                                                    rowsHtml += `</ul></td>`;

                                                                   const isChecked =(data.id) === buyingDeviceId ? 'checked' : '';

                                                                   rowsHtml += `<td>
                                                                     <input type="checkbox" name="selectRow"
                                                                            value="${data.id}" data-device-id="${data.id}" ${isChecked}>
                                                                   </td>`;

                                                                    // Close the row
                                                                    rowsHtml += `</tr>`;
                                                                }

                                                                });

                                                                $('#listDeviceInformationBody').html(rowsHtml);
                                                            });
                                                        }
                                                    });



                             // Event listener for the 'Select' button
                                        $(document).on('click', '#selectBtn', function() {
                                            var selectedDeviceIds = [];

                                            // Loop through each checked checkbox to get the deviceId
                                            $('#listDeviceInformationBody input[name="selectRow"]:checked').each(function() {
                                                var deviceId = $(this).data('device-id');
                                                selectedDeviceIds.push(deviceId); // Add the deviceId to the array
                                            });

                                            // Check selection conditions and respond accordingly
                                                if (selectedDeviceIds.length === 0) {
                                                    CustomAlert("Please select at least one device.");
                                                } else if (selectedDeviceIds.length > 1) {
                                                    CustomAlert("Please select only one device.");
                                                } else {
                                                    // Only one device is selected
                                                    console.log("Selected Device ID:", selectedDeviceIds[0]);
                                                     var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
                                                     var departmentName = departmentElement.data("departmentname");//it
                                                     var departmentUserName = departmentElement.data("departmentuser-name");//saho
                                                     var departmentUserId = departmentElement.data("departmentuser-id");//sahoid

                                                     // Send data to the controller using AJAX
                                                   $.ajax({
                                                               type: "POST",
                                                               url: "/inventory/updateDeliveryStatusAndDeliveryDevice",  // Replace with your controller endpoint
                                                               data: {
                                                                   serviceId: serviceId,
                                                                   problemName: problemName,
                                                                   solutionName: solutionName,
                                                                   deviceId: selectedDeviceIds[0],
                                                                   departmentName:departmentName,
                                                                   departmentUserName:departmentUserName,
                                                                   departmentUserId:departmentUserId
                                                               },
                                                               headers: {

                                                                    'Authorization': 'Bearer ' + getAuthToken()
                                                                },
                                                               success: function(response) {
                                                                   // Handle success (e.g., show a message or close the modal)

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

                                                }
                                        });



                                showModal();
                            });




            });

            // Add event listener for the availability button click
        $(document).on('click', '.view-button-pending', function() {

                     var departmentElement = $(".departmentName"); // Target element with department data
                    var departmentName = departmentElement.data("departmentname"); // e.g., "it"
                    var departmentUserName = departmentElement.data("departmentuser-name"); // e.g., "saho"
                    var departmentUserId = departmentElement.data("departmentuser-id"); // e.g., "sahoid"


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

                           $('.modal-body').html(htmlToAdd);
                           $('#publicModalLabel').text("Device Information");

                           var rowsHtml = '';

                           print('allAddData', function(allAddData) {
                               if (allAddData) {
                                   print('individualColumns', function(individualColumns) {
                                       allAddData.forEach(function(data, index) {
                                           if (data.categoryName === category && data.userName===departmentName ) {
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

function addTableInformationOfService() {
    var mergedFormData = {}; // Object to hold all form data based on formId

    // Loop through each form inside the #serviceAccessoriesDataTable div
    $("#serviceAccessoriesDataTable form").each(function() {
        var proposalId = $(this).data('proposal-id'); // Get the proposalId from data-proposal-id attribute
        var formId = $(this).attr('id') + "_" + proposalId; // Append proposalId to the form's id
        var formData = $(this).serializeArray(); // Serialize form data as an array of objects

        // Add the form data under the respective formId
        mergedFormData[formId] = formData;
    });

    console.log("Final data being sent:", JSON.stringify(mergedFormData));

    // Assuming you are sending this data using AJAX
    $.ajax({
        url: "/inventory/addProblemSolutionOfServicePrice",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(mergedFormData),
        success: function(response) {
                                CustomAlert(response);
                                  $('#globalCustomAlertModal').on('hidden.bs.modal', function () {
                                      location.reload();
                                  });
        },
        error: function(xhr, status, error) {
            // Display the error in an alert for debugging purposes
            CustomAlert("Error: " + error);

        }
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

window.initServiceAccessoriesListDataTable = function () {
    const tableBody = document.getElementById("serviceAccessoriesListDataTableBody");
    if (!tableBody) {
        console.error("Table body not found.");
        return;
    }

    // Helper: generate row signature from <tr>
    function generateRowKeyFromRow(row) {
        return Array.from(row.cells).map(cell => cell.textContent.trim()).join('|');
    }

    // Helper: generate row signature from data
    function generateRowKeyFromData(sn, bivagName, categoryName, problemName, solution, presentTime) {
        const value = (solution.value || '').trim().replace(/\n/g, '');
        const deliveryDate = solution.deliveryDate || '';
        const status = solution.inventoryToServiceCenterDeviceStatus || '';
        return [
            sn, bivagName, categoryName, problemName,
            solution.category, value, deliveryDate, status, presentTime
        ].join('|');
    }

    // Step 1: Build current row map
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
        success: function (data) {
            const allData = data['serviceRequests'];
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
                const bivagName = device.departmentName;
                const categoryName = device.categoryName;
                const sn = device.visibleServiceId;
                const presentTime = device.presentTime ? formatDateTimeToAmPm(device.presentTime) : "N/A";

                if (!Array.isArray(device.allProblem)) return;

                device.allProblem.forEach(problem => {
                    if (!Array.isArray(problem.proposalSolution)) return;

                    problem.proposalSolution.forEach(solution => {
                        if (solution.cooManInfoOfPriceAcceptanceCommentStatus !== 'Accepted') return;

                        const availability = getAvailability(solution.category);
                        const rowKey = generateRowKeyFromData(sn, bivagName, categoryName, problem.name, solution, presentTime);
                        newRowKeys.add(rowKey);

                        if (!currentRowMap.has(rowKey)) {
                            const row = document.createElement("tr");
                            row.innerHTML = `
                                <td>${sn}</td>
                                <td>${bivagName}</td>
                                <td>${categoryName}</td>
                                <td>${problem.name}</td>
                                <td class="text-start">
                                    <div class="compact-cell bg-light">
                                        <div><strong class="text-success">Category: ${solution.category}</strong></div>
                                        <div>${solution.value.trim().replace(/\n/g, "<br>")}</div>
                                    </div>
                                </td>
                                <td>
                                    <button class="btn btn-info btn-sm view-button-availability"
                                            data-category="${solution.category}"
                                            data-device-id="${device.deviceId}"
                                            data-button-id="viewAlternative"
                                            title="View Available Same Accessories Category Devices">
                                        ${availability}
                                    </button>
                                </td>
                                <td>${solution.deliveryDate || ''}</td>
                                <td>${solution.inventoryToServiceCenterDeviceStatus || ' '}</td>
                                <td>${presentTime}</td>
                                <td>
                                    <div class="d-flex justify-content-center align-items-center action-button-container">
                                        ${availability !== "Unavailable" && solution.inventoryToServiceCenterDeviceStatus === 'Pending' ? `
                                            <button class="btn btn-sm text-white delivery-button"
                                                    data-category="${solution.category}"
                                                    data-solution-name="${solution.name}"
                                                    data-problem-name="${problem.name}"
                                                    data-service-id="${device.id}"
                                                    data-device-id="${solution.inventoryToServiceCenterDeviceId}"
                                                    data-button-id="accepted"
                                                    style="background-color:green;"
                                                    title="Receive Device">✔</button>
                                        ` : ""}

                                        ${availability !== "Unavailable" ? `
                                            <button class="btn btn-info btn-sm view-button-selected-device"
                                                    data-category="${solution.category}"
                                                    data-service-id="${device.id}"
                                                    data-button-id="view"
                                                    title="View Accessories Device"
                                                    data-device-id="${solution.inventoryToServiceCenterDeviceId}">
                                                &#128065;
                                            </button>
                                        ` : ""}
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

         sortAndFormatAllTables();
 // Add event listener for the availability button click
            $(document).on('click', '.delivery-button', function() {
                                var category = $(this).data('category');
                                var serviceId = $(this).data('serviceId');  // Corrected to 'service-id'
                                var problemName = $(this).data('problemName');
                                var solutionName = $(this).data('solutionName');
                                var deviceId=$(this).data('deviceId');
                                 var htmlToAdd = `
                                  <div class="mb-3" style="margin-right: 0%; text-align: center;">
                                      <button type="button" class="btn btn-primary" id="AcceptBtn">Yes</button>
                                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                  </div>
                              `;
                              $('.ModalMedium').html(htmlToAdd);
                              $('#publicModalMediumLabel').text("Have you received the device ?");
                              $('#AcceptBtn').click(function() {

                               var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
                               var departmentName = departmentElement.data("departmentname");//it
                               var departmentUserName = departmentElement.data("departmentuser-name");//saho
                               var departmentUserId = departmentElement.data("departmentuser-id");//sahoid

                                $.ajax({
                                        type: "POST",
                                        url: "/service/updateAccessoriesReceivedStatus",  // Replace with your controller endpoint
                                        data: {
                                            serviceId: serviceId,
                                            problemName: problemName,
                                            solutionName: solutionName,
                                            status: "Accepted",
                                            departmentName:departmentName,
                                            departmentUserName:departmentUserName,
                                            departmentUserId:departmentUserId,
                                            deviceId:deviceId
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
            $(document).on('click', '.view-button-availability', function() {
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
                                    if (data.categoryName === category && data.userName==='inventory') {
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


            // Add event listener for the availability button click
            $(document).on('click', '.view-button-selected-device', function() {
                                var category = $(this).data('category');
                                var deviceId=$(this).data('deviceId');
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

        },
        error: function(xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });
};

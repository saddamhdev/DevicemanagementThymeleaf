function addTableInformationOfService1() {
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
            // Display the error in an alert for debugging purposes
            CustomAlert("Error: " + error);
            console.error("Error:", error);
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


window.initServiceAccessoriesDeliveryDataTable = function () {
    const tableBody = document.getElementById("serviceAccessoriesDeliveryDataTableBody");
    if (!tableBody) {
        console.error("Table body not found.");
        return;
    }

    function generateRowKeyFromRow(row) {
        return Array.from(row.cells).map(cell => cell.textContent.trim()).join('|');
    }

    function generateRowKeyFromData(sn, bivagName, categoryName, problemName, solution, time) {
        const value = (solution.value || '').trim().replace(/\n/g, '');
        return [
            sn, bivagName, categoryName, problemName,
            solution.category, solution.name, value,
            solution.inventoryToServiceCenterDeviceStatus || '', time || '', solution.deliveryDate || ''
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
                    if (device.categoryName === categoryName) {
                        count++;
                    }
                });
                return count === 0 ? "Unavailable" : `Available(${count})`;
            }

            allData.forEach(device => {
                const bivagName = device.departmentName;
                const categoryName = device.categoryName;
                const sn = device.visibleServiceId;
                const time = device.serviceCenterToInventoryAccessoriesRequestTime
                    ? formatDateTimeToAmPm(device.serviceCenterToInventoryAccessoriesRequestTime)
                    : "";

                if (!Array.isArray(device.allProblem)) return;

                device.allProblem.forEach(problem => {
                    if (!Array.isArray(problem.proposalSolution)) return;

                    problem.proposalSolution.forEach(solution => {
                        const isAccepted = device.cooAcceptOfServiceRequest === 'Accepted';
                        const isActionAccept = solution.action === 'accept';
                        const isStatusValid = ['Pending', 'Accepted'].includes(solution.inventoryToServiceCenterDeviceStatus);

                        if (!(isAccepted && isActionAccept && isStatusValid)) return;

                        const availability = getAvailability(solution.category);
                        const rowKey = generateRowKeyFromData(sn, bivagName, categoryName, problem.name, solution, time);
                        newRowKeys.add(rowKey);

                        if (!currentRowMap.has(rowKey)) {
                            const row = document.createElement("tr");
                            row.innerHTML = `
                                <td>${sn}</td>
                                <td>${bivagName}</td>
                                <td>${categoryName}</td>
                                <td>${problem.name}</td>
                                <td>${solution.category} (${solution.name}-${solution.value})</td>
                                <td>
                                    <button class="btn btn-info btn-sm view-button-delivery"
                                        data-category="${solution.category}"
                                        data-device-id="${device.deviceId}"
                                        data-button-id="viewAlternative"
                                        title="View Available Same Accessories Category Devices">
                                        ${availability}
                                    </button>
                                </td>
                                <td>${availability === "Unavailable" ? solution.deliveryDate : ''}</td>
                                <td>${solution.inventoryToServiceCenterDeviceStatus || ''}</td>
                                <td>${time}</td>
                                <td>
                                    <div class="d-flex justify-content-center align-items-center action-button-container">
                                        ${availability !== "Unavailable" && solution.inventoryToServiceCenterDeviceStatus !== 'Accepted' ? `
                                            <button class="btn btn-sm text-white delivery-button"
                                                data-category="${solution.category}"
                                                data-solution-name="${solution.name}"
                                                data-problem-name="${problem.name}"
                                                data-service-id="${device.id}"
                                                data-button-id="accepted"
                                                style="background-color:green;"
                                                title="Delivery Device">✔</button>
                                        ` : ''}

                                        ${availability === "Unavailable" ? `
                                            <button class="btn btn-sm text-white clock-button"
                                                data-date="${solution.deliveryDate}"
                                                data-solution-name="${solution.name}"
                                                data-problem-name="${problem.name}"
                                                data-service-id="${device.id}"
                                                data-button-id="clock"
                                                style="background-color:#f44336;"
                                                title="Edit delivery Date">
                                                <i class="fas fa-clock"></i>
                                            </button>
                                        ` : ''}

                                        ${availability !== "Unavailable" ? `
                                            <button class="btn btn-info btn-sm view-button-selected-device"
                                                data-category="${solution.category}"
                                                data-service-id="${device.id}"
                                                data-button-id="view"
                                                data-device-id="${solution.inventoryToServiceCenterDeviceId}">
                                                &#128065;
                                            </button>
                                        ` : ''}
                                    </div>
                                </td>
                            `;
                            tableBody.appendChild(row);
                        }
                    });
                });
            });

            currentRowMap.forEach((row, key) => {
                if (!newRowKeys.has(key)) {
                    row.remove();
                }
            });

          sortAndFormatAllTables() ;
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
                <div class="mb-3" style="margin-left: 0%; text-align: left;">
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
                                                  'Content-Type': 'application/json',
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


            // Add event listener for the availability button click
           $(document).on('click', '.view-button-delivery', function() {
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

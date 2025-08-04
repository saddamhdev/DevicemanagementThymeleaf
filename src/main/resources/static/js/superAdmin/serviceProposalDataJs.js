
function setAcceptanceOfAccessoriesProposal(rowData) {
   // console.log("Sending Row Data:", rowData);

    // Send the data to the controller using AJAX
    $.ajax({
        url: '/superAdmin/setAcceptanceOfAccessoriesProposal', // Replace with your controller's endpoint
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(rowData), // Send the data as JSON
        success: function (response) {
                                CustomAlert(response);
                                  $('#globalCustomAlertModal').on('hidden.bs.modal', function () {
                                      //location.reload();
                                  });
        },
        error: function (xhr, status, error) {

            CustomAlert("An error occurred while saving the data!");
        }
    });
}
function addTableInformationOfService(serviceId) {
    var mergedServiceData = {}; // Object to hold all data organized by service ID

      // Select each container with the attribute `data-service-id`
      $("div[data-proposal-id]").each(function() {
          var serviceId1 = $(this).attr("data-proposal-id"); // Get the current service ID
          var serviceData = {}; // Object to hold form data for this specific service

          if(serviceId1===serviceId){
           // Loop through each form within this specific service container
                  $(this).find("form").each(function() {
                      var formId = $(this).attr('id'); // Get form ID (based on `problem.name`)
                      var formData = $(this).serializeArray(); // Serialize form data for each form

                      mergedServiceData[formId] = formData; // Store form data by `formId` (problem name)
                  });
                  return false;

                 // mergedServiceData[serviceId] = serviceData; // Add to main object by `serviceId`
          }

      });
       var departmentElement = $(".departmentName"); // Target element with department data
             var departmentName = departmentElement.data("departmentname"); // e.g., "it"
             var departmentUserName = departmentElement.data("departmentuser-name"); // e.g., "saho"
             var departmentUserId = departmentElement.data("departmentuser-id"); // e.g., "sahoid"


    console.log("Final data being sent:", JSON.stringify(mergedServiceData));

    $.ajax({
        url: '/superAdmin/addProblemSolutionOfServicePrice',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            mergedServiceData: mergedServiceData,
            serviceId: serviceId,
            departmentName:departmentName,
            departmentUserName:departmentUserName,
            departmentUserId:departmentUserId
        }),
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

window.initServiceProposalGeneral = function () {
    $('#serviceProposalTable tbody tr').click(function(event) {
        var $row = $(this); // Store the clicked row element
        var button = $(event.target).closest('button');
        var buttonPressed = button.text().trim(); // Get the HTML inside the button
        var serviceId = button.data('serviceId');
        var buttonId = button.data('buttonId');
        var categoryName = $row.find('td:nth-child(3)').text();
        var category =  button.data('category'); // Get the category for this row


           if(buttonId==="viewAlternative"){

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
                                                          if (data.categoryName=== category) {
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




        }
        else if (buttonId === "accepted"){
          var htmlToAdd = `
                     <div class="mb-3" style="margin-left: 0%; text-align:center;">
                         <button type="button" class="btn btn-primary" id="saveEditBtn">Yes</button>
                         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                     </div>
                 `;

                 // Add the HTML code to the modal body using jQuery
                 $('.ModalMedium').html(htmlToAdd);
                   $('#publicModalMediumLabel').text("Do you want to save price information ?")

                   $('#saveEditBtn').click(function() {
                     addTableInformationOfService(serviceId);
                     });

               showModalMedium();
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
                                      <th scope="col" style="background-color: gray;">SN</th>
                                       <th scope="col" style="background-color: gray;display: none;">Link</th>
                                        <th scope="col" style="background-color: gray;">Links</th>
                                       <th scope="col" style="background-color: gray;">Action</th>

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

    // service requestion tracking
     $('#serviceInformationTable tbody tr').click(function(event) {
        const $row = $(this); // Store the clicked row element
       var categoryName = $row.find('td:nth-child(3)').text();
        // Target the button itself for better accuracy
        const button = $(event.target).closest('button');
        var buttonId = button.data('buttonId');
         var deviceId = button.data('deviceId');
         var  serviceId = button.data('serviceId');
        // Check if a button was clicked (prevents accidental clicks on other elements)
        if (!button.length) {
          return; // Do nothing if not a button click
        }

        const buttonText = button.text().trim(); // Get button text (trimming leading/trailing spaces)

       if(buttonId==="viewAlternative"){

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
                                                  <th scope="col" style="background-color: gray;display: none;">Device Id</th>
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







                             showModal();
                         });




            }

      });
};


 $(document).ready(function() {
       // Loop through each solution and count devices based on category
       $('.device-count').each(function() {
           var category = $(this).data('category'); // Get the category for this row

           // Use the print function to get the count of devices for the category
           printAvailable('allAddData', category, function(count) {
               // Update the span with the count of devices
               if(count==0){
               $(this).text("Unavailable");
               }else{
               $(this).text("Available("+count+")");
               }

           }.bind(this));  // Bind the `this` context to update the correct span
       });
   });
function  printAvailable(dataType, category, callback) {
    // Ensure callback is a function
    if (typeof callback !== 'function') {
        console.error('Callback is not a function');
        return;
    }

    // Perform the AJAX call
    $.ajax({
        url: '/superAdmin/allData',
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            console.log(data); // Log the entire data for debugging
            // Fetch the required data (assuming `dataType` gives the correct key)
            var allData = data[dataType];

            // Now count the devices matching the given category
            var count = 0;
            allData.forEach(function(device) {
                if (device.categoryName === category) {
                    count++; // Increment count for each matching category
                }
            });

            // Execute the callback with the count
            callback(count);
        },
        error: function(xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });
}
window.initServiceProposalTable = function () {
    const tableBody = document.getElementById("serviceProposalTableBody");
    if (!tableBody) {
        console.error("Table body not found.");
        return;
    }

    // Helper: generate row signature from <tr>
    function generateRowKeyFromRow(row) {
        return Array.from(row.cells).map(cell => cell.textContent.trim()).join('|');
    }

    // Helper: generate row signature from data
    function generateRowKeyFromData(sn, bivagName, categoryName, problemName, solution, status, presentTime) {
        const comment = solution.comment || '';
        const price = solution.price || '';
        const action = solution.action || '';
        const value = (solution.value || '').trim().replace(/\n/g, '');
        return [
            sn, bivagName, categoryName, problemName,
            solution.category, value, price, action, comment,
            solution.category, status, presentTime
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
        data: {
            page: pageNumber,
            size: localStorage.getItem("pageSize") || 0
        },
        dataType: 'json',
        success: function (data) {
            const allData = data['serviceRequests'];
            const allAddData = data['allAddData'];
            const newRowKeys = new Set();

            // Helper: availability status
            function getAvailability(categoryName) {
                let count = 0;
                allAddData.forEach(device => {
                    if (device.categoryName === categoryName && device.userName === 'inventory') count++;
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
                       // if (solution.name == null) return;
                        if (solution.name !== null ) {
                        const status = solution.cooManInfoOfPriceAcceptanceCommentStatus || "";
                        const availability = getAvailability(solution.category);

                        const rowKey = generateRowKeyFromData(sn, bivagName, categoryName, problem.name, solution, status, presentTime);
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
                                <td><input type="text" class="form-control" value="${solution.price || ''}"></td>
                                <td>
                                    <select class="form-select form-select-sm">
                                        <option value="" disabled ${solution.action == null ? 'selected' : ''}>Select</option>
                                        <option value="accept" ${solution.action == 'accept' ? 'selected' : ''}>Accept</option>
                                        <option value="reject" ${solution.action == 'reject' ? 'selected' : ''}>Reject</option>
                                    </select>
                                </td>
                                <td><input type="text" class="form-control" value="${solution.comment || ''}"></td>
                                <td>
                                    <button class="btn btn-info btn-sm">${availability}</button>
                                </td>
                                <td>${status}</td>
                                <td>${presentTime}</td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        ${status !== "Accepted" ? `
                                            <button class="btn btn-sm text-white" style="background-color:green;">✔</button>
                                        ` : ""}
                                    </div>
                                </td>
                            `;
                            tableBody.appendChild(row);
                        }
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
        $(document).off('click', '.setAcceptanceCommentBtn').on('click', '.setAcceptanceCommentBtn', function () {

              const $button = $(this);
              var button = $(event.target).closest('button');
              var serviceId = button.data('serviceId');
              const $row = $button.closest('tr');

              const bibagName = $row.find('td:nth-child(2)').text();
              const solutionCategory = $row.find('td:nth-child(3)').text();
              const solutionName = $row.find('td:nth-child(4)').text();
              const problemName = $row.find('td:nth-child(5)').text();
              const price = $row.find('td:nth-child(6) input').val();
              const action = $row.find('td:nth-child(7) select').val();
              const comment = $row.find('td:nth-child(8) input').val();



              var departmentElement = $(".departmentName");
              var departmentName = departmentElement.data("departmentname");
              var departmentUserName = departmentElement.data("departmentuser-name");
              var departmentUserId = departmentElement.data("departmentuser-id");

              const rowData = {
                  serviceId: serviceId,
                  bibagName: bibagName,
                  solutionCategory: solutionCategory,
                  solutionName: solutionName,
                  problemName: problemName,
                  price: price,
                  action: action,
                  comment: comment,
                  departmentName: departmentName,
                  departmentUserName: departmentUserName,
                  departmentUserId: departmentUserId
              };

              // Show confirmation dialog
              const confirmation = confirm(`Are you sure you want to submit hh?`);

              if (confirmation) {
                  console.log("Row Data:", rowData);
                  setAcceptanceOfAccessoriesProposal(rowData);
              } else {
                  console.log("Submission cancelled.");
              }
          });


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


        },
        error: function(xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });
};

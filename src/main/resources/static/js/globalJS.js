$(document).ready(function () {
    function applyMobileStyles() {
        if ($(window).width() <= 768) { // Mobile screen
            $("body").css("background-color", "#f5f5f5");
            $(".mainBody").css("margin-top", "30em");
            $(".container").css("font-size", "14px"); // Adjust font size
            $(".sideoffcanvus").removeClass("show"); // Hide offcanvas initially on mobile
            $(".sideoffcanvus").css("margin-top", "8em");

        } else { // Desktop screen
            $("body").css("background-color", "#fff5ec");
            $(".mainBody").css("padding-top", "5em");
            $(".container").css("font-size", "16px");
        }
    }

    applyMobileStyles(); // Apply styles on page load
    $(window).resize(applyMobileStyles); // Apply styles when resizing the window

    // Offcanvas event handling
    var offcanvas = document.querySelector('.sideoffcanvus');
    var mainBody = document.querySelector('.mainBody');
    const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvas);
// Function to hide offcanvas when mainBody is clicked
    $(mainBody).click(function () {
        if ($(window).width() <= 768) { // Check if it's a mobile view
            $(offcanvas).offcanvas('hide'); // Hide the offcanvas
        }
    });
    function adjustMainBodyMargin() {
        if ($(window).width() > 768) { // Laptop/Desktop
            $(".mainBody").css("margin-left", "0px"); // Adjust for larger screens
        } else { // Android/Mobile
            $(".mainBody").css("margin-left", "0"); // Keep default for mobile
        }
    }

    $(offcanvas).on('shown.bs.offcanvas', function () {
        adjustMainBodyMargin();
    });

    $(offcanvas).on('hidden.bs.offcanvas', function () {
        $(".mainBody").css("margin-left", "0"); // Reset for all screen sizes
    });
 // Click outside offcanvas to close it
    document.addEventListener('click', function (event) {
        const isClickInside = offcanvas.contains(event.target);
        const isToggler = event.target.closest('[data-bs-toggle="offcanvas"]');

        if (!isClickInside && !isToggler && offcanvas.classList.contains('show')) {
            bsOffcanvas.hide();
        }
    });

window.toggleList = function (item) {
           const $nested = $(item).find(".nested-list");
           const $icon = $(item).find("i.fas");

           // If this list is already open, close it
           if ($nested.is(":visible")) {
               $nested.slideUp(); // Hide submenu with animation
               $icon.removeClass("fa-chevron-up").addClass("fa-chevron-down"); // Icon down
           } else {
               // Close all others
               $(".nested-list").slideUp();
               $(".fas.fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");

               // Open current
               $nested.slideDown();
               $icon.removeClass("fa-chevron-down").addClass("fa-chevron-up"); // Icon up
           }
       };
$(window).resize(adjustMainBodyMargin);


});


function formatDateTimeToAmPm(datetimeStr) {
     const [datePart, timePart] = datetimeStr.split(" ");
     const date = new Date(`${datePart}T${timePart}`);
     let hours = date.getHours();
     const minutes = date.getMinutes();
     const seconds = date.getSeconds();
     const ampm = hours >= 12 ? 'PM' : 'AM';
     hours = hours % 12 || 12; // Convert hour '0' to '12'
     const formattedTime = [
       hours.toString().padStart(2, '0'),
       minutes.toString().padStart(2, '0')

     ].join(':');
     return `${datePart} ${formattedTime} ${ampm}`;
   }
 function sortAndFormatTable(table) {
     const tbody = table.querySelector("tbody");
     if (!tbody) return;

     const rows = Array.from(tbody.querySelectorAll("tr"));
     if (rows.length === 0) return;

     const colCount = table.querySelector("thead tr").cells.length;
     const lastColIndex = colCount - 2;

     rows.sort((a, b) => {
       const aText = a.cells[lastColIndex]?.innerText.trim() || "";
       const bText = b.cells[lastColIndex]?.innerText.trim() || "";

       const dateA = new Date(aText);
       const dateB = new Date(bText);

       return dateB - dateA; // descending
     });

     tbody.innerHTML = "";
     rows.forEach(row => {
       const raw = row.cells[lastColIndex]?.innerText;
       if(raw) {
         row.cells[lastColIndex].innerText = formatToAmPm(raw);
       }
       tbody.appendChild(row);
     });
   }
    // update direct table without js using
  function formatToAmPm(dateStr) {
    const date = new Date(dateStr.replace(" ", "T"));
    if (isNaN(date)) return dateStr;

    const yyyy = date.getFullYear();
    const MM = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    let hh = date.getHours();
    const mm = String(date.getMinutes()).padStart(2, '0');
    const ampm = hh >= 12 ? 'PM' : 'AM';
    hh = hh % 12 || 12;
    const hhStr = String(hh).padStart(2, '0');

    return `${yyyy}-${MM}-${dd} ${hhStr}:${mm} ${ampm}`;
  }

  function sortAndFormatAllTables() {
    const tables = document.querySelectorAll("table");
    tables.forEach(sortAndFormatTable);
  }

  function globallyFormatAndSortTables() {
    const tables = document.querySelectorAll("table");
    tables.forEach(table => {
      const tbody = table.querySelector("tbody");
      if (!tbody) return;

      const rows = Array.from(tbody.querySelectorAll("tr"));
      if (rows.length === 0) return;

      const timeColIndex = table.rows[0].cells.length - 2;

      const validRows = rows.filter(row => row.cells.length > timeColIndex);

      validRows.sort((a, b) => {
        const aCell = a.cells[timeColIndex];
        const bCell = b.cells[timeColIndex];
        if (!aCell || !bCell) return 0;

        const aText = aCell.textContent.trim().replace(" ", " "); // handles weird space
        const bText = bCell.textContent.trim().replace(" ", " ");

        const aDate = new Date(aText.replace(" ", "T"));
        const bDate = new Date(bText.replace(" ", "T"));

        return bDate - aDate; // Latest first
      });

      // Clear tbody and re-insert sorted + formatted rows
      tbody.innerHTML = "";
      validRows.forEach(row => {
        const cell = row.cells[timeColIndex];
        const raw = cell.textContent.trim().replace(" ", " ");
        cell.textContent = formatDateTimeToAmPm(raw);
        tbody.appendChild(row);
      });
    });
  }

  window.addEventListener("DOMContentLoaded", globallyFormatAndSortTables);

  function showModal(){
  $('#publicModal').modal('show');
  }
  function hideModal(){
       $('#publicModal').modal('hide');
       $('#publicModal').on('hidden.bs.modal', function () {
             $('.modal-backdrop').remove(); // Ensure backdrop is removed
        });
  }
function print(dataType, callback) {
      // Ensure callback is a function
      if (typeof callback !== 'function') {
          console.error('Callback is not a function');
          return;
      }

      $.ajax({
          url: '/superAdmin/allData1',
          type: 'POST',
          dataType: 'json',
           data: { dataType: dataType }, // send dataType in POST body
          success: function(data) {
             // console.log(data);
              // Execute the callback with the requested dataType
              callback(data[dataType]);
          },
          error: function(xhr, status, error) {
              console.error('Error fetching data:', error);
          }
      });
  }
function print1(dataType) {
      return new Promise(function(resolve, reject) {
          $.ajax({
              url: '/superAdmin/allData1',
              type: 'POST',
              dataType: 'json',
              data: { dataType: dataType }, // send dataType in POST body
              success: function(data) {
                //  console.log(data);
                  // Resolve the Promise with the requested dataType
                  resolve(data[dataType]);
              },
              error: function(xhr, status, error) {
                  console.error('Error fetching data:', error);
                  reject(error); // Reject the Promise if there's an error
              }
          });
      });
  }

function printRejectCause(element) {
        var rejectCause = element.getAttribute("data-reject-cause");

 var htmlToAdd = `
        <div class="mb-3" style="margin-left: 0%; text-align: left;">
           <h1>${rejectCause}
           </h1>
        </div>
           <div class="mb-3" style="margin-right: 0%; text-align: right;">
               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
           </div>
       `;

       // Add the HTML code to the modal body using jQuery
        $('.modal-body').html(htmlToAdd);
       // edit individual column header
        $('#publicModalLabel').text("Rejected Cause:");

         $('#DeniedBtn').click(function() {

                 setRequestStatus(requestId,"Denied");
          });

        showModal();
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
function columnValue1(deviceId, columnName, callback) {
            print('allAddData', function(allAddData) {
                const deviceData = allAddData.find(item => item.id === deviceId);

                if (deviceData) {
                    const columnData = deviceData.allData;

                    if (columnData && columnData.hasOwnProperty(columnName)) {
                        callback(columnData[columnName]);
                    } else {
                        console.warn(`Column "${columnName}" not found in device data.`);
                        callback(undefined);
                    }
                } else {
                    console.warn(`No data found for Device ID ${deviceId}`);
                    callback(undefined);
                }
            });
        }
function formatDate(inputDate) {
                                     // Split the input date into components
                                     var parts = inputDate.split('-'); // parts[0] = '2024', parts[1] = '08', parts[2] = '20'

                                     // Reformat the date to 'DD/MM/YY'
                                     var formattedDate = parts[2] + '/' + parts[1] + '/' + parts[0].slice(2); // '20/08/24'

                                     return formattedDate;
                                 }
function formatDateTime(inputDateTime) {
                            // Check if inputDateTime is undefined or null
                            if (!inputDateTime) {
                                console.error("inputDateTime is undefined or null");
                                return ""; // or return a default value
                            }

                            // Split the input datetime into date and time components
                            var dateTimeParts = inputDateTime.split(' '); // ['2024-08-20', '15:02:26']

                            // Check if the split was successful
                            if (dateTimeParts.length !== 2) {
                                console.error("inputDateTime format is incorrect, expected 'YYYY-MM-DD HH:MM:SS'");
                                return ""; // or handle the error as needed
                            }

                            // Extract the date part
                            var datePart = dateTimeParts[0]; // '2024-08-20'

                            // Split the date into components
                            var dateComponents = datePart.split('-'); // ['2024', '08', '20']

                            // Check if the date split was successful
                            if (dateComponents.length !== 3) {
                                console.error("Date part of inputDateTime is incorrect, expected 'YYYY-MM-DD'");
                                return ""; // or handle the error as needed
                            }

                            // Reformat the date to 'DD/MM/YY'
                            var formattedDate = dateComponents[2] + '/' + dateComponents[1] + '/' + dateComponents[0].slice(2); // '20/08/24'

                            return formattedDate;
                        }

function formatTime(inputDateTime) {
                            // Split the input datetime to separate date and time
                            var dateTimeParts = inputDateTime.split(' '); // ['2024-08-20', '15:02:26']

                            // Extract the time part
                            var timePart = dateTimeParts[1]; // '15:02:26'

                            // Split the time into components
                            var timeComponents = timePart.split(':'); // ['15', '02', '26']

                            // Convert hour from 24-hour format to 12-hour format
                            var hour = parseInt(timeComponents[0], 10); // Convert '15' to 15
                            var minutes = timeComponents[1]; // '02'
                            var period = 'AM';

                            // Determine AM or PM period and adjust hour accordingly
                            if (hour >= 12) {
                                period = 'PM';
                                if (hour > 12) {
                                    hour -= 12; // Convert 13-23 hours to 1-11 PM
                                }
                            } else if (hour === 0) {
                                hour = 12; // Midnight case, show as 12 AM
                            }

                            // Format time string as 'H:MM AM/PM'
                            var formattedTime = hour + ':' + minutes + ' ' + period;

                            return formattedTime;
                        }

window.initGlobalDivToggle = function () {
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
};

function showDeviceUserHistory(deviceId,categoryName){
//alert(deviceId)
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
                                               <th scope="col" style="background-color: gray;color:white">Division</th>
                                             <th scope="col" style="background-color: gray;color:white">userName</th>
                                              <th scope="col" style="background-color: gray;color:white">userId</th>
                                               <th scope="col" style="background-color: gray;color:white">Start Date</th>
                                                <th scope="col" style="background-color: gray;color:white">End Date</th>
                                                 <th scope="col" style="background-color: gray;color:white">Using Status</th>

                                         </tr>
                                     </thead>
                                     <tbody id="listDeviceInformationBody">

                                     </tbody>
                                 </table>
                             </div>

                         `;
                         $('.modal-body').html(htmlToAdd);

                         $('#publicModalLabel').text("Device user History ");



                          var rowsHtml = '';
                                         // Corrected the for loop syntax to iterate over the deviceIds array
                                            // alert(result.inventory.deviceIds[i]);
                                             print('allAddData', function(allAddData) {
                                                 if (allAddData) {
                                                     // First, fetch individual columns
                                                     print('individualColumns', function(individualColumns) {

                                                         allAddData.forEach(function(data) {
                                                          if (data.id=== deviceId) {

                                                          data.deviceUsers.slice().reverse().forEach(function(user, index) {
                                                            rowsHtml += `<tr>
                                                              <td>${index + 1}</td>
                                                              <td>${user.departmentName}</td>
                                                              <td>${user.userName}</td>
                                                              <td>${user.userId}</td>
                                                              <td>${user.startingDate == null ? user.endingDate : user.startingDate}</td>
                                                              <td>${user.endingDate == null ? 'Active' : user.endingDate}</td>
                                                              <td>${user.status == 1 ? 'Yes' : 'No'}</td>
                                                            </tr>`;
                                                          });



                                                              }
                                                         });

                                                         $('#listDeviceInformationBody').html(rowsHtml);
                                                     });
                                                 }
                                             });







                         showModal();
                     });



}
function CustomAlert(message, title = "Notice") {
    const existingModal = document.getElementById("globalCustomAlertModal");
    if (existingModal) existingModal.remove();

    const modalHTML = `
        <div class="modal fade" id="globalCustomAlertModal" tabindex="-1" aria-labelledby="globalCustomAlertLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="globalCustomAlertLabel">${title}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">${message}</div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
              </div>
            </div>
          </div>
        </div>
    `;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = modalHTML;
    document.body.appendChild(wrapper.firstElementChild);

    const modalElement = document.getElementById('globalCustomAlertModal');
    const modalInstance = new bootstrap.Modal(modalElement);
    modalInstance.show();
// Auto hide modal after 40 seconds (40000 milliseconds)
    setTimeout(() => {
        modalInstance.hide();
    }, 2000);
    modalElement.addEventListener('hidden.bs.modal', () => {
        modalElement.remove();
    }, { once: true });
}


window.trackDeviceRequestData = function (row, clickedElement) {
    // Collect row data
    const cells = Array.from(row.getElementsByTagName('td')).map(cell => cell.innerText.trim());
    const sn = cells[0];
     const categoryName = cells[2];
     const biVagName = cells[1];

    if (!clickedElement.classList.contains('view-device-status')) {
        console.log("⛔ Not clicked on .view-device-status");
        return;
    }

    const requestId = clickedElement.getAttribute('data-request-id');
    print('requestData', function(requestData) {
        // Create modal if it doesn't exist
        if (!document.getElementById('dynamicTrackModal')) {
            const modalHTML = `
                <div class="modal fade" id="dynamicTrackModal" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Device Request Information</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body"></div>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }

        // Prepare modal elements
        const modalBody = document.querySelector('#dynamicTrackModal .modal-body');
        const modalElement = document.getElementById('dynamicTrackModal');

        if (!modalBody || !modalElement) {
            console.error('Modal body or element not found');
            return;
        }

        // Handle no data case
        if (!requestData) {
            console.error('requestData is undefined or empty');
            modalBody.innerHTML = '<p class="text-center">No data found</p>';
            const modalInstance = new bootstrap.Modal(modalElement);
            modalInstance.show();
            return;
        }

        const result = requestData.find(data => data.id === requestId);
        if (!result || !result.inventory) {
            console.error('No valid result or inventory found for requestId:', requestId);
            modalBody.innerHTML = '<p class="text-center">No data found</p>';
            const modalInstance = new bootstrap.Modal(modalElement);
            modalInstance.show();
            return;
        }

        const { inventory } = result;
        const isProposalOrDirect = inventory.inventoryStatus === "Alternative Proposal Accepted" || inventory.inventoryStatus === "Pending" || inventory.inventoryStatus === "Alternative Proposal";
        const isPurchased = inventory.inventoryStatus === "Purchased";
         if(!isPurchased){
             if (!isProposalOrDirect ) {
                     console.log('Invalid inventory status:', inventory.inventoryStatus);
                     modalBody.innerHTML = '<p class="text-center">No data found</p>';
                     const modalInstance = new bootstrap.Modal(modalElement);
                     modalInstance.show();
                     return;
                 }
         }


        // Helper function to create a separator row
        const separatorRow = `
            <div class="row">
                <div class="col-sm-4" style="height:40px; border-right:1px solid gray"></div>
                <div class="col-sm-8" style="height:40px;"></div>
            </div>
        `;

        // Helper function to create a timeline entry
       const createTimelineEntry = ({ dateTime, entity, action, entityName = '', includeSeparator = true }) => `
           ${includeSeparator ? separatorRow : ''}
           <div class="row bordered-row">
               <div class="col-sm-3">
                   <div class="text-center">
                       ${dateTime ? `<p>${formatDateTime(dateTime)}</p><p>${formatTime(dateTime)}</p>` : ''}
                   </div>
               </div>
               <div class="col-sm-2">
                   <div class="text-center">
                       <img src="/img/manLogo.png" class="profileActivity" alt="Uploaded Image">
                   </div>
               </div>
               <div class="col-sm-7">
                   <div class="text-3d" style="width:100%">
                       <span>${entity}${entityName ? `: ${entityName}` : ''}:</span>
                       <span>${action}</span>
                   </div>
               </div>
           </div>
       `;


        // Generate header with sn, categoryName, biVagName
        let htmlToAdd = `
           <div class="text-center mb-3 p-3 border rounded bg-light shadow-sm">
            <h6 class="fw-semibold text-info">🏢 Department: <span class="text-dark">${biVagName}</span></h6>
             <h6 class="fw-semibold text-primary mb-2">📌 Serial Number: <span class="text-dark">${sn}</span></h6>
             <h6 class="fw-semibold text-success mb-2">📁 Category: <span class="text-dark">${ categoryName}</span></h6>

           </div>

        `;

        // Generate HTML for initial entry without separator
        htmlToAdd += createTimelineEntry({
            dateTime: result.presentTime,
            entity: 'Dept',
            action: 'Requested',
            entityName: result.departmentName,
            includeSeparator: false
        });

        // Common entries
        if (result.cooAcceptedTime) {
            htmlToAdd += createTimelineEntry({
                dateTime: result.cooAcceptedTime,
                entity: 'COO',
                action: `${result.requestMode} Dept Request`
            });
        }

        if (inventory.requestTime) { // mone hoy dorkar nai
            htmlToAdd += createTimelineEntry({
                dateTime: inventory.requestTime,
                entity: 'Inventory',
                action: isPurchased ? 'Send Purchase Request' : 'Send Alternative List Request'
            });
        }

        // Proposal Accepted or Direct Delivery specific entries
        if (isProposalOrDirect) {
        // my
                 if (result.inventory?.inventoryToAlternativeDeviceRequestTime) {
                        htmlToAdd += createTimelineEntry({
                            dateTime: result.inventory?.inventoryToAlternativeDeviceRequestTime,
                            entity: 'Inventory',
                            action: `Alternative Device Request To COO`
                        });
                    }
                    else{
                          htmlToAdd += createTimelineEntry({
                                dateTime: null,
                                entity: 'Inventory',
                                action: `Pending`
                            });
                    }
                    if (result.inventory?.inventoryToAlternativeDeviceRequestAcceptingTime) {
                        htmlToAdd += createTimelineEntry({
                            dateTime: result.inventory?.inventoryToAlternativeDeviceRequestAcceptingTime,
                            entity: 'COO',
                            action: `${result.inventory?.inventoryToAlternativeDeviceRequestAcceptingAns} Inventory Alternative Device Request `
                        });
                    }
                    else{
                          htmlToAdd += createTimelineEntry({
                                dateTime: null,
                                entity: 'COO',
                                action: `Pending`
                            });
                    }
                    if (result.inventory?.inventoryToCustomerCareDeviceSendingTime) {
                            htmlToAdd += createTimelineEntry({
                                dateTime: result.inventory?.inventoryToCustomerCareDeviceSendingTime,
                                entity: 'Inventory',
                                action: `Inventory To CustomerCare Sending Device `
                            });
                        }
                        else{
                              htmlToAdd += createTimelineEntry({
                                    dateTime: null,
                                    entity: 'Inventory',
                                    action: `Pending`
                                });
                        }
                        // CustomerCare received Device
                     if (result.inventory?.inventoryToCustomerCareDeviceReceivingTime) {
                        htmlToAdd += createTimelineEntry({
                            dateTime: result.inventory?.inventoryToCustomerCareDeviceReceivingTime,
                            entity: 'CustomerCare',
                            action: ` CustomerCare received Device `
                        });
                    }
                    else{
                          htmlToAdd += createTimelineEntry({
                                dateTime: null,
                                entity: 'CustomerCare',
                                action: `Pending`
                            });
                    }
                    //CustomerCare To Dept Sending Device
                     if (result.customerCare?.customerCareToDepartmentDeviceSendingTime) {
                        htmlToAdd += createTimelineEntry({
                            dateTime: result.customerCare?.customerCareToDepartmentDeviceSendingTime,
                            entity: 'CustomerCare',
                            action: ` CustomerCare To Dept Sending Device `
                        });
                    }
                    else{
                          htmlToAdd += createTimelineEntry({
                                dateTime: null,
                                entity: 'CustomerCare',
                                action: `Pending`
                            });
                    }
                   if (result.customerCare?.departmentDeviceReceiverTime) {
                        htmlToAdd += createTimelineEntry({
                            dateTime: result.customerCare?.departmentDeviceReceiverTime,
                            entity: 'Dept',
                            action: ` Receive Device `
                        });
                    }
                    else{
                          htmlToAdd += createTimelineEntry({
                                dateTime: null,
                                entity: 'Dept',
                                action: `Pending`
                            });
                    }
        //

        }

        // Purchased specific entries
        if (isPurchased) {
            if (result.inventory?.inventoryToPurchaseRequestTime) {
                htmlToAdd += createTimelineEntry({
                    dateTime: result.inventory.inventoryToPurchaseRequestTime,
                    entity: 'Inventory',
                    action: 'Inventory To Purchase Send Purchase Request'
                });
            }
            else{
                  htmlToAdd += createTimelineEntry({
                        dateTime: null,
                        entity: 'Inventory',
                        action: `Pending`
                    });
            }
            if (result.purchase?.requestTime) {
                htmlToAdd += createTimelineEntry({
                    dateTime: result.purchase.requestTime,
                    entity: 'Purchase',
                    action: ` Purchase To COO Purchase Proposal Send `
                });
            }
           else{

                  htmlToAdd += createTimelineEntry({
                        dateTime: null,
                        entity: 'Purchase',
                        action: `Pending`
                    });
            }
            if (result.purchase?.cooAcceptedTime) {
                htmlToAdd += createTimelineEntry({
                    dateTime: result.purchase.cooAcceptedTime,
                    entity: 'COO',
                    action: 'Accepted Proposal'
                });
            }
           else{

                  htmlToAdd += createTimelineEntry({
                        dateTime: null,
                        entity: 'COO',
                        action: `Pending`
                    });
            }
         if (result.purchase?.purchaseDeviceSenderToInventoryTime) {
                        htmlToAdd += createTimelineEntry({
                            dateTime: result.purchase.purchaseDeviceSenderToInventoryTime,
                            entity: 'Purchase',
                            action: 'Purchase To Inventory Send device'
                        });
                    }
           else{

                  htmlToAdd += createTimelineEntry({
                        dateTime: null,
                        entity: 'Purchase',
                        action: `Pending`
                    });
            }
            // inventory received device
             if (result.purchase?.purchaseDeviceReceiverToInventoryTime) {
                        htmlToAdd += createTimelineEntry({
                            dateTime: result.purchase?.purchaseDeviceReceiverToInventoryTime,
                            entity: 'Inventory',
                            action: 'Inventory Received Device'
                        });
                    }
            else{
                  htmlToAdd += createTimelineEntry({
                        dateTime: null,
                        entity: 'Inventory',
                        action: `Pending`
                    });
            }
         if (result.inventory?.inventoryToCustomerCareDeviceSendingTime) {
                        htmlToAdd += createTimelineEntry({
                            dateTime: result.inventory.inventoryToCustomerCareDeviceSendingTime,
                            entity: 'Inventory',
                            action: 'Inventory To CustomerCare Send Device'
                        });
                    }
            else{
                  htmlToAdd += createTimelineEntry({
                        dateTime: null,
                        entity: 'Inventory',
                        action: `Pending`
                    });
            }
             // CustomerCare received Device
             if (result.inventory?.inventoryToCustomerCareDeviceReceivingTime) {
                htmlToAdd += createTimelineEntry({
                    dateTime: result.inventory?.inventoryToCustomerCareDeviceReceivingTime,
                    entity: 'CustomerCare',
                    action: ` CustomerCare received Device `
                });
            }
            else{
                  htmlToAdd += createTimelineEntry({
                        dateTime: null,
                        entity: 'CustomerCare',
                        action: `Pending`
                    });
            }
             if (result.customerCare?.customerCareToDepartmentDeviceSendingTime) {
                htmlToAdd += createTimelineEntry({
                    dateTime: result.customerCare?.customerCareToDepartmentDeviceSendingTime,
                    entity: 'CustomerCare',
                    action: ` CustomerCare To Dept Sending Device `
                });
            }
            else{
                  htmlToAdd += createTimelineEntry({
                        dateTime: null,
                        entity: 'CustomerCare',
                        action: `Pending`
                    });
            }
           if (result.customerCare?.departmentDeviceReceiverTime) {
                htmlToAdd += createTimelineEntry({
                    dateTime: result.customerCare?.departmentDeviceReceiverTime,
                    entity: 'Dept',
                    action: ` Receive Device `
                });
            }
            else{
                  htmlToAdd += createTimelineEntry({
                        dateTime: null,
                        entity: 'Dept',
                        action: `Pending`
                    });
            }



        }

        // Inject content into .modal-body
        modalBody.innerHTML = htmlToAdd;

        // Show modal using Bootstrap
        const modalInstance = new bootstrap.Modal(modalElement);
        modalInstance.show();
    });
};
window.trackServiceRequestData = function (row, clickedElement) {
    // Collect row data
    const cells = Array.from(row.getElementsByTagName('td')).map(cell => cell.innerText.trim());
    const sn = cells[0];
    const biVagName = cells[1];
    const categoryName = cells[2];

    if (!clickedElement.classList.contains('view-device-status')) {
        console.log("⛔ Not clicked on .view-device-status");
        return;
    }

    const requestId = clickedElement.getAttribute('data-request-id');

    print('serviceRequests', function(requestData) {

        // Create modal if it doesn't exist
        if (!document.getElementById('dynamicTrackModal')) {
            const modalHTML = `
                <div class="modal fade" id="dynamicTrackModal" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Service Request Information</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body"></div>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }

        // Prepare modal elements
        const modalBody = document.querySelector('#dynamicTrackModal .modal-body');
        const modalElement = document.getElementById('dynamicTrackModal');

        if (!modalBody || !modalElement) {
            console.error('Modal body or element not found');
            return;
        }

        // Handle no data case
        if (!requestData) {
            console.error('requestData is undefined or empty');
            modalBody.innerHTML = '<p class="text-center">No data found</p>';
            const modalInstance = new bootstrap.Modal(modalElement);
            modalInstance.show();
            return;
        }

        const result = requestData.find(data => data.id === requestId);
        if (!result) {
            console.error('No valid result :', requestId);
            modalBody.innerHTML = '<p class="text-center">No data found</p>';
            const modalInstance = new bootstrap.Modal(modalElement);
            modalInstance.show();
            return;
        }

        const { inventory } = result;
        const isProposalOrDirect = result.serviceAccessoriesSolutionProvidingTime===null;

       // const isPurchased = inventory.inventoryStatus === "Purchased";


        // Helper function to create a separator row
        const separatorRow = `
            <div class="row">
                <div class="col-sm-4" style="height:40px; border-right:1px solid gray"></div>
                <div class="col-sm-8" style="height:40px;"></div>
            </div>
        `;

        // Helper function to create a timeline entry
       const createTimelineEntry = ({ dateTime, entity, action, entityName = '', includeSeparator = true }) => `
           ${includeSeparator ? separatorRow : ''}
           <div class="row bordered-row">
               <div class="col-sm-3">
                   <div class="text-center">
                       ${dateTime ? `<p>${formatDateTime(dateTime)}</p><p>${formatTime(dateTime)}</p>` : ''}
                   </div>
               </div>
               <div class="col-sm-2">
                   <div class="text-center">
                       <img src="/img/manLogo.png" class="profileActivity" alt="Uploaded Image">
                   </div>
               </div>
               <div class="col-sm-7">
                   <div class="text-3d" style="width:100%">
                       <span>${entity}${entityName ? `: ${entityName}` : ''}:</span>
                       <span>${action}</span>
                   </div>
               </div>
           </div>
       `;


        // Generate header with sn, categoryName, biVagName
        let htmlToAdd = `
           <div class="text-center mb-3 p-3 border rounded bg-light shadow-sm">
             <h6 class="fw-semibold text-info">🏢 Department: <span class="text-dark">${biVagName}</span></h6>
             <h6 class="fw-semibold text-primary mb-2">📌 Serial Number: <span class="text-dark">${sn}</span></h6>
             <h6 class="fw-semibold text-success mb-2">📁 Category: <span class="text-dark">${categoryName}</span></h6>
           </div>

        `;

        // Generate HTML for initial entry without separator
        htmlToAdd += createTimelineEntry({
            dateTime: result.presentTime,
            entity: 'Dept',
            action: 'Requested',
            entityName: result.departmentName,
            includeSeparator: false
        });

        // CustomerCare receive device
                if (result.customerCareServiceRequestAcceptedTime) {
                    htmlToAdd += createTimelineEntry({
                        dateTime: result.customerCareServiceRequestAcceptedTime,
                        entity: 'CustomerCare',
                        action: `CustomerCare Receive Device `
                    });
                }
                else{
                   htmlToAdd += createTimelineEntry({
                         dateTime: null,
                         entity: 'CustomerCare',
                         action: `Pending`
                     });
                }

        // CustomerCare send Device to service
        if (result.customerCareSendDeviceToServiceTime) {
            htmlToAdd += createTimelineEntry({
                dateTime: result.customerCareSendDeviceToServiceTime,
                entity: 'CustomerCare',
                action: `CustomerCare To ServiceCenter Send Device `
            });
        }
        else{
           htmlToAdd += createTimelineEntry({
                 dateTime: null,
                 entity: 'CustomerCare',
                 action: `Pending`
             });
        }

         // serviceCenter received device
            if (result.serviceCenterServiceRequestAcceptedTime) {
                htmlToAdd += createTimelineEntry({
                    dateTime: result.serviceCenterServiceRequestAcceptedTime,
                    entity: 'ServiceCenter',
                    action: ` ServiceCenter Received Device `
                });
            }
            else{
               htmlToAdd += createTimelineEntry({
                     dateTime: null,
                     entity: 'ServiceCenter',
                     action: `Pending`
                 });
            }

         if( isProposalOrDirect){
              console.log("Thaprathapri");
            if (result.serviceCenterToCustomerCareTime) {
                    htmlToAdd += createTimelineEntry({
                        dateTime: result.serviceCenterToCustomerCareTime,
                        entity: 'ServiceCenter',
                        action: `ServiceCenter To CustomerCare send device(Servicing)`
                    });
                 }
            else{
                   htmlToAdd += createTimelineEntry({
                         dateTime: null,
                         entity: 'ServiceCenter',
                         action: `Pending`
                     });
             }

               if (result.customerCareToDepartmentTime) {
                 htmlToAdd += createTimelineEntry({
                     dateTime: result.customerCareToDepartmentTime,
                     entity: 'CustomerCare',
                     action: `CustomerCare To Dept send device(Servicing)`
                  });
                }
            else{
                   htmlToAdd += createTimelineEntry({
                         dateTime: null,
                         entity: 'CustomerCare',
                         action: `Pending`
                     });
             }
              if (result.departmentReceiveDeviceFromCustomerCareTime) {
                 htmlToAdd += createTimelineEntry({
                     dateTime: result.departmentReceiveDeviceFromCustomerCareTime,
                     entity: 'Dept',
                     action: `Received Servicing device`
                  });
                }
                else{
                      htmlToAdd += createTimelineEntry({
                            dateTime: null,
                            entity: 'Dept',
                            action: `Pending`
                        });
                  }
           }
           else{
           console.log("proposal");
           if (result.serviceAccessoriesSolutionProvidingTime) {
               htmlToAdd += createTimelineEntry({
                   dateTime: result.serviceAccessoriesSolutionProvidingTime,
                   entity: 'ServiceCenter',
                   action: `ServiceCenter To COO send Accessories proposal `
               });
           }
           else{
             htmlToAdd += createTimelineEntry({
                   dateTime: null,
                   entity: 'ServiceCenter',
                   action: `Pending`
               });
            }
            if (result.serviceAccessoriesSolutionAcceptingByCOOTime) {
               htmlToAdd += createTimelineEntry({
                   dateTime: result.serviceAccessoriesSolutionAcceptingByCOOTime,
                   entity: 'COO',
                   action: `Accepted Service Accessories Proposal Of ServiceCenter `
               });
            }
            else{
                  htmlToAdd += createTimelineEntry({
                        dateTime: null,
                        entity: 'COO',
                        action: `Pending`
                    });
            }
           if (result.serviceCenterToInventorySendDeviceRequestTime) {
               htmlToAdd += createTimelineEntry({
                   dateTime: result.serviceCenterToInventorySendDeviceRequestTime,
                   entity: 'ServiceCenter',
                   action: `ServiceCenter To Inventory send device(Accessories) request`
               });
            }
           else{
                  htmlToAdd += createTimelineEntry({
                        dateTime: null,
                        entity: 'ServiceCenter',
                        action: `Pending`
                    });
            }
          if (result.inventoryToServiceCenterSendAccessoriesDeviceTime) {
               htmlToAdd += createTimelineEntry({
                   dateTime: result.inventoryToServiceCenterSendAccessoriesDeviceTime,
                   entity: 'Inventory',
                   action: `Inventory To ServiceCenter send device(Accessories)`
               });
            }
          else{
                  htmlToAdd += createTimelineEntry({
                        dateTime: null,
                        entity: 'Inventory',
                        action: `Pending`
                    });
            }
            if (result.serviceCenterToCustomerCareTime) {
                   htmlToAdd += createTimelineEntry({
                       dateTime: result.serviceCenterToCustomerCareTime,
                       entity: 'ServiceCenter',
                       action: `ServiceCenter To CustomerCare send device(Servicing)`
                   });
                }
           else{
                  htmlToAdd += createTimelineEntry({
                        dateTime: null,
                        entity: 'ServiceCenter',
                        action: `Pending`
                    });
            }
              if (result.customerCareToDepartmentTime) {
                htmlToAdd += createTimelineEntry({
                    dateTime: result.customerCareToDepartmentTime,
                    entity: 'CustomerCare',
                    action: `CustomerCare To Dept send device(Servicing)`
                 });
               }
           else{
                  htmlToAdd += createTimelineEntry({
                        dateTime: null,
                        entity: 'CustomerCare',
                        action: `Pending`
                    });
            }
             if (result.departmentReceiveDeviceFromCustomerCareTime) {
                htmlToAdd += createTimelineEntry({
                    dateTime: result.departmentReceiveDeviceFromCustomerCareTime,
                    entity: 'Dept',
                    action: `Received Servicing device`
                 });
               }
               else{
                     htmlToAdd += createTimelineEntry({
                           dateTime: null,
                           entity: 'Dept',
                           action: `Pending`
                       });
                 }

           }



        // Inject content into .modal-body
        modalBody.innerHTML = htmlToAdd;

        // Show modal using Bootstrap
        const modalInstance = new bootstrap.Modal(modalElement);
        modalInstance.show();
    });
};

// chat bot
function openChatModal() {
    document.querySelector('.chat-modal').style.display = 'block';
}

function closeChatModal() {
    document.querySelector('.chat-modal').style.display = 'none';
}

function sendReply(msg) {
    const chatBody = document.querySelector('.chat-body');
    const collectionName = "deviceManagement";

    // Show user message
    const userMsg = document.createElement('div');
    userMsg.className = 'message user';
    userMsg.innerText = msg;
    chatBody.appendChild(userMsg);
    chatBody.scrollTop = chatBody.scrollHeight;

    // Send to backend with message + collectionName
    fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            message: msg,
            collectionName: collectionName
        })
    })
    .then(response => response.json())
    .then(data => {
        const botMsg = document.createElement('div');
        botMsg.className = 'message bot';

        // 🔗 Replace URLs with anchor tags
        const safeText = escapeHTML(data.reply); // Prevent XSS
        const replyWithLinks = safeText.replace(
            /(https?:\/\/[^\s]+)/g,
            '<a href="$1" target="_blank">$1</a>'
        );

        botMsg.innerHTML = replyWithLinks;
        chatBody.appendChild(botMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
        console.log(data);
    })
    .catch(error => {
        const botMsg = document.createElement('div');
        botMsg.className = 'message bot';
        botMsg.innerText = "Sorry, something went wrong.";
        chatBody.appendChild(botMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
        console.error(error);
    });
}


function escapeHTML(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
}

function sendCustomMessage() {
    const input = document.querySelector('.customMessage');
    const message = input.value.trim();
    if (message === "") return;

    sendReply(message);
    input.value = "";
}

function handleKey(event) {
    if (event.key === "Enter") {
        sendCustomMessage();
    }
}


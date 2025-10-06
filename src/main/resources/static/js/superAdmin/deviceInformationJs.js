
function saveTableInformationOfDeviceSuperAdmin(categoryName) {
// Replace hyphens with spaces in input field names before submission
    $("input").each(function() {
        let originalName = $(this).attr("name");
        if (originalName) {
            let updatedName = originalName.replace(/-/g, ' '); // Replace all '-' with space
            $(this).attr("name", updatedName);
        }
    });
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
     formData += '&startingDate=' + encodeURIComponent(startingDate);
     formData += '&userName=' + encodeURIComponent(departmentUserName);
     formData += '&userId=' + encodeURIComponent(departmentUserId);
     formData += '&deviceType=' + encodeURIComponent(deviceType);

     // Debugging: Print the collected data

     // AJAX call to save data
     $.ajax({
         url: '/inventory/addDeviceInformation', // URL to your endpoint for saving data
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
function editTableInformationOfDevice(deviceId,categoryName){
// Replace hyphens with spaces in input field names before submission
 $("input").each(function() {
        let originalName = $(this).attr("name");
        if (originalName) {
            let updatedName = originalName.replace(/-/g, ' '); // Replace all '-' with space
            $(this).attr("name", updatedName);
        }
    });
         var formData=$("#dynamicFormEditDevice").serialize();
          var departmentElement = $(".departmentName"); // Target element with department data
         var departmentName = departmentElement.data("departmentname"); // e.g., "it"
         var departmentUserName = departmentElement.data("departmentuser-name"); // e.g., "saho"
         var departmentUserId = departmentElement.data("departmentuser-id"); // e.g., "sahoid"
             // Append the deviceId and category name to the form data
             formData += '&deviceId=' + encodeURIComponent(deviceId);
             formData += '&categoryName=' + encodeURIComponent(categoryName);
             formData += '&departmentName=' + encodeURIComponent(departmentName);
             formData += '&userName=' + encodeURIComponent(departmentUserName);
             formData += '&userId=' + encodeURIComponent(departmentUserId);

             $.ajax({
                 url: '/departmentUser/editDeviceInformation', // URL to your endpoint for saving data
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
function addDeviceInformation(){

  var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
  var departmentName = departmentElement.data("departmentuser-name");

 var htmlToAdd = `
                <div class="mb-3" style="margin-left: 0%; text-align: left;">
                    <div class="dropdown">
                        <label for="deviceInputFieldAdd" class="form-label">Category Name</label>
                        <input type="text" class="form-control dropdown-toggle custom-width" id="deviceInputFieldAdd" data-bs-toggle="dropdown" placeholder="Category" aria-expanded="false">
                        <ul class="dropdown-menu custom-dropdown-menu" aria-labelledby="dropdownTextFieldPopupBox" id="deviceInputAddUlList">
                           <div id="listItemAddDevice"></div>
                        </ul>
                    </div>
                </div>
                <div class="mb-3" style="margin-left: 0%; text-align: left;">
                   <label for="calendar"  class="form-label  custom-width">Using starting Date </label>
                   <input type="datetime-local" id="calendar" name="calendar" class="form-control" style="width: 100%;"  th:data-user-id=" ">
               </div>

               <div class="mb-3" style="margin-left: 0%; text-align: left;">
                   <label for="deviceType" class="form-label">Device Type</label>
                   <select id="deviceType" class="form-control">
                       <option value="Primary">Primary</option>
                       <option value="Secondary">Secondary</option>
                   </select>
               </div>


               <form   id="dynamicFormAddDevice">
             <div id="universalDiv" style="display:none">

              </div>
              <div id="deviceDiv">

              </div>

               </form>
                <div class="mb-3" style="margin-left: 0%; text-align: left;">
                    <button type="button" class="btn btn-primary" id="saveEditBtn">Save</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>

            `;

            // Add the HTML code to the modal body using jQuery
            $('.ModalMedium').empty().html(htmlToAdd);
            $('#publicModalMediumLabel').text("Add Old Device Information")

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
             print('universalColumns', function(universalColumns) {
               if (universalColumns) {
                   // Generate HTML for categories
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
                              case 'customDropDownList':
                                   var text=null;
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


                                             let columnClass = column.columnName.replace(/\s+/g, '-');

                                             if (dropDownData && dropDownData.allData) {
                                                 var categoriesHtml11 = `
                                                     <div class="mb-3">
                                                         <label>${column.columnName}</label>
                                                         <div class="dropdown">
                                                             <input type="text" class="form-control dropdown-toggle ${columnClass}-input"
                                                                    data-bs-toggle="dropdown" placeholder="Select DropDownList Value"
                                                                    aria-expanded="false" data-problem-id="${columnClass}" name="${columnClass}">
                                                             <ul class="dropdown-menu ${columnClass}-ul">`;

                                                 dropDownData.allData.forEach(function(option) {
                                                     categoriesHtml11 += `<li class="dropdown-item ${columnClass}-customDropDownClick">${option}</li>`;
                                                 });

                                                 categoriesHtml11 += `</ul></div></div>`;



                                                 if ($('#deviceDiv').length > 0) {
                                                     $('#deviceDiv').append(categoriesHtml11);
                                                 } else {
                                                     console.error("#deviceDiv not found in the DOM.");
                                                 }

                                                 const formSelector = `#dynamicFormAddDevice`;
                                                 $(formSelector).off('click', `.${columnClass}-customDropDownClick`); // Prevent duplicate events
                                                 $(formSelector).on('click', `.${columnClass}-customDropDownClick`, function() {
                                                     const selectedValue = $(this).text();

                                                     $(this).closest('.dropdown').find(`.${columnClass}-input`).val(selectedValue);
                                                 });
                                             } else {
                                                 console.log("Sorry, Not Found");
                                             }
                                         } else {
                                             console.error("dropDownLists data is null or undefined");
                                         }
                                     })
                                     .catch(function(error) {
                                         console.error("An error occurred: ", error);
                                     });
                                  break;

                             default:
                                 categoriesHtml += `<div class="mb-3"><label>${column.columnName} (${column.dataType})</label></div>`;
                                 break;
                        }


                   });

                  if (categoriesHtml && !categoriesHtml.includes('customDropDownList')) {
                      // Only update if there's no custom dropdown list pending

                      $('#universalDiv').html(categoriesHtml);
                  }
               }
           });

            // selection and input handler.
            selectionAndInputDeviceInfo992();
           // selectionAndInputUserInfo();


             $('#saveEditBtn').click(function() {
                 var categoryName=$('#deviceInputFieldAdd').val();
                  saveTableInformationOfDeviceSuperAdmin(categoryName);
                });

          showModalMedium();

}
 window.initDeviceInformationGeneral = function () {
  $('#deviceInformationTable tbody tr').click(function(event) {
    const $row = $(this); // Store the clicked row element
   var categoryName = $row.find('td:nth-child(2)').text();
     var text=categoryName;
    // Target the button itself for better accuracy
    const button = $(event.target).closest('button');
 var deviceId = button.data('deviceId');
    // Check if a button was clicked (prevents accidental clicks on other elements)
    if (!button.length) {
      return; // Do nothing if not a button click
    }

    const buttonText = button.text().trim(); // Get button text (trimming leading/trailing spaces)

    if (button.hasClass("Edit")) {
          // Handle edit button click (add your logic here)
         // console.log("Edit button clicked!");
          const deviceId = button.data('deviceId'); // Get device ID from data-device-id attribute

           if (!deviceId) {
                  console.error("Missing data-device-id attribute on delete button!");
                  return; // Handle potential missing attribute error gracefully
                }
           var htmlToAdd = `
                <div class="mb-3" style="margin-left: 0%; text-align: left;">
                    <input type="text" class="form-control  custom-width" id="deviceInputFieldEdit" value="${categoryName}" placeholder="Category" readonly >
                </div>
               <form   id="dynamicFormEditDevice">
             <div id="universalDivEdit" >

              </div>
              <div id="deviceDivEdit">

              </div>

               </form>
                <div class="mb-3" style="margin-left: 0%; text-align: left;">
                    <button type="button" class="btn btn-primary" id="saveEditBtn">Save</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            `;

            // Add the HTML code to the modal body using jQuery
            $('.ModalMedium').html(htmlToAdd);
              $('#publicModalMediumLabel').text("Edit Device Information")
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


           $('#universalDivEdit').empty();

           print('universalColumns', function(universalColumns) {
                          if (universalColumns) {
                              // Generate HTML for categories
                                   var categoriesHtml = '';
                              universalColumns.forEach(function(column) {
                               //   console.log(column.dataType);

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
                                               myFunctionThatHandlesCase(column,null,'dynamicFormEditDevice').then(function(dropDownHtml) {
                                                   //categoriesHtml += dropDownHtml; // Append the dropdown HTML
                                                   $('#universalDivEdit').append(dropDownHtml); // Update the deviceDiv with new HTML
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
                                 $('#universalDivEdit').html(categoriesHtml);
                             }
                          }
                      });


          // add individual column
           $('#deviceDivEdit').empty();

            // show all Individual column according to category
         print('individualColumns', function(individualColumns) {
                    if (individualColumns) {
                     var categoriesHtml = '';
                        individualColumns.forEach(function(column) {
                            if (text === column.categoryName) {
                              //  console.log(column.columnName);
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
                                           myFunctionThatHandlesCase(column, text, 'dynamicFormEditDevice')
                                               .then(function(dropDownHtml) {
                                                   $('#deviceDivEdit').append(dropDownHtml);
                                               })
                                               .catch(console.error);
                                           return; // prevent appending other items in same iteration

                                }

                            }
                        });
                        if (categoriesHtml && !categoriesHtml.includes('customDropDownList')) {
                            // Only update if there's no custom dropdown list pending
                            $('#deviceDivEdit').html(categoriesHtml);
                        }
                    }
                });


              $('#saveEditBtn').click(function() {
                  editTableInformationOfDevice(deviceId,categoryName);
                });

              showModalMedium();

          // Adding a delay of 500ms before populating a section
          setTimeout(() => {


              // update field value so that  ui rendering become good
            print('universalColumns', function(universalColumns) {
            //  console.log('universalColumns', universalColumns);
              if (universalColumns) {
                  // Iterate over universalColumns array
                  universalColumns.forEach(function(column) {
                      // Fetch and set value asynchronously
                      columnValue1(deviceId, column.columnName, function(value) {
                          // Locate input element by its name attribute
                          var inputElement = $('input[name="' + column.columnName + '"]');
                          if (inputElement.length) {
                              inputElement.val(value); // Set the value
                          } else {
                              console.warn('Input element not found for column:', column.columnName);
                          }
                      });
                  });
              }

            });
             print('individualColumns', function(individualColumns) {
                  //    console.log('individualColumns', individualColumns);
                      if (individualColumns) {
                          // Iterate over universalColumns array
                          individualColumns.forEach(function(column) {
                              // Fetch and set value asynchronously
                              columnValue1(deviceId, column.columnName, function(value) {
                                  // Locate input element by its name attribute
                                  var inputElement = $('input[name="' + column.columnName + '"]');
                                  if (inputElement.length) {
                                      inputElement.val(value); // Set the value
                                  } else {
                                      console.warn('Input element not found for column:', column.columnName);
                                  }
                              });
                          });
                      }

                    });

                     }, 500); // 500 milliseconds delay

             /*if (confirm(`Are you sure you want to edit device ${deviceId}?`)) {
                 console.log("edited done.");
             }else{
             console.log("edit canceled.");
             }*/

        }
     else if(button.hasClass("deviceUserHistory")){
                  showDeviceUserHistory(deviceId,categoryName);
                 }
     else if (button.hasClass("Delete")) {
      const deviceId = button.data('deviceId'); // Get device ID from data-device-id attribute

      if (!deviceId) {
        console.error("Missing data-device-id attribute on delete button!");
        return; // Handle potential missing attribute error gracefully
      }

      // Confirmation step (optional):
      if (confirm(`Are you sure you want to delete device ${deviceId}?`)) {
        // Send AJAX request to server for deletion (explained below)

         $.ajax({
                url: '/superAdmin/deleteDeviceInformation', // URL to your delete endpoint
                type: 'POST',
                data: {
                    deviceId:deviceId

                }, // Send category name as data
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
                    console.error("Error deleting category: " + error);
                }
            });

      } else {
        console.log("Delete canceled.");
      }
    } else {
      // Perform actions for other buttons, if needed
      console.log(`Other button clicked: ${buttonText}`);
    }
  });
   $('#deviceListTable tbody tr').click(function(event) {
      const $row = $(this); // Store the clicked row element
     var categoryName = $row.find('td:nth-child(2)').text();
       var text=categoryName;
      // Target the button itself for better accuracy
      const button = $(event.target).closest('button');
   var deviceId = button.data('deviceId');
      // Check if a button was clicked (prevents accidental clicks on other elements)
      if (!button.length) {
        return; // Do nothing if not a button click
      }

      const buttonText = button.text().trim(); // Get button text (trimming leading/trailing spaces)

      if(button.hasClass("deviceUserHistory")){
                    showDeviceUserHistory(deviceId,categoryName);
                   }
       else if (button.hasClass("Delete")) {
        const deviceId = button.data('deviceId'); // Get device ID from data-device-id attribute

        if (!deviceId) {
          console.error("Missing data-device-id attribute on delete button!");
          return; // Handle potential missing attribute error gracefully
        }

        // Confirmation step (optional):
        if (confirm(`Are you sure you want to delete device ${deviceId}?`)) {
          // Send AJAX request to server for deletion (explained below)

           $.ajax({
                  url: '/superAdmin/deleteDeviceInformation', // URL to your delete endpoint
                  type: 'POST',
                  data: {
                      deviceId:deviceId

                  }, // Send category name as data
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
                      console.error("Error deleting category: " + error);
                  }
              });

        } else {
          console.log("Delete canceled.");
        }
      } else {
        // Perform actions for other buttons, if needed
        console.log(`Other button clicked: ${buttonText}`);
      }
    });

};
function selectionAndInputDeviceInfo992() {

    // 🔹 Remove old listeners before re-binding
    $(document).off('click', '.deviceInputEachItem');
    $(document).off('keyup', '#deviceInputFieldAdd');

    // 🔹 Category click
    $(document).on('click', '.deviceInputEachItem', function (event) {
        const text = $(this).text().trim();
        $('#deviceInputFieldAdd').val(text);
        $('#universalDiv').show();

        // Clear previous device fields before adding new ones
        $('#deviceDiv').empty();

        // Fetch and render individual columns for the selected category
        print('individualColumns', function (individualColumns) {
            if (!individualColumns) return;

            let html = '';

            // Build HTML for all matching category columns
            individualColumns.forEach(function (column) {
                if (column.categoryName !== text) return;

                const type = column.dataType;
                const label = column.columnName + " (" + type + ")";
                const name = column.columnName;

                switch (type) {
                    case 'text':
                    case 'password':
                    case 'email':
                    case 'url':
                    case 'search':
                    case 'tel':
                    case 'number':
                    case 'date':
                    case 'month':
                    case 'week':
                    case 'time':
                    case 'datetime-local':
                    case 'color':
                        html += `<div class="mb-3">
                                  <label>${label}</label>
                                  <input type="${type}" class="form-control" name="${name}">
                                </div>`;
                        break;

                    case 'file':
                        html += `<div class="mb-3">
                                  <label>${label}</label>
                                  <input type="file" class="form-control" name="${name}">
                                 </div>`;
                        break;

                    case 'checkbox':
                    case 'radio':
                        html += `<div class="mb-3">
                                  <label>${label}</label>
                                  <input type="${type}" class="form-check-input" name="${name}">
                                 </div>`;
                        break;

                    case 'customDropDownList':
                        // Handle custom dropdown separately (async)
                        myFunctionThatHandlesCase(column, text, 'dynamicFormAddDevice')
                            .then(function (dropDownHtml) {
                                $('#deviceDiv').append(dropDownHtml);
                            })
                            .catch(console.error);
                        break;

                    default:
                        html += `<div class="mb-3">
                                  <label>${label}</label>
                                  <input type="text" class="form-control" name="${name}">
                                 </div>`;
                }
            });

            // Append only once for synchronous fields
            if (html.trim() !== '') {
                $('#deviceDiv').append(html);
            }
        });
    });

    // 🔹 Filter categories as user types
    $(document).on('keyup', '#deviceInputFieldAdd', function () {
        const filter = $(this).val().toUpperCase();
        $('#deviceInputAddUlList li').each(function () {
            const text = $(this).text().toUpperCase();
            $(this).toggle(text.indexOf(filter) > -1);
        });
    });
}

// The function to handle the custom dropdown case




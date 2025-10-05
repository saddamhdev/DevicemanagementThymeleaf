const pageSize = 10; // size per request
const fullPageSize=999999999;

let pageNumber = 0;  // start from 0
let lastScrollTop = 0;
let isLoading = false;

$(document).ready(function () {

$(function () {
        // Get last active fragment from localStorage
        const lastPage = localStorage.getItem("lastActivePage");

        if (lastPage) {
            loadFragment(lastPage); // Load previously active fragment
        } else {
            loadFragment("deviceInOutList"); // Load default fragment
        }
    });

// Main function to load and initialize fragment
async function loadFragment(pageName) {

localStorage.setItem("pageSize",pageSize);// global
 pageNumber=0;

var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
        var departmentName = departmentElement.data("departmentname");//it
        // Save page name to localStorage
        localStorage.setItem("lastActivePage", pageName);

        const container = document.getElementById("serviceContainer");
        container.innerHTML = "<p>Loading...</p>";
        const url = `/fragment1/${pageName}?folder=${encodeURIComponent("service")}&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`;

       const token = getAuthToken();
           if (!localStorage.getItem("firstPageSeen")) {
                   console.log("🚀 First login detected -> loading analytic fragment");
                 const analyticUrl = `/fragment1/analyticFragment?folder=${encodeURIComponent("service")}&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`;

                fetch(analyticUrl, {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                      "Authorization": "Bearer " + token
                    }
                  })
                    .then(response => {
                      console.log("Response status:", response.status);
                      return response.text();
                    })
                    .then(html => {
                      console.log("Analytic fragment HTML:", html.substring(0, 100)); // log first 100 chars
                      container.innerHTML = html;
                      localStorage.setItem("firstPageSeen", "true");
                      console.log("Welcome page injected.");
                    })
                    .catch(error => {
                      console.error("Error loading analytic fragment:", error);
                      container.innerHTML = "<p>Error loading analytics.</p>";
                    });


                   return; // stop here
                 }

       try {
                const response = await fetch(url, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + token
                            }
                        });

                        const html = await response.text();
                        container.innerHTML = html;

                         const fragmentInitializers = {
                          //cooFeedback: [window.initCooFeedbackTable,window.initCooFeedbackGeneral,window.initGlobalDivToggle],
                          cooFeedback: [window.initCooFeedbackGeneral,window.initGlobalDivToggle],
                          serviceAccessoriesListData: [window.initGlobalDivToggle],
                          deviceInOutList:[window.initDeviceInOutListGeneral,window.initGlobalDivToggle],
                          servicingList:[window.initServicingListGeneral,window.initGlobalDivToggle],
                           // Add more pageName: initFunction pairs as needed
                       };

                        const initFun = fragmentInitializers[pageName];
                          if (Array.isArray(initFun)) {
                              initFun.forEach(fn => {
                                  if (typeof fn === "function") {
                                      fn();
                                  }
                              });
                          } else if (typeof initFuncs === "function") {
                              // For backward compatibility
                              initFun();
                          }

                    // Optional: General fragment init
                    if (typeof window.initFragment === "function") {
                      window.initFragment(pageName);
                    }

                   // ✅ Add this line to bind the search input after fragment loads
                           if (typeof window.setupGlobalFilter === "function") {
                               window.setupGlobalFilter();
                           }
                     if(pageName==='cooFeedback'){

                                 // ✅ Await all three fetches
                                 const [serviceRequests, allAddData] = await Promise.all([
                                     fetchDataFromDB(`/serviceRequests/${pageName}?folder=service&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token),
                                     fetchDataFromDB(`/allAddData/${pageName}?folder=service&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token)
                                 ]);

                                 // ✅ Now they are resolved JSON arrays, not promises
                                // window.initRequestDataTable(requestData, requestColumns, allAddData);
                                 window.initCooFeedbackTable(serviceRequests, allAddData);
                                 return;

                        }
                        if(pageName==='serviceAccessoriesListData'){
                                // ✅ Await all three fetches
                                const [serviceRequests, allAddData ,allDevice] = await Promise.all([
                                    fetchDataFromDB(`/serviceRequests/${pageName}?folder=service&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token),
                                    fetchDataFromDB(`/allAddData/${pageName}?folder=service&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token),
                                     fetchDataFromDB(`/allAddData/${pageName}?folder=inventory&departmentName=${encodeURIComponent('inventory')}&page=${pageNumber}&size=${fullPageSize}`, token)

                                ]);

                                // ✅ Now they are resolved JSON arrays, not promises
                               // window.initRequestDataTable(requestData, requestColumns, allAddData);
                                 window.initServiceAccessoriesListDataTable(serviceRequests, allAddData ,allDevice);

                                return;

                        }

             }catch (error) {
                       console.error("❌ Error loading fragment:", error);
                       container.innerHTML = "<p>Error loading content.</p>";
                   }
    }
// Expose globally for use elsewhere (e.g., in nav click handlers)
window.toggleListItem = loadFragment;
window.toggleListItem = async function (item, pageName) {
localStorage.setItem("pageSize",pageSize);// global
 pageNumber=0;
var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
        var departmentName = departmentElement.data("departmentname");//it
        localStorage.setItem("lastActivePage", pageName);

        const container = document.getElementById("serviceContainer");
        container.innerHTML = "<p>Loading...</p>";
        const url = `/fragment1/${pageName}?folder=${encodeURIComponent("service")}&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`;

      const token = getAuthToken();
      try {
         const response = await fetch(url, {
                     method: 'GET',
                     headers: {
                         'Content-Type': 'application/json',
                         'Authorization': 'Bearer ' + token
                     }
                 });

                 const html = await response.text();
                 container.innerHTML = html;

                  const fragmentInitializers = {
                   //cooFeedback: [window.initCooFeedbackTable,window.initCooFeedbackGeneral,window.initGlobalDivToggle],
                   cooFeedback: [window.initCooFeedbackGeneral,window.initGlobalDivToggle],
                   serviceAccessoriesListData: [window.initGlobalDivToggle],
                   deviceInOutList:[window.initDeviceInOutListGeneral,window.initGlobalDivToggle],
                   servicingList:[window.initServicingListGeneral,window.initGlobalDivToggle],
                    // Add more pageName: initFunction pairs as needed
                };

                 const initFun = fragmentInitializers[pageName];
                   if (Array.isArray(initFun)) {
                       initFun.forEach(fn => {
                           if (typeof fn === "function") {
                               fn();
                           }
                       });
                   } else if (typeof initFuncs === "function") {
                       // For backward compatibility
                       initFun();
                   }

             // Optional: General fragment init
             if (typeof window.initFragment === "function") {
               window.initFragment(pageName);
             }

            // ✅ Add this line to bind the search input after fragment loads
                    if (typeof window.setupGlobalFilter === "function") {
                        window.setupGlobalFilter();
                    }
              if(pageName==='cooFeedback'){

                          // ✅ Await all three fetches
                          const [serviceRequests, allAddData] = await Promise.all([
                              fetchDataFromDB(`/serviceRequests/${pageName}?folder=service&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token),
                              fetchDataFromDB(`/allAddData/${pageName}?folder=service&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token)
                          ]);

                          // ✅ Now they are resolved JSON arrays, not promises
                         // window.initRequestDataTable(requestData, requestColumns, allAddData);
                          window.initCooFeedbackTable(serviceRequests, allAddData);
                          return;

                 }
                 if(pageName==='serviceAccessoriesListData'){
                           // ✅ Await all three fetches
                               const [serviceRequests, allAddData ,allDevice] = await Promise.all([
                                   fetchDataFromDB(`/serviceRequests/${pageName}?folder=service&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token),
                                   fetchDataFromDB(`/allAddData/${pageName}?folder=service&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token),
                                    fetchDataFromDB(`/allAddData/${pageName}?folder=inventory&departmentName=${encodeURIComponent('inventory')}&page=${pageNumber}&size=${fullPageSize}`, token)

                               ]);

                               // ✅ Now they are resolved JSON arrays, not promises
                              // window.initRequestDataTable(requestData, requestColumns, allAddData);
                                window.initServiceAccessoriesListDataTable(serviceRequests, allAddData ,allDevice);

                            return;

                    }

      }catch (error) {
                console.error("❌ Error loading fragment:", error);
                container.innerHTML = "<p>Error loading content.</p>";
            }


    };

// Adjust styles on window resize
});

// === Infinite Scroll Load ===
function loadMoreDevices(direction = "down") {
    if (isLoading) return;

    const pageName = localStorage.getItem("lastActivePage");
    var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
       var departmentName = departmentElement.data("departmentname");//it
    const totalPage = $('.last-page-flag').last().data('totalpage' + pageName);

    if (pageNumber >= totalPage) {
        console.log("Reached last page. No more data to load.");
        return;
    }

    isLoading = true;
    const loader = document.getElementById("scrollLoader");
    loader.style.display = "block";

    const url = `/fragment1/${pageName}?folder=service&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`;

const token = getAuthToken();
        fetch(url, {
               method: 'GET',
               headers: {
                    'Content-Type': 'application/json',
                   'Authorization': 'Bearer ' + token
               }
           })
        .then(response => response.text())
        .then(html => {
            loader.style.display = "none";
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            const newRows = tempDiv.querySelectorAll("tbody tr");
            const visibleTable = document.querySelector("#serviceContainer table");
            const tbody = visibleTable?.querySelector("tbody");

            if (tbody) {
                const existingValues = new Set();
                tbody.querySelectorAll("tr").forEach(row => {
                    const cell = row.querySelector("td");
                    if (cell) existingValues.add(cell.textContent.trim());
                });

                newRows.forEach(row => {
                    const cell = row.querySelector("td");
                    if (cell && !existingValues.has(cell.textContent.trim())) {
                        tbody.appendChild(row);
                        existingValues.add(cell.textContent.trim());
                    }
                });
            }

            pageNumber++; // ✅ Increment page
        })
        .catch(error => {
            console.error("Error loading more rows:", error);
        })
        .finally(() => {
            isLoading = false;
            loader.style.display = "none";
        });
}



async function loadByRange(pageNumber, pageSize) {
    console.log("📦 Loading range with pageSize:", pageSize);

    const pageName = localStorage.getItem("lastActivePage");



    var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
       var departmentName = departmentElement.data("departmentname");//it

     const url = `/fragment1/${pageName}?folder=service&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`;

       const token = getAuthToken();

        if(pageName==='cooFeedback'){

                           try {
                                // ✅ Await all three fetches
                                const [serviceRequests, allAddData] = await Promise.all([
                                    fetchDataFromDB(`/serviceRequests/${pageName}?folder=service&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token),
                                    fetchDataFromDB(`/allAddData/${pageName}?folder=service&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token)
                                ]);

                                // ✅ Now they are resolved JSON arrays, not promises
                               // window.initRequestDataTable(requestData, requestColumns, allAddData);
                                window.initCooFeedbackTable(serviceRequests, allAddData);
                                return;
                            } catch (e) {
                                console.error("❌ Error loading requestData:", e);
                                return;
                            }

                       }

               else if(pageName==='serviceAccessoriesListData'){
                try {
                       // ✅ Await all three fetches
                           const [serviceRequests, allAddData ,allDevice] = await Promise.all([
                               fetchDataFromDB(`/serviceRequests/${pageName}?folder=service&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token),
                               fetchDataFromDB(`/allAddData/${pageName}?folder=service&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token),
                                fetchDataFromDB(`/allAddData/${pageName}?folder=inventory&departmentName=${encodeURIComponent('inventory')}&page=${pageNumber}&size=${fullPageSize}`, token)

                           ]);

                           // ✅ Now they are resolved JSON arrays, not promises
                          // window.initRequestDataTable(requestData, requestColumns, allAddData);
                            window.initServiceAccessoriesListDataTable(serviceRequests, allAddData ,allDevice);

                       return;
                   } catch (e) {
                       console.error("❌ Error loading requestData:", e);
                       return;
                   }
               }
        fetch(url, {
               method: 'GET',
               headers: {
                    'Content-Type': 'application/json',
                   'Authorization': 'Bearer ' + token
               }
           })
        .then(response => response.text())
        .then(html => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            const newRows = Array.from(tempDiv.querySelectorAll("tbody tr"));
            const visibleTable = document.querySelector("#serviceContainer table");
            const tbody = visibleTable?.querySelector("tbody");

            if (!tbody) return;

            const currentRows = Array.from(tbody.querySelectorAll("tr"));

            // ✅ Build sets of first column values
            const currentIds = new Set(currentRows.map(row => row.cells[0]?.textContent.trim()));
            const newIds = new Set(newRows.map(row => row.cells[0]?.textContent.trim()));

            // ✅ Add only new rows
            newRows.forEach(row => {
                const newId = row.cells[0]?.textContent.trim();
                if (!currentIds.has(newId)) {
                    tbody.appendChild(row);
                }
            });

            // ✅ Remove extra old rows not present in new data
            currentRows.forEach(row => {
                const id = row.cells[0]?.textContent.trim();
                if (!newIds.has(id)) {
                    row.remove();
                }
            });

   // ✅ Count only visible rows
               const finalRowCount = [...tbody.querySelectorAll("tr")]
                   .filter(row => row.style.display !== "none")
                   .length;

               // ✅ Update <p class="totalContent">
               const totalContentEl = document.querySelector(".totalContent");
               if (totalContentEl) {
                   totalContentEl.innerHTML = `📊 Total Rows: <strong>${finalRowCount}</strong>`;
               }

     // Page-specific initializers map
                   const fragmentInitializers = {
                      cooFeedback: [window.initCooFeedbackTable,window.initCooFeedbackGeneral,window.initGlobalDivToggle],
                      serviceAccessoriesListData: [window.initServiceAccessoriesListDataTable,window.initGlobalDivToggle],
                      deviceInOutList:[window.initDeviceInOutListGeneral,window.initGlobalDivToggle],
                      servicingList:[window.initServicingListGeneral,window.initGlobalDivToggle],
                       // Add more pageName: initFunction pairs as needed
                   };

               const initFun = fragmentInitializers[pageName];
                      if (Array.isArray(initFun)) {
                          initFun.forEach(fn => {
                              if (typeof fn === "function") {
                                  fn();
                              }
                          });
                      } else if (typeof initFuncs === "function") {
                          // For backward compatibility
                          initFun();
                      }

                // Optional: General fragment init
                if (typeof window.initFragment === "function") {
                  window.initFragment(pageName);
                }
           // ✅ Add this line to bind the search input after fragment loads
                   if (typeof window.setupGlobalFilter === "function") {
                       window.setupGlobalFilter();
                   }
        })
        .catch(error => {
            console.error("❌ Error loading rows:", error);
        })
        .finally(() => {
            isLoading = false;
        });
}


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
            loadFragment("requestData"); // Load default fragment
        }
    });

async function loadFragment(pageName) {
    localStorage.setItem("pageSize", pageSize);
    pageNumber = 0;

    const departmentElement = $(".departmentName");
    const departmentName = departmentElement.data("departmentname");
    localStorage.setItem("lastActivePage", pageName);

    const container = document.getElementById("inventoryContainer");
    container.innerHTML = "<p>Loading...</p>";
    const url = `/fragment1/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`;

    const token = getAuthToken();
    console.log("start " + pageName);
       if (!localStorage.getItem("firstPageSeen")) {
           console.log("🚀 First login detected -> loading analytic fragment");
         const analyticUrl = `/fragment1/analyticFragment?folder=${encodeURIComponent("inventory")}&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`;

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

        // fragment initializers
        const fragmentInitializers = {
            //requestData: [window.initRequestDataTable, window.initGlobalDivToggle],
            requestData: [ window.initGlobalDivToggle],
           // serviceAccessoriesPendingData: [window.initServiceAccessoriesPendingDataTable, window.initGlobalDivToggle],
            serviceAccessoriesPendingData: [ window.initGlobalDivToggle],
            //serviceAccessoriesPendingPurchaseData: [window.initServiceAccessoriesPendingPurchaseDataTable, window.initGlobalDivToggle],
            serviceAccessoriesPendingPurchaseData: [ window.initGlobalDivToggle],
            //serviceAccessoriesPendingAlternativeData: [window.initServiceAccessoriesPendingAlternativeDataTable, window.initGlobalDivToggle],
            serviceAccessoriesPendingAlternativeData: [ window.initGlobalDivToggle],
            //serviceAccessoriesDeliveryData: [window.initServiceAccessoriesDeliveryDataTable, window.initGlobalDivToggle],
            serviceAccessoriesDeliveryData: [ window.initGlobalDivToggle],
            deviceInformation: [window.initDeviceInformationGeneral],
            requestDataAlternative: [window.initRequestDataAlternativeGeneral, window.initGlobalDivToggle],
            requestDataProposal: [window.initRequestDataProposalGeneral, window.initGlobalDivToggle],
            unOrderedDevice: [window.initUnOrderedDeviceGeneral, window.initGlobalDivToggle]
        };

        const initFun = fragmentInitializers[pageName];
        if (Array.isArray(initFun)) {
            initFun.forEach(fn => typeof fn === "function" && fn());
        }

        if (typeof window.initFragment === "function") {
            window.initFragment(pageName);
        }

        if (typeof window.setupGlobalFilter === "function") {
            window.setupGlobalFilter();
        }

        // ✅ Special handling for requestData
        if (pageName === 'requestData') {
            //console.log("Before");
           const [requestData, requestColumns, allAddData,allDevice] = await Promise.all([
                            fetchDataFromDB(`/requestData/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token),
                            fetchDataFromDB(`/requestColumns/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token),
                            fetchDataFromDB(`/allAddData/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token),
                            fetchDataFromDB(`/allAddData/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${fullPageSize}`, token)
                        ]);
                       // console.log("Next");
                       // console.log("✅ requestData loaded:", requestData);
                        window.initRequestDataTable(requestData, requestColumns, allAddData,allDevice);
            return ;
        }
         if(pageName==='serviceAccessoriesPendingData'){

              const [serviceRequests, allAddData,allDevice] = await Promise.all([
                  fetchDataFromDB(`/serviceRequests/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token),
                  fetchDataFromDB(`/allAddData/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token),
                   fetchDataFromDB(`/allAddData/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${fullPageSize}`, token)
              ]);

              // ✅ Now they are resolved JSON arrays, not promises
             // window.initRequestDataTable(requestData, requestColumns, allAddData);
              window.initServiceAccessoriesPendingDataTable(serviceRequests, allAddData,allDevice);
              return;

        }
         if(pageName==='serviceAccessoriesPendingPurchaseData'){

                     // ✅ Await all three fetches
                     const [serviceRequests, allAddData] = await Promise.all([
                         fetchDataFromDB(`/serviceRequests/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token),
                         fetchDataFromDB(`/allAddData/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token)
                     ]);

                     // ✅ Now they are resolved JSON arrays, not promises

                     window.initServiceAccessoriesPendingPurchaseDataTable(serviceRequests, allAddData);
                     return;

             }
              if(pageName==='serviceAccessoriesPendingAlternativeData'){

                             // ✅ Await all three fetches
                             const [serviceRequests, allAddData] = await Promise.all([
                                 fetchDataFromDB(`/serviceRequests/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token),
                                 fetchDataFromDB(`/allAddData/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token)
                             ]);

                             // ✅ Now they are resolved JSON arrays, not promises
                             window.initServiceAccessoriesPendingAlternativeDataTable(serviceRequests, allAddData);
                             return;

                      }
                    if (pageName === 'serviceAccessoriesDeliveryData') {

                                 // ✅ Await all three fetches
                                 const [serviceRequests, allAddData] = await Promise.all([
                                     fetchDataFromDB(`/serviceRequests/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token),
                                     fetchDataFromDB(`/allAddData/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token)
                                 ]);

                                 // ✅ Now they are resolved JSON arrays, not promises
                                  window.initServiceAccessoriesDeliveryDataTable(serviceRequests, allAddData);
                                 return;

                       }

    } catch (error) {
        console.error("❌ Error loading fragment:", error);
        container.innerHTML = "<p>Error loading content.</p>";
    }
}

// Expose globally for use elsewhere (e.g., in nav click handlers)
 window.toggleListItem = loadFragment;
 window.toggleListItem = async function (item, pageName) {
     localStorage.setItem("pageSize", pageSize); // global
     pageNumber = 0;

     const departmentElement = $(".departmentName");
     const departmentName = departmentElement.data("departmentname");
     localStorage.setItem("lastActivePage", pageName);

     const container = document.getElementById("inventoryContainer");
     container.innerHTML = "<p>Loading...</p>";
     const url = `/fragment1/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`;

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

         // Page-specific initializers map
         const fragmentInitializers = {
            // requestData: [window.initRequestDataTable, window.initGlobalDivToggle],
             requestData: [ window.initGlobalDivToggle],
             // serviceAccessoriesPendingData: [window.initServiceAccessoriesPendingDataTable, window.initGlobalDivToggle],
             serviceAccessoriesPendingData: [ window.initGlobalDivToggle],
             //serviceAccessoriesPendingPurchaseData: [window.initServiceAccessoriesPendingPurchaseDataTable, window.initGlobalDivToggle],
             serviceAccessoriesPendingPurchaseData: [ window.initGlobalDivToggle],
             //serviceAccessoriesPendingAlternativeData: [window.initServiceAccessoriesPendingAlternativeDataTable, window.initGlobalDivToggle],
             serviceAccessoriesPendingAlternativeData: [ window.initGlobalDivToggle],
            //serviceAccessoriesDeliveryData: [window.initServiceAccessoriesDeliveryDataTable, window.initGlobalDivToggle],
             serviceAccessoriesDeliveryData: [ window.initGlobalDivToggle],
             deviceInformation: [window.initDeviceInformationGeneral],
             requestDataAlternative: [window.initRequestDataAlternativeGeneral, window.initGlobalDivToggle],
             requestDataProposal: [window.initRequestDataProposalGeneral, window.initGlobalDivToggle],
             unOrderedDevice: [window.initUnOrderedDeviceGeneral, window.initGlobalDivToggle]
         };

         const initFun = fragmentInitializers[pageName];
         if (Array.isArray(initFun)) {
             initFun.forEach(fn => typeof fn === "function" && fn());
         }

         if (typeof window.initFragment === "function") {
             window.initFragment(pageName);
         }

         if (typeof window.setupGlobalFilter === "function") {
             window.setupGlobalFilter();
         }

         // ✅ Special handling for requestData
         if (pageName === 'requestData') {
            // console.log("Before");
             const [requestData, requestColumns, allAddData,allDevice] = await Promise.all([
                 fetchDataFromDB(`/requestData/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token),
                 fetchDataFromDB(`/requestColumns/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token),
                 fetchDataFromDB(`/allAddData/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token),
                 fetchDataFromDB(`/allAddData/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${fullPageSize}`, token)
             ]);
            // console.log("Next");
            // console.log("✅ requestData loaded:", requestData);
             window.initRequestDataTable(requestData, requestColumns, allAddData,allDevice);
             return;
         }

          if(pageName==='serviceAccessoriesPendingData'){

                     const [serviceRequests, allAddData,allDevice] = await Promise.all([
                         fetchDataFromDB(`/serviceRequests/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token),
                         fetchDataFromDB(`/allAddData/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token),
                          fetchDataFromDB(`/allAddData/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${fullPageSize}`, token)
                     ]);

                     // ✅ Now they are resolved JSON arrays, not promises
                    // window.initRequestDataTable(requestData, requestColumns, allAddData);
                     window.initServiceAccessoriesPendingDataTable(serviceRequests, allAddData,allDevice);
                      return;

             }

             if(pageName==='serviceAccessoriesPendingPurchaseData'){

                         // ✅ Await all three fetches
                         const [serviceRequests, allAddData] = await Promise.all([
                             fetchDataFromDB(`/serviceRequests/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token),
                             fetchDataFromDB(`/allAddData/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token)
                         ]);

                         // ✅ Now they are resolved JSON arrays, not promises

                         window.initServiceAccessoriesPendingPurchaseDataTable(serviceRequests, allAddData);
                         return;

                 }
              if(pageName==='serviceAccessoriesPendingAlternativeData'){

                         // ✅ Await all three fetches
                         const [serviceRequests, allAddData] = await Promise.all([
                             fetchDataFromDB(`/serviceRequests/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token),
                             fetchDataFromDB(`/allAddData/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token)
                         ]);

                         // ✅ Now they are resolved JSON arrays, not promises
                         window.initServiceAccessoriesPendingAlternativeDataTable(serviceRequests, allAddData);
                         return;

                  }

                  if (pageName === 'serviceAccessoriesDeliveryData') {

                      // ✅ Await all three fetches
                      const [serviceRequests, allAddData] = await Promise.all([
                          fetchDataFromDB(`/serviceRequests/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token),
                          fetchDataFromDB(`/allAddData/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token)
                      ]);

                      // ✅ Now they are resolved JSON arrays, not promises
                       window.initServiceAccessoriesDeliveryDataTable(serviceRequests, allAddData);
                      return;

                   }

     } catch (error) {
         console.error("❌ Error loading fragment:", error);
         container.innerHTML = "<p>Error loading content.</p>";
     }
 };
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

    const url = `/fragment1/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`;

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
            const visibleTable = document.querySelector("#inventoryContainer table");
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
       const url = `/fragment1/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`;

    const token = getAuthToken();
     const requestData=(fetchDataFromDB(`/requestData/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`,token));
     const requestColumns=(fetchDataFromDB(`/requestColumns/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`,token));
     const allAddData=(fetchDataFromDB(`/allAddData/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`,token));

     if(pageName==='serviceAccessoriesPendingData'){

                try {
                     // ✅ Await all three fetches
                     const [serviceRequests, allAddData,allDevice] = await Promise.all([
                         fetchDataFromDB(`/serviceRequests/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token),
                         fetchDataFromDB(`/allAddData/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token),
                          fetchDataFromDB(`/allAddData/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${fullPageSize}`, token)
                     ]);

                     // ✅ Now they are resolved JSON arrays, not promises
                    // window.initRequestDataTable(requestData, requestColumns, allAddData);
                     window.initServiceAccessoriesPendingDataTable(serviceRequests, allAddData,allDevice);
                     return;
                 } catch (e) {
                     console.error("❌ Error loading requestData:", e);
                     return;
                 }

            }
            else if(pageName==='serviceAccessoriesPendingPurchaseData'){

            try {
                    // ✅ Await all three fetches
                    const [serviceRequests, allAddData] = await Promise.all([
                        fetchDataFromDB(`/serviceRequests/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token),
                        fetchDataFromDB(`/allAddData/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token)
                    ]);

                    // ✅ Now they are resolved JSON arrays, not promises

                    window.initServiceAccessoriesPendingPurchaseDataTable(serviceRequests, allAddData);
                    return;
                } catch (e) {
                    console.error("❌ Error loading requestData:", e);
                    return;
                }
            }
             else if(pageName==='serviceAccessoriesPendingAlternativeData'){

                    try {
                           // ✅ Await all three fetches
                           const [serviceRequests, allAddData] = await Promise.all([
                               fetchDataFromDB(`/serviceRequests/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token),
                               fetchDataFromDB(`/allAddData/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token)
                           ]);

                           // ✅ Now they are resolved JSON arrays, not promises
                           window.initServiceAccessoriesPendingAlternativeDataTable(serviceRequests, allAddData);
                           return;
                       } catch (e) {
                           console.error("❌ Error loading requestData:", e);
                           return;
                       }
                    }
             // work
             else if (pageName === 'serviceAccessoriesDeliveryData') {

                              try {
                                    // ✅ Await all three fetches
                                    const [serviceRequests, allAddData] = await Promise.all([
                                        fetchDataFromDB(`/serviceRequests/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token),
                                        fetchDataFromDB(`/allAddData/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token)
                                    ]);

                                    // ✅ Now they are resolved JSON arrays, not promises
                                     window.initServiceAccessoriesDeliveryDataTable(serviceRequests, allAddData);
                                    return;
                                } catch (e) {
                                    console.error("❌ Error loading requestData:", e);
                                    return;
                                }
                         }

                else if (pageName === 'requestData') {
                             try {
                                   const [requestData, requestColumns, allAddData,allDevice] = await Promise.all([
                                                  fetchDataFromDB(`/requestData/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token),
                                                  fetchDataFromDB(`/requestColumns/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token),
                                                  fetchDataFromDB(`/allAddData/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`, token),
                                                  fetchDataFromDB(`/allAddData/${pageName}?folder=inventory&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${fullPageSize}`, token)
                                              ]);
                                             // console.log("Next");
                                             // console.log("✅ requestData loaded:", requestData);
                                              window.initRequestDataTable(requestData, requestColumns, allAddData,allDevice);
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
           // console.log(html);
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            const newRows = Array.from(tempDiv.querySelectorAll("tbody tr"));
            const visibleTable = document.querySelector("#inventoryContainer table");
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
                    requestData: [window.initRequestDataTable,window.initGlobalDivToggle],
                    serviceAccessoriesPendingData: [window.initServiceAccessoriesPendingDataTable,window.initGlobalDivToggle],
                    serviceAccessoriesPendingPurchaseData: [window.initServiceAccessoriesPendingPurchaseDataTable,window.initGlobalDivToggle],
                    serviceAccessoriesPendingAlternativeData: [window.initServiceAccessoriesPendingAlternativeDataTable,window.initGlobalDivToggle],
                    serviceAccessoriesDeliveryData: [window.initServiceAccessoriesDeliveryDataTable,window.initGlobalDivToggle],
                    deviceInformation: [window.initDeviceInformationGeneral],
                    requestDataAlternative: [window.initRequestDataAlternativeGeneral,window.initGlobalDivToggle],
                    requestDataProposal: [window.initRequestDataProposalGeneral,window.initGlobalDivToggle],
                    unOrderedDevice: [window.initUnOrderedDeviceGeneral,window.initGlobalDivToggle]
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

                // Optional: general fragment initialization
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



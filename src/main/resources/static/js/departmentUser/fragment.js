const pageSize = 10; // size per request

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
            loadFragment("Request"); // Load default fragment
        }
    });

// Main function to load and initialize fragment
function loadFragment(pageName) {
localStorage.setItem("pageSize",pageSize);// global

          pageNumber=0;
        var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
        var departmentName = departmentElement.data("departmentuser-name");
        // Save page name to localStorage
        localStorage.setItem("lastActivePage", pageName);

        const container = document.getElementById("departmentContainer");
        container.innerHTML = "<p>Loading...</p>";
// Construct URL with query parameters
    //const url = `/fragment/${pageName}?folder=${encodeURIComponent("departmentUser")}&departmentName=${encodeURIComponent(departmentName)}`;
     const url = `/fragment1/${pageName}?folder=${encodeURIComponent("departmentUser")}&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`;
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
                container.innerHTML = html;

                // Page-specific initializers map
                const fragmentInitializers = {
                    serviceRequest: [window.initServiceRequestGeneral ,window.initGlobalDivToggle],
                    addUser: [window.initAddUserGeneral ,window.initGlobalDivToggle],
                    Request: [window.initRequestDataGeneral ,window.initGlobalDivToggle],
                    deviceInformation: [window.initDeviceInformationGeneral ,window.initGlobalDivToggle]
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
                pageNumber++;
            })
            .catch(error => {
                console.error("Error loading fragment:", error);
                container.innerHTML = "<p>Error loading content.</p>";
            });
    }
// Expose globally for use elsewhere (e.g., in nav click handlers)
window.toggleListItem = loadFragment;
window.toggleListItem = function (item, pageName) {
localStorage.setItem("pageSize",pageSize);// global
pageNumber=0;
        var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
        var departmentName = departmentElement.data("departmentuser-name");
        localStorage.setItem("lastActivePage", pageName);

        const container = document.getElementById("departmentContainer");
        container.innerHTML = "<p>Loading...</p>";
       // const url = `/fragment/${pageName}?folder=${encodeURIComponent("departmentUser")}&departmentName=${encodeURIComponent(departmentName)}`;
     const url = `/fragment1/${pageName}?folder=${encodeURIComponent("departmentUser")}&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`;

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
            container.innerHTML = html;
             // Page-specific initializers map
            // Page-specific initializers map
               const fragmentInitializers = {
                   serviceRequest: [window.initServiceRequestGeneral ,window.initGlobalDivToggle],
                   addUser: [window.initAddUserGeneral ,window.initGlobalDivToggle],
                   Request: [window.initRequestDataGeneral ,window.initGlobalDivToggle],
                   deviceInformation: [window.initDeviceInformationGeneral ,window.initGlobalDivToggle]
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
          pageNumber++;
          })
          .catch(error => {
            console.error("Error loading fragment:", error);
            container.innerHTML = "<p>Error loading content.</p>";
          });

    };

// Adjust styles on window resize
});


// === Infinite Scroll Load ===
function loadMoreDevices(direction = "down") {
    if (isLoading) return;

    const pageName = localStorage.getItem("lastActivePage");
    const departmentName = $(".departmentName").data("departmentuser-name");
    const totalPage = $('.last-page-flag').last().data('totalpage' + pageName);

    if (pageNumber >= totalPage) {
        console.log("Reached last page. No more data to load.");
        return;
    }

    isLoading = true;
    const loader = document.getElementById("scrollLoader");
    loader.style.display = "block";

    const url = `/fragment1/${pageName}?folder=departmentUser&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`;

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
            const visibleTable = document.querySelector("#departmentContainer table");
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
function loadByRange(pageNumber, pageSize) {
    console.log("📦 Loading range with pageSize:", pageSize);

    const pageName = localStorage.getItem("lastActivePage");
    const departmentName = $(".departmentName").data("departmentuser-name");
    const url = `/fragment1/${pageName}?folder=departmentUser&departmentName=${encodeURIComponent(departmentName)}&page=${pageNumber}&size=${pageSize}`;

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
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            const newRows = Array.from(tempDiv.querySelectorAll("tbody tr"));
            const visibleTable = document.querySelector("#departmentContainer table");
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

            // Page-specific initializers map
            const fragmentInitializers = {
                serviceRequest: [window.initServiceRequestGeneral ,window.initGlobalDivToggle],
                addUser: [window.initAddUserGeneral ,window.initGlobalDivToggle],
                Request: [window.initRequestDataGeneral ,window.initGlobalDivToggle],
                deviceInformation: [window.initDeviceInformationGeneral ,window.initGlobalDivToggle]
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




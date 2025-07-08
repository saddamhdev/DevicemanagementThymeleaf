package com.device.DeviceManagement.util;

import com.device.DeviceManagement.controller.service.*;
import com.device.DeviceManagement.model.*;
import com.device.DeviceManagement.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Year;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SuperAdminHelper {
    boolean result;
    boolean updated = false;
    @Autowired
    private RequestDataRepository requestDataRepository;
    @Autowired
    private BranchUserRepository branchUserRepository;

    @Autowired
    private RequestColumnRepository requestColumnRepository;
    @Autowired
    private ServiceRequestRepository serviceRequestRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private DesignationRepository designationRepository;

    @Autowired
    private ColumnRepository columnRepository;
    @Autowired
    private AddDataRepository addDataRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private InternalUserRepository internalUserRepository;

    @Autowired
    private DropDownListRepository dropDownListRepository;

    boolean resultAccessories,resultComponents;
    int sizeAccessories,sizeComponents;
    @Autowired
    private CategoriesService categoriesService;
    @Autowired
    private IndividualColumnsService individualColumnsService;
    @Autowired
    private UniversalColumnsService universalColumnsService;
    @Autowired
    private AddDataService addDataService;
    @Autowired
    private BranchUserService branchUserService;
    @Autowired
    private InternalUserService internalUserService;
    @Autowired
    private DesignationService designationService;
    @Autowired
    private  DropDownListService dropDownListService;
    @Autowired
    private  RequestColumnService requestColumnService;
    @Autowired
    private RequestDataService requestDataService;
    @Autowired
    private  ServiceRequestService serviceRequestService;
    @Autowired
    private UserService userService;

    public SuperAdminHelper() {
    }

    public  void  updateCategoryDataInAllTable(String oldCategoryName, String newCategoryName){
        System.out.println("Starting category update in all tables...");

        // ✅ Update device list
        List<AddData> deviceData = addDataRepository.findByCategoryName(oldCategoryName);
        if (deviceData != null && !deviceData.isEmpty()) {
            System.out.println("Updating device data...");
            deviceData.forEach(e -> {
                if (oldCategoryName.equals(e.getCategoryName())) {
                    e.setCategoryName(newCategoryName);
                    addDataRepository.save(e);
                }
            });
            addDataService.update();
        }

        // ✅ Update column list
        List<Column> columnData = columnRepository.findByCategoryName(oldCategoryName);
        if (columnData != null && !columnData.isEmpty()) {
            System.out.println("Updating column data...");
            columnData.forEach(e -> {
                if (oldCategoryName.equals(e.getCategoryName())) {
                    e.setCategoryName(newCategoryName);
                    columnRepository.save(e);
                }
            });
            individualColumnsService.updateUniversalColumn();
        }

        // ✅ Update dropdown list
        List<DropDownList> dropDownLists = dropDownListRepository.findByCategoryName(oldCategoryName);
        if (dropDownLists != null && !dropDownLists.isEmpty()) {
            System.out.println("Updating drop-down list...");
            dropDownLists.forEach(e -> {
                if (oldCategoryName.equals(e.getCategoryName())) {
                    e.setCategoryName(newCategoryName);
                    dropDownListRepository.save(e);
                }
            });
            dropDownListService.update();
        }

        // ✅ Update requestData
        List<RequestData> requestData = requestDataRepository.findAll();
        if (requestData != null && !requestData.isEmpty()) {
            System.out.println("Updating request data...");
            requestData.forEach(e -> {
                Map<String, String> allData = e.getAllData();
                if (allData != null && oldCategoryName.equals(allData.get("category"))) {
                    allData.put("category", newCategoryName);
                    e.setAllData(allData);
                    requestDataRepository.save(e);
                }
            });
            requestDataService.update();
        }

        // ✅ Update Service Request
        List<ServiceRequest> serviceRequests = serviceRequestRepository.findAll();
        if (serviceRequests != null && !serviceRequests.isEmpty()) {
            System.out.println("Updating service requests...");

            for (ServiceRequest request : serviceRequests) {
                if (request.getCategoryName() != null && request.getCategoryName().equals(oldCategoryName)) {
                    System.out.println("Updating request category from " + oldCategoryName + " to " + newCategoryName);
                    request.setCategoryName(newCategoryName);
                }

                // Check if getAllProblem() is not null
                if (request.getAllProblem() != null && !request.getAllProblem().isEmpty()) {
                    request.getAllProblem().forEach(problem -> {
                        if (problem != null && problem.getProposalSolution() != null && !problem.getProposalSolution().isEmpty()) {
                            problem.getProposalSolution().forEach(proposalSolutionItem -> {
                                if (proposalSolutionItem != null && proposalSolutionItem.getCategory() != null &&
                                        proposalSolutionItem.getCategory().equals(oldCategoryName)) {
                                    System.out.println("Updating proposalSolutionItem category from " + oldCategoryName + " to " + newCategoryName);
                                    proposalSolutionItem.setCategory(newCategoryName);
                                }
                            });
                        }
                    });
                }

                // Save changes if needed
                serviceRequestRepository.save(request);
            }

            // Optionally update the service
            serviceRequestService.update();
        }

    }

    public void updateColumnDataInAllTable(String oldCategoryName, String newCategoryName) {
        System.out.println("Starting key update in all AddData entries...");

        List<AddData> deviceData = addDataRepository.findAll();
        if (deviceData != null && !deviceData.isEmpty()) {
            System.out.println("Found " + deviceData.size() + " AddData entries");

            for (AddData entry : deviceData) {
                boolean updated = false;

                Map<String, String> allData = entry.getAllData();
                if (allData != null && !allData.isEmpty()) {
                    Map<String, String> updatedData = new HashMap<>();

                    for (Map.Entry<String, String> field : allData.entrySet()) {
                        String key = field.getKey();
                        String value = field.getValue();

                        // ✅ Rename key if its value matches oldCategoryName
                        if (key != null && key.equals(oldCategoryName)) {
                            System.out.println("Renaming key '" + key + "' to '" + newCategoryName + "'");
                            updatedData.put(newCategoryName, value); // new key
                            updated = true;
                        } else {
                            updatedData.put(key, value); // unchanged
                        }
                    }

                    entry.setAllData(updatedData);
                }

                if (updated) {
                    addDataRepository.save(entry);
                }
            }

            addDataService.update();
            System.out.println("Finished updating keys in AddData entries.");
        } else {
            System.out.println("No AddData entries found.");
        }


        // ✅ Update dropdown list
        List<DropDownList> dropDownLists = dropDownListRepository.findAll();
        if ( !dropDownLists.isEmpty()) {
            System.out.println("Updating drop-down list...");
            dropDownLists.forEach(e -> {
                if (oldCategoryName.equals(e.getDropDownListName())) {
                    e.setDropDownListName(newCategoryName);
                    dropDownListRepository.save(e);
                }
            });
            dropDownListService.update();
        }



    }
    public boolean checkColumnDataInAllTable(String Name) {
        System.out.println("Starting key update in all AddData entries...");
        result=false;
        List<AddData> deviceData = addDataRepository.findAll();
        if (deviceData != null && !deviceData.isEmpty()) {
            System.out.println("Found " + deviceData.size() + " AddData entries");

            for (AddData entry : deviceData) {
                boolean updated = false;

                Map<String, String> allData = entry.getAllData();
                if (allData != null && !allData.isEmpty()) {
                    Map<String, String> updatedData = new HashMap<>();

                    for (Map.Entry<String, String> field : allData.entrySet()) {
                        String key = field.getKey();


                        // ✅ Rename key if its value matches oldCategoryName
                        if (key != null && key.equals(Name)) {
                            result=true;
                        }
                    }

                    entry.setAllData(updatedData);
                }

                if (updated) {
                    addDataRepository.save(entry);
                }
            }

        }


        // ✅ Update dropdown list
        List<DropDownList> dropDownLists = dropDownListRepository.findAll();
        if ( !dropDownLists.isEmpty()) {
            System.out.println("Updating drop-down list...");
            dropDownLists.forEach(e -> {
                if (Name.equals(e.getDropDownListName())) {
                    result=true;
                }
            });

        }

        return result;

    }

    public void updateAllInternalUser(String oldUserName,String oldUserId,String newUserName,String newUserId){

        System.out.println("Starting key update in all AddData entries...");
        result=false;
        List<AddData> deviceData = addDataRepository.findAll();
        if (deviceData != null && !deviceData.isEmpty()) {
            System.out.println("Found " + deviceData.size() + " AddData entries");

            for (AddData entry : deviceData) {
                updated = false;

                entry.getDeviceUsers().forEach(e->{
                    if(e.getUserName().equals(oldUserName)&& e.getUserId().equals(oldUserId)){
                        e.setUserName(newUserName);
                        e.setUserId(newUserId);
                        result=true;
                        updated=true;

                    }

                });
                if (updated) {
                    addDataRepository.save(entry);
                }
            }

            if(result){
                addDataService.update();
            }

        }
    }
}

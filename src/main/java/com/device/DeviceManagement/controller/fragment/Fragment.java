package com.device.DeviceManagement.controller.fragment;

import com.device.DeviceManagement.controller.service.*;
import com.device.DeviceManagement.model.*;
import com.device.DeviceManagement.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Controller
public class Fragment {
    String nameK="",actionK="",commentK="",nameMain;
    List<String> inputTypes = Arrays.asList(
            "text", "password", "email", "url", "search", "tel", "number", "range",
            "date", "month", "week", "time", "datetime-local", "color", "file",
            "checkbox", "radio", "button", "submit", "reset", "textarea","customDropDownList"
    );
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
    @Autowired
    private InternalUserService internalUserService;
   @GetMapping("/requestData/{pageName}")
   public ResponseEntity<List<RequestData>> requestData(
           @PathVariable String pageName,
           @RequestParam(defaultValue = "0") int page,
           @RequestParam(defaultValue = "1") int size,
           @RequestParam(name = "folder", required = false) String folderName,
           @RequestParam String departmentName,
           Model model) {

       if(folderName.equals("purchase")){
           if(pageName.equals("requestData")){
               Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());


               Page<RequestData> requestDataData=requestDataRepository.findByStatusAndInventory("1","Purchased",pageable);

               List<RequestData> requestData=requestDataData.getContent();
              // System.out.println(size+" "+requestData.size());
              // requestData.forEach(System.out::println);
               return ResponseEntity.ok(requestData);
           }
           if(pageName.equals("requestDataForPaymentExport")){
               Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());

               Page<RequestData> requestDataData=requestDataRepository.findByStatusAndPurchase("1","Accepted",pageable);

               List<RequestData> requestData=requestDataData.getContent();

               return ResponseEntity.ok(requestData);
           }
       }
       if(folderName.equals("superAdmin")) {

           if (pageName.equals("purchaseRequestData")) {
               Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());


               Page<RequestData> requestDataData=requestDataRepository.findByStatusAndPurchaseForSuperAdmin("1","Purchased",null,pageable);

               List<RequestData> requestData=requestDataData.getContent();
               // System.out.println(size+" "+requestData.size());
               // requestData.forEach(System.out::println);
               return ResponseEntity.ok(requestData);
           }
       }
     //  System.out.println(folderName+" "+pageName);
      // Page<AddData> result = addDataService.getPagedAddData(page, size, folderName,departmentName, pageName);
       Page<RequestData> requestDataData=requestDataService.getPagedAddData(page, size,folderName,departmentName,pageName); // ✅ page 0, size 10
       List<RequestData> requestData=requestDataData.getContent();
       // System.out.println(size+" "+requestData.size());
        //requestData.forEach(System.out::println);
       return ResponseEntity.ok(requestData);
   }
    @GetMapping("/requestColumns/{pageName}")
    public ResponseEntity<List<RequestColumn>> requestColumns(
            @PathVariable String pageName,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "1") int size,
            @RequestParam(name = "folder", required = false) String folderName,
            @RequestParam String departmentName,
            Model model) {

        List<RequestColumn> requestColumns = requestColumnService.add();
        return ResponseEntity.ok(requestColumns);
    }
    @GetMapping("/allAddData/{pageName}")
    public ResponseEntity<List<AddData>> allAddData(
            @PathVariable String pageName,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "1") int size,
            @RequestParam(name = "folder", required = false) String folderName,
            @RequestParam String departmentName,
            Model model) {

        Page<AddData> pagedAddData = addDataService.getPagedAddData(page, size,folderName,departmentName,pageName);
        List<AddData> allDeviceData = pagedAddData.getContent();
        return ResponseEntity.ok(allDeviceData);
    }
    @GetMapping("/serviceRequests/{pageName}")
    public ResponseEntity<List<ServiceRequest>> serviceRequests(
            @PathVariable String pageName,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "1") int size,
            @RequestParam(name = "folder", required = false) String folderName,
            @RequestParam String departmentName,
            Model model) {

        if(folderName.equals("purchase")){

            if(pageName.equals("requestData")){

                Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());

                Page<ServiceRequest> requestDataData=serviceRequestRepository.findByStatusAndAccessoriesPurchaseRequestStatus("1","Purchased",pageable);
                List<ServiceRequest> requestData=requestDataData.getContent();
                //System.out.println(size+" "+requestData.size());
                //requestData.forEach(System.out::println);
                return ResponseEntity.ok(requestData);
            }
            if(pageName.equals("requestDataForPaymentExport")){

                Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());

                Page<ServiceRequest> requestDataData=serviceRequestRepository.findByStatusAndPurchaseProposalToCooAns("1","Accepted",pageable);
                List<ServiceRequest> requestData=requestDataData.getContent();
                //System.out.println(size+" "+requestData.size());
                //requestData.forEach(System.out::println);
                return ResponseEntity.ok(requestData);
            }
        }

        if(folderName.equals("superAdmin")) {

            if (pageName.equals("purchaseRequestData")) {

                Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());

                Page<ServiceRequest> requestDataData = serviceRequestRepository.findByStatusAndPurchaseProposalToCooAnsEmptyCheck("1", List.of("Pending","Accepted"), pageable);
                List<ServiceRequest> requestData = requestDataData.getContent();
                System.out.println(size+" "+requestData.size());
                requestData.forEach(System.out::println);
                return ResponseEntity.ok(requestData);
            }
        }
        Page<ServiceRequest> serviceRequestsData = serviceRequestService.getPagedAddData(page, size,folderName,departmentName,pageName); // ✅ page 0, size 10
        List<ServiceRequest> serviceRequests = serviceRequestsData.getContent();
        return ResponseEntity.ok(serviceRequests);
    }
    @GetMapping("/fragment1/{pageName}")
    public String loadFragment1(@PathVariable String pageName,
                                @RequestParam(defaultValue = "0") int page,
                                @RequestParam(defaultValue = "1") int size,
                                @RequestParam(name = "folder", required = false) String folderName,
                                @RequestParam String departmentName,
                                Model model) {
        List<InternalUser> internalUsers=new ArrayList<>();
        if ("departmentUser".equals(folderName)) {
            model.addAttribute("departmentUserName", departmentName);
            internalUsers = internalUserService.add(folderName,departmentName);
            // ✅ Special case: analytic page
            if ("analyticFragment".equals(pageName)) {
                model.addAttribute("userCount", branchUserRepository.countByBranchNameAndStatus(departmentName,"1"));
                model.addAttribute("deviceCount", addDataRepository.countByStatusAndUserName("1",departmentName));
                model.addAttribute("servicingCount", serviceRequestRepository.countByStatusAndDepartmentName("1",departmentName));
                model.addAttribute("requestCount", requestDataRepository.countByStatusAndRequestMode("1","Accepted"));
                return folderName + "/" + pageName + " :: " + pageName;
            }
        } else {
            model.addAttribute("departmentName", departmentName);
            internalUsers = internalUserService.add(folderName,departmentName);
        }
        if ("analyticFragment".equals(pageName) && folderName.equals("customerCare")) {
            model.addAttribute("userCount", internalUserRepository.countByBranchNameAndStatus(departmentName,"1"));
            model.addAttribute("deviceCount", addDataRepository.countByStatusAndUserName("1",departmentName));
            model.addAttribute("servicingCount", serviceRequestRepository.countByStatusAndCustomerCareServiceRequestStatusAndCustomerCareSendDeviceToServiceStatus("1","Accepted","Device In Pending"));
            model.addAttribute("requestCountPending", requestDataRepository.countByStatusAndInventory_InventoryToCustomerCareDeviceSendingStatus("1","Pending"));
            return folderName + "/" + pageName + " :: " + pageName;
        }
        if ("analyticFragment".equals(pageName) && folderName.equals("service")) {
            model.addAttribute("userCount", internalUserRepository.countByBranchNameAndStatus(departmentName,"1"));
            model.addAttribute("deviceCount", addDataRepository.countByStatusAndUserName("1",departmentName));
            model.addAttribute("servicingCountPending", serviceRequestRepository.countByStatusAndCustomerCareSendDeviceToServiceStatus("1","Device In Pending"));
            model.addAttribute("servicingCountContinue", serviceRequestRepository.countByStatusAndCustomerCareSendDeviceToServiceStatusAndServiceCenterToCustomerCareStatusNot("1","Device In Received","Device received"));
            return folderName + "/" + pageName + " :: " + pageName;
        }
        if ("analyticFragment".equals(pageName) && folderName.equals("purchase")) {
            model.addAttribute("userCount", internalUserRepository.countByBranchNameAndStatus(departmentName,"1"));
            model.addAttribute("deviceCount", addDataRepository.countByStatusAndUserName("1",departmentName));
            model.addAttribute("deviceCountUnOrdered", addDataRepository.countByStatusAndUserNameAndUnOrderedDevice_COOUnOrderedDeviceAcceptedStatus("1",departmentName,"UnOrdered"));

            model.addAttribute("servicingCount", serviceRequestRepository.countByStatusAndDepartmentName("1",departmentName));
            Long totalPurchased = serviceRequestRepository.countPurchasedOccurrences("1", "Purchased");
            if (totalPurchased == null) totalPurchased = 0L;
            model.addAttribute("requestCountTotal", requestDataRepository.countByStatusAndInventory_InventoryStatus("1", "Purchased") + totalPurchased);
            model.addAttribute("requestCountContinues", requestDataRepository.countByStatusAndPurchaseRequestContinues("1", "Purchased","Accepted") + serviceRequestRepository.countPurchasedOccurrencesPending("1", "Purchased","Accepted"));

            return folderName + "/" + pageName + " :: " + pageName;
        }
        if ("analyticFragment".equals(pageName) && folderName.equals("inventory")) {
            model.addAttribute("userCount", internalUserRepository.countByBranchNameAndStatus(departmentName,"1"));
            model.addAttribute("deviceCount", addDataRepository.countByStatusAndUserName("1",departmentName));
            model.addAttribute("servicingCountPending", serviceRequestRepository.countAccessoriesOccurrencesFromServiceToInventory("1","Pending","Accepted"));
            model.addAttribute("requestCountPending", requestDataRepository.countByStatusAndRequestModeAndInventory_InventoryStatus("1","Accepted","Pending"));
            model.addAttribute("requestCountTotal", requestDataRepository.countByStatusAndRequestMode("1","Accepted"));

            return folderName + "/" + pageName + " :: " + pageName;
        }
        if ("analyticFragment".equals(pageName) && folderName.equals("superAdmin")) {
            model.addAttribute("userCount", internalUserRepository.countByBranchNameAndStatus(departmentName,"1"));
            model.addAttribute("deviceCountTotal", addDataRepository.countByStatus("1"));
            model.addAttribute("deviceCountDeviceCategory", categoryRepository.countByStatus("1"));
            model.addAttribute("deviceCountUnOrdered", addDataRepository.countByStatusAndUserNameAndUnOrderedDevice_COOUnOrderedDeviceAcceptedStatus("1","purchase","UnOrdered"));
            model.addAttribute("deviceCountFinalDeliveryDevice", requestDataRepository.countByStatusAndCooDeliveryAnsAdminPending("1","Purchased","Pending"));

            model.addAttribute("servicingCountTotalAccessories", serviceRequestRepository.countByStatusAndAccessoriesProposalSuperAdmin("1",null));
            model.addAttribute("servicingCountPendingAccessories", serviceRequestRepository.countByStatusAndAccessoriesProposalSuperAdminPending("1",null,"Accepted"));
            model.addAttribute("servicingCountServiceReportPending", serviceRequestRepository.countByStatusAndCooServiceReportAcceptStatus("1","Saved"));


            model.addAttribute("requestCountTotalPurchaseRequest", (requestDataRepository.countByStatusAndPurchaseForSuperAdmin("1","Purchased",null)+serviceRequestRepository.countByStatusAndPurchaseProposalToCooAnsEmptyCheck("1", List.of("Pending","Accepted"))));
            model.addAttribute("requestCountTotalPurchaseRequestPending", (requestDataRepository.countByStatusAndPurchaseForSuperAdminPending("1","Purchased","Pending")+serviceRequestRepository.countByStatusAndPurchaseProposalToCooAnsEmptyCheckPending("1", "Pending")));
            model.addAttribute("requestCountTotalAlternative", requestDataRepository.countByStatusAndCooAlternativeDevicePending("1",List.of("Alternative Proposal","Alternative Proposal Accepted"),"Pending"));

            model.addAttribute("requestCountTotal", requestDataRepository.countByStatus("1"));
            model.addAttribute("requestCountPending", requestDataRepository.countByStatusAndRequestMode("1","Pending"));

            return folderName + "/" + pageName + " :: " + pageName;
        }


        // Load only required data for this page (optimize later as needed)
        List<Column> universalColumns = universalColumnsService.Universal();
        List<Column> individualColumns = individualColumnsService.Individual();

        // ✅ Pagination logic for AddData (main scrollable content)

        Page<AddData> pagedAddData =
                addDataService.getPagedAddData(page, size, folderName, departmentName, pageName);

        List<AddData> allDeviceData = pagedAddData.getContent();


        //allDeviceData.forEach(System.out::println);
        // ✅ Correct lastPage calculation
        model.addAttribute("lastPage" + pageName, pagedAddData.isLast());
        model.addAttribute("totalPage" + pageName, pagedAddData.getTotalPages());

        // Optional debug log
        Page<ServiceRequest> serviceRequestsData = serviceRequestService.getPagedAddData(page, size,folderName,departmentName,pageName); // ✅ page 0, size 10
        List<ServiceRequest> serviceRequests = serviceRequestsData.getContent();
        model.addAttribute("lastPage"+pageName, serviceRequestsData.isLast());
        model.addAttribute("totalPage"+pageName, serviceRequestsData.getTotalPages());
         //System.out.println("Page "+pageName);
        Page<RequestData> requestDataData=requestDataService.getPagedAddData(page, size,folderName,departmentName,pageName); // ✅ page 0, size 10
        List<RequestData> requestData=requestDataData.getContent();
        model.addAttribute("lastPage"+pageName, requestDataData.isLast());
        model.addAttribute("totalPage"+pageName, requestDataData.getTotalPages());

        // Inject other required data (non-paginated for now)
        List<Category> categories = categoriesService.Category();
        List<User> allUser = userService.add();

        List<RequestColumn> requestColumns = requestColumnService.add();

        List<DropDownList> dropDownLists = dropDownListService.add();
        List<Designation> designations = designationService.add();
        List<BranchUser> userAccountData = branchUserService.add();

        model.addAttribute("data", categories);
        model.addAttribute("universalColumns", universalColumns);
        model.addAttribute("individualColumns", individualColumns);
        model.addAttribute("allDeviceData", allDeviceData);
        model.addAttribute("allUsers", allUser);
        model.addAttribute("indoorUsers", internalUsers);
        model.addAttribute("requestColumns", requestColumns);
        model.addAttribute("serviceRequests", serviceRequests);
        model.addAttribute("requestData", requestData);
        model.addAttribute("dropDownLists", dropDownLists);
        model.addAttribute("designations", designations);
        model.addAttribute("userAccountData", userAccountData);
        model.addAttribute("inputTypes", inputTypes);

        return folderName + "/" + pageName + " :: " + pageName;
    }

   /* @GetMapping("/fragment99/{pageName}")
    public String loadFragment(@PathVariable String pageName,
                               @RequestParam(name = "folder", required = false) String folderName,
                               @RequestParam String departmentName,
                               Model model) {
        List<InternalUser> internalUsers=new ArrayList<>();
        if(folderName.equals("departmentUser")){
            internalUsers=internalUserService.add(folderName,departmentName);
            model.addAttribute("departmentUserName", departmentName);
        }
        else{
            model.addAttribute("departmentName", departmentName);
            internalUsers = internalUserService.add(folderName,departmentName);
        }
        // Add any model attributes you want here based on fragmentName
        List<Category> categories = categoriesService.Category();
        List<Column> universalColumns = universalColumnsService.Universal();
        List<Column> individualColumns = individualColumnsService.Individual();
        // List<AddData> allDeviceData=addDataService.add();
        Page<AddData> pagedAddData = addDataService.getPagedAddData(0, 7,departmentName); // ✅ page 0, size 10
        List<AddData> allDeviceData = pagedAddData.getContent();
        boolean lastPage = pagedAddData.getTotalPages() <= 1;
        model.addAttribute("lastPage", lastPage);
        model.addAttribute("totalPage", pagedAddData.getTotalPages());


        List<User> allUser=userService.add();

        List<RequestColumn> requestColumns=requestColumnService.add();
        List<ServiceRequest> serviceRequests = serviceRequestService.add();
        List<RequestData> requestData=requestDataService.add();
        List<DropDownList> dropDownLists=dropDownListService.add();
        List<Designation> designations=designationService.add();
        List<BranchUser> userAccountData=branchUserService.add();

        model.addAttribute("data",categories);
        model.addAttribute("universalColumns",universalColumns);
        model.addAttribute("individualColumns",individualColumns);
        model.addAttribute("individualColumns",individualColumns);
        model.addAttribute("allDeviceData",allDeviceData);
        model.addAttribute("allUsers",allUser);
        model.addAttribute("indoorUsers",internalUsers);
        model.addAttribute("requestColumns",requestColumns);
        model.addAttribute("serviceRequests", serviceRequests);
        model.addAttribute("requestData",requestData);
        model.addAttribute("dropDownLists",dropDownLists);
        model.addAttribute("designations",designations);
        model.addAttribute("userAccountData",userAccountData);


        model.addAttribute("inputTypes", inputTypes);
        return folderName+"/" + pageName + " :: " + pageName;
    }*/
    @GetMapping("/clearCache")
    public  String clearCache(){
        categoriesService.clearCategoriesCache();
        individualColumnsService.clearUniversalColumnCache();
        universalColumnsService.clearUniversalColumnCache();
        addDataService.clearCache();
        branchUserService.clearCache();
        designationService.clearCache();
        dropDownListService.clearCache();
        requestColumnService.clearCache();
        requestDataService.clearCache();
        serviceRequestService.clearCache();
        userService.clearCache();
        internalUserService.clearCache();
        return "Login";
    }

}

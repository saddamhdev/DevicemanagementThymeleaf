package com.device.DeviceManagement.controller.fragment;

import com.device.DeviceManagement.controller.service.*;
import com.device.DeviceManagement.model.*;
import com.device.DeviceManagement.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

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
    @GetMapping("/fragment1299/{pageName}")
    public String loadFragment12(@PathVariable String pageName,
                                @RequestParam(defaultValue = "0") int page,
                                @RequestParam(defaultValue = "10") int size,
                               @RequestParam(name = "folder", required = false) String folderName,
                               @RequestParam String departmentName,
                               Model model) {
       // System.out.println(pageName+" "+folderName+" "+departmentName);
        if(folderName.equals("departmentUser")){
            model.addAttribute("departmentUserName", departmentName);
        }
        else{
            model.addAttribute("departmentName", departmentName);

        }
        // Add any model attributes you want here based on fragmentName
        Page<Category> categoriesData = categoriesService.getPagedAddData(page, size); // ✅ page 0, size 10
        List<Category> categories=categoriesData.getContent();
        model.addAttribute("lastPage"+pageName, categoriesData.getTotalPages() <=-1);
        model.addAttribute("totalPage"+pageName, categoriesData.getTotalPages());



        List<Column> universalColumns = universalColumnsService.Universal();
        List<Column> individualColumns = individualColumnsService.Individual();

        Page<User> allUserData=userService.getPagedAddData(page, size); // ✅ page 0, size 10
        List<User> allUser=userService.add();
        model.addAttribute("lastPage"+pageName, allUserData.getTotalPages() <=-1);
        model.addAttribute("totalPage"+pageName, allUserData.getTotalPages());

        Page<InternalUser> internalUsersData=internalUserService.getPagedAddData(page, size); // ✅ page 0, size 10
        List<InternalUser> internalUsers=internalUserService.add();
        model.addAttribute("lastPage"+pageName, internalUsersData.getTotalPages() <=-1);
        model.addAttribute("totalPage"+pageName, internalUsersData.getTotalPages());

        Page<RequestColumn> requestColumnsData=requestColumnService.getPagedAddData(page, size); // ✅ page 0, size 10
        List<RequestColumn> requestColumns=requestColumnService.add();
        model.addAttribute("lastPage"+pageName, requestColumnsData.getTotalPages() <=-1);
        model.addAttribute("totalPage"+pageName, requestColumnsData.getTotalPages());

        Page<ServiceRequest> serviceRequestsData = serviceRequestService.getPagedAddData(page, size); // ✅ page 0, size 10
        List<ServiceRequest> serviceRequests = serviceRequestService.add();
        model.addAttribute("lastPage"+pageName, serviceRequestsData.getTotalPages() <=-1);
        model.addAttribute("totalPage"+pageName, serviceRequestsData.getTotalPages());

        Page<RequestData> requestDataData=requestDataService.getPagedAddData(page, size); // ✅ page 0, size 10
        List<RequestData> requestData=requestDataService.add();
        model.addAttribute("lastPage"+pageName, requestDataData.getTotalPages() <=-1);
        model.addAttribute("totalPage"+pageName, requestDataData.getTotalPages());

        Page<DropDownList> dropDownListsData=dropDownListService.getPagedAddData(page, size); // ✅ page 0, size 10
        List<DropDownList> dropDownLists=dropDownListService.add();
        model.addAttribute("lastPage"+pageName, dropDownListsData.getTotalPages() <=-1);
        model.addAttribute("totalPage"+pageName,dropDownListsData.getTotalPages());

        Page<Designation> designationsData=designationService.getPagedAddData(page, size); // ✅ page 0, size 10
        List<Designation> designations=designationService.add();
        model.addAttribute("lastPage"+pageName, designationsData.getTotalPages() <=-1);
        model.addAttribute("totalPage"+pageName,designationsData.getTotalPages());

        Page<BranchUser> userAccountDataData=branchUserService.getPagedAddData(page, size); // ✅ page 0, size 10
        List<BranchUser> userAccountData=branchUserService.add();
        model.addAttribute("lastPage"+pageName, userAccountDataData.getTotalPages() <=-1);
        model.addAttribute("totalPage"+pageName,userAccountDataData.getTotalPages());

        // ✅ Pagination logic for AddData (main scrollable content)
        Page<AddData> pagedAddData = addDataService.getPagedAddData(page, size);
        List<AddData> allDeviceData = pagedAddData.getContent();

        // ✅ Correct lastPage calculation
        boolean isLastPage = page >= pagedAddData.getTotalPages() - 1;
        model.addAttribute("lastPage" + pageName, pagedAddData.isLast());
        model.addAttribute("totalPage" + pageName, pagedAddData.getTotalPages());
        System.out.println("Total Elements: " + pagedAddData.getTotalElements());


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
        System.out.println(folderName+"/" + pageName + " :: " + pageName);
        return folderName+"/" + pageName + " :: " + pageName;
    }
    @GetMapping("/fragment1/{pageName}")
    public String loadFragment1(@PathVariable String pageName,
                                @RequestParam(defaultValue = "0") int page,
                                @RequestParam(defaultValue = "1") int size,
                                @RequestParam(name = "folder", required = false) String folderName,
                                @RequestParam String departmentName,
                                Model model) {

        if ("departmentUser".equals(folderName)) {
            model.addAttribute("departmentUserName", departmentName);
        } else {
            model.addAttribute("departmentName", departmentName);
        }

        // Load only required data for this page (optimize later as needed)
        List<Column> universalColumns = universalColumnsService.Universal();
        List<Column> individualColumns = individualColumnsService.Individual();

        // ✅ Pagination logic for AddData (main scrollable content)
        Page<AddData> pagedAddData = addDataService.getPagedAddData(page, size);
        List<AddData> allDeviceData = pagedAddData.getContent();

        // ✅ Correct lastPage calculation
        model.addAttribute("lastPage" + pageName, pagedAddData.isLast());
        model.addAttribute("totalPage" + pageName, pagedAddData.getTotalPages());
       //System.out.println("Total Elements: " + pagedAddData.getTotalElements());

        // Optional debug log
        Page<ServiceRequest> serviceRequestsData = serviceRequestService.getPagedAddData(page, size); // ✅ page 0, size 10
        List<ServiceRequest> serviceRequests = serviceRequestsData.getContent();
        model.addAttribute("lastPage"+pageName, serviceRequestsData.isLast());
        model.addAttribute("totalPage"+pageName, serviceRequestsData.getTotalPages());

        Page<RequestData> requestDataData=requestDataService.getPagedAddData(page, size); // ✅ page 0, size 10
        List<RequestData> requestData=requestDataData.getContent();
        model.addAttribute("lastPage"+pageName, requestDataData.isLast());
        model.addAttribute("totalPage"+pageName, requestDataData.getTotalPages());
        System.out.println("Page: " + page + ", Size: " + size + ", Total Pages: " + requestDataData.getTotalPages());
       // System.out.println(requestData.size());
        allDeviceData.forEach(e->{

            System.out.println( e.toString());
        });
        // Inject other required data (non-paginated for now)
        List<Category> categories = categoriesService.Category();
        List<User> allUser = userService.add();
        List<InternalUser> internalUsers = internalUserService.add();
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

        System.out.println(folderName + "/" + pageName + " :: " + pageName);
        return folderName + "/" + pageName + " :: " + pageName;
    }

    @GetMapping("/fragment99/{pageName}")
    public String loadFragment(@PathVariable String pageName,
                               @RequestParam(name = "folder", required = false) String folderName,
                               @RequestParam String departmentName,
                               Model model) {
        // System.out.println(pageName+" "+folderName+" "+departmentName);
        if(folderName.equals("departmentUser")){
            model.addAttribute("departmentUserName", departmentName);
        }
        else{
            model.addAttribute("departmentName", departmentName);

        }
        // Add any model attributes you want here based on fragmentName
        List<Category> categories = categoriesService.Category();
        List<Column> universalColumns = universalColumnsService.Universal();
        List<Column> individualColumns = individualColumnsService.Individual();
        // List<AddData> allDeviceData=addDataService.add();
        Page<AddData> pagedAddData = addDataService.getPagedAddData(0, 7); // ✅ page 0, size 10
        List<AddData> allDeviceData = pagedAddData.getContent();
        boolean lastPage = pagedAddData.getTotalPages() <= 1;
        model.addAttribute("lastPage", lastPage);
        model.addAttribute("totalPage", pagedAddData.getTotalPages());
        System.out.println("lastPage status "+lastPage+" PageNumber 0 "+"PageSize 7"+" Total Page "+pagedAddData.getTotalPages());
        allDeviceData.forEach(e->{
            System.out.println(e.getVisibleId());
        });

        List<User> allUser=userService.add();
        List<InternalUser> internalUsers=internalUserService.add();
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
       // System.out.println(folderName+"/" + pageName + " :: " + pageName);
        return folderName+"/" + pageName + " :: " + pageName;
    }
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

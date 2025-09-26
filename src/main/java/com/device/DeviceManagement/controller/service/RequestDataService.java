package com.device.DeviceManagement.controller.service;

import com.device.DeviceManagement.model.RequestColumn;
import com.device.DeviceManagement.model.RequestData;
import com.device.DeviceManagement.model.User;
import com.device.DeviceManagement.repository.RequestDataRepository;
import com.device.DeviceManagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequestDataService {
    @Autowired
    private RequestDataRepository requestDataRepository;
    // Check cache first, if not found, load from DB and cache it
    @Cacheable(value = "RequestDataService", key = "#folderName + '-' + #pageName + '-' + #page + '-' + #size")
    public Page<RequestData> getPagedAddData(int page, int size,String folderName, String userName,String pageName) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());

        if(folderName.equals("departmentUser")){
            return requestDataRepository.findByStatusAndDepartmentName("1",userName,pageable);
        }
        if(folderName.equals("inventory")){
            if(pageName.equals("requestData")){
                return requestDataRepository.findByStatusAndRequestMode("1","Accepted",pageable);
            }
            if(pageName.equals("requestDataProposal")){
                return requestDataRepository.findByStatusAndInventory_InventoryStatus("1","Purchased",pageable);
            }
            if(pageName.equals("requestDataAlternative")){
                return requestDataRepository.findByStatusAndInventory_InventoryStatus("1","Alternative Proposal Accepted",pageable);
            }

        }
        if(folderName.equals("purchase")){
            if(pageName.equals("requestData")){
                return requestDataRepository.findByStatusAndInventoryStatusAndPurchaseStatusNot("1","Purchased","Accepted",pageable);
            }


        }
        if(folderName.equals("superAdmin")) {
            if (pageName.equals("listRequestData")) {
                return requestDataRepository.findByStatusAndAlternativeDeviceRequestForSuperAdmin("1",List.of("Alternative Proposal","Alternative Proposal Accepted"),pageable);
            }
            if (pageName.equals("deliveryPurchaseDevice")) {

                return requestDataRepository.findByStatusAndFinalDeliveryDeviceStatus("1","Purchased","Pending",pageable);
            }
        }
        if(folderName.equals("customerCare")) {
            if (pageName.equals("requestData")) {
                return requestDataRepository.findByStatusAndInventoryToCustomerCareDeviceSendingStatus("1",List.of("Pending","Accepted"),pageable);
            }

        }

        return requestDataRepository.findByStatus("1",pageable);

    }
    @Cacheable(value = "RequestDataService")
    public List<RequestData> add() {
        System.out.println("Fetching user from DB...");
        return requestDataRepository.findByStatus("1");
    }

    // Use this to update the cache when data is modified
    @CachePut(value = "RequestDataService")
    public List<RequestData> update() {
        // also updates the cache
        System.out.println("Cache Updated!");
        return requestDataRepository.findByStatus("1");
    }

    // Optional: Evict cache
    @CacheEvict(value = "RequestDataService", allEntries = true)
    public void clearCache() {
        System.out.println("Cache cleared!");
    }
}

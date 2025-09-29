package com.device.DeviceManagement.controller.service;

import com.device.DeviceManagement.model.RequestData;
import com.device.DeviceManagement.model.ServiceRequest;
import com.device.DeviceManagement.model.User;
import com.device.DeviceManagement.repository.ServiceRequestRepository;
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

import java.util.Arrays;
import java.util.List;

@Service
public class ServiceRequestService {
    @Autowired
    private ServiceRequestRepository serviceRequestRepository;
    // Check cache first, if not found, load from DB and cache it
    @Cacheable(value = "ServiceRequestService", key = "#folderName + '-' + #pageName + '-' + #page + '-' + #size")
    public Page<ServiceRequest> getPagedAddData(int page, int size, String folderName,String userName,String pageName) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());

        if(folderName.equals("departmentUser")){
            System.out.println(folderName);
            return serviceRequestRepository.findByStatusAndDepartmentName("1", userName,pageable);
        }
        if(folderName.equals("inventory")){

            if (pageName.equals("serviceAccessoriesPendingData")) {
                System.out.println(folderName+pageName);
                return serviceRequestRepository
                        .findByStatusAndAccessoriesRequestStatus("1","Pending" ,pageable);
            }
            if (pageName.equals("serviceAccessoriesPendingPurchaseData")) {
                System.out.println(folderName+pageName);
                return serviceRequestRepository
                        .findByStatusAndAccessoriesAlternativeRequestStatus("1","Pending" ,pageable);
            }
            if (pageName.equals("serviceAccessoriesPendingAlternativeData")) {
                System.out.println(folderName+pageName);
                return serviceRequestRepository
                        .findByStatusAndAccessoriesAlternativeRequestStatus("1","Accepted" ,pageable);
            }
            if (pageName.equals("serviceAccessoriesDeliveryData")) {
                System.out.println(folderName+pageName);
                return serviceRequestRepository
                        .findByStatusAndAccessoriesList("1","Accepted" ,pageable);
            }

        }
        if(folderName.equals("service")){
            System.out.println(folderName+pageName);
            if(pageName.equals("deviceInOutList")){
                return serviceRequestRepository.findByStatusInAndCustomerCareSendDeviceToServiceStatusInAndCustomerCareReceiveDeviceFromServiceStatusNot(
                        "1",
                        Arrays.asList("Device In Pending", "Device In Received"),
                        "Device received",   // ❌ exclude this value
                        pageable
                );
            }
            if(pageName.equals("servicingList")){
                return serviceRequestRepository.findByStatusInAndCustomerCareSendDeviceToServiceStatusIn(
                        "1",
                        List.of("Device In Received"),
                        pageable
                );
            }
            if(pageName.equals("cooFeedback")){
                return serviceRequestRepository.findByStatusAndCOOFeedBackList(
                        "1",
                        "Accepted",
                        pageable
                );
            }
            if(pageName.equals("serviceAccessoriesListData")){
                return serviceRequestRepository.findByStatusAndServiceCenterToInventoryAccessoriesRequestStatusListNot(
                        "1",
                        null,
                        pageable
                );
            }
        }
        if(folderName.equals("purchase")) {
            System.out.println(folderName + pageName);
            if (pageName.equals("servicePriceData")) {
                return serviceRequestRepository.findByStatusAndPriceSettingFromPurchase(
                        "1",
                        null,
                        pageable
                );
            }
        }
        if(folderName.equals("superAdmin")) {
            System.out.println(folderName + pageName);
            if (pageName.equals("serviceProposalData")) {
                return serviceRequestRepository.findByStatusAndPriceSettingFromPurchase(
                        "1",
                        null,
                        pageable
                );
            }
            if (pageName.equals("serviceReportData")) {
                return serviceRequestRepository.findByStatusAndServiceReportStatus(
                        "1",
                        "Saved",
                        pageable
                );
            }
        }

        return serviceRequestRepository.findByStatus("1", pageable);
    }
    @Cacheable(value = "ServiceRequestService")
    public List<ServiceRequest> add() {
        System.out.println("Fetching user from DB...");
        return serviceRequestRepository.findByStatus("1");
    }

    // Use this to update the cache when data is modified
    @CachePut(value = "ServiceRequestService")
    public List<ServiceRequest> update() {
        // also updates the cache
        System.out.println("Cache Updated!");
        return serviceRequestRepository.findByStatus("1");
    }

    // Optional: Evict cache
    @CacheEvict(value = "ServiceRequestService", allEntries = true)
    public void clearCache() {
        System.out.println("Cache cleared!");
    }
}

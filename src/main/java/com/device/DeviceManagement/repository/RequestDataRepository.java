package com.device.DeviceManagement.repository;

import com.device.DeviceManagement.model.RequestData;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RequestDataRepository extends MongoRepository<RequestData, String> {
    // Additional query methods can be defined here if needed
    List<RequestData> findByDepartmentNameAndStatus(String departmentName, String status);
    List<RequestData> findByStatus(String status);
    Page<RequestData> findByStatus(String status, Pageable pageable);
    Page<RequestData> findByStatusAndDepartmentName(String status,String userName, Pageable pageable);
    Page<RequestData> findByStatusAndRequestMode(String status,String requestMode, Pageable pageable);
    Page<RequestData> findByStatusAndInventory_InventoryStatus(String status,String InventoryStatus, Pageable pageable);

    RequestData findByIdAndStatus(String Id,String status);

    // Query to find a single record by id and status
    @Query("{ 'id': ?0, 'status': ?1 }")
    Optional<RequestData> findDevicesIDS(String id, String status);
    @Query("{ 'status': ?0, " +
            "  'inventory.inventoryStatus': ?1, " +
            "  'purchase.purchaseDeviceSenderToInventoryStatus': { $ne: ?2 } }")
    Page<RequestData> findByStatusAndInventoryStatusAndPurchaseStatusNot(
            String rootStatus,
            String inventoryStatus,
            String excludedPurchaseStatus,
            Pageable pageable
    );

    // 2. By status + inventory
    @Query("{ 'status': ?0, 'inventory.inventoryStatus': ?1 }")
    Page<RequestData> findByStatusAndInventory(String status, String inv, Pageable pageable);

    @Query("{ 'status': ?0, 'purchase.cooAns': ?1 }")
    Page<RequestData> findByStatusAndPurchase(String status, String purchaseAns, Pageable pageable);

    @Query("{ 'status': ?0, 'inventory.inventoryStatus': ?1, 'purchase.cooAns': { $exists: true, $ne: ?2 } }")
    Page<RequestData> findByStatusAndPurchaseForSuperAdmin(String status,String inventoryStatus, String purchaseAns, Pageable pageable);
    // 3. Add purchase condition
    @Query("{ 'status': ?0, 'inventory.inventoryStatus': ?1, 'purchase.purchaseDeviceSenderToInventoryStatus': { $exists: true, $ne: ?2 } }")
    Page<RequestData> findByStatusAndInventoryPurchase(String status, String inv, String purchase, Pageable pageable);


    @Query("{ 'status': ?0, 'inventory.inventoryStatus': { $in: ?1 } }")
    Page<RequestData> findByStatusAndAlternativeDeviceRequestForSuperAdmin(String status,List<String> inventoryStatus, Pageable pageable);

    @Query("{ 'status': ?0, 'inventory.inventoryStatus': ?1, 'inventory.inventoryToCustomerCareDeviceSendingStatus': ?2 }")
    Page<RequestData> findByStatusAndFinalDeliveryDeviceStatus(String status, String inv, String purchaseCooStatus, Pageable pageable);


    long countByStatusAndRequestMode(String status, String requestMode);
}

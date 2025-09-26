package com.device.DeviceManagement.repository;


import com.device.DeviceManagement.model.AddData;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AddDataRepository extends MongoRepository<AddData, String> {
    // Custom query methods (if needed) can be defined here
    List<AddData> findByCategoryName(String categoryName);
    List<AddData> findByStatus(String status);

    Page<AddData> findByStatus(String status, Pageable pageable);
    Page<AddData> findByStatusAndUserName(String status,String userName, Pageable pageable);
    List<AddData> findByCategoryNameAndStatus(String categoryName, String status);
    AddData findByIdAndStatus(String id,String status);
    Optional<AddData> findByVisibleIdAndStatus(String deviceName, String status);
    // Custom count query for combined field
    @Query("{ 'deviceTypeServicingOrRequestingOrOldAsInputting': ?0, 'status': ?1 }")
    List<AddData> findByDeviceTypeServicingOrRequestingOrOldAsInputtingAndStatus(String deviceType, String status);

    @Query("{ 'status': ?0, 'unOrderedDevice.unWantedSendDeviceToInventoryStatus': ?1 }")
    Page<AddData> findByStatusAndUnOrderedDeviceStatus(
            String rootStatus,
            String nestedStatus,
            Pageable pageable
    );

    @Query("{ 'status': ?0, 'unOrderedDevice.COOUnOrderedDeviceAcceptedStatus': { $in: ?1 } }")
    Page<AddData> findByStatusAndUnOrderedDeviceListForPurchase(
            String rootStatus,
            List<String> nestedStatus,
            Pageable pageable
    );
    @Query("{ 'userName': ?0, 'status': ?1, $or: [ " +
            "{ 'unOrderedDevice.COOUnOrderedDeviceAcceptedStatus': { $ne: ?2 } }, " +
            "{ 'unOrderedDevice': { $exists: false } } " +
            "] }")
    Page<AddData> findFilteredForPurchase(
            String userName,
            String status,
            String notEqualStatus,
            Pageable pageable
    );








    long countByStatusAndUserName(String status, String BranchName);
    long countByStatus(String status);

    long countByStatusAndUserNameAndUnOrderedDevice_COOUnOrderedDeviceAcceptedStatus(String status, String BranchName,String orderedStatus);





}

package com.device.DeviceManagement.repository;

import com.device.DeviceManagement.model.ServiceRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceRequestRepository extends MongoRepository<ServiceRequest, String> {
    List<ServiceRequest> findByStatus(String status);
    Page<ServiceRequest> findByStatus(String status, Pageable pageable);

    Page<ServiceRequest> findByStatusAndServiceReportStatus(String status,String reportStatus, Pageable pageable);
    Page<ServiceRequest> findByStatusAndServiceCenterToInventorySendDeviceRequestTimeNotNull(String status, Pageable pageable);
    @Query("{ 'status': ?0, 'allProblem.proposalSolution.serviceCenterToInventoryAccessoriesRequestStatus': ?1 }")
    Page<ServiceRequest> findByStatusAndAccessoriesRequestStatus(
            String rootStatus,
            String nestedStatus,
            Pageable pageable
    );

    @Query("{ 'status': ?0, 'allProblem.proposalSolution.deviceManageType': ?1 }")
    Page<ServiceRequest> findByStatusAndAccessoriesPurchaseRequestStatus(
            String rootStatus,
            String nestedStatus,
            Pageable pageable
    );

    @Query("{ 'status': ?0, 'allProblem.proposalSolution.purchaseProposalToCooAns': ?1 }")
    Page<ServiceRequest> findByStatusAndPurchaseProposalToCooAns(
            String rootStatus,
            String nestedStatus,
            Pageable pageable
    );

    @Query("{ 'status': ?0, 'allProblem.proposalSolution.purchaseProposalToCooAns': { $in: ?1 } }")
    Page<ServiceRequest> findByStatusAndPurchaseProposalToCooAnsEmptyCheck(
            String rootStatus,
            List<String> cooStatus,
            Pageable pageable
    );

    @Query("{ 'status': ?0, 'allProblem.proposalSolution.inventoryToServiceCenterDeviceStatus': ?1 }")
    Page<ServiceRequest> findByStatusAndAccessoriesAlternativeRequestStatus(
            String rootStatus,
            String nestedStatus,
            Pageable pageable
    );

    @Query("{ 'status': ?0, 'allProblem.proposalSolution.purchaseDeviceSenderToInventoryStatus': ?1 }")
    Page<ServiceRequest> findByStatusAndAccessoriesPurchaseToInventoryRequestStatus(
            String rootStatus,
            String nestedStatus,
            Pageable pageable
    );

    @Query("{ 'status': ?0, 'allProblem.proposalSolution.inventoryToServiceCenterDeviceStatus': ?1 }")
    Page<ServiceRequest> findByStatusAndAccessoriesList(
            String rootStatus,
            String nestedStatus,
            Pageable pageable
    );
    @Query("{ 'status': ?0, 'allProblem.proposalSolution.cooManInfoOfPriceAcceptanceCommentStatus': ?1 }")
    Page<ServiceRequest> findByStatusAndCOOFeedBackList(
            String rootStatus,
            String nestedStatus,
            Pageable pageable
    );
    @Query("{ 'status': ?0, 'allProblem.proposalSolution.serviceCenterToInventoryAccessoriesRequestStatus': { $ne: ?1 } }")
    Page<ServiceRequest> findByStatusAndServiceCenterToInventoryAccessoriesRequestStatusListNot(
            String rootStatus,
            String nestedStatus,
            Pageable pageable
    );

    @Query("{ 'status': ?0, " +
            " 'allProblem.proposalSolution.inventoryToServiceCenterDeviceStatus': { $ne: ?1 }, " +
            " 'allProblem.proposalSolution.inventoryForPurchaseRequestStatus': { $ne: ?2 } }")
    Page<ServiceRequest> findByStatusAndProposalSolutionConditionsForPurchase(
            String rootStatus,
            String notEqualDeviceStatus,   // e.g. "Accepted"
            String notEqualPurchaseStatus, // e.g. null
            Pageable pageable
    );

    @Query("{ 'status': ?0, " +
            " 'allProblem.proposalSolution.name': { $ne: ?1 } }")
    Page<ServiceRequest> findByStatusAndPriceSettingFromPurchase(
            String rootStatus,
            String notEqualNull, // e.g. null
            Pageable pageable
    );


    Page<ServiceRequest> findByStatusInAndCustomerCareSendDeviceToServiceStatusInAndCustomerCareReceiveDeviceFromServiceStatusNot(
            String rootStatuses,
            List<String> careStatuses,
            String notReceived,
            Pageable pageable
    );
    Page<ServiceRequest> findByStatusInAndCustomerCareSendDeviceToServiceStatusIn(
            String rootStatuses,
            List<String> careStatuses,
            Pageable pageable
    );

    Page<ServiceRequest> findByStatusAndDepartmentName(String status,String userName, Pageable pageable);
    ServiceRequest findByIdAndStatus(String id, String status);
    // Query to find a single record by id and status
    @Query("{ 'id': ?0, 'status': ?1 }")
    Optional<ServiceRequest> findDevicesIDS(String id, String status);


    long countByStatusAndDepartmentName(String status,String deptName);
    long countByStatusAndCustomerCareServiceRequestStatusAndCustomerCareSendDeviceToServiceStatus(String status, String customerCareServiceRequestStatus, String customerCareSendDeviceToServiceStatus);
    long countByStatusAndCustomerCareSendDeviceToServiceStatus(String status,String requestStatusPending);
    long countByStatusAndCustomerCareSendDeviceToServiceStatusAndServiceCenterToCustomerCareStatusNot(String status,String requestStatusReceived,String deviceStatusDelivered);
    @Aggregation(pipeline = {
            "{ $match: { status: ?0 } }",
            "{ $unwind: '$allProblem' }",
            "{ $unwind: '$allProblem.proposalSolution' }",
            "{ $match: { 'allProblem.proposalSolution.deviceManageType': ?1 } }",
            "{ $count: 'count' }"
    })
    Long countPurchasedOccurrences(String status, String deviceManageType);

    @Aggregation(pipeline = {
            "{ $match: { status: ?0 } }",
            "{ $unwind: '$allProblem' }",
            "{ $unwind: '$allProblem.proposalSolution' }",
            "{ $match: { 'allProblem.proposalSolution.deviceManageType': ?1 } }",
            "{ $match: { 'allProblem.proposalSolution.purchaseDeviceSenderToInventoryStatus': { $exists: false, $ne: ?2 }} }",
            "{ $count: 'count' }"
    })
    Long countPurchasedOccurrencesPending(String status, String deviceManageType, String purchaseDeviceSenderToInventoryStatus);

    @Aggregation(pipeline = {
            "{ $match: { status: ?0 } }",
            "{ $unwind: '$allProblem' }",
            "{ $unwind: '$allProblem.proposalSolution' }",
            "{ $match: { 'allProblem.proposalSolution.serviceCenterToInventoryAccessoriesRequestStatus': ?1 } }",
            "{ $match: { 'allProblem.proposalSolution.inventoryToServiceCenterDeviceStatus': { $ne: ?2 } } }",
            "{ $count: 'count' }"
    })
    Long countAccessoriesOccurrencesFromServiceToInventory(
            String status,
            String serviceCenterToInventoryAccessoriesRequestStatus,
            String inventoryToServiceCenterDeviceStatus
    );


    @Aggregation(pipeline = {
            "{ $match: { status: ?0 } }",
            "{ $unwind: '$allProblem' }",
            "{ $unwind: '$allProblem.proposalSolution' }",
            "{ $match: { 'allProblem.proposalSolution.purchaseProposalToCooAns': { $in: ?1 } } }",
            "{ $count: 'count' }"
    })
    Long countByStatusAndPurchaseProposalToCooAnsEmptyCheck(
            String rootStatus,
            List<String> cooStatus
    );

    @Aggregation(pipeline = {
            "{ $match: { status: ?0 } }",
            "{ $unwind: '$allProblem' }",
            "{ $unwind: '$allProblem.proposalSolution' }",
            "{ $match: { 'allProblem.proposalSolution.purchaseProposalToCooAns': ?1 } }",
            "{ $count: 'count' }"
    })
    Long countByStatusAndPurchaseProposalToCooAnsEmptyCheckPending(
            String rootStatus,
            String cooStatus
    );

    @Aggregation(pipeline = {
            "{ $match: { status: ?0 } }",
            "{ $unwind: '$allProblem' }",
            "{ $unwind: '$allProblem.proposalSolution' }",
            "{ $match: { 'allProblem.proposalSolution.name': { $ne: ?1} } }",
            "{ $count: 'count' }"
    })
    Long countByStatusAndAccessoriesProposalSuperAdmin(
            String rootStatus,
            String cooStatus
    );

    @Aggregation(pipeline = {
            "{ $match: { status: ?0 } }",
            "{ $unwind: '$allProblem' }",
            "{ $unwind: '$allProblem.proposalSolution' }",
            "{ $match: { 'allProblem.proposalSolution.name': { $ne: ?1} } }",
            "{ $match: { 'allProblem.proposalSolution.cooManInfoOfPriceAcceptanceCommentStatus': { $ne: ?2} } }",
            "{ $count: 'count' }"
    })
    Long countByStatusAndAccessoriesProposalSuperAdminPending(
            String rootStatus,
            String checkExistence,
            String cooAns
    );


    @Aggregation(pipeline = {
            "{ $match: { status: ?0, 'serviceReportStatus': ?1, 'cooServiceReportAcceptStatus': { $exists: false } } }",
            "{ $count: 'count' }"
    })
    Long countByStatusAndCooServiceReportAcceptStatus(
            String status,
            String reportStatus
    );






}

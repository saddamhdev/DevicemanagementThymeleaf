package com.device.DeviceManagement.repository;

import com.device.DeviceManagement.model.InternalUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface InternalUserRepository extends MongoRepository<InternalUser, String> {

    List<InternalUser> findByStatus(String status);
    List<InternalUser> findByStatusAndUserName(String status,String userName);
    List<InternalUser> findByStatusAndUserId(String status,String userId);

    List<InternalUser> findByStatusAndBranchName(String status,String branchName);
    Page<InternalUser> findByStatus(String status, Pageable pageable);
    List<InternalUser> findByBranchNameAndStatus(String branchName,String status);
    InternalUser findByUserNameAndUserPasswordAndStatus(String userName,String userPassword,String status);
    InternalUser findByUserIdAndUserPasswordAndStatus(String userId,String userPassword,String status);

    InternalUser findByBranchNameAndUserNameAndUserIdAndUserPasswordAndStatus(
            String branchName,
           String userName,
           String userId,
            String userPassword,
           String status);

    boolean existsByBranchNameAndUserNameAndUserIdAndStatus(
            String branchName,
            String userName,
            String userId,
            String status
    );

    boolean existsByUserNameAndUserPasswordAndStatus(String userName,String userPassword,String status);
    boolean existsByUserIdAndUserPasswordAndStatus(String userId,String userPassword,String status);
    boolean existsByUserNameAndStatus(String userName,String status);
    boolean existsByUserIdAndStatus(String userId,String status);

    // NEW METHODS
    long countByStatus(String status);
    long countByBranchNameAndStatus(String branchName, String status);

}

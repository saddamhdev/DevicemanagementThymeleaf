package com.device.DeviceManagement.repository;


import com.device.DeviceManagement.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserRepository extends MongoRepository<User, String> {
    User findByUserName(String userName);
    List<User> findByStatus(String status);
    Page<User> findByStatus(String status, Pageable pageable);
    User findByUserNameAndUserIdAndUserPasswordAndStatus(String userName,String userId,String userPassword,String status);
    boolean existsByUserNameAndUserIdAndStatus(String userName,String userId,String status);
    boolean existsByUserNameAndUserPasswordAndStatus(String userName,String userPassword,String status);
    boolean existsByUserNameAndStatus(String userName,String status);
}

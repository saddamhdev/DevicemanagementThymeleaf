package com.device.DeviceManagement.repository;


import com.device.DeviceManagement.model.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends MongoRepository<Category, String> {
    // write query  about delete categoryName according to categoryName
    void deleteByCategoryName(String categoryName);
    // Method to find a category by its name
    Category findByCategoryName(String categoryName);
    Optional<Category> findByCategoryNameAndStatus(String categoryName, String status);
    // update categoryName according to categoryName
    List<Category> findByStatus(String status);
    boolean existsByCategoryName(String categoryName);
    boolean existsByCategoryNameAndStatus(String categoryName, String status);

}

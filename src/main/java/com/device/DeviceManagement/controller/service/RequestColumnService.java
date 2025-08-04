package com.device.DeviceManagement.controller.service;

import com.device.DeviceManagement.model.InternalUser;
import com.device.DeviceManagement.model.RequestColumn;
import com.device.DeviceManagement.model.User;
import com.device.DeviceManagement.repository.RequestColumnRepository;
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
public class RequestColumnService {
    @Autowired
    private RequestColumnRepository requestColumnRepository;
    // Check cache first, if not found, load from DB and cache it
    @Cacheable(value = "RequestColumnService", key = "#page + '-' + #size")
    public Page<RequestColumn> getPagedAddData(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        return requestColumnRepository.findByStatus("1", pageable);
    }
    @Cacheable(value = "RequestColumnService")
    public List<RequestColumn> add() {
        System.out.println("Fetching user from DB...");
        return requestColumnRepository.findByStatus("1");
    }

    // Use this to update the cache when data is modified
    @CachePut(value = "RequestColumnService")
    public List<RequestColumn> update() {
        // also updates the cache
        System.out.println("Cache Updated!");
        return requestColumnRepository.findByStatus("1");
    }

    // Optional: Evict cache
    @CacheEvict(value = "RequestColumnService", allEntries = true)
    public void clearCache() {
        System.out.println("Cache cleared!");
    }
}

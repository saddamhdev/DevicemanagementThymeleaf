package com.device.DeviceManagement.security;

import com.device.DeviceManagement.repository.InternalUserRepository;
import com.device.DeviceManagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private InternalUserRepository internalUserRepository;

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        String password;
        boolean result=false;
        if(internalUserRepository.existsByUserNameAndStatus(username,"1")){
            result= true;// exist

        }

        if(userRepository.existsByUserNameAndStatus(username,"1")){
            result= true; // exist
        }


        if (result) {

            List<SimpleGrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority("SNVN"));

            return new User(username,"Password",authorities);  // Returning user with roles
        }
        throw new UsernameNotFoundException("User not found");
    }

}


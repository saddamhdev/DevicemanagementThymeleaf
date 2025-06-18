package com.device.DeviceManagement.controller.login;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class Start {
    @GetMapping("/")
    public String showLoginForm() {
        return "Login";
    }
}

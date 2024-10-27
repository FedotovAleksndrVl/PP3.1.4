package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleServiceImpl;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;
import java.security.Principal;

@Controller
public class UserController {

    final private UserServiceImpl userService;

    @Autowired
    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @GetMapping("/user")
    public String user(Model model, Principal principal) {
        User user = userService.getUserByLogin(principal.getName());
        if (user.ifRole("ROLE_ADMIN")) {
            return "redirect:/admin";
        }
        model.addAttribute("thisUser", user);
        return "user";
    }
}

package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.*;
import ru.kata.spring.boot_security.demo.service.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.Set;


@Controller
public class AdminController {

    final private UserServiceImpl userService;
    final private RoleServiceImpl roleService;

    @Autowired
    public AdminController(UserServiceImpl userService, RoleServiceImpl roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @PostMapping("/create")
    public String createOne() {
        if (userService.ifLogin("admin@admin.ru")) {
            return "redirect:/login";
        }
        if (roleService.findRoleByRole("ROLE_ADMIN") == null) {
            roleService.saveRole(new Role("ROLE_ADMIN", "админ"));
        }
        if (roleService.findRoleByRole("ROLE_USER") == null) {
            roleService.saveRole(new Role("ROLE_USER","юзер"));
        }
        Set<Role> role =  roleService.findAllRole();
        User user = new User("admin@admin.ru","admin", role);
        userService.saveUser(user);
        return "redirect:/admin";
    }

    @GetMapping(value = {"/" , "/index"})
    public String index() {
        if (userService.ifLogin("admin@admin.ru")) {
            return "redirect:/login";
        }
        return "index";
    }

    @GetMapping("/admin")
    public String listUsers(Principal principal, Model model) {
        System.out.println("Страница загружена");
        model.addAttribute("user", new User());
        model.addAttribute("users", userService.getAllUsers());
        model.addAttribute("roles", roleService.findAllRole());
        model.addAttribute("thisUser", userService.getUserByLogin(principal.getName()));
        return "admin";
    }
}
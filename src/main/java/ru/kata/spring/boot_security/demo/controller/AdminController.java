package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.*;
import ru.kata.spring.boot_security.demo.service.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;
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
        model.addAttribute("user", new User());
        model.addAttribute("users", userService.getAllUsers());
        model.addAttribute("roles", roleService.findAllRole());
        model.addAttribute("thisUser", userService.getUserByLogin(principal.getName()));
        return "admin";
    }

    @PatchMapping("/admin")
    public String update(@Valid @ModelAttribute("user") User user, BindingResult bindingResult, Model model) {
        System.out.println(user);
        if (bindingResult.hasErrors()) {
            System.out.println("Словили ошибку");
            return "redirect:/admin";
        } else {
            if (user.getId() == null) {
                if (!(userService.ifLogin(user.getLogin()))) {
                    System.out.println("Логина такого нет!");
                    userService.saveUser(user);
                }
            } else {
                userService.updateUser(user);
            }
            return "redirect:/admin";
        }
    }

    @DeleteMapping("/admin")
    public String deleteUser(Principal principal, @ModelAttribute("user") User user) {
        System.out.println(user);
        System.out.println(principal.getName());
        if (principal.getName().equals(user.getLogin())) {
            return "redirect:/admin";
        }
        userService.removeUserById(user.getId());
        return "redirect:/admin";
    }

    /*
    @PostMapping("/create")
    public String createOne() {
        if (userService.ifLogin("login")) {
            return "redirect:/user";
        }
        roleService.saveRole(new Role(1l ,"ROLE_ADMIN","админ"));
        roleService.saveRole(new Role(2l ,"ROLE_USER","юзер"));
        Set<Role> role =  roleService.findAllRole();
        User user = new User("admin","admin", role);
        userService.saveUser(user);
        return "redirect:/user";
    }

    @GetMapping("/admin")
    public String listUsers(Model model) {
        List<User> users = userService.getAllUsers();
        model.addAttribute("users", users);
        return "admin";
    }

    @GetMapping("/admin/edit")
    public String addUser(@ModelAttribute("user") User user, Model model) {
        if(user.getId() != null) {
            model.addAttribute("user", userService.getUserById(user.getId()));
        }
        model.addAttribute("roles", roleService.findAllRole());
        return "edit";
    }

    @PostMapping("/admin/edit")
    public String save(@Valid @ModelAttribute("user") User user, BindingResult bindingResult, Model model) {
        model.addAttribute("roles", roleService.findAllRole());
        if (bindingResult.hasErrors()) {
            return "edit";
        } else {
            if (user.getId() == null) {
                if (userService.ifLogin(user.getLogin())) {
                    model.addAttribute("errorMessage", "Логин уже занят");
                    return "edit";
                }
                userService.saveUser(user);
            } else {
                userService.updateUser(user);
            }
            return "redirect:/admin";
        }
    }

    @PostMapping(value = "/admin/delete")
    public String deleteUser(@ModelAttribute("user") User user) {
            userService.removeUserById(user.getId());
        return "redirect:/admin";
    }
    */

}
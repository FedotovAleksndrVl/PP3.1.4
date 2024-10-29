package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleServiceImpl;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import java.security.Principal;
import java.util.List;
import java.util.Set;

@RestController
public class RequestJSController {

    final private UserServiceImpl userService;
    final private RoleServiceImpl roleService;
    private final UserController userController;

    @Autowired
    public RequestJSController(UserServiceImpl userService, RoleServiceImpl roleService, UserController userController) {
        this.userService = userService;
        this.roleService = roleService;
        this.userController = userController;
    }

    @GetMapping("/js/user")
    public ResponseEntity<User> getUser(Principal principal) {
        System.out.println("Запрос юзера, ответ таков: " + userService.getUserByLogin(principal.getName()));
        return ResponseEntity.ok(userService.getUserByLogin(principal.getName()));
    }

    @GetMapping("/js/users")
    public ResponseEntity<List<User>> getUsers() {
        System.out.println("Запрос юзеров, ответ таков: " + userService.getAllUsers());
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/js/roles")
    public ResponseEntity<Set<Role>> getRoles() {
        System.out.println("Запрос ролей, ответ таков: ");
        return ResponseEntity.ok(roleService.findAllRole());
    }

    @PostMapping("/js/saveUser")
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        System.out.println("Сохранение юзера: " + user);
        userService.saveUser(user);
        return ResponseEntity.ok(user);
    }
}

package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleServiceImpl;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import java.security.Principal;
import java.util.List;

@RestController
public class RequestJSController {

    final private UserServiceImpl userService;

    @Autowired
    public RequestJSController(UserServiceImpl userService) {
        this.userService = userService;
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


}

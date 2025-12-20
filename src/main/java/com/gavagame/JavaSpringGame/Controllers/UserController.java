package com.gavagame.JavaSpringGame.Controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @GetMapping("/login")
    public String page(Model model){
        model.addAttribute("message", "Добро пожаловать на страницу!");
        return "login_screen.html"; // имя файла без расширения .html
    }

}

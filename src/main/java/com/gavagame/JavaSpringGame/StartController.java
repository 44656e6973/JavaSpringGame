package com.gavagame.JavaSpringGame;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/start")
public class StartController {
    @GetMapping
    @ResponseBody
    public String hello(){
        return "Hello, World!";
    }
}

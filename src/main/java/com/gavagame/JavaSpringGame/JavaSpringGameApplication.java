package com.gavagame.JavaSpringGame;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
public class JavaSpringGameApplication {

    public JavaSpringGameApplication(StartController startController) {
        this.startController = startController;
    }

    public static void main(String[] args) {
		SpringApplication.run(JavaSpringGameApplication.class, args);
	}

	private final StartController startController;

	@GetMapping
	public String func(){return startController.hello();}

}

package com.gavagame.JavaSpringGame.Repository;

import com.gavagame.JavaSpringGame.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByLogin(String login);

    User findByUsername(String username);

    boolean existsByUsername(String username);

}

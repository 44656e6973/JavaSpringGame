package com.gavagame.JavaSpringGame.Repository;

import com.gavagame.JavaSpringGame.Models.GameSession;
import com.gavagame.JavaSpringGame.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.net.InetAddress;
import java.util.List;

public interface GameSessionRepository extends JpaRepository<GameSession, Long> {

//    List<GameSession> findByStatus(String status);
//    List<GameSession> findByServerIp(InetAddress server_IP);
//    List<GameSession> findByHost(String username);
}

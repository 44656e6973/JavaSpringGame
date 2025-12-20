package com.gavagame.JavaSpringGame.Service;


import com.gavagame.JavaSpringGame.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class UserService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (!userRepository.existsByUsername(username)) throw new UsernameNotFoundException("User not found");
        return (UserDetails) userRepository.findByUsername(username);
    }
}

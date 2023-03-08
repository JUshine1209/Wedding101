package com.ssafy.wedding101.model.service.impl;

import com.ssafy.wedding101.model.dto.CustomUserDetails;
import com.ssafy.wedding101.model.entity.User;
import com.ssafy.wedding101.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

//    private final ManagerRepository managerRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepository.findByUserId(username).orElseThrow(() -> new UsernameNotFoundException("해당 아이디를 갖는 계정을 찾을 수 없습니다."));

        return new CustomUserDetails(user);
    }

}

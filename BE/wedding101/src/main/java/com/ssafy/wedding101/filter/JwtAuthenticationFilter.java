package com.ssafy.wedding101.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.wedding101.model.dto.LoginRequestDto;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager) {

        super(authenticationManager);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        System.out.println("어덴티케이션 필터 들어옴");

        final UsernamePasswordAuthenticationToken authRequest;


        final LoginRequestDto loginDTO;

        try {
            // 사용자 요청 정보로 UserPasswordAuthenticationToken 발급
            System.out.println(request.getInputStream().toString());
            LoginRequestDto loginRequestDto = new ObjectMapper().readValue(request.getInputStream(), LoginRequestDto.class);

            System.out.println("loginDTO : " + loginRequestDto);

            authRequest = new UsernamePasswordAuthenticationToken(loginRequestDto.getUserId(), loginRequestDto.getUserPassword());
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Token 발급 실패");
        }
        setDetails(request, authRequest);

        // AuthenticationManager에게 전달 -> AuthenticationProvider의 인증 메서드 실행
        return this.getAuthenticationManager().authenticate(authRequest);
    }


}

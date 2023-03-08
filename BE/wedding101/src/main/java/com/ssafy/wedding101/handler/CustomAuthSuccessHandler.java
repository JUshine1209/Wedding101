package com.ssafy.wedding101.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.wedding101.common.ApiResponseType;
import com.ssafy.wedding101.model.service.UserService;
import com.ssafy.wedding101.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class CustomAuthSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtUtil jwtUtil;

    private final UserService userService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        // 전달받은 인증정보 SecurityContextHolder에 저장
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // JWT Token 발급
        HashMap<String, String> tokens = jwtUtil.generateJwtToken(authentication);
        String accessToken = tokens.get("accessToken");
        String refreshToken = tokens.get("refreshToken");

        // 전달받은 인증정보를 통해 DB에 refresh 토큰 저장
        userService.modifyUserRefreshToken(String.valueOf(authentication.getPrincipal()),refreshToken);

        // 응답에 담아 보낼 객체 생성
        Map<String, String> map = new HashMap<>();
        map.put("code", "200");
        map.put("msg", "SUCCESS");
        map.put("accessToken", accessToken);

        ObjectMapper objectMapper = new ObjectMapper();
        String result = objectMapper.writeValueAsString(map);

        // 응답 설정
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        response.setStatus(ApiResponseType.SUCCESS.getCode());
        response.getWriter().write(result);
    }
}

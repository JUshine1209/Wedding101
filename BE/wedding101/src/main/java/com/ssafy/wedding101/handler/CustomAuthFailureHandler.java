package com.ssafy.wedding101.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.wedding101.common.ApiResponseType;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
public class CustomAuthFailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {

        System.out.println("여기들어오니?페일류 핸들러");
        // 에러 메시지를 담을 변수 생성
        String errorMessaage = null;

        // 각각의 에러 상황에 맞춰 에러 메시지 담기
        if (exception instanceof BadCredentialsException || exception instanceof InternalAuthenticationServiceException){
            errorMessaage = "아이디나 비밀번호가 맞지 않습니다. 다시 확인해 주십시오.";
        } else if (exception instanceof DisabledException) {
            errorMessaage = "계정이 비활성화 되었습니다. 관리자에게 문의하세요";
        } else if (exception instanceof CredentialsExpiredException) {
            errorMessaage = "비밀번호 유효 기간이 만료 되었습니다. 관리자에게 문의하세요";
        } else if (exception instanceof UsernameNotFoundException){
            errorMessaage = "해당 아이디를 갖는 계정을 찾을 수 없습니다.";
        }else {
            errorMessaage = "알 수 없는 이유로 로그인에 실패했습니다. 관리자에게 문의하세요.";
        }

        // 응답에 담아 보낼 객체 생성
        Map<String, String> map = new HashMap<>();
        map.put("code", "404");
        map.put("msg", "FAILURE");
        map.put("errorMessaage",errorMessaage);

        ObjectMapper objectMapper = new ObjectMapper();
        String result = objectMapper.writeValueAsString(map);

        // 응답 설정
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        response.setStatus(ApiResponseType.UNAUTHORIZED_RESPONSE.getCode());
        response.getWriter().write(result);

    }

//    @Override
//    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException {
//        System.out.println("여기들어오니?페일류 핸들러");
//        ApiResponse.error(response, ApiResponseType.UNAUTHORIZED_RESPONSE);
//    }
}

package com.ssafy.wedding101.filter;

import com.ssafy.wedding101.model.service.UserService;
import com.ssafy.wedding101.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String BEARER_PREFIX = "Bearer";

    private final JwtUtil jwtUtil;

    private final UserService userService;

    /**
     * 토큰 인증 정보를 현재 쓰레드의 SecurityContext 에 저장하는 역할 수행
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {

        System.out.println("어더라이제이션 필터 들어옴");

        // Request Header에서 accessToken 토큰 추출
        String accessToken = resolveToken(request);

        // Token 유효성 검사
        if (StringUtils.hasText(accessToken) && jwtUtil.isValidToken(accessToken)) {

//             토큰으로 인증 정보를 추출
            Authentication authentication = jwtUtil.getAuthentication(accessToken);
            String userId = jwtUtil.getSubject(accessToken);
            System.out.println("1");
            System.out.println(userId);
            System.out.println("2");
//             SecurityContext에 저장
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } else {
            System.out.println("jwt 실패");
        }

        filterChain.doFilter(request, response);
    }

    /**
     * Request Header에서 토큰 추출
     */
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
            return bearerToken.substring(7);
        }
        return null;
    }
}

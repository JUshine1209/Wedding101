package com.ssafy.wedding101.config;

import com.ssafy.wedding101.filter.JwtAuthenticationFilter;
import com.ssafy.wedding101.filter.JwtAuthorizationFilter;
import com.ssafy.wedding101.model.service.UserService;
import com.ssafy.wedding101.util.CustomAuthenticationProvider;
import com.ssafy.wedding101.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/*
        분류 : Configuration
        작성 : 권영진
        내용 : Spring Secruity를 활용한 인증, 인가 구현을 설정 위한 Java Configuration 파일
        진척도 : 최종
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    // [ Dependency Injection ]
    private final CorsConfig corsConfig;
    // Dependency 1. JWT Util 클래스
    private final JwtUtil jwtUtil;
    // Dependency 2. 인증 성공 핸들러
    private final AuthenticationSuccessHandler authenticationSuccessHandler;
    // Dependency 3. 인증 실패 핸들러
    private final AuthenticationFailureHandler authenticationFailureHandler;
    // Dependency 4. 인증 실패 또는 인증헤더가 전달받지 못했을때 핸들러
    private final AuthenticationEntryPoint authenticationEntryPoint;
    // Dependency 5. 인가 실패 핸들러
    private final AccessDeniedHandler accessDeniedHandler;
    // Dependency 6. 커스텀 유저디테일서비스
    private final UserDetailsService userDetailsService;
    // Dependency 7. 유저 서비스
    private final UserService userService;

    // Security Authorization : 전체 공개 API
    private static final String[] permitAllPath = {
            /* swagger v2 */
            "/v2/api-docs", "/swagger-resources", "/swagger-resources/**", "/configuration/ui", "/configuration/security",
            "/swagger-ui.html", "/swagger-ui/**", "/swagger-ui/index.html", "/webjars/**",
            /* swagger v3 */
            "/v3/api-docs/**", "/swagger-ui/**", "/auth/**",
            /* API */
            "/file//uploadMedia/image", "/file/uploadMedia/video", "/media", "/user/signup"
    };

    // Security Authorization : HTTPMethod GET 전체 허용하는 API
    private static final String[] permitAllGetMethod = {
            "/album/access/*", "/invitation/*", "/qna/all", "/qna/*", "/review/all",
            "/review/*", "/user/exist/nickname/*", "^/user/exist/id/*", "/user/exist/email/*",
            "/user/find/id/*", "/user/all"
    };

    // Security Authorization : HTTPMethod POST 전체 허용하는 API
    private static final String[] permitAllPostMethod = {
            "/file/uploadMedia/image", "/file/uploadMedia/video", "/media/*", "/user/signup",
    };

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return web -> web.ignoring()
                .antMatchers("/swagger-ui/**", "/v3/api-docs/**", "/user/exist/id/*")
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf().disable()
                .addFilter(corsConfig.corsFilter())
                .httpBasic().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers(permitAllPath).permitAll()
                .antMatchers(HttpMethod.GET, permitAllGetMethod).permitAll()
                .antMatchers(HttpMethod.POST, permitAllPostMethod).permitAll()
                .anyRequest().hasAuthority("ROLE_USER")
                .and()
                .headers()
                .frameOptions()
                .sameOrigin()
                .and()
                .formLogin().disable()
                .exceptionHandling()
                .authenticationEntryPoint(authenticationEntryPoint)
                .accessDeniedHandler(accessDeniedHandler)
                .and()
                .addFilterBefore(authenticationFilter(), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(AuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // 비밀번호 암호화 및 확인 클래스
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // 사용자 요청 정보로 UserPasswordAuthenticationToken 발급하는 필터
    @Bean
    public JwtAuthenticationFilter authenticationFilter() throws Exception {
        JwtAuthenticationFilter jwtAuthenticationFilter =
                new JwtAuthenticationFilter(authenticationManager());
        // 필터 URL 설정
        jwtAuthenticationFilter.setFilterProcessesUrl("/user/login");
        // 인증 성공 핸들러
        jwtAuthenticationFilter.setAuthenticationSuccessHandler(authenticationSuccessHandler);
        // 인증 실패 핸들러
        jwtAuthenticationFilter.setAuthenticationFailureHandler(authenticationFailureHandler);
        // BeanFactory에 의해 모든 property가 설정되고 난 뒤 실행
        jwtAuthenticationFilter.afterPropertiesSet();

        return jwtAuthenticationFilter;
    }

    @Bean
    public AuthenticationManager authenticationManager() throws Exception {

        return new ProviderManager(customAuthenticationProvider());
    }

    @Bean
    public CustomAuthenticationProvider customAuthenticationProvider() {
        return new CustomAuthenticationProvider(userDetailsService, passwordEncoder());
    }

    // jwt 인증 및 권환을 확인하는 필터
    @Bean
    public JwtAuthorizationFilter AuthorizationFilter() {
        return new JwtAuthorizationFilter(jwtUtil,userService);
    }

}

package com.ssafy.wedding101.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

/*
        분류 : Configuration
        작성 : 권영진
        내용 : Spring Security에서 Cors에 대한 필터 설정
        진척도 : 최종
 */
@Configuration
public class CorsConfig {

    /*
        분류 : Bean 등록
        작성 : 권영진
        내용 : Spring Security의 Corsfilter 커스터마이징 : RestApi에 요청을 보내는 모든 것에 대해서 허용
        진척도 : 최종
    */
    @Bean
    public CorsFilter corsFilter() {

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOriginPattern("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }

}
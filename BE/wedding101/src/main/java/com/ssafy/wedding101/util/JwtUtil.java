package com.ssafy.wedding101.util;

import com.ssafy.wedding101.model.dto.CustomUserDetails;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.xml.bind.DatatypeConverter;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;

@Component
@RequiredArgsConstructor
public final class JwtUtil {

    private final UserDetailsService userDetailsService;

    // access token 유효시간
    private final long accessTokenValidTime = 60 * 60 * 1000L;
    // refresh token 유효시간
    private final long refreshTokenValidTime = 24 * 60 * 60 * 1000L;
    // secret key
    @Value("${jwt.secret-key}")
    private String secretKey;

    @PostConstruct
    private void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }


    /**
     * 토큰 발급
     */
    public HashMap<String,String> generateJwtToken(Authentication authentication) {

        // [Step 1] 로그인 요청이 들어온 유저의 정보를 가져온다.
        CustomUserDetails customUserDetails = (CustomUserDetails) userDetailsService.loadUserByUsername(String.valueOf(authentication.getPrincipal()));

        // [Step 2] Jwt 토큰을 생성할 기준 시간
        Date now = new Date();

        // [Step 3] accessToken에 담을 Claims 선언
        Claims accessTokenClaims = Jwts.claims().setSubject(String.valueOf(authentication.getPrincipal()));
        accessTokenClaims.put("userSeq", customUserDetails.getCustomUserSeq());

        // [Step 4] accessToken 생성
        String accessToken = Jwts.builder()
                .setHeaderParam("alg","HS256")
                .setHeaderParam("typ","JWT")
                .setClaims(accessTokenClaims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + accessTokenValidTime))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();

        // [Step 5] refreshToken에 담을 Claims 선언
        Claims refreshTokenClaims = Jwts.claims().setSubject(String.valueOf(authentication.getPrincipal()));

        // [Step 6] refreshToken 생성
        String refreshToken = Jwts.builder()
                .setClaims(refreshTokenClaims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + refreshTokenValidTime))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();

        // [Step 7] 결과값 반환
        HashMap<String, String> result = new HashMap<>();
        result.put("accessToken", accessToken);
        result.put("refreshToken", refreshToken);

        return result;
    }

    /**
     * 토큰에서 Claim 추출
     */
    private Claims getClaimsFormToken(String token) {
        return Jwts.parser().setSigningKey(DatatypeConverter.parseBase64Binary(secretKey)).parseClaimsJws(token).getBody();
    }

    /**
     * 토큰에서 인증 subject 추출
     */
    public String getSubject(String token) {
        return getClaimsFormToken(token).getSubject();
    }

    /**
     * 토큰에서 인증 정보 추출
     */
    public Authentication getAuthentication(String token) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(this.getSubject(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    /**
     * 토큰 검증
     */
    public boolean isValidToken(String token) {
        try {
            Claims claims = getClaimsFormToken(token);
            System.out.println(claims.get("userSeq"));
            System.out.println(claims.get("userSeq").getClass());
            return !claims.getExpiration().before(new Date());
        } catch (JwtException | NullPointerException exception) {
            return false;
        }
    }

    /**
     *
     */
    public Long getUserSeq(String accessToken){
        return Long.valueOf(getClaimsFormToken(accessToken).get("userSeq").toString());
    }
}

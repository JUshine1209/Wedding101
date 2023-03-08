package com.ssafy.wedding101.model.dto;

import com.ssafy.wedding101.model.entity.User;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

@Getter
public class CustomUserDetails implements UserDetails {

    private Long customUserSeq;
    private String customUserId;
    private String customUserPassword;
    private String customUserName;
    private String customUserNickname;
    private String customUserEmail;
    private String customUserRoleName;

    public CustomUserDetails(User user){
        this.customUserSeq = user.getUserSeq();
        this.customUserId = user.getUserId();
        this.customUserPassword = user.getUserPassword();
        this.customUserName = user.getUserName();
        this.customUserNickname = user.getUserNickname();
        this.customUserEmail = user.getUserEmail();
        this.customUserRoleName = user.getRole();
    }

//    public CustomUserDetails(Manager manager){
//        this.customUserSeq = manager.getManagerSeq();
//        this.customUserId = manager.getManagerId();
//        this.customUserPassword = manager.getManagerPassword();
//        this.customUserName = manager.getManagerName();
//        this.customUserEmail = manager.getManagerEmail();
//        this.customUserRoleName = manager.getRole();
//    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(() -> customUserRoleName);
        return authorities;
    }

    @Override
    public String getPassword() {
        return this.customUserPassword;
    }

    @Override
    public String getUsername() {
        return this.customUserId;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

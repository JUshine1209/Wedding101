package com.ssafy.wedding101.model.service;

import com.ssafy.wedding101.model.dto.UserDto;
import com.ssafy.wedding101.model.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface UserService {
    Optional<UserDto> getUser(Long userSeq);

    Optional<UserDto> getUser(String userId);

    List<UserDto> getAllUser();

    void writeUser(UserDto userDto);

    void removeUser(UserDto userDto);

    void modifyUser(UserDto userDto);

    boolean checkNicknameDuplicate(String userNickname);
    boolean checkIdDuplicate(String userId);
    boolean checkEmailDuplicate(String userEmail);

    Optional<UserDto> getUserIdByUserEmail(String userEmail);

    String getRefreshToken(String userId);

    void modifyUserRefreshToken(String userId, String refreshToken);

    default User toEntity(UserDto userDto){
        return User.builder()
                .userSeq(userDto.getUserSeq())
                .userId(userDto.getUserId())
                .userPassword(userDto.getUserPassword())
                .userName(userDto.getUserName())
                .userNickname(userDto.getUserNickname())
                .userEmail(userDto.getUserEmail())
                .build();
    }

    default UserDto toDto(User user){
        return UserDto.builder()
                .userSeq(user.getUserSeq())
                .userId(user.getUserId())
                .userPassword(user.getUserPassword())
                .userName(user.getUserName())
                .userNickname(user.getUserNickname())
                .userEmail(user.getUserEmail())
                .build();
    }



}

package com.ssafy.wedding101.controller;

import com.ssafy.wedding101.model.dto.UserDto;
import com.ssafy.wedding101.model.service.UserService;
import com.ssafy.wedding101.util.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@CrossOrigin
public class UserRestController {

        private final UserService userService;
        private final JwtUtil jwtUtil;

        @Operation(summary = "회원가입")
        @PostMapping("/signup")
        public ResponseEntity<Map<String, Object>> singup(@RequestBody UserDto userDto) {
            Map<String, Object> result = new HashMap<>();
            try {
                userService.writeUser(userDto);
                UserDto newUserDto = userService.getUser(userDto.getUserId()).orElseThrow();
                result.put("message", "회원가입 SUCCESS");
                result.put("data", newUserDto);
                return new ResponseEntity<>(result, HttpStatus.OK);

            } catch (Exception e) {
                result.put("message", "회원가입 FAIL");
                result.put("data", userDto); // 회원가입 시 입력했던 정보
                return new ResponseEntity<>(result, HttpStatus.EXPECTATION_FAILED);
            }
        }

        @Operation(summary = "로그인")
        @PostMapping("/login")
        public ResponseEntity<Map<String, Object>> login(@RequestBody UserDto userDto) {
            Map<String, Object> result = new HashMap<>();
            try {
                UserDto checkUserDto  = userService.getUser(userDto.getUserId()).orElseThrow(() -> new NoSuchElementException("data is null"));
                if (checkUserDto.getUserPassword().equals(userDto.getUserPassword())) {
                    result.put("data", checkUserDto);
                    result.put("message", "로그인 SUCCESS");
                }
                else {
                    result.put("message", "비밀번호  INCORRECT");
                    return new ResponseEntity<>(result, HttpStatus.EXPECTATION_FAILED);
                }
            } catch (NoSuchElementException e) {
                result.put("message", "아이디 INCORRECT");
                return new ResponseEntity<>(result, HttpStatus.EXPECTATION_FAILED);
            }
            return new ResponseEntity<>(result, HttpStatus.OK);
        }

    @Operation(summary = "회원 조회 (1)")
    @GetMapping ("")
    public ResponseEntity<Map<String, Object>> getUserDetail(@RequestHeader("Authorization") String authorization) {

        String accessToken = authorization.substring(7);
        Long userSeq = jwtUtil.getUserSeq(accessToken);

        Map<String, Object> result = new HashMap<>();
        // 세션에서 seq 가져옴
        try {
            UserDto userDto = userService.getUser(userSeq).orElseThrow(() -> new NoSuchElementException("data is null"));
            result.put("message", "회원 조회 SUCCESS");
            result.put("data", userDto);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            result.put("message", "회원 조회 FAIL - user Seq  INCORRECT");
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

        @Operation(summary = "회원 조회 (all)")
        @GetMapping ("/all")
        public ResponseEntity<Map<String, Object>> getUserList() {
            List<UserDto> userList = userService.getAllUser();
            Map<String, Object> result = new HashMap<>();
            result.put("data", userList); // 전체 회원 목록
            result.put("count", userList.size()); // 전체 회원 수
            return new ResponseEntity<>(result, HttpStatus.OK);
        }

        @Operation(summary = "회원 탈퇴")
        @GetMapping ("/delete")
        public ResponseEntity<?> deleteUser(Long userSeq) {
            // 세션에서 seq 가져옴
            UserDto userDto = userService.getUser(userSeq).orElseThrow(() -> new NoSuchElementException("data is null"));
            userService.removeUser(userDto);
            return new ResponseEntity<>("회원 탈퇴 SUCCESS", HttpStatus.OK);
        }

        @Operation(summary = "회원 정보 수정")
        @PutMapping("")
        public ResponseEntity<Map<String, Object>> modifyUser(@RequestBody UserDto userDto) {
//            userDto.setUserSeq(userService.getUser(userDto.getUserId()).orElseThrow().getUserSeq());
            Map<String, Object> result = new HashMap<>();
            try {
                userService.modifyUser(userDto);
                result.put("message", "회원 수정 SUCCESS");
                result.put("data", userService.getUser(userDto.getUserId()));
                return new ResponseEntity<>(result, HttpStatus.OK);
            } catch (Exception e) {
                result.put("message", "회원 수정 FAIL - 아이디 INCORRECT");
                result.put("data", userDto); // 수정 전 dto
                return new ResponseEntity<>(result, HttpStatus.OK);
            }
        }

        @Operation(summary = "닉네임 중복 확인")
        @GetMapping("/exist/nickname/{userNickname}")
        public ResponseEntity<Boolean> checkNicknameDuplicate(@PathVariable String userNickname) {
            return ResponseEntity.ok(userService.checkNicknameDuplicate(userNickname));
        }

        @Operation(summary = "아이디 중복 확인")
        @GetMapping("/exist/id/{userId}")
        public ResponseEntity<Boolean> checkIdDuplicate(@PathVariable String userId) {
            return ResponseEntity.ok(userService.checkIdDuplicate(userId));
        }

        @Operation(summary = "이메일 중복 확인")
        @GetMapping("/exist/email/{userEmail}")
        public ResponseEntity<Boolean> checkEmailDuplicate(@PathVariable String userEmail) {
            return ResponseEntity.ok(userService.checkEmailDuplicate(userEmail));
        }

        @Operation(summary = "이메일로 아이디 찾기")
        @GetMapping("/find/id/{userEmail}")
        public ResponseEntity<Map<String, Object>> findIdByEmail(@PathVariable String userEmail) {
            Map<String, Object> result = new HashMap<>();
            try {
                UserDto userDto = userService.getUserIdByUserEmail(userEmail).orElseThrow(() -> new NoSuchElementException("data is null"));
                result.put("userId", userDto.getUserId());
                return new ResponseEntity<>(result, HttpStatus.OK);
            } catch (NoSuchElementException e) {
                result.put("data", userEmail); // 입력한 이메일
                result.put("message", "이메일을 찾을 수 없습니다.");
                return new ResponseEntity<>(result, HttpStatus.EXPECTATION_FAILED);
            }
        }


}

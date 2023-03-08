package com.ssafy.wedding101.controller;

import com.ssafy.wedding101.model.dto.FileUploadDto;
import com.ssafy.wedding101.model.dto.UserDto;
import com.ssafy.wedding101.model.service.UserService;
import com.ssafy.wedding101.model.service.impl.FileService;
import com.ssafy.wedding101.util.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

/*
        분류 : Controller
        작성 : 권영진
        내용 : S3 File 업로드 관련 컨트롤러
        진척도 : 진행중
 */
@RestController
@RequestMapping("/file")
@RequiredArgsConstructor
@CrossOrigin
public class FileRestController {

    // [ 의존성 주입 ]
    private final FileService fileService;
    private final UserService userService;
    private final JwtUtil jwtUtil;

    /**
     * 메소드 : uploadAlbumCover
     * 작성자 : 권영진
     * 반환값 : (String) 이미지가 저장된 URL 주소
     * 파라미터 : userId, multipartFile
     * 기능 : AWS S3에 앨범 커버 이미지를 지정한 경로에 업로드 후 URL 반환
     */
    @Operation(summary = "앨범 커버 업로드")
    @PostMapping("/uploadAlbumCover")
    public ResponseEntity<String> uploadAlbumCover(@RequestHeader String authorization,
                                                   @RequestBody MultipartFile multipartFile) {

        // 토큰에서 userId를 가져옴
        String accessToken = authorization.substring(7);
        String userId = jwtUtil.getSubject(accessToken);

        // File Service에 보낼 저장 경로 생성
        String filePath = userId.concat("/album/");

        // File Service 메서드 실행 및 저장
        String url = fileService.uploadImage(filePath, multipartFile);

        return new ResponseEntity<>(url, HttpStatus.OK);
    }

    /**
     * 메소드 : uploadInvitation
     * 작성자 : 권영진
     * 반환값 : (String) 이미지가 저장된 URL 주소
     * 파라미터 : userId, multipartFile
     * 기능 : AWS S3에 모바일 청첩장 이미지를 지정한 경로에 업로드 후 URL 반환
     */
    @Operation(summary = "모바일 청첩장 사진 업로드")
    @PostMapping("/uploadInvitation")
    public ResponseEntity<String> uploadInvitation(@RequestHeader("Authorization") String authorization,
                                                   @RequestBody MultipartFile multipartFile) {

        // 토큰에서 userId를 가져옴
        String accessToken = authorization.substring(7);
        String userId = jwtUtil.getSubject(accessToken);

        // File Service에 보낼 저장 경로 생성
        String filePath = userId.concat("/invitation/");

        // File Service 메서드 실행 및 저장
        String url = fileService.uploadImage(filePath, multipartFile);

        return new ResponseEntity<>(url, HttpStatus.OK);
    }

    /**
     * 메소드 : uploadMediaImage
     * 작성자 : 권영진
     * 반환값 : (String) 이미지가 저장된 URL 주소
     * 파라미터 : multipartFile
     * 기능 : AWS S3에 미디어 객체 이미지를 지정한 경로에 업로드 후 URL 반환
     */
    @Operation(summary = "미디어 - 이미지 업로드")
    @PostMapping("/uploadMedia/image")
    public ResponseEntity<String> uploadMediaImage(@ModelAttribute FileUploadDto fileUploadDto) {
        // UserSeq로 유저 아이디를 불러옴
        UserDto userDto = userService.getUser(fileUploadDto.getUserSeq()).orElseThrow();

        // File Service에 보낼 저장 경로 생성
        String filePath =  userDto.getUserId().concat("/media/image/");

        // File Service 메서드 실행 및 저장
        String url = fileService.uploadImage(filePath, fileUploadDto.getMultipartFile());

        return new ResponseEntity<>(url, HttpStatus.OK);
    }

    /**
     * 메소드 : uploadMediaImage
     * 작성자 : 권영진
     * 반환값 : (String) 비디오가 저장된 URL 주소, 썸네일이 저장된 URL 주소
     * 파라미터 : multipartFile
     * 기능 : AWS S3에 미디어 객체 비디오를 지정한 경로에 업로드 후 URL 반환
     */
    @Operation(summary = "미디어 - 비디오 업로드")
    @PostMapping("/uploadMedia/video")
    public ResponseEntity<Map<String,String>> uploadMediaVideo(@ModelAttribute FileUploadDto fileUploadDto) {
        // UserSeq로 유저 아이디를 불러옴
        UserDto userDto = userService.getUser(fileUploadDto.getUserSeq()).orElseThrow();


        // File Service에 보낼 저장 경로 생성
        String filePath = userDto.getUserId().concat("/media/video/");

        // File Service 메서드 실행 및 저장
        Map<String,String> map = fileService.uploadVideo(filePath, fileUploadDto.getMultipartFile());

        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    /**
     * 메소드 : uploadMediaImage
     * 작성자 : 권영진
     * 반환값 : (String) 비디오가 저장된 URL 주소, 썸네일이 저장된 URL 주소
     * 파라미터 : multipartFile
     * 기능 : AWS S3에 미디어 객체 비디오를 지정한 경로에 업로드 후 URL 반환
     */
    @PostMapping("/mergeVideo")
    public ResponseEntity<String> mergeVideo(@RequestHeader("Authorization") String authorization,
                                             @RequestBody Map<String, List<String>> listMap) throws Exception {

        // 토큰에서 userId를 가져옴
        String accessToken = authorization.substring(7);
        String userId = jwtUtil.getSubject(accessToken);

        // File Service에 보낼 저장 경로 생성
        String filePath = userId + "/final.mp4";

        // FilesService의 mergeVideo 메서드 호출
        String url = fileService.mergeVideo(filePath,listMap);

        return new ResponseEntity<>(url, HttpStatus.OK);
    }


}

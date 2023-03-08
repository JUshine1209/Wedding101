package com.ssafy.wedding101.controller;

import com.ssafy.wedding101.model.dto.AlbumDto;
import com.ssafy.wedding101.model.dto.InfoDto;
import com.ssafy.wedding101.model.service.AlbumService;
import com.ssafy.wedding101.model.service.InfoService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.aspectj.bridge.Message;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Random;

@RestController
@RequiredArgsConstructor
@RequestMapping("/album")
@CrossOrigin
public class AlbumRestController {
    private final AlbumService albumService;
    private final InfoService infoService;

    @Operation(summary = "앨범 조회")
    @GetMapping("")
    public ResponseEntity<Map<String, Object>> getAlbumDetail(Long userSeq) {

        //토큰 userSeq
        Map<String, Object> result = new HashMap<>();
        try {
            AlbumDto albumDto = albumService.getAlbumByUserSeq(userSeq).orElseThrow(() -> new NoSuchElementException("data is null"));
            result.put("data", albumDto);
            result.put("message", "앨범 조회 SUCCESS");
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            result.put("message", "앨범 조회 FAIL - userSeq로 앨범 정보를 찾을 수 없습니다.");
            return new ResponseEntity<>(result, HttpStatus.EXPECTATION_FAILED);
        }
    }

    @Operation(summary = "앨범 생성")
    @PostMapping("")
    public ResponseEntity<Map<String, Object>> writeAlbum(@RequestBody AlbumDto albumDto) {
        Map<String, Object> result = new HashMap<>();
        // 토큰 userSeq
        Long userSeq = albumDto.getUserSeq();
        albumDto.setUserSeq(userSeq);
        try {
            if(!albumService.checkAlbumDuplicate(userSeq)) { // 해당 userSeq로  isValid한 album이 있음
                result.put("data", albumDto); // 입력한 정보
                result.put("message", "이미 앨범이 생성되어 있습닝다. 수정 또는 삭제 후 재생성 해주세요.");
                return new ResponseEntity<>(result, HttpStatus.EXPECTATION_FAILED);
            } else { // 해당 userSeq로 앨범 생성 가능
                String accessId = generateAccessId();
                // 겹치는 값이 없으면 true
                while (!albumService.checkAccessIdDuplicate(accessId)) {
                    accessId = generateAccessId(); // 겹치면 다시 생성 후 반복
                }
                albumDto.setAlbumAccessId(accessId);
                albumService.writeAlbum(albumDto);
                AlbumDto newAblumDto = albumService.getAlbumByUserSeq(userSeq)
                        .orElseThrow(() -> new NoSuchElementException("data is null"));
                result.put("data", newAblumDto); // db에 저장된 정보
                result.put("message", "앨범 생성 SUCCESS");
                return new ResponseEntity<>(result, HttpStatus.OK);
            }
        } catch (NoSuchElementException e) {
            result.put("message", "앨범 생성 FAIL");
            return new ResponseEntity<>(result, HttpStatus.EXPECTATION_FAILED);
        }
    }

    private String generateAccessId() {
        int leftLimit = 48; // 0
        int rightLimit = 122; // z
        int targetStringLength = 10;
        Random random = new Random();

        String generatedString = random.ints(leftLimit, rightLimit+1)
                .filter(i -> (i <= 57 || i>= 65) && (i <= 90 || i >= 97))
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
        System.out.println(generatedString);
        return generatedString;
    }

    @Operation(summary = "앨범 수정")
    @PutMapping("")
    public ResponseEntity<Map<String, Object>> modifyAlbum(@RequestBody AlbumDto albumDto) {
        Map<String, Object> result = new HashMap<>();
        albumService.modifyAlbum(albumDto);
        AlbumDto albumDtoAfter = albumService.getAlbum(albumDto.getAlbumSeq()).orElseThrow();
        result.put("data", albumDtoAfter);
        result.put("message", "앨범 수정 SUCCESS");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "앨범 삭제")
    @GetMapping("/delete/{albumSeq}")
    public ResponseEntity<?> deleteAlbum(@PathVariable Long albumSeq) {
        try {
            albumService.removeAlbum(albumSeq);
            return new ResponseEntity<>("앨범 삭제 SUCCESS", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("앨범 삭제 FAIL", HttpStatus.EXPECTATION_FAILED);
        }
    }

    @Operation(summary = "앨범 접근 코드로 결혼정보 조회")
    @GetMapping("/access/{albumAccessId}")
    public ResponseEntity<Map<String, Object>> getInfoByAccessId(@PathVariable String albumAccessId) {
        Map<String, Object> result = new HashMap<>();
        if (!albumService.existAccessId(albumAccessId)) {
            result.put("message", "존재하지 않는 접근 ID 입니다.");
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        Long albumSeq = albumService.getAlbumSeqByAccessId(albumAccessId);
        AlbumDto albumDto = albumService.getAlbum(albumSeq).orElseThrow();
        InfoDto infoDto = infoService.getInfo(albumDto.getInfoSeq()).orElseThrow();
        result.put("infoData", infoDto);
        result.put("albumSeq", albumSeq);
        result.put("albumThanksUrl", albumDto.getAlbumThanksUrl());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


}

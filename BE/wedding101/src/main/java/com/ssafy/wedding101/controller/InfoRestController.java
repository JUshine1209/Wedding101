package com.ssafy.wedding101.controller;

import com.ssafy.wedding101.model.dto.AlbumDto;
import com.ssafy.wedding101.model.dto.InfoDto;
import com.ssafy.wedding101.model.service.AlbumService;
import com.ssafy.wedding101.model.service.InfoService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/Info")
@CrossOrigin
public class InfoRestController {

    private final InfoService infoService;
    private final AlbumService albumService;

    @Operation(summary = "결혼정보 조회")
    @GetMapping("")
    public ResponseEntity<Map<String, Object>> getInfoDetail(Long userSeq) {
        Map<String, Object> result = new HashMap<>();
        try {
            // 토큰에서 userSeq - 파라미터 없어도됨
            InfoDto infoDto = infoService.getInfoByUserSeq(userSeq).orElseThrow(() -> new NoSuchElementException("data is null"));
            result.put("data", infoDto);
            result.put("message", "정보 조회 SUCCESS");
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            result.put("message", "정보 조회 FAIL - userSeq로 결혼 정보를 찾을 수 없습니다.");
            return new ResponseEntity<>(result, HttpStatus.EXPECTATION_FAILED);
        }
    }

    @Operation(summary = "결혼정보 등록")
    @PostMapping("")
    public ResponseEntity<Map<String, Object>> writeInfo(@RequestBody InfoDto infoDto) {
        Map<String, Object> result = new HashMap<>();
        // Long userSeq = 가져와서 - 파라미터에서 지우기
//        infoDto.setUserSeq(userSeq);
        Long userSeq = infoDto.getUserSeq();
        try {
            if(!infoService.checkInfoDuplicate(userSeq)) { // 해당 userSeq로 isValid한 info가 있음
                result.put("data", infoDto); // 입력한 정보
                result.put("message", "결혼정보가 입력되어 있습니다. 수정 또는 삭제 후 재입력 해주세요.");
                return new ResponseEntity<>(result, HttpStatus.EXPECTATION_FAILED);
            } else { // 해당 userSeq로 결혼정보 입력 가능
                infoService.writeInfo(infoDto);
                InfoDto newInfoDto = infoService.getInfoByUserSeq(userSeq).orElseThrow(() -> new NoSuchElementException("data is null"));
                result.put("data", newInfoDto); // db에 저장된 정보
                result.put("message", "정보 등록 SUCCESS");
                return new ResponseEntity<>(result, HttpStatus.OK);
            }
        } catch (NoSuchElementException e) {
            result.put("message", "정보 등록 FAIL");
            return new ResponseEntity<>(result, HttpStatus.EXPECTATION_FAILED);
        }
    }

    @Operation(summary = "결혼정보 수정")
    @PutMapping("")
    public ResponseEntity<Map<String, Object>> modifyInfo(@RequestBody InfoDto infoDto) {
        Map<String, Object> result = new HashMap<>();
        infoService.modifyInfo(infoDto);
        InfoDto infoDtoAfter = infoService.getInfo(infoDto.getInfoSeq()).orElseThrow();
        result.put("data", infoDtoAfter); // 수정된 정보 (db)
        result.put("message", "정보 수정 SUCCESS");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "결혼정보 삭제")
    @GetMapping("/delete/{infoSeq}")
    public ResponseEntity<?> deleteInfo(@PathVariable Long infoSeq) {
        try {
            infoService.removeInfo(infoSeq);
            try { // 해당 결혼 정보의 앨범도 isValid = false 로 바꿔줌
                AlbumDto albumDto = albumService.getAlbumByInfoSeq(infoSeq).orElseThrow(() -> new NoSuchElementException("album is null"));
                albumService.removeAlbum(albumDto.getAlbumSeq());

            } catch (NoSuchElementException e) {
                return new ResponseEntity<>("결혼 삭제 SUCCESS - 연결된 앨범 없음", HttpStatus.OK);
            }
            return new ResponseEntity<>("결혼 삭제 SUCCESS - 연결된 앨범 삭제 완료", HttpStatus.OK);
        } catch (Exception e) { // remove에 딸린 catch
            return new ResponseEntity<>("결혼 삭제 FAIL", HttpStatus.EXPECTATION_FAILED);
        }
    }
}

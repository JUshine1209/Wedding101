package com.ssafy.wedding101.controller;

import com.ssafy.wedding101.model.dto.MediaDto;
import com.ssafy.wedding101.model.service.MediaService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/media")
@CrossOrigin
public class MediaRestController {
    private final MediaService mediaService;

    @Operation(summary = "미디어 등록")
    @PostMapping("")
    public ResponseEntity<Map<String, Object>> writeMedia(@RequestBody MediaDto mediaDto) {
        Map<String, Object> result = new HashMap<>();
        try {
            mediaService.writeMedia(mediaDto);
            result.put("message", "미디어 등록 SUCCESS");
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

    @Operation(summary = "미디어 조회")
    @GetMapping("/all/{albumSeq}")
    public ResponseEntity<Map<String, Object>> getAllMediaList(@PathVariable Long albumSeq) {
        Map<String, Object> result = new HashMap<>();
        List<MediaDto> mediaList = mediaService.getAllMedia(albumSeq);
        result.put("data", mediaList);
        result.put("count", mediaList.size());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "휴지통 미디어 조회")
    @GetMapping("/{albumSeq}/bin")
    public ResponseEntity<Map<String, Object>> getMediaListInBin(@PathVariable Long albumSeq) {
        Map<String, Object> result = new HashMap<>();
        List<MediaDto> mediaList = mediaService.getmediaListInBin(albumSeq);
        result.put("data", mediaList);
        result.put("count", mediaList.size());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "옵션으로 미디어 조회")
    @GetMapping("/{albumSeq}")
    public ResponseEntity<Map<String, Object>> getMediaListByOptions(@PathVariable Long albumSeq,
                                                                     @RequestParam(value = "type", required = false) String type,
                                                                     @RequestParam(value = "to", required = false) String to,
                                                                     @RequestParam(value = "relation", required = false) String relation) {
        Map<String, String> options = new HashMap<>();
        int optionNum = 0;
        if (!StringUtils.isEmpty(type) && type.equals("all")) { // 전체거나 빈 옶션이 아닐 때
            options.put("type", type);
            optionNum += 1;
        }
        if (!StringUtils.isEmpty(to)) {
            options.put("to", to);
            optionNum += 2;
        }
        if (!StringUtils.isEmpty(relation)) {
            options.put("relation", relation);
            optionNum += 4;
        }

        Map<String, Object> result = new HashMap<>();
        List<MediaDto> mediaList = mediaService.getMediaListByOptions(albumSeq, optionNum, options);
        result.put("data", mediaList);
        result.put("count", mediaList.size());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "미디어 삭제")
    @PutMapping("/delete/{mediaSeq}")
    public ResponseEntity<?> deleteMedia(@PathVariable Long mediaSeq) {
        try {
            mediaService.throwBin(mediaSeq);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

    @Operation(summary = "미디어 복원")
    @PutMapping("/restore/{mediaSeq}")
    public ResponseEntity<?> restoreMedia(@PathVariable Long mediaSeq) {
        try {
            mediaService.restore(mediaSeq);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

    @Operation(summary = "미디어 북마크 생성")
    @GetMapping("/wish/{mediaSeq}")
    public ResponseEntity<?> wishMedia(@PathVariable Long mediaSeq) {
        try {
            mediaService.wish(mediaSeq);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

//    @Operation(summary = "미디어 북마크 삭제")
//    @GetMapping("/unwish/{mediaSeq}")
//    public ResponseEntity<?> unwishMedia(@PathVariable Long mediaSeq) {
//        try {
//            mediaService.wish(mediaSeq);
//            return new ResponseEntity<>(HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
//        }
//    }
}

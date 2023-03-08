package com.ssafy.wedding101.controller;

import com.ssafy.wedding101.model.dto.UnifiedVideoDto;
import com.ssafy.wedding101.model.service.UnifiedVideoService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/unifiedVideo")
@CrossOrigin
public class UnifiedVideoRestController {

    private final UnifiedVideoService unifiedVideoService;


    @Operation(summary = "통합본 신청")
    @PostMapping("")
    public ResponseEntity<Map<String,Object>> writeUnifiedVideo(@RequestBody UnifiedVideoDto unifiedVideoDto){
        Map<String, Object> result = new HashMap<>();

        try {
            unifiedVideoService.writeUnifiedVideo(unifiedVideoDto);
            result.put("message", "통합본 신청 SUCCESS");
            return new ResponseEntity<>(result, HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

    @Operation(summary = "통합본 조회")
    @GetMapping("/all/{albumSeq}")
    public ResponseEntity<Map<String, Object>> getAllUnifiedVideo(@PathVariable Long albumSeq) {
        Map<String, Object> result = new HashMap<>();
        List<UnifiedVideoDto> unifiedVideoList = unifiedVideoService.getAllUnifiedVideo(albumSeq);
        result.put("data", unifiedVideoList);
        result.put("count", unifiedVideoList.size());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "통합본 삭제")
    @PutMapping("/delete/{unifiedSeq}")
    public ResponseEntity<?> deleteUnifiedVideo (@PathVariable Long unifiedSeq) {
        try {
            unifiedVideoService.removeUnifiedVideo(unifiedSeq);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }
}

package com.ssafy.wedding101.controller;

import com.ssafy.wedding101.model.dto.QuestionDto;
import com.ssafy.wedding101.model.service.QuestionService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/qna")
@CrossOrigin
public class QuestionRestController {
    private final QuestionService questionService;

    @Operation(summary = "문의 등록")
    @PostMapping("")
    public ResponseEntity<Map<String, Object>> writeQuestion(@RequestBody QuestionDto questionDto) {
        Map<String, Object> result = new HashMap<>();
        //토큰에서 가져오기
        Long userSeq = questionDto.getUserSeq();
        //questionDto.set(userSeq)
        try {
            questionService.writeQuestion(questionDto);
            QuestionDto newQuestionDto = questionService.getQuestionByUserSeq(questionDto.getUserSeq())
                    .orElseThrow(() -> new NoSuchElementException("문의 등록 FAIL"));

            result.put("data", newQuestionDto);
            result.put("message", "문의 등록 SUCCESS");
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            result.put("message", "문의 등록 FAIL");
            return new ResponseEntity<>(result, HttpStatus.EXPECTATION_FAILED);
        }
    }

    @Operation(summary = "전체 문의 조회")
    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> getQuestionList() {
        Map<String, Object> result = new HashMap<>();
        List<QuestionDto> questionList = questionService.getAllQuestion();
        result.put("data", questionList); // 전체 문의 목록
        result.put("count", questionList.size()); // 문의 게시글 수
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "문의 조회")
    @GetMapping("/{questionSeq}")
    public ResponseEntity<Map<String, Object>> getQuestionDetail(@PathVariable Long questionSeq) {
        Map<String, Object> result = new HashMap<>();
        try {
            QuestionDto questionDto = questionService.getQuestionDetail(questionSeq)
                    .orElseThrow(() -> new NoSuchElementException("문의 시퀀스 오류"));
            result.put("data", questionDto);
            result.put("message", "문의 조회 SUCCESS");
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            result.put("message", "문의 시퀀스에 해당하는 문의가 없습니다.");
            return new ResponseEntity<>(result, HttpStatus.EXPECTATION_FAILED);
        }
    }

    @Operation(summary = "문의 삭제")
    @PutMapping("/{questionSeq}")
    public ResponseEntity<?> deleteQuestion(@PathVariable Long questionSeq) {
        try {
            questionService.removeQuestion(questionSeq);
            return new ResponseEntity<>("문의 삭제 SUCCESS", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("문의 삭제 FAIL", HttpStatus.EXPECTATION_FAILED);
        }
    }
}

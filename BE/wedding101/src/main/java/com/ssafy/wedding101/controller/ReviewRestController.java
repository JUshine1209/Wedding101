package com.ssafy.wedding101.controller;

import com.ssafy.wedding101.model.dto.ReviewDto;
import com.ssafy.wedding101.model.service.AlbumService;
import com.ssafy.wedding101.model.service.ReviewService;
import com.ssafy.wedding101.model.service.UserService;
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
@RequestMapping("/review")
@CrossOrigin
public class ReviewRestController {
    private final ReviewService reviewService;
    private final UserService userService;
    private final AlbumService albumService;

    @Operation(summary = "리뷰 등록")
    @PostMapping("")
    public ResponseEntity<Map<String, Object>> writeQuestion(@RequestBody ReviewDto reviewDto) {
        Map<String, Object> result = new HashMap<>();
        //토큰에서 가져오기
//        Long userSeq =
        Long userSeq = 1L;
        // reviewDto.setUserId();
        try {
            if (!reviewService.duplicateReview(reviewDto.getAlbumSeq())) {
                // 해당 앨범 Seq로 리뷰작성 불가능, 회원 당 앨범은 1개 -> 앨범 seq만 확인하면 됨
                result.put("message", "이미 리뷰를 작성했습니다. 수정 또는 삭제 후 재작성 해주세요.");
                return new ResponseEntity<>(result, HttpStatus.EXPECTATION_FAILED);
            } else {
                reviewService.writeReview(reviewDto);
                ReviewDto newReviewDto = reviewService.getReviewByUserSeq(userSeq)
                        .orElseThrow(() -> new NoSuchElementException("리뷰 등록 FAIL"));
                newReviewDto.setUserNickname(userService.getUser(userSeq).orElseThrow().getUserNickname());
                result.put("data", newReviewDto);
                result.put("messsage", "리뷰 등록 SUCCESS");
                return new ResponseEntity<>(result, HttpStatus.OK);
            }

        } catch (NoSuchElementException e) {
            result.put("message", "리뷰 등록 FAIL");
            return new ResponseEntity<>(result, HttpStatus.EXPECTATION_FAILED);
        }
    }

    @Operation(summary = "전체 리뷰 조회")
    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> getReviewList() {
        Map<String, Object> result = new HashMap<>();
        List<ReviewDto> reviewList = reviewService.getAllReview();
        for (int i = 0; i < reviewList.size(); i++) {
            ReviewDto temp = reviewList.get(i);
            //1.
            Long albumSeq = temp.getAlbumSeq();
            temp.setUserNickname((userService.getUser(albumService.getAlbum(albumSeq).orElseThrow().getUserSeq()).orElseThrow().getUserNickname()));
            //2. 토큰에서 userSeq가져오면
            //temp.setUserId(userService.getUser(userSeq).orElseThrow().getUserId());
            reviewList.set(i, temp);
        } // userId 넣는 과정 필요없으면 지워도됨 -> 리뷰목록에서 
        result.put("data", reviewList); // 전체 리뷰 목록
        result.put("count", reviewList.size()); // 리뷰 게시글 수
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "리뷰 조회")
    @GetMapping("/{reviewSeq}")
    public ResponseEntity<Map<String, Object>> getReviewDetail(@PathVariable Long reviewSeq) {
        Map<String, Object> result = new HashMap<>();
        try {
            ReviewDto reviewDto = reviewService.getReviewDetail(reviewSeq).orElseThrow(() -> new NoSuchElementException("리뷰 시퀀스 오류"));
            //1.
            reviewDto.setUserNickname(userService.getUser(albumService.getAlbum(reviewDto.getAlbumSeq()).orElseThrow().getUserSeq()).orElseThrow().getUserNickname());
            //2. 토큰에서 가져와서넣던가
            if (!reviewDto.isVaild()) {
                result.put("message", "리뷰 시퀀스에 해당하는 리뷰가 없습니다.");
                return new ResponseEntity<>(result, HttpStatus.EXPECTATION_FAILED);
            }
            result.put("data", reviewDto);
            result.put("message", "리뷰 조회 SUCCESS");
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            result.put("message", "리뷰 시퀀스에 해당하는 리뷰가 없습니다.");
            return new ResponseEntity<>(result, HttpStatus.EXPECTATION_FAILED);
        }
    }

    @Operation(summary = "리뷰 삭제")
    @PutMapping("/delete/{reviewSeq}")
    public ResponseEntity<?> deleteReview(@PathVariable Long reviewSeq) {
        try {
            reviewService.removeReview(reviewSeq);
            return new ResponseEntity<>("리뷰 삭제 SUCCESS", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("리뷰 삭제 FAIL", HttpStatus.EXPECTATION_FAILED);
        }
    }
}

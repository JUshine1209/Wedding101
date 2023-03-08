package com.ssafy.wedding101.model.service;

import com.ssafy.wedding101.model.dto.ReviewDto;
import com.ssafy.wedding101.model.entity.Review;
import com.ssafy.wedding101.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface ReviewService {
    Optional<ReviewDto> getReviewDetail(Long reviewSeq);

    Optional<ReviewDto> getReviewByUserSeq(Long userSeq);

    List<ReviewDto> getAllReview();

    void writeReview(ReviewDto reviewDto);

    boolean duplicateReview(Long albumSeq);

    void removeReview(Long reviewSeq);

    void modifyReview(ReviewDto reviewDto);

    default ReviewDto toDto(Review review) {
        return ReviewDto.builder()
                .reviewSeq(review.getReviewSeq())
                .albumSeq(review.getAlbum().getAlbumSeq())
                .reviewTitle(review.getReviewTitle())
                .reviewRate(review.getReviewRate())
                .reviewContent(review.getReviewContent())
                .createdAt(review.getCreatedAt())
                .updatedAt(review.getUpdatedAt())
                .isVaild(review.isValid())
                .build();
    }

    default Review toEntity(ReviewDto reviewDto) {
        return Review.builder()
                .reviewSeq(reviewDto.getReviewSeq())
                .reviewTitle(reviewDto.getReviewTitle())
                .reviewContent(reviewDto.getReviewContent())
                .reviewRate(reviewDto.getReviewRate())
                .isValid(true)
                .build();
    }

}

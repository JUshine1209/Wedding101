package com.ssafy.wedding101.model.service.impl;

import com.ssafy.wedding101.model.dto.ReviewDto;
import com.ssafy.wedding101.model.entity.Album;
import com.ssafy.wedding101.model.entity.Review;
import com.ssafy.wedding101.model.repository.AlbumRepository;
import com.ssafy.wedding101.model.repository.ReviewRepository;
import com.ssafy.wedding101.model.repository.UserRepository;
import com.ssafy.wedding101.model.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigInteger;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final AlbumRepository albumRepository;

    @Override
    public Optional<ReviewDto> getReviewDetail(Long reviewSeq) {
        Review review = reviewRepository.findById(reviewSeq).orElseThrow();
        return Optional.ofNullable(toDto(review));
    }

    @Override
    public Optional<ReviewDto> getReviewByUserSeq(Long userSeq) {
        Album album = albumRepository.findByUserSeq(userSeq).orElseThrow();
        Review review = reviewRepository.findByAlbumSeq(album.getAlbumSeq()).orElseThrow();
        return Optional.ofNullable(toDto(review));
    }

    @Override
    public List<ReviewDto> getAllReview() {
        return reviewRepository.findAllReview().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public void writeReview(ReviewDto reviewDto) {
        Review review = toEntity(reviewDto);
        review.setAlbum(albumRepository.findById(reviewDto.getAlbumSeq()).orElseThrow());
        reviewRepository.save(review);
    }

    @Override
    public boolean duplicateReview(Long albumSeq) {
        return reviewRepository.existsByAlbumSeq( albumSeq).equals(BigInteger.ZERO);
    }

    @Override
    public void removeReview(Long reviewSeq) {
        Review review = reviewRepository.findById(reviewSeq).orElseThrow();
        review.updateIsValid();
    }

    @Override
    public void modifyReview(ReviewDto reviewDto) {
        Review review = reviewRepository.findById(reviewDto.getReviewSeq()).orElseThrow();
        reviewRepository.updateReview(review.getReviewSeq(), review.getReviewRate(), review.getReviewTitle(), review.getReviewContent());
    }
}

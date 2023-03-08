package com.ssafy.wedding101.model.repository;

import com.ssafy.wedding101.model.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Query(nativeQuery = true, value = "select * from tbl_review " +
            "where album_seq = :albumSeq and is_valid = true")
    Optional<Review> findByAlbumSeq(@Param("albumSeq") Long albumSeq);

    @Query(nativeQuery = true, value = "select * " +
            "from tbl_review " +
            "where is_valid = true;")
    List<Review> findAllReview();

    @Modifying
    @Query(nativeQuery = true, value = "update tbl_review " +
            "set review_rate = :reviewRate, review_title = :reviewTitle, review_content = :reviewContent " +
            "where review_seq = :reviewSeq")
    void updateReview(@Param("reviewSeq") Long reviewSeq, @Param("reviewRate") Integer reviewRate, @Param("reviewTitle") String reviewTitle, @Param("reviewContent") String reviewContent);

    @Query(nativeQuery = true, value = "select count(r.review_seq) " +
            "from tbl_review r where r.album_seq = :albumSeq and r.is_valid = true")
    Object existsByAlbumSeq(@Param("albumSeq") Long albumSeq);
}

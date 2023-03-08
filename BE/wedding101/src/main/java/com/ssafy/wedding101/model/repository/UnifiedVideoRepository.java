package com.ssafy.wedding101.model.repository;

import com.ssafy.wedding101.model.entity.Album;
import com.ssafy.wedding101.model.entity.UnifiedVideo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UnifiedVideoRepository extends JpaRepository<UnifiedVideo, Long> {

    @Query(nativeQuery = true, value = "select * from tbl_unified " +
            "where album_seq = :albumSeq")
    Optional<UnifiedVideo> findByAlbumSeq(@Param("albumSeq") Long albumSeq);

    @Query(nativeQuery = true, value = "select * " +
            "from tbl_unified where album_seq = :albumSeq")
    List<UnifiedVideo> findAllByAlbumSeq(@Param("albumSeq") Long albumSeq);
}

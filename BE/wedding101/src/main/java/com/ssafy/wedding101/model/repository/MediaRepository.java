package com.ssafy.wedding101.model.repository;

import com.ssafy.wedding101.model.entity.Media;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MediaRepository extends JpaRepository<Media, Long> {
    @Query(nativeQuery = true, value = "select * " +
            "from tbl_media where album_seq = :albumSeq and is_in_bin = false " +
            "order by media_seq desc")
    List<Media> findAllByAlbumSeq(@Param("albumSeq") Long albumSeq);

    @Query(nativeQuery = true, value = "select * " +
            "from tbl_media where album_seq = :albumSeq and is_in_bin = false and is_video = :type")
    List<Media> findAllByType(@Param("albumSeq") Long albumSeq, @Param("type") int type);

    @Query(nativeQuery = true, value = "select * " +
            "from tbl_media where album_seq = :albumSeq and is_in_bin = false and media_receiver = :to")
    List<Media> findAllByTo(@Param("albumSeq") Long albumSeq, @Param("to") String to);

    @Query(nativeQuery = true, value = "select * " +
            "from tbl_media where album_seq = :albumSeq and is_in_bin = false and is_video = :type and media_receiver = :to")
    List<Media> findAllByTypeAndTo(@Param("albumSeq") Long albumSeq, @Param("type") int type, @Param("to") String to);

    @Query(nativeQuery = true, value = "select * " +
            "from tbl_media where album_seq = :albumSeq and is_in_bin = false and media_relation = :relation")
    List<Media> findAllByRelation(@Param("albumSeq") Long albumSeq, @Param("relation") String relation);

    @Query(nativeQuery = true, value = "select * " +
            "from tbl_media where album_seq = :albumSeq and is_in_bin = false and is_video = :type and media_relation = :relation")
    List<Media> findAllByTypeAndRelation(@Param("albumSeq") Long albumSeq, @Param("type") int type, @Param("relation") String relation);

    @Query(nativeQuery = true, value = "select * " +
            "from tbl_media where album_seq = :albumSeq and is_in_bin = false and media_receiver = :to and media_relation = :relation")
    List<Media> findAllByToAndRelation(@Param("albumSeq") Long albumSeq, @Param("to") String to, @Param("relation") String relation);

    @Query(nativeQuery = true, value = "select * " +
            "from tbl_media where album_seq = :albumSeq and is_in_bin = false and is_video = :type and media_receiver = :to and media_relation = :relation")
    List<Media> findAllByOptions(@Param("albumSeq") Long albumSeq, @Param("type") int type, @Param("to") String to, @Param("relation") String relation);

    @Query(nativeQuery = true, value = "select * " +
            "from tbl_media where album_seq = :albumSeq and is_in_bin = true")
    List<Media> findAllInBinByAlbumSeq(Long albumSeq);
}
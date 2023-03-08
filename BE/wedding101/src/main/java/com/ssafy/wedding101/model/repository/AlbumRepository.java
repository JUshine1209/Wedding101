package com.ssafy.wedding101.model.repository;

import com.ssafy.wedding101.model.entity.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Long> {
    @Query(nativeQuery = true, value = "select * " +
            "from tbl_album where user_seq = :userSeq and is_valid = true")
    Optional<Album> findByUserSeq(@Param("userSeq") Long userSeq);

    boolean existsByAlbumAccessId(String albumAccessId);

    Optional<Album> findByAlbumAccessId(String albumAccessId);

    @Query(nativeQuery = true, value = "select * " +
            "from tbl_album where info_seq = :infoSeq and is_valid = true")
    Optional<Album> findByInfoSeq(@Param("infoSeq") Long infoSeq);

    @Query(nativeQuery = true, value = "select count(a.user_seq) " +
            "from tbl_album a where a.user_seq = :userSeq and a.is_valid = true")
    Object existsByUserSeq(@Param("userSeq") Long userSeq);

    @Query(nativeQuery = true, value = "select count(a.album_access_id) " +
            "from tbl_album a where a.album_access_id = :accessId and is_valid = true")
    Object existsByAccessId(@Param("accessId") String accessId);

    @Modifying
    @Query(nativeQuery = true, value = "update tbl_album " +
            "set album_media_cnt = album_media_cnt - 1 " +
            "where album_seq = :albumSeq")
    void minusOneMediaCnt(@Param("albumSeq") Long albumSeq);

    @Modifying
    @Query(nativeQuery = true, value = "update tbl_album " +
            "set album_media_cnt = album_media_cnt + 1 " +
            "where album_seq = :albumSeq")
    void plusOneMediaCnt(@Param("albumSeq") Long albumSeq);
}

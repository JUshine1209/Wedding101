package com.ssafy.wedding101.model.service;

import com.ssafy.wedding101.model.dto.AlbumDto;
import com.ssafy.wedding101.model.entity.Album;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface AlbumService {
    Optional<AlbumDto> getAlbum(Long albumSeq);
    Optional<AlbumDto> getAlbumByUserSeq(Long userSeq);

    void writeAlbum(AlbumDto albumDto);

    void removeAlbum(Long albumSeq);

    void modifyAlbum(AlbumDto albumDto);

    boolean existAccessId(String albumAccessId);

    Long getAlbumSeqByAccessId(String albumAccessId);

    Optional<AlbumDto> getAlbumByInfoSeq(Long infoSeq);

    boolean checkAlbumDuplicate(Long userSeq);

    boolean checkAccessIdDuplicate(String accessId);

    default Album toEntity(AlbumDto albumDto) {
        return Album.builder()
                .albumSeq(albumDto.getAlbumSeq())
                .albumName(albumDto.getAlbumName())
                .albumColor(albumDto.getAlbumColor())
                .albumPhotoUrl(albumDto.getAlbumPhotoUrl())
                .albumAccessId(albumDto.getAlbumAccessId())
                .albumThanksUrl(albumDto.getAlbumThanksUrl())
                .albumMediaCnt(albumDto.getAlbumMediaCnt())
                .isValid(albumDto.isValid())
                .build();
    }

    default AlbumDto toDto(Album album) {
        return AlbumDto.builder()
                .albumSeq(album.getAlbumSeq())
                .infoSeq(album.getInfo().getInfoSeq())
                .userSeq(album.getUserSeq())
                .albumName(album.getAlbumName())
                .albumColor(album.getAlbumColor())
                .albumPhotoUrl(album.getAlbumPhotoUrl())
                .albumAccessId(album.getAlbumAccessId())
                .albumThanksUrl(album.getAlbumThanksUrl())
                .albumMediaCnt(album.getAlbumMediaCnt())
                .createdAt(album.getCreatedAt())
                .updatedAt(album.getUpdatedAt())
                .isValid(album.isValid())
                .build();
    }
}

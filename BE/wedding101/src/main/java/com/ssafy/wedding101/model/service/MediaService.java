package com.ssafy.wedding101.model.service;

import com.ssafy.wedding101.model.dto.MediaDto;
import com.ssafy.wedding101.model.entity.Media;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public interface MediaService {
    Optional<MediaDto> getMedia(Long mediaSeq);

    List<MediaDto> getAllMedia(Long albumSeq);

    List<MediaDto> getMediaListByOptions(Long albumSeq, int optionNum, Map<String, String> options);

    void writeMedia(MediaDto mediaDto);

    void throwBin(Long mediaSeq);

    void restore(Long mediaSeq);

    void wish(Long mediaSeq);

//    void unwish(Long mediaSeq);

    List<MediaDto> getmediaListInBin(Long albumSeq);

    default Media toEntity(MediaDto mediaDto) {
        return Media.builder()
                .mediaSeq(mediaDto.getMediaSeq())
                .storageUrl(mediaDto.getStorageUrl())
                .urlToImg(mediaDto.getUrlToImg())
                .onBooth(mediaDto.isOnBooth())
                .isVideo(mediaDto.isVideo())
                .mediaName(mediaDto.getMediaName())
                .mediaRelation(mediaDto.getMediaRelation())
                .mediaReceiver(mediaDto.getMediaReceiver())
                .build();
    }

    default MediaDto toDto(Media media) {
        return MediaDto.builder()
                .mediaSeq(media.getMediaSeq())
                .albumSeq(media.getAlbum().getAlbumSeq())
                .storageUrl(media.getStorageUrl())
                .urlToImg(media.getUrlToImg())
                .onBooth(media.isOnBooth())
                .isVideo(media.isVideo())
                .mediaName(media.getMediaName())
                .mediaRelation(media.getMediaRelation())
                .mediaReceiver(media.getMediaReceiver())
                .isWish(media.isWish())
                .isInBin(media.isInBin())
                .build();
    }

}

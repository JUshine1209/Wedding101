package com.ssafy.wedding101.model.service.impl;

import com.ssafy.wedding101.model.dto.MediaDto;
import com.ssafy.wedding101.model.entity.Album;
import com.ssafy.wedding101.model.entity.Media;
import com.ssafy.wedding101.model.repository.AlbumRepository;
import com.ssafy.wedding101.model.repository.MediaRepository;
import com.ssafy.wedding101.model.service.MediaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class MediaServiceImpl implements MediaService {

    private final MediaRepository mediaRepository;
    private final AlbumRepository albumRepository;

    @Override
    public Optional<MediaDto> getMedia(Long mediaSeq) {
        return Optional.empty();
    }

    @Override
    public List<MediaDto> getAllMedia(Long albumSeq) {
        return mediaRepository.findAllByAlbumSeq(albumSeq).stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<MediaDto> getMediaListByOptions(Long albumSeq, int optionNum, Map<String, String> options) {
        List<MediaDto> result = new ArrayList<>();
        int type = -1;
        if(options.containsKey("type")) {
            if(options.get("type").equals("video")) {
                type = 1;
            } else {
                type = 0;
            }
        }

        switch (optionNum) {
            case 0: // 옵션 안걸려있음
                result = mediaRepository.findAllByAlbumSeq(albumSeq).stream().map(this::toDto).collect(Collectors.toList());
                break;
            case 1: // type
                result = mediaRepository.findAllByType(albumSeq, type).stream().map(this::toDto).collect(Collectors.toList());
                break;
            case 2: // to
                result = mediaRepository.findAllByTo(albumSeq, options.get("to")).stream().map(this::toDto).collect(Collectors.toList());
                break;
            case 3: // type & to
                result = mediaRepository.findAllByTypeAndTo(albumSeq, type, options.get("to")).stream().map(this::toDto).collect(Collectors.toList());
                break;
            case 4: // relation
                result = mediaRepository.findAllByRelation(albumSeq, options.get("relation")).stream().map(this::toDto).collect(Collectors.toList());
                break;
            case 5: // type & relation
                System.out.println("서비스임플");
                System.out.println(options.get("relation"));
                result = mediaRepository.findAllByTypeAndRelation(albumSeq, type, options.get("relation")).stream().map(this::toDto).collect(Collectors.toList());
                break;
            case 6: // to & relation
                result = mediaRepository.findAllByToAndRelation(albumSeq, options.get("to"), options.get("relation")).stream().map(this::toDto).collect(Collectors.toList());
                break;
            case 7: // all
                result = mediaRepository.findAllByOptions(albumSeq, type, options.get("to"), options.get("relation")).stream().map(this::toDto).collect(Collectors.toList());
                break;
            default:

        }
        return result;
    }

    @Override
    public void writeMedia(MediaDto mediaDto) {
        Media media = toEntity(mediaDto);
        Album album = albumRepository.findById(mediaDto.getAlbumSeq()).orElseThrow();
        media.setAlbum(album);
        mediaRepository.save(media);
    }

    @Override
    public void throwBin(Long mediaSeq) {
        Media media = mediaRepository.findById(mediaSeq).orElseThrow();
        albumRepository.minusOneMediaCnt(media.getAlbum().getAlbumSeq());
        media.throwBin();
    }

    @Override
    public void restore(Long mediaSeq) {
        Media media = mediaRepository.findById(mediaSeq).orElseThrow();
        albumRepository.plusOneMediaCnt(media.getAlbum().getAlbumSeq());
        media.restore();
    }

    @Override
    public void wish(Long mediaSeq) {
        Media media = mediaRepository.findById(mediaSeq).orElseThrow();
        media.wish(media.isWish());
    }

//    @Override
//    public void unwish(Long mediaSeq) {
//        Media media = mediaRepository.findById(mediaSeq).orElseThrow();
//        media.unwish();
//    }

    @Override
    public List<MediaDto> getmediaListInBin(Long albumSeq) {
        return mediaRepository.findAllInBinByAlbumSeq(albumSeq).stream().map(this::toDto).collect(Collectors.toList());
    }
}

package com.ssafy.wedding101.model.service.impl;

import com.ssafy.wedding101.model.dto.UnifiedVideoDto;
import com.ssafy.wedding101.model.entity.Album;
import com.ssafy.wedding101.model.entity.UnifiedVideo;
import com.ssafy.wedding101.model.repository.AlbumRepository;
import com.ssafy.wedding101.model.repository.UnifiedVideoRepository;
import com.ssafy.wedding101.model.repository.UserRepository;
import com.ssafy.wedding101.model.service.UnifiedVideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class UnifiedVideoServiceImpl implements UnifiedVideoService {

    private final UserRepository userRepository;
    private final AlbumRepository albumRepository;
    private final UnifiedVideoRepository unifiedVideoRepository;
    @Override
    public List<UnifiedVideoDto> getAllUnifiedVideo(Long albumSeq) {
        return unifiedVideoRepository.findAllByAlbumSeq(albumSeq).stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public void writeUnifiedVideo(UnifiedVideoDto unifiedVideoDto) {
        UnifiedVideo unifiedVideo = toEntity(unifiedVideoDto);
        Album album = albumRepository.findById(unifiedVideoDto.getAlbumSeq()).orElseThrow();
        unifiedVideo.setAlbum(album);
        unifiedVideoRepository.save(unifiedVideo);
    }

    @Override
    public void removeUnifiedVideo(Long unifiedSeq) {
        UnifiedVideo unifiedVideo = unifiedVideoRepository.findById(unifiedSeq).orElseThrow();
        unifiedVideoRepository.delete(unifiedVideo);
    }
}

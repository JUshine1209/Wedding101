package com.ssafy.wedding101.model.service;

import com.ssafy.wedding101.model.dto.UnifiedVideoDto;
import com.ssafy.wedding101.model.entity.UnifiedVideo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UnifiedVideoService {

    List<UnifiedVideoDto> getAllUnifiedVideo(Long albumSeq);

    void writeUnifiedVideo(UnifiedVideoDto unifiedVideoDto);

    void removeUnifiedVideo(Long unifiedSeq);

    default UnifiedVideoDto toDto(UnifiedVideo unifiedVideo){
        return UnifiedVideoDto.builder()
                .unifiedSeq(unifiedVideo.getUnifiedSeq())
                .albumSeq(unifiedVideo.getAlbum().getAlbumSeq())
                .unifiedName(unifiedVideo.getUnifiedName())
                .requestStatus(unifiedVideo.getRequestStatus())
                .unifiedUrl(unifiedVideo.getUnifiedUrl())
                .createdAt(unifiedVideo.getCreatedAt())
                .updatedAt(unifiedVideo.getUpdatedAt())
                .build();
    }

    default UnifiedVideo toEntity(UnifiedVideoDto unifiedVideoDto){
        return UnifiedVideo.builder()
                .unifiedSeq(unifiedVideoDto.getUnifiedSeq())
                .unifiedName(unifiedVideoDto.getUnifiedName())
                .requestStatus(unifiedVideoDto.getRequestStatus())
                .unifiedUrl(unifiedVideoDto.getUnifiedUrl())
                .build();
    }
}

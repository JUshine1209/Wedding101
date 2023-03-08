package com.ssafy.wedding101.model.service.impl;

import com.ssafy.wedding101.model.dto.AlbumDto;
import com.ssafy.wedding101.model.entity.Album;
import com.ssafy.wedding101.model.repository.AlbumRepository;
import com.ssafy.wedding101.model.repository.InfoRepository;
import com.ssafy.wedding101.model.service.AlbumService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigInteger;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class AlbumServiceImpl implements AlbumService {
    private final AlbumRepository albumRepository;
    private final InfoRepository infoRepository;

    @Override
    public Optional<AlbumDto> getAlbum(Long albumSeq) {
        return Optional.ofNullable(toDto(albumRepository.findById(albumSeq).orElseThrow()));
    }

    @Override
    public Optional<AlbumDto> getAlbumByUserSeq(Long userSeq) {
        return Optional.ofNullable(toDto(albumRepository.findByUserSeq(userSeq).orElseThrow()));
    }


    @Override
    public void writeAlbum(AlbumDto albumDto) {
        Album album = toEntity(albumDto);
        album.setInfo(infoRepository.findByUserSeq(albumDto.getUserSeq()).orElseThrow());
        albumRepository.save(album);
    }

    @Override
    public void removeAlbum(Long albumSeq) {
        Album album = albumRepository.findById(albumSeq).orElseThrow();
        album.updateIsValid();
    }

    @Override
    public void modifyAlbum(AlbumDto albumDto) {
        Album album = albumRepository.findById(albumDto.getAlbumSeq()).orElseThrow();
        album.update(albumDto.getAlbumName(), albumDto.getAlbumColor(), albumDto.getAlbumPhotoUrl(), albumDto.getAlbumThanksUrl());
    }

    @Override
    public boolean existAccessId(String albumAccessId) {
        return albumRepository.existsByAlbumAccessId(albumAccessId);
    }

    @Override
    public Long getAlbumSeqByAccessId(String albumAccessId) {
        Album album = albumRepository.findByAlbumAccessId(albumAccessId).orElseThrow();
        return album.getAlbumSeq();
    }

    @Override
    public Optional<AlbumDto> getAlbumByInfoSeq(Long infoSeq) {
        return Optional.ofNullable(toDto(albumRepository.findByInfoSeq(infoSeq).orElseThrow()));
    }

    @Override
    public boolean checkAlbumDuplicate(Long userSeq) {
        return albumRepository.existsByUserSeq(userSeq).equals(BigInteger.ZERO);
    }

    @Override
    public boolean checkAccessIdDuplicate(String accessId) {
        return albumRepository.existsByAccessId(accessId).equals(BigInteger.ZERO);
    }

}

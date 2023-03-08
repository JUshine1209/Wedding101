package com.ssafy.wedding101.model.service;

import com.ssafy.wedding101.model.dto.InfoDto;
import com.ssafy.wedding101.model.entity.Info;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Optional;

@Service
public interface InfoService {
    Optional<InfoDto> getInfo(Long infoSeq);
    Optional<InfoDto> getInfoByUserSeq(Long userSeq);

    void writeInfo(InfoDto infoDto);

    void removeInfo(Long infoSeq);

    void modifyInfo(InfoDto infoDto);

    Long getInfoSeqByUserSeq(Long userSeq);

    boolean checkInfoDuplicate(Long userSeq);

    default Info toEntity(InfoDto infoDto) {
        return Info.builder()
                .infoSeq(infoDto.getInfoSeq())
                .weddingDay(infoDto.getWeddingDay())
                .weddingHallName(infoDto.getWeddingHallName())
                .weddingHallAddress(infoDto.getWeddingHallAddress())
                .weddingHallNumber(infoDto.getWeddingHallNumber())
                .groomName(infoDto.getGroomName())
                .brideName(infoDto.getBrideName())
                .groomPhoneNumber(infoDto.getGroomPhoneNumber())
                .bridePhoneNumber(infoDto.getBridePhoneNumber())
                .groomAccountNumber(infoDto.getGroomAccountNumber())
                .groomAccountBank(infoDto.getGroomAccountBank())
                .groomAccountName(infoDto.getGroomAccountName())
                .brideAccountNumber(infoDto.getBrideAccountNumber())
                .brideAccountBank(infoDto.getBrideAccountBank())
                .brideAccountName(infoDto.getBrideAccountName())
                .groomRelation(infoDto.getGroomRelation())
                .brideRelation(infoDto.getBrideRelation())
                .groomFatherName(infoDto.getGroomFatherName())
                .groomMotherName(infoDto.getGroomMotherName())
                .brideFatherName(infoDto.getBrideFatherName())
                .brideMotherName(infoDto.getBrideMotherName())
                .groomFatherIsAlive(infoDto.isGroomFatherIsAlive())
                .groomMotherIsAlive(infoDto.isGroomMotherIsAlive())
                .brideFatherIsAlive(infoDto.isBrideFatherIsAlive())
                .brideMotherIsAlive(infoDto.isBrideMotherIsAlive())
                .isValid(true)
                .build();
    }

    default InfoDto toDto(Info info) {
        return InfoDto.builder()
                .infoSeq(info.getInfoSeq())
                .userSeq(info.getUser().getUserSeq())
                .weddingDay(info.getWeddingDay())
                .weddingHallName(info.getWeddingHallName())
                .weddingHallAddress(info.getWeddingHallAddress())
                .weddingHallNumber(info.getWeddingHallNumber())
                .groomName(info.getGroomName())
                .brideName(info.getBrideName())
                .groomPhoneNumber(info.getGroomPhoneNumber())
                .bridePhoneNumber(info.getBridePhoneNumber())
                .groomAccountNumber(info.getGroomAccountNumber())
                .groomAccountBank(info.getGroomAccountBank())
                .groomAccountName(info.getGroomAccountName())
                .brideAccountNumber(info.getBrideAccountNumber())
                .brideAccountBank(info.getBrideAccountBank())
                .brideAccountName(info.getBrideAccountName())
                .groomRelation(info.getGroomRelation())
                .brideRelation(info.getBrideRelation())
                .groomFatherName(info.getGroomFatherName())
                .groomMotherName(info.getGroomMotherName())
                .brideFatherName(info.getBrideFatherName())
                .brideMotherName(info.getBrideMotherName())
                .groomFatherIsAlive(info.isGroomFatherIsAlive())
                .groomMotherIsAlive(info.isGroomMotherIsAlive())
                .brideFatherIsAlive(info.isBrideFatherIsAlive())
                .brideMotherIsAlive(info.isBrideMotherIsAlive())
                .build();
    }
}

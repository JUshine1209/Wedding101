package com.ssafy.wedding101.model.service.impl;

import com.ssafy.wedding101.model.dto.InfoDto;
import com.ssafy.wedding101.model.entity.Info;
import com.ssafy.wedding101.model.entity.User;
import com.ssafy.wedding101.model.repository.InfoRepository;
import com.ssafy.wedding101.model.repository.UserRepository;
import com.ssafy.wedding101.model.service.InfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigInteger;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class InfoServiceImpl implements InfoService {
    private final InfoRepository infoRepository;
    private final UserRepository userRepository;

    @Override
    public Optional<InfoDto> getInfo(Long infoSeq) {
        return Optional.ofNullable(toDto(infoRepository.findById(infoSeq).orElseThrow()));
    }

    @Override
    public Optional<InfoDto> getInfoByUserSeq(Long userSeq) {
        return Optional.ofNullable(toDto(infoRepository.findByUserSeq(userSeq).orElseThrow()));
    }

    @Override
    public void writeInfo(InfoDto infoDto) {
        Info info = toEntity(infoDto);
        User user = userRepository.findById(infoDto.getUserSeq()).orElseThrow();
        info.setUser(user);
        infoRepository.save(info);
    }

    @Override
    public void removeInfo(Long infoSeq) {
        Info info = infoRepository.findById(infoSeq).orElseThrow();
        info.updateIsValid();
    }

    @Override
    public void modifyInfo(InfoDto infoDto) {
        Info info = infoRepository.findById(infoDto.getInfoSeq()).orElseThrow();
        info.updateInfo(infoDto.getWeddingDay(), infoDto.getWeddingHallName(), infoDto.getWeddingHallAddress(),
                infoDto.getWeddingHallNumber(), infoDto.getGroomName(), infoDto.getBrideName(),
                infoDto.getGroomPhoneNumber(), infoDto.getBridePhoneNumber(), infoDto.getGroomAccountNumber(),
                infoDto.getGroomAccountBank(), infoDto.getGroomAccountName(), infoDto.getBrideAccountNumber(),
                infoDto.getBrideAccountBank(), infoDto.getBrideAccountName(), infoDto.getGroomRelation(),
                infoDto.getBrideRelation(), infoDto.getGroomFatherName(), infoDto.getGroomMotherName(),
                infoDto.getBrideFatherName(), infoDto.getBrideMotherName(), infoDto.isGroomFatherIsAlive(),
                infoDto.isGroomMotherIsAlive(), infoDto.isBrideFatherIsAlive(), infoDto.isBrideMotherIsAlive());
    }

    @Override
    public Long getInfoSeqByUserSeq(Long userSeq) {
        return infoRepository.findByUserSeq(userSeq).orElseThrow().getInfoSeq();
    }

    @Override
    public boolean checkInfoDuplicate(Long userSeq) {
        return infoRepository.existsByUserSeq(userSeq).equals(BigInteger.ZERO);
    }
}

package com.ssafy.wedding101.model.service.impl;

import com.ssafy.wedding101.model.dto.InvitationDto;
import com.ssafy.wedding101.model.entity.Info;
import com.ssafy.wedding101.model.entity.Invitation;
import com.ssafy.wedding101.model.entity.Template;
import com.ssafy.wedding101.model.repository.InfoRepository;
import com.ssafy.wedding101.model.repository.InvitationRepository;
import com.ssafy.wedding101.model.repository.TemplateRepository;
import com.ssafy.wedding101.model.service.InvitationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class InvitationServiceImpl implements InvitationService {
    private final InvitationRepository invitationRepository;
    private final InfoRepository infoRepository;
    private final TemplateRepository templateRepository;

    @Override
    public Optional<InvitationDto> getInvitation(Long invitationSeq) {
        return Optional.ofNullable(toDto(invitationRepository.findByInvitationSeq(invitationSeq).orElseThrow()));
    }

    @Override
    public Optional<InvitationDto> getInvitationByUserSeq(Long userSeq) {
        return Optional.ofNullable(toDto(invitationRepository.findByUserSeq(userSeq).orElseThrow()));
    }
    @Override
    public void writeInvitation(InvitationDto invitationDto) {
        Invitation invitation = toEntity(invitationDto);
        Info info = infoRepository.findById(invitationDto.getInfoSeq()).orElseThrow();
        Template template = templateRepository.findById(invitationDto.getTemplateSeq()).orElseThrow();
        invitation.setTemplate(template);
        invitation.setInfo(info);
        invitationRepository.save(invitation);
    }

    @Override
    public void deleteInvitation(Long invitationSeq) {
        Invitation invitation = invitationRepository.findById(invitationSeq).orElseThrow();
        invitation.updateIsValid();
    }

    @Override
    public void modifyInvitation(InvitationDto invitationDto) {
        Invitation invitation = invitationRepository.findById(invitationDto.getInvitationSeq()).orElseThrow();
        invitation.update( invitationDto.getPhotoUrl1(), invitationDto.getPhotoUrl2(),
                invitationDto.getTemplateHeader(), invitationDto.getTemplateFooter(), invitationDto.getTemplateEtc());
    }
}

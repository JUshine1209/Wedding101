package com.ssafy.wedding101.model.service.impl;

import com.ssafy.wedding101.model.dto.TemplateDto;
import com.ssafy.wedding101.model.repository.TemplateRepository;
import com.ssafy.wedding101.model.service.TemplateService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TemplateServiceImpl implements TemplateService {
    private final TemplateRepository templateRepository;

    @Override
    public Optional<TemplateDto> getTemplate(Long templateSeq) {
        return Optional.ofNullable(toDto(templateRepository.findById(templateSeq).orElseThrow()));
    }

}

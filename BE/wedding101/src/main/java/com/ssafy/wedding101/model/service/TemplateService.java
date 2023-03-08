package com.ssafy.wedding101.model.service;

import com.ssafy.wedding101.model.dto.TemplateDto;
import com.ssafy.wedding101.model.entity.Template;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Optional;

@Service
public interface TemplateService {
    Optional<TemplateDto> getTemplate(Long templateSeq);

    default TemplateDto toDto(Template template) {
        return TemplateDto.builder()
                .templateSeq(template.getTemplateSeq())
                .templateTitle(template.getTemplateTitle())
                .templateHeader(template.getTemplateHeader())
                .templateFooter(template.getTemplateFooter())
                .templateEtc(template.getTemplateEtc())
                .build();
    }
}

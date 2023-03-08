package com.ssafy.wedding101.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TemplateDto {
    private Long templateSeq;
    private String templateTitle;
    private String templateHeader;
    private String templateFooter;
    private String templateEtc;
}

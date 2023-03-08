package com.ssafy.wedding101.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UnifiedVideoDto {

    private Long unifiedSeq;
    private Long albumSeq;
    private String unifiedName;
    private Byte requestStatus;
    private String unifiedUrl;
    private String createdAt;
    private String updatedAt;
}

package com.ssafy.wedding101.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InvitationDto {
    private Long invitationSeq;
    private Long infoSeq;
    private Long userSeq;
    private Long templateSeq;
    private String photoUrl1;
    private String photoUrl2;
    private String templateHeader;
    private String templateFooter;
    private String templateEtc;

}

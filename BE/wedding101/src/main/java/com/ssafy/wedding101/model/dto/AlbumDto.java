package com.ssafy.wedding101.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AlbumDto {
    private Long albumSeq;
    private Long infoSeq;
    private Long userSeq;
    private String albumName;
    private String albumColor;
    private String albumPhotoUrl;
    private String albumAccessId;
    private String albumThanksUrl;
    private int albumMediaCnt;
    private String createdAt;
    private String updatedAt;
    private boolean isValid; // 회원 탈퇴할때 앨범 삭제했냐고 물어보고 삭제
}

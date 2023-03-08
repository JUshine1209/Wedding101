package com.ssafy.wedding101.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewDto {
    private Long reviewSeq;
    private Long albumSeq;
    private String userNickname;
    private String reviewTitle;
    private Integer reviewRate;
    private String reviewContent;
    private String createdAt;
    private String updatedAt;
    private boolean isVaild;
}

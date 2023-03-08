package com.ssafy.wedding101.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class QuestionDto {
    private Long questionSeq;
    private Long userSeq;
    private String userId;
    private String userNickname;
    private String questionTitle;
    private String questionContent;
    private String createdAt;
    private String updatedAt;
}

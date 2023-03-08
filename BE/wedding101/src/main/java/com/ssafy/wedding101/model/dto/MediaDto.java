package com.ssafy.wedding101.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MediaDto {
    private Long mediaSeq;
    private Long albumSeq;
    private String storageUrl;
    private String urlToImg;
    private boolean onBooth;
    private boolean isVideo;
    private String mediaName;
    private String mediaRelation;
    private String mediaReceiver;
    private boolean isWish;
    private boolean isInBin;
}

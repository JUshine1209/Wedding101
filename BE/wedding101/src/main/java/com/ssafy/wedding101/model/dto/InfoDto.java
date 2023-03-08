package com.ssafy.wedding101.model.dto;

import lombok.*;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InfoDto {
    private Long infoSeq;
    private Long userSeq;
    private Date weddingDay;
    private String weddingHallName;
    private String weddingHallAddress;
    private String weddingHallNumber;
    private String groomName;
    private String brideName;
    private String groomPhoneNumber;
    private String bridePhoneNumber;
    private String groomAccountNumber;
    private String groomAccountBank;
    private String groomAccountName;
    private String brideAccountNumber;
    private String brideAccountBank;
    private String brideAccountName;
    private String groomRelation;
    private String brideRelation;
    private String groomFatherName;
    private String groomMotherName;
    private String brideFatherName;
    private String brideMotherName;
    private boolean groomFatherIsAlive;
    private boolean groomMotherIsAlive;
    private boolean brideFatherIsAlive;
    private boolean brideMotherIsAlive;
}

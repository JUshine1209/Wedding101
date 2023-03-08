package com.ssafy.wedding101.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "tbl_info")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
public class Info {

    @Id
    @Column(name = "info_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long infoSeq;

    @ManyToOne
    @JoinColumn(name = "user_seq")
    private User user;

    @Column(name = "wedding_day", nullable = false)
    private Date weddingDay;

    @Column(name = "wedding_hall_name", nullable = false)
    private String weddingHallName;

    @Column(name = "wedding_hall_address")
    private String weddingHallAddress;

    @Column(name = "wedding_hall_number")
    private String weddingHallNumber;

    @Column(name = "groom_name", nullable = false)
    private String groomName;

    @Column(name = "bride_name", nullable = false)
    private String brideName;

    @Column(name = "groom_phone_number", nullable = false)
    private String groomPhoneNumber;

    @Column(name = "bride_phone_number", nullable = false)
    private String bridePhoneNumber;

    @Column(name = "groom_account_number")
    private String groomAccountNumber;

    @Column(name = "groom_account_bank")
    private String groomAccountBank;

    @Column(name = "groom_account_name")
    private String groomAccountName;

    @Column(name = "bride_account_number")
    private String brideAccountNumber;

    @Column(name = "bride_account_bank")
    private String brideAccountBank;

    @Column(name = "bride_account_name")
    private String brideAccountName;

    @Column(name = "groom_relation")
    private String groomRelation;

    @Column(name = "bride_relation")
    private String brideRelation;

    @Column(name = "groom_father_name")
    private String groomFatherName;

    @Column(name = "groom_mother_name")
    private String groomMotherName;

    @Column(name = "bride_father_name")
    private String brideFatherName;

    @Column(name = "bride_mother_name")
    private String brideMotherName;

    @Column(name = "groom_father_is_alive", columnDefinition = "TINYINT")
    private boolean groomFatherIsAlive;

    @Column(name = "groom_mother_is_alive", columnDefinition = "TINYINT")
    private boolean groomMotherIsAlive;

    @Column(name = "bride_father_is_alive", columnDefinition = "TINYINT")
    private boolean brideFatherIsAlive;

    @Column(name = "bride_mother_is_alive", columnDefinition = "TINYINT")
    private boolean brideMotherIsAlive;

    @Column(name = "is_valid", nullable = false, columnDefinition = "TINYINT")
    @ColumnDefault("true")
    private boolean isValid;

    public void setUser(User user) {
        this.user = user;
    }
    public void updateInfo( Date weddingDay, String weddingHallName, String weddingHallAddress,
                            String weddingHallNumber, String groomName, String brideName, String groomPhoneNumber,
                            String bridePhoneNumber, String groomAccountNumber, String groomAccountBank, String groomAccountName,
                            String brideAccountNumber, String brideAccountBank, String brideAccountName, String groomRelation,
                            String brideRelation, String groomFatherName, String groomMotherName, String brideFatherName,
                            String brideMotherName, boolean groomFatherIsAlive, boolean groomMotherIsAlive, boolean brideFatherIsAlive,
                            boolean brideMotherIsAlive){
        this.weddingDay = weddingDay;
        this.weddingHallName = weddingHallName;
        this.weddingHallAddress = weddingHallAddress;
        this.weddingHallNumber = weddingHallNumber;
        this.groomName = groomName;
        this.brideName = brideName;
        this.groomPhoneNumber = groomPhoneNumber;
        this.bridePhoneNumber = bridePhoneNumber;
        this.groomAccountNumber = groomAccountNumber;
        this.groomAccountBank = groomAccountBank;
        this.groomAccountName = groomAccountName;
        this.brideAccountNumber = brideAccountNumber;
        this.brideAccountBank = brideAccountBank;
        this.brideAccountName = brideAccountName;
        this.groomRelation = groomRelation;
        this.brideRelation = brideRelation;
        this.groomFatherName = groomFatherName;
        this.groomMotherName = groomMotherName;
        this.brideFatherName = brideFatherName;
        this.brideMotherName = brideMotherName;
        this.groomFatherIsAlive = groomFatherIsAlive;
        this.groomMotherIsAlive = groomMotherIsAlive;
        this.brideFatherIsAlive = brideFatherIsAlive;
        this.brideMotherIsAlive = brideMotherIsAlive;
    }

    public void updateIsValid() {
        this.isValid = false;
    }
}

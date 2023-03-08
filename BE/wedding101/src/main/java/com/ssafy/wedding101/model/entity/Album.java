package com.ssafy.wedding101.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Table(name = "tbl_album")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
public class Album {
    @Id
    @Column(name = "album_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long albumSeq;
    @OneToOne
    @JoinColumn(name = "info_seq")
    private Info info;
    @Column(name = "user_seq")
    private Long userSeq;
    @Column(name = "album_Name")
    private String albumName;
    @Column(name = "album_color")
    private String albumColor;
    @Column(name = "album_photo_url")
    private String albumPhotoUrl;
    @Column(name = "album_access_id")
    private String albumAccessId;
    @Column(name = "album_thanks_url")
    private String albumThanksUrl;
    @Column(name = "album_media_cnt")
    private int albumMediaCnt;

    @Column(name = "created_at")
    private String createdAt;
    @Column(name = "updated_at")
    private String updatedAt;

    @Column(name = "is_valid", nullable = false, columnDefinition = "TINYINT")
    @ColumnDefault("true")
    private boolean isValid;


    public void setInfo(Info info) {
        this.info = info;
        this.userSeq = info.getUser().getUserSeq();
    }

    public void update(String albumName, String albumColor, String albumPhotoUrl, String albumThanksUrl) {
        this.albumName = albumName;
        this.albumColor = albumColor;
        this.albumPhotoUrl = albumPhotoUrl;
        this.albumThanksUrl = albumThanksUrl;
    }

    public void updateIsValid() {
        this.isValid = false;
    }

}

package com.ssafy.wedding101.model.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Table(name = "tbl_media")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
public class Media {
    @Id
    @Column(name = "media_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mediaSeq;

    @ManyToOne // 하나의 앨범의 여러개의 미디어가 있다. 주인은 media
    @JoinColumn(name = "album_seq")
    private Album album;

    @Column(name = "storage_url")
    private String storageUrl;

    @Column(name = "url_to_img")
    private String urlToImg;

    @Column(name = "on_booth", columnDefinition = "TINYINT")
    private boolean onBooth;

    @Column(name = "is_video", columnDefinition = "TINYINT")
    private boolean isVideo;

    @Column(name = "media_name")
    private String mediaName;

    @Column(name = "media_relation")
    private String mediaRelation;

    @Column(name = "media_receiver", columnDefinition = "TINYINT")
    private String mediaReceiver;

    @Column(name = "is_wish", columnDefinition = "TINYINT")
    @Builder.Default
    private boolean isWish = false;

    @Column(name = "is_in_bin", columnDefinition = "TINYINT")
    @Builder.Default
    private boolean isInBin = false;

    @Column(name = "is_valid", columnDefinition = "TINYINT")
    @Builder.Default
    private boolean isValid = true;

    public void setAlbum(Album album) {
        this.album = album;
    }

    public void wish(boolean now) {
        this.isWish = !now;
    }

//    public void unwish() {
//        this.isWish = false;
//    }

    public void throwBin() {
        this.isInBin = true;
    }

    public void restore() {
        this.isInBin = false;
    }

    public void updateIsValidTrue() {
        this.isValid = true;
    }

    public void updateIsValidFalse() {
        this.isValid = false;
    }
}




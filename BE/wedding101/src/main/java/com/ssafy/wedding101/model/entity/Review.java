package com.ssafy.wedding101.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Table(name = "tbl_review")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
public class Review {
    @Id
    @Column(name = "review_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewSeq;

    @ManyToOne
    @JoinColumn(name = "album_seq")
    private Album album;

    @Column(name = "review_title")
    private String reviewTitle;

    @Column(name = "review_rate")
    private Integer reviewRate;

    @Column(name = "review_content")
    private String reviewContent;

    @Column(name = "created_at")
    private String createdAt;
    @Column(name = "updated_at")
    private String updatedAt;
    @Column(name = "is_valid")
    @ColumnDefault("true")
    private boolean isValid;

    public void setAlbum(Album album) {this.album = album;}
    public void updateIsValid() {
        this.isValid = false;
    }

}

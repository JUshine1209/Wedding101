package com.ssafy.wedding101.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Table(name = "tbl_unified")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
public class UnifiedVideo {

    @Id
    @Column(name = "unified_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long unifiedSeq;

    @ManyToOne
    @JoinColumn(name = "album_seq")
    private Album album;

    @Column(name = "unified_name")
    private String unifiedName;

    @Column(name = "request_status")
    @ColumnDefault("2")
    private Byte requestStatus;

    @Column(name = "unified_url")
    private String unifiedUrl;

    @Column(name = "created_at")
    private String createdAt;
    @Column(name = "updated_at")
    private String updatedAt;

    public void setAlbum(Album album) {this.album = album;}
}

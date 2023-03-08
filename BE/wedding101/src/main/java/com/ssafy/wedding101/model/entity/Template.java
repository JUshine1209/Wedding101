package com.ssafy.wedding101.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Table(name = "tbl_template")
@Getter
@NoArgsConstructor
public class Template {
    @Id
    @Column(name = "template_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long templateSeq;

    @Column(name = "template_title")
    private String templateTitle;

    @Column(name = "template_header")
    private String templateHeader;

    @Column(name = "template_footer")
    private String templateFooter;

    @Column(name = "template_etc")
    private String templateEtc;

}

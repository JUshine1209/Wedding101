package com.ssafy.wedding101.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Table(name = "tbl_question")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
public class Question {
    @Id
    @Column(name = "question_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionSeq;
    @ManyToOne
    @JoinColumn(name = "user_seq")
    private User user;
    @Column(name = "question_title")
    private String questionTitle;
    @Column(name = "question_content")
    private String questionContent;
    @Column(name = "created_at")
    private String createdAt;
    @Column(name = "updated_at")
    private String updatedAt;
    @Column(name = "is_valid")
    @ColumnDefault("true")
    private boolean isValid;

    public void setUser(User user) {
        this.user = user;
    }

//    public void update(String title, String content) {
//        this.questionTitle = title;
//        this.questionContent = content;
//    }

    public void updateIsValid() {
        this.isValid = false;
    }
}

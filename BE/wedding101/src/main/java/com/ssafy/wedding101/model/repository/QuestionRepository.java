package com.ssafy.wedding101.model.repository;

import com.ssafy.wedding101.model.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    @Query(nativeQuery = true, value =  "select * from tbl_question " +
            "where user_seq = :userSeq and is_valid = true " +
            "order by updated_at desc limit 1")
    Optional<Question> findByUserSeq(@Param("userSeq") Long userSeq);

    @Modifying
    @Query(nativeQuery = true, value = "update tbl_question " +
            "set question_Title = :questionTitle, question_contetn = :questionContent " +
            "where question_seq = :questionSeq")
    void updateQuestion(@Param("questionSeq") Long questionSeq, @Param("questionTitle") String questionTitle, @Param("questionContent") String questionContent);

    @Query(nativeQuery = true, value = "select * " +
            "from tbl_question where is_valid = true order by question_seq desc")
    List<Question> findAllQuestion();
}
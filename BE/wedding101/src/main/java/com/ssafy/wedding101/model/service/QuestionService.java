package com.ssafy.wedding101.model.service;

import com.ssafy.wedding101.model.dto.QuestionDto;
import com.ssafy.wedding101.model.entity.Question;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface QuestionService {
    Optional<QuestionDto> getQuestionDetail(Long questionSeq);

    Optional<QuestionDto> getQuestionByUserSeq(Long userSeq);

    List<QuestionDto> getAllQuestion();

    void writeQuestion(QuestionDto questionDto);

    void removeQuestion(Long questionSeq);

    void modifyQuestion(QuestionDto questionDto);
    default Question toEntity(QuestionDto questinoDto) {
        return Question.builder()
                .questionSeq(questinoDto.getQuestionSeq())
                .questionTitle(questinoDto.getQuestionTitle())
                .questionContent(questinoDto.getQuestionContent())
                .isValid(true)
                .build();
    }

    default QuestionDto toDto(Question question) {
        return QuestionDto.builder()
                .questionSeq(question.getQuestionSeq())
                .userSeq(question.getUser().getUserSeq())
                .userId(question.getUser().getUserId())
                .userNickname(question.getUser().getUserNickname())
                .questionTitle(question.getQuestionTitle())
                .questionContent(question.getQuestionContent())
                .createdAt(question.getCreatedAt())
                .updatedAt(question.getUpdatedAt())
                .build();
    }

}

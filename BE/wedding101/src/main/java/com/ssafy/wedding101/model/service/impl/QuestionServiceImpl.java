package com.ssafy.wedding101.model.service.impl;

import com.ssafy.wedding101.model.dto.QuestionDto;
import com.ssafy.wedding101.model.entity.Question;
import com.ssafy.wedding101.model.repository.QuestionRepository;
import com.ssafy.wedding101.model.repository.UserRepository;
import com.ssafy.wedding101.model.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class QuestionServiceImpl implements QuestionService {
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;

    @Override
    public Optional<QuestionDto> getQuestionDetail(Long questionSeq) {
        return Optional.ofNullable(toDto(questionRepository.findById(questionSeq).orElseThrow()));
    }

    @Override
    public Optional<QuestionDto> getQuestionByUserSeq(Long userSeq) {
        return Optional.ofNullable(toDto(questionRepository.findByUserSeq(userSeq).orElseThrow()));
    }

    @Override
    public List<QuestionDto> getAllQuestion() {
        return questionRepository.findAllQuestion().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public void writeQuestion(QuestionDto questionDto) {
        Question question = toEntity(questionDto);
        question.setUser(userRepository.findById(questionDto.getUserSeq()).orElseThrow());
        questionRepository.save(question);
    }

    @Override
    public void removeQuestion(Long questionSeq) {
        Question question = questionRepository.findById(questionSeq).orElseThrow();
        question.updateIsValid();
    }

    @Override
    public void modifyQuestion(QuestionDto questionDto) {
        Question question = questionRepository.findById(questionDto.getQuestionSeq()).orElseThrow();
        questionRepository.updateQuestion(question.getQuestionSeq(), question.getQuestionTitle(), question.getQuestionContent());
    }
}

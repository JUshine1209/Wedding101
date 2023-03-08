package com.ssafy.wedding101.controller;

import com.ssafy.wedding101.model.dto.InfoDto;
import com.ssafy.wedding101.model.dto.InvitationDto;
import com.ssafy.wedding101.model.dto.TemplateDto;
import com.ssafy.wedding101.model.service.InfoService;
import com.ssafy.wedding101.model.service.InvitationService;
import com.ssafy.wedding101.model.service.TemplateService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/invitation")
@CrossOrigin
public class InvitationRestController {
    private final InvitationService invitationService;
    private final InfoService infoService;
    private final TemplateService templateService;

    @Operation(summary = "청첩장 생성")
    @PostMapping("")
    public ResponseEntity<Map<String, Object>> writeInvitation(@RequestBody InvitationDto invitationDto) {
        Map<String, Object> result = new HashMap<>();
        //토큰에서 userSeq가져옴
        Long userSeq = invitationDto.getUserSeq();
        try {
            invitationDto.setInfoSeq(infoService.getInfoSeqByUserSeq(userSeq));
            System.out.println("여기 됨?");
//            invitationDto.setUserSeq(); // 토큰에서 받아서 넣기
            invitationService.writeInvitation(invitationDto);

            InvitationDto newInvitationDto = invitationService.getInvitationByUserSeq(userSeq).orElseThrow(() -> new NoSuchElementException("청첩장 생성 실패"));
            result.put("data", newInvitationDto);
            result.put("message", "청첩장 생성 SUCCESS");
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            result.put("message", "청첩장 생성 FAIL");
            return new ResponseEntity<>(result, HttpStatus.EXPECTATION_FAILED);
        }
    }

    @Operation(summary = "청첩장 조회")
    @GetMapping("/{invitationSeq}")
    public ResponseEntity<Map<String, Object>> getInvitation(@PathVariable Long invitationSeq) {
        Map<String, Object> result = new HashMap<>();
        try {
            InvitationDto invitationDto = invitationService.getInvitation(invitationSeq).orElseThrow(() -> new NoSuchElementException("invitationSeq 오류"));
            TemplateDto templateDto = templateService.getTemplate(invitationDto.getTemplateSeq()).orElseThrow();
            if(invitationDto.getTemplateHeader() == null) {
                invitationDto.setTemplateHeader(templateDto.getTemplateHeader());
            }
            if(invitationDto.getTemplateFooter()  == null) {
                invitationDto.setTemplateFooter(templateDto.getTemplateFooter());
            }
            if(invitationDto.getTemplateEtc() == null) {
                invitationDto.setTemplateEtc(templateDto.getTemplateEtc());
            }
            InfoDto infoDto = infoService.getInfo(invitationDto.getInfoSeq()).orElseThrow();
            result.put("invitationData", invitationDto);
            result.put("weddingInfoData", infoDto);
            result.put("message", "청첩장 정보 조회 SUCCESS");
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            result.put("message", "청첩장 Seq 오류");
            return new ResponseEntity<>(result, HttpStatus.EXPECTATION_FAILED);
        } catch (Exception e) {
            result.put("message", "JOIN FAIL");
            return new ResponseEntity<>(result, HttpStatus.EXPECTATION_FAILED);
        }
    }

    @Operation(summary = "청첩장 수정")
    @PutMapping("")
    public ResponseEntity<InvitationDto> modifyInvitation(@RequestBody InvitationDto invitationDto) {
        invitationService.modifyInvitation(invitationDto);
        InvitationDto invitationDtoAfter = invitationService.getInvitation(invitationDto.getInvitationSeq()).orElseThrow();
        return new ResponseEntity<>(invitationDtoAfter, HttpStatus.OK);
    }

    @Operation(summary = "청첩장 삭제")
    @GetMapping("/delete/{invitationSeq}")
    public ResponseEntity<?> deleteInvitation(@PathVariable Long invitationSeq) {
        try {
            invitationService.deleteInvitation(invitationSeq);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }
}

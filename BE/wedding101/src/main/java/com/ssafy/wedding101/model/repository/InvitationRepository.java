package com.ssafy.wedding101.model.repository;

import com.ssafy.wedding101.model.entity.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InvitationRepository extends JpaRepository<Invitation, Long> {
    @Query(nativeQuery = true, value = "select * from tbl_invitation " +
            "where user_seq = :userSeq and is_valid = true")
    Optional<Invitation> findByUserSeq(@Param("userSeq") Long userSeq);

    @Query(nativeQuery = true, value = "select * from tbl_invitation " +
            "where invitation_seq = :invitationSeq and is_valid = true")
    Optional<Invitation> findByInvitationSeq(@Param("invitationSeq") Long invitationSeq);
}

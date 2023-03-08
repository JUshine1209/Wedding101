package com.ssafy.wedding101.model.repository;

import com.ssafy.wedding101.model.entity.Info;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.Optional;

@Repository
public interface InfoRepository extends JpaRepository<Info, Long> {
    @Query(nativeQuery = true, value =  "select * " +
            "from tbl_info where user_seq = :userSeq and is_valid = true")
    Optional<Info> findByUserSeq(@Param("userSeq") Long userSeq);

    @Query(nativeQuery = true, value  = "select count(i.user_seq) > 0 " +
            "from tbl_info i where i.user_seq = :userSeq and i.is_valid = true")
    BigInteger existsByUserSeq(@Param("userSeq") Long userSeq);
}

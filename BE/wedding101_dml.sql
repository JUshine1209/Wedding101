-- 스키마 생성
drop schema if exists `wedding101_db`;
create schema `wedding101_db` default character set utf8 collate utf8_bin;
use `wedding101_db`;

-- 테이블 생성
DROP TABLE IF EXISTS `tbl_user`;

CREATE TABLE `tbl_user` (
	`user_seq`	INT	NOT NULL  ,
	`user_id`	VARCHAR(30)	NOT NULL,
	`user_type`	VARCHAR(1)	NOT NULL	DEFAULT 'U', -- COMMENT ''U':일반/'G':구글/'K':카카오/'N':네이버/'F':페이스북',
	`user_password`	VARCHAR(50)	NULL,
	`user_name`	VARCHAR(30)	NOT NULL,
	`user_email`	VARCHAR(50)	NOT NULL,
	`user_nickname`	VARCHAR(30)	NULL,
	`is_banned`	TINYINT(1)	NOT NULL	DEFAULT 0, -- COMMENT '비활성화테이블에 필드 생성시 true 로 변경',
    `refresh_token` VARCHAR(250) NULL,
	`created_at`	DATETIME	NOT NULL,
	`updated_at`	DATETIME	NOT NULL,
	`is_valid`	TINYINT(1)	NOT NULL	DEFAULT 1
);

DROP TABLE IF EXISTS `tbl_album`;

CREATE TABLE `tbl_album` (
	`album_seq`	INT	NOT NULL,
	`info_seq`	INT	NULL,
	`user_seq`	INT	NULL,
	`album_name`	VARCHAR(30)	NULL,
	`album_color`	VARCHAR(255)	NULL,
	`album_photo_url`	VARCHAR(300)	NULL,
	`album_access_id`	VARCHAR(10)	NOT NULL,
	`album_thanks_url`	VARCHAR(300)	NULL,
	`album_media_cnt`	INT	NOT NULL	DEFAULT 0,
	`created_at`	DATETIME	NOT NULL,
	`updated_at`	DATETIME	NOT NULL,
	`is_valid`	TINYINT(1)	NOT NULL	DEFAULT 1
);

DROP TABLE IF EXISTS `tbl_info`;

CREATE TABLE `tbl_info` (
	`info_seq`	INT	NOT NULL  ,
	`user_seq`	INT	NOT NULL,
	`wedding_day`	DATETIME	NOT NULL,
	`wedding_hall_name`	VARCHAR(50)	NOT NULL,
	`wedding_hall_address`	VARCHAR(100)	NULL,
	`wedding_hall_number`	VARCHAR(50)	NULL,
	`groom_name`	VARCHAR(30)	NOT NULL,
	`bride_name`	VARCHAR(30)	NOT NULL,
	`groom_phone_number`	VARCHAR(50)	NOT NULL,
	`bride_phone_number`	VARCHAR(50)	NOT NULL,
	`groom_account_number`	VARCHAR(50)	NULL,
	`groom_account_bank`	VARCHAR(30)	NULL,
	`groom_account_name`	VARCHAR(30)	NULL,
	`bride_account_number`	VARCHAR(50)	NULL,
	`bride_account_bank`	VARCHAR(30)	NULL,
	`bride_account_name`	VARCHAR(30)	NULL,
	`groom_relation`	VARCHAR(10)	NULL,
	`bride_relation`	VARCHAR(10)	NULL,
	`groom_father_name`	VARCHAR(30)	NULL,
	`groom_mother_name`	VARCHAR(30)	NULL,
	`bride_father_name`	VARCHAR(30)	NULL,
	`bride_mother_name`	VARCHAR(30)	NULL,
	`groom_father_is_alive`	TINYINT(1)	NULL	DEFAULT 1,
	`groom_mother_is_alive`	TINYINT(1)	NULL	DEFAULT 1,
	`bride_father_is_alive`	TINYINT(1)	NULL	DEFAULT 1,
	`bride_mother_is_alive`	TINYINT(1)	NULL	DEFAULT 1,
	`created_at`	DATETIME	NOT NULL,
	`updated_at`	DATETIME	NOT NULL,
	`is_valid`	TINYINT(1)	NOT NULL	DEFAULT 1
);

DROP TABLE IF EXISTS `tbl_invitation`;

CREATE TABLE `tbl_invitation` (
	`invitation_seq`	INT	NOT NULL  ,
	`info_seq`	INT	NULL,
	`user_seq`	INT	NULL,
	`template_seq`	INT	NULL,
	`photo_url1`	VARCHAR(300)	NULL,
	`photo_url2`	VARCHAR(300)	NULL,
	`template_header`	VARCHAR(100)	NULL,
	`template_footer`	VARCHAR(100)	NULL,
	`template_etc`	VARCHAR(100)	NULL,
	`created_at`	DATETIME	NOT NULL,
	`updated_at`	DATETIME	NOT NULL,
	`is_valid`	TINYINT(1)	NOT NULL	DEFAULT 1
);

DROP TABLE IF EXISTS `tbl_template`;

CREATE TABLE `tbl_template` (
	`template_seq`	INT	NOT NULL  ,
	`template_title`	VARCHAR(100)	NOT NULL,
	`template_header`	VARCHAR(100)	NOT NULL,
	`template_footer`	VARCHAR(100)	NULL,
	`template_etc`	VARCHAR(30)	NULL
);

DROP TABLE IF EXISTS `tbl_question`;

CREATE TABLE `tbl_question` (
	`question_seq`	INT	NOT NULL  ,
	`user_seq`	INT	NULL,
	`question_title`	VARCHAR(30)	NOT NULL,
	`question_content`	VARCHAR(2000)	NOT NULL,
	`created_at`	DATETIME	NOT NULL,
	`updated_at`	DATETIME	NOT NULL,
	`is_valid`	TINYINT(1)	NOT NULL	DEFAULT 1
);

DROP TABLE IF EXISTS `tbl_answer`;

CREATE TABLE `tbl_answer` (
	`question_seq`	INT	NOT NULL,
	`manager_seq`	INT	NULL,
	`answer_content`	VARCHAR(1000)	NOT NULL
);

DROP TABLE IF EXISTS `tbl_review`;

CREATE TABLE `tbl_review` (
	`review_seq`	INT	NOT NULL  ,
	`album_seq`	INT	NULL,
	`review_title`	VARCHAR(30)	NOT NULL,
	`review_rate`	TINYINT	NOT NULL,
	`review_content`	VARCHAR(2000)	NOT NULL,
	`created_at`	DATETIME	NOT NULL,
	`updated_at`	DATETIME	NOT NULL,
	`is_valid`	TINYINT(1)	NOT NULL	DEFAULT 1
);

DROP TABLE IF EXISTS `tbl_review_like`;

CREATE TABLE `tbl_review_like` (
	`review_like_seq`	INT	NOT NULL  ,
	`review_seq`	INT	NOT NULL,
	`user_seq`	INT	NULL,
	`is_like`	TINYINT(1)	NOT NULL	DEFAULT 1
);

DROP TABLE IF EXISTS `tbl_manager`;

CREATE TABLE `tbl_manager` (
	`manager_seq`	INT	NOT NULL  ,
	`manager_id`	VARCHAR(30)	NOT NULL,
	`manager_password`	VARCHAR(30)	NOT NULL,
	`manager_name`	VARCHAR(30)	NOT NULL,
	`manager_email`	VARCHAR(50)	NOT NULL,
	`manager_grade`	INT	NULL,
	`created_at`	DATETIME	NOT NULL,
	`updated_at`	DATETIME	NOT NULL,
	`is_valid`	TINYINT(1)	NOT NULL	DEFAULT 1
);

DROP TABLE IF EXISTS `tbl_ban`;

CREATE TABLE `tbl_ban` (
	`ban_seq`	INT	NOT NULL  ,
	`manager_seq`	INT	NULL,
	`user_seq`	INT	NOT NULL,
	`ban_reason`	VARCHAR(100)	NULL,
	`created_at`	DATETIME	NOT NULL
);

DROP TABLE IF EXISTS `tbl_unified`;

CREATE TABLE `tbl_unified` (
	`unified_seq`	INT	NOT NULL  ,
	`album_seq`	INT	NULL,
	`manager_seq`	INT	NULL,
	`unified_name`	VARCHAR(30)	NOT NULL,
	`request_status`	TINYINT	NOT NULL	DEFAULT 0, -- COMMENT '0:신청/1:관리자확인/2:완료/3:반려',
	`unified_url`	VARCHAR(100)	NULL,
	`created_at`	DATETIME	NOT NULL,
	`updated_at`	DATETIME	NOT NULL
);

DROP TABLE IF EXISTS `tbl_unified_media`;

CREATE TABLE `tbl_unified_media` (
	`unified_media_seq`	INT	NOT NULL  , 
	`unified_seq`	INT	NOT NULL,
	`album_seq`	INT	NULL,
	`media_seq`	INT	NULL,
	`request_order`	TINYINT	NOT NULL -- COMMENT '리스트에 담긴 순서'
);

DROP TABLE IF EXISTS `tbl_media`;

CREATE TABLE `tbl_media` (
	`media_seq`	INT	NOT NULL  ,
	`album_seq`	INT	NOT NULL,
	`storage_url`	VARCHAR(300)	NOT NULL,
    `url_to_img` VARCHAR(300),
	`on_booth`	TINYINT(1)	NOT NULL	DEFAULT 1, -- COMMENT '1:booth / 0:online',
	`is_video`	TINYINT(1)	NOT NULL	DEFAULT 1, -- COMMENT '1:video/0:photo',
	`media_name`	VARCHAR(30)	NOT NULL,
	`media_relation`	VARCHAR(30)	NOT NULL, -- COMMENT '친인척, 친구, 동료, 지인',
	`media_receiver`	VARCHAR(1)	NOT NULL	DEFAULT 'A', -- COMMENT ''G':신랑/'B':신부/'A':둘다',
	`is_wish`	TINYINT(1)	NOT NULL	DEFAULT 0,
	`is_in_bin`	TINYINT(1)	NOT NULL	DEFAULT 0,
	`created_at`	DATETIME	NOT NULL,
	`updated_at`	DATETIME	NOT NULL,
	`is_valid`	TINYINT(1)	NOT NULL	DEFAULT 1
);

-- pk 생성
ALTER TABLE `tbl_user` ADD CONSTRAINT `PK_TBL_USER` PRIMARY KEY (
	`user_seq`
);
alter table `tbl_user` modify `user_seq` int not null auto_increment;

ALTER TABLE `tbl_album` ADD CONSTRAINT `PK_TBL_ALBUM` PRIMARY KEY (
	`album_seq`
);
alter table `tbl_album` modify `album_seq` int not null auto_increment;


ALTER TABLE `tbl_info` ADD CONSTRAINT `PK_TBL_INFO` PRIMARY KEY (
	`info_seq`,
	`user_seq`
);
alter table `tbl_info` modify `info_seq` int not null auto_increment;

ALTER TABLE `tbl_invitation` ADD CONSTRAINT `PK_TBL_INVITATION` PRIMARY KEY (
	`invitation_seq`
);
alter table `tbl_invitation` modify `invitation_seq` int not null auto_increment;

ALTER TABLE `tbl_template` ADD CONSTRAINT `PK_TBL_TEMPLATE` PRIMARY KEY (
	`template_seq`
);
alter table `tbl_template` modify `template_seq` int not null auto_increment;

ALTER TABLE `tbl_question` ADD CONSTRAINT `PK_TBL_QUESTION` PRIMARY KEY (
	`question_seq`
);
alter table `tbl_question` modify `question_seq` int not null auto_increment;

ALTER TABLE `tbl_answer` ADD CONSTRAINT `PK_TBL_ANSWER` PRIMARY KEY (
	`question_seq`
);

ALTER TABLE `tbl_review` ADD CONSTRAINT `PK_TBL_REVIEW` PRIMARY KEY (
	`review_seq`
);
alter table `tbl_review` modify `review_seq` int not null auto_increment;

ALTER TABLE `tbl_review_like` ADD CONSTRAINT `PK_TBL_REVIEW_LIKE` PRIMARY KEY (
	`review_like_seq`
);
alter table `tbl_review_like` modify `review_like_seq` int not null auto_increment;

ALTER TABLE `tbl_manager` ADD CONSTRAINT `PK_TBL_MANAGER` PRIMARY KEY (
	`manager_seq`
);
alter table `tbl_manager` modify `manager_seq` int not null auto_increment;

ALTER TABLE `tbl_ban` ADD CONSTRAINT `PK_TBL_BAN` PRIMARY KEY (
	`ban_seq`
);
alter table `tbl_ban` modify `ban_seq` int not null auto_increment;

ALTER TABLE `tbl_unified` ADD CONSTRAINT `PK_TBL_UNIFIED` PRIMARY KEY (
	`unified_seq`
);
alter table `tbl_unified` modify `unified_seq` int not null auto_increment;

ALTER TABLE `tbl_unified_media` ADD CONSTRAINT `PK_TBL_UNIFIED_MEDIA` PRIMARY KEY (
	`unified_media_seq`
);
alter table `tbl_unified_media` modify `unified_media_seq` int not null auto_increment;

ALTER TABLE `tbl_media` ADD CONSTRAINT `PK_TBL_MEDIA` PRIMARY KEY (
	`media_seq`,
	`album_seq`
);
alter table `tbl_media` modify `media_seq` int not null auto_increment;

-- fk 생성
ALTER TABLE `tbl_question` ADD CONSTRAINT `FK_tbl_user_TO_tbl_question_1` FOREIGN KEY (
	`user_seq`
)
REFERENCES `tbl_user` (
	`user_seq`
) on delete set null;

ALTER TABLE `tbl_answer` ADD CONSTRAINT `FK_tbl_manager_TO_tbl_answer_1` FOREIGN KEY (
	`question_seq`
)
REFERENCES `tbl_question` (
	`question_seq`
) on delete cascade;

ALTER TABLE `tbl_answer` ADD CONSTRAINT `FK_tbl_question_TO_tbl_answer_1` FOREIGN KEY (
	`manager_seq`
)
REFERENCES `tbl_manager` (
	`manager_seq`
) on delete set null;

ALTER TABLE `tbl_ban` ADD CONSTRAINT `FK_tbl_manager_TO_tbl_ban_1` FOREIGN KEY (
	`manager_seq`
)
REFERENCES `tbl_manager` (
	`manager_seq`
) on delete set null;

ALTER TABLE `tbl_ban` ADD CONSTRAINT `FK_tbl_user_TO_tbl_ban_1` FOREIGN KEY (
	`user_seq`
)
REFERENCES `tbl_user` (
	`user_seq`
) on delete cascade;

ALTER TABLE `tbl_info` ADD CONSTRAINT `FK_tbl_user_TO_tbl_info_1` FOREIGN KEY (
	`user_seq`
)
REFERENCES `tbl_user` (
	`user_seq`
) on delete cascade;

ALTER TABLE `tbl_invitation` ADD CONSTRAINT `FK_tbl_info_TO_tbl_invitation_1` FOREIGN KEY (
	`info_seq`
)
REFERENCES `tbl_info` (
	`info_seq`
) on delete set null;

ALTER TABLE `tbl_invitation` ADD CONSTRAINT `FK_tbl_info_TO_tbl_invitation_2` FOREIGN KEY (
	`user_seq`
)
REFERENCES `tbl_info` (
	`user_seq`
) on delete set null;

ALTER TABLE `tbl_invitation` ADD CONSTRAINT `FK_tbl_template_TO_tbl_invitation_1` FOREIGN KEY (
	`template_seq`
)
REFERENCES `tbl_template` (
	`template_seq`
) on delete set null;

ALTER TABLE `tbl_album` ADD CONSTRAINT `FK_tbl_info_TO_tbl_album_1` FOREIGN KEY (
	`info_seq`
)
REFERENCES `tbl_info` (
	`info_seq`
) on delete cascade;

ALTER TABLE `tbl_album` ADD CONSTRAINT `FK_tbl_info_TO_tbl_album_2` FOREIGN KEY (
	`user_seq`
)
REFERENCES `tbl_info` (
	`user_seq`
) on delete set null;

ALTER TABLE `tbl_media` ADD CONSTRAINT `FK_tbl_album_TO_tbl_media_1` FOREIGN KEY (
	`album_seq`
)
REFERENCES `tbl_album` (
	`album_seq`
) on delete cascade;

ALTER TABLE `tbl_review` ADD CONSTRAINT `FK_tbl_album_TO_tbl_review_1` FOREIGN KEY (
	`album_seq`
)
REFERENCES `tbl_album` (
	`album_seq`
) on delete set null;

ALTER TABLE `tbl_review_like` ADD CONSTRAINT `FK_tbl_review_TO_tbl_review_like_1` FOREIGN KEY (
	`review_seq`
)
REFERENCES `tbl_review` (
	`review_seq`
) on delete cascade;

ALTER TABLE `tbl_review_like` ADD CONSTRAINT `FK_tbl_user_TO_tbl_review_like_1` FOREIGN KEY (
	`user_seq`
)
REFERENCES `tbl_user` (
	`user_seq`
) on delete set null;

ALTER TABLE `tbl_unified` ADD CONSTRAINT `FK_tbl_album_TO_tbl_unified_1` FOREIGN KEY (
	`album_seq`
)
REFERENCES `tbl_album` (
	`album_seq`
) on delete set null;

ALTER TABLE `tbl_unified` ADD CONSTRAINT `FK_tbl_manager_TO_tbl_unified_1` FOREIGN KEY (
	`manager_seq`
)
REFERENCES `tbl_manager` (
	`manager_seq`
) on delete set null;

ALTER TABLE `tbl_unified_media` ADD CONSTRAINT `FK_tbl_unified_TO_tbl_unified_media_1` FOREIGN KEY (
	`unified_seq`
)
REFERENCES `tbl_unified` (
	`unified_seq`
) on delete cascade;

ALTER TABLE `tbl_unified_media` ADD CONSTRAINT `FK_tbl_unified_TO_tbl_unified_media_2` FOREIGN KEY (
	`album_seq`
)
REFERENCES `tbl_unified` (
	`album_seq`
) on delete set null;

ALTER TABLE `tbl_unified_media` ADD CONSTRAINT `FK_tbl_media_TO_tbl_unified_media_1` FOREIGN KEY (
	`media_seq`
)
REFERENCES `tbl_media` (
	`media_seq`
) on delete set null;

-- 트리거 생성
CREATE TRIGGER tbl_user_create BEFORE INSERT ON `tbl_user` FOR EACH ROW SET NEW.created_at = NOW(), NEW.updated_at = NOW();
CREATE TRIGGER tbl_user_update BEFORE UPDATE ON `tbl_user` FOR EACH ROW SET NEW.updated_at = NOW(), NEW.created_at = OLD.created_at;

CREATE TRIGGER tbl_question_create BEFORE INSERT ON `tbl_question` FOR EACH ROW SET NEW.created_at = NOW(), NEW.updated_at = NOW();
CREATE TRIGGER tbl_question_update BEFORE UPDATE ON `tbl_question` FOR EACH ROW SET NEW.updated_at = NOW(), NEW.created_at = OLD.created_at;

-- media 삽입 시 album테이블의 album_media_cnt +1
CREATE TRIGGER update_album_media_cnt AFTER INSERT ON `tbl_media` FOR EACH ROW
UPDATE `tbl_album` SET album_media_cnt = album_media_cnt + 1 WHERE album_seq = NEW.album_seq;

drop trigger if exists tbl_question_is_valid;

delimiter $$
create trigger tbl_question_is_valid
after update on `tbl_question`
for each row
begin
	if old.user_seq is null then
		update tbl_question set is_valid = 0 where user_seq is null;
	end if;
end $$
delimiter ;

CREATE TRIGGER tbl_manager_create BEFORE INSERT ON `tbl_manager` FOR EACH ROW SET NEW.created_at = NOW(), NEW.updated_at = NOW();
CREATE TRIGGER tbl_manager_update BEFORE UPDATE ON `tbl_manager` FOR EACH ROW SET NEW.updated_at = NOW(), NEW.created_at = OLD.created_at;

CREATE TRIGGER tbl_ban_create BEFORE INSERT ON `tbl_ban` FOR EACH ROW SET NEW.created_at = NOW();

CREATE TRIGGER tbl_info_create BEFORE INSERT ON `tbl_info` FOR EACH ROW SET NEW.created_at = NOW(), NEW.updated_at = NOW();
CREATE TRIGGER tbl_info_update BEFORE UPDATE ON `tbl_info` FOR EACH ROW SET NEW.updated_at = NOW(), NEW.created_at = OLD.created_at;

CREATE TRIGGER tbl_invitation_create BEFORE INSERT ON `tbl_invitation` FOR EACH ROW SET NEW.created_at = NOW(), NEW.updated_at = NOW();
CREATE TRIGGER tbl_invitation_update BEFORE UPDATE ON `tbl_invitation` FOR EACH ROW SET NEW.updated_at = NOW(), NEW.created_at = OLD.created_at;

CREATE TRIGGER tbl_album_create BEFORE INSERT ON `tbl_album` FOR EACH ROW SET NEW.created_at = NOW(), NEW.updated_at = NOW();
CREATE TRIGGER tbl_album_update BEFORE UPDATE ON `tbl_album` FOR EACH ROW SET NEW.updated_at = NOW(), NEW.created_at = OLD.created_at;

CREATE TRIGGER tbl_media_create BEFORE INSERT ON `tbl_media` FOR EACH ROW SET NEW.created_at = NOW(), NEW.updated_at = NOW();
CREATE TRIGGER tbl_media_update BEFORE UPDATE ON `tbl_media` FOR EACH ROW SET NEW.updated_at = NOW(), NEW.created_at = OLD.created_at;

CREATE TRIGGER tbl_review_create BEFORE INSERT ON `tbl_review` FOR EACH ROW SET NEW.created_at = NOW(), NEW.updated_at = NOW();
CREATE TRIGGER tbl_review_update BEFORE UPDATE ON `tbl_review` FOR EACH ROW SET NEW.updated_at = NOW(), NEW.created_at = OLD.created_at;

CREATE TRIGGER tbl_unified_create BEFORE INSERT ON `tbl_unified` FOR EACH ROW SET NEW.created_at = NOW(), NEW.updated_at = NOW();
CREATE TRIGGER tbl_unified_update BEFORE UPDATE ON `tbl_unified` FOR EACH ROW SET NEW.updated_at = NOW(), NEW.created_at = OLD.created_at;




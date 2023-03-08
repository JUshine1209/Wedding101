USE wedding101_db;

-- user data
INSERT INTO tbl_user (user_id, user_password, user_name,user_nickname, user_email) VALUES
("dudwls624", "1234", "권영진", "영진짱", "dudwls624@naver.com"),
("rla0347", "1234", "김지현", "JIIHH", "rla0347@naver.com"),
("llee.dh", "1234", "이동형", "후드티개발자", "dhl@naver.com"),
("seonghwan1031", "1234", "김성환", "최고팀장", "seonghwan1031@naver.com"),
("wlsdnr4729", "1234", "이진욱", "핑크마스크", "wlsdnr4729@naver.com"),
("2diotodo", "1234", "류제엽", "JYP", "2diotodo@naver.com"),
("ruddlssk97", "1234", "나경인", "오창불주먹", "ruddlssk97@naver.com"),
("na0ngS2", "1234", "김니영", "엘베지옥", "na0ngS2@naver.com"),
("godqhr7424", "1234", "김소정", "ZezE", "godqhr7424@naver.com"),
("leeuh7777", "1234", "이연희", "스팀기둥세움", "leeuh7777@naver.com"),
("s00hyun30", "1234", "김소현", "술무살", "s00hyun30@naver.com");
SELECT * FROM tbl_user;

-- info data / 6번부터는 데이터 같은거임 -> 리뷰데이터용 정보
insert into tbl_info 
(user_seq, wedding_day, wedding_hall_name, wedding_hall_address, wedding_hall_number, groom_name, bride_name, groom_phone_number, bride_phone_number,
groom_account_number, groom_account_bank, groom_account_name, bride_account_number, bride_account_bank, bride_account_name, 
groom_relation, bride_relation, groom_father_name, groom_mother_name, bride_father_name, bride_mother_name) values
(1, "2023-02-19 10:00:00", "서울신라호텔", "서울 중구 동호로 249", "02-1234-1234", "김성환", "권영진", "010-0000-0000", "010-1111-1111", "0-0000-0000-00", "국민은행", "김성환", "000-0000-000-00", "농협" , "권영진", "장남", "차녀", "김도진", "이은화", "권효창", "김수진"),
(2, "2023-02-25 11:00:00", "웨스턴 조선 서울", "서울 중구 소공로 106", "02-1234-1234", "강동원", "김지현", "010-0000-0000", "010-1111-1111", "0-0000-0000-00", "국민은행", "강동원", "000-0000-000-00", "농협" , "김지현", "장남", "장녀", "강요한", "박정화", "김영광", "김은혜"),
(3, "2023-02-25 14:00:00", "서울프라자예식장", "서울 중구 소공로 119", "02-1234-1234", "이동형", "이예솔", "010-0000-0000", "010-1111-1111", "0-0000-0000-00", "국민은행", "이동형", "000-0000-000-00", "농협" , "이예솔", "차남", "장녀", "이중재", "김지혜", "이한빛", "유하은"),
(4, "2023-02-25 10:00:00", "롯데호텔 웨딩", "서울 중구 을지로 30", "02-1234-1234", "김성환", "김채원", "010-0000-0000", "010-1111-1111", "0-0000-0000-00", "국민은행", "김성환", "000-0000-000-00", "농협" , "김채원", "차남", "장녀", "김구민", "윤승현", "김다산", "권한솔"),
(5, "2023-02-26 10:00:00", "롯데호텔 웨딩", "서울 중구 을지로 30", "02-1234-1234", "이진욱", "오채은", "010-0000-0000", "010-1111-1111", "0-0000-0000-00", "국민은행", "이진욱", "000-0000-000-00", "농협" , "오채은", "차남", "장녀", "이근석", "하예솔", "오창석", "박경남"),
(6, "2023-02-26 10:00:00", "롯데호텔 웨딩", "서울 중구 을지로 30", "02-1234-1234", "이진욱", "오채은", "010-0000-0000", "010-1111-1111", "0-0000-0000-00", "국민은행", "이진욱", "000-0000-000-00", "농협" , "오채은", "차남", "장녀", "이근석", "하예솔", "오창석", "박경남"),
(7, "2023-02-26 10:00:00", "롯데호텔 웨딩", "서울 중구 을지로 30", "02-1234-1234", "이진욱", "오채은", "010-0000-0000", "010-1111-1111", "0-0000-0000-00", "국민은행", "이진욱", "000-0000-000-00", "농협" , "오채은", "차남", "장녀", "이근석", "하예솔", "오창석", "박경남"),
(8, "2023-02-26 10:00:00", "롯데호텔 웨딩", "서울 중구 을지로 30", "02-1234-1234", "이진욱", "오채은", "010-0000-0000", "010-1111-1111", "0-0000-0000-00", "국민은행", "이진욱", "000-0000-000-00", "농협" , "오채은", "차남", "장녀", "이근석", "하예솔", "오창석", "박경남"),
(9, "2023-02-26 10:00:00", "롯데호텔 웨딩", "서울 중구 을지로 30", "02-1234-1234", "이진욱", "오채은", "010-0000-0000", "010-1111-1111", "0-0000-0000-00", "국민은행", "이진욱", "000-0000-000-00", "농협" , "오채은", "차남", "장녀", "이근석", "하예솔", "오창석", "박경남"),
(10, "2023-02-26 10:00:00", "롯데호텔 웨딩", "서울 중구 을지로 30", "02-1234-1234", "이진욱", "오채은", "010-0000-0000", "010-1111-1111", "0-0000-0000-00", "국민은행", "이진욱", "000-0000-000-00", "농협" , "오채은", "차남", "장녀", "이근석", "하예솔", "오창석", "박경남"),
(11, "2023-02-26 10:00:00", "롯데호텔 웨딩", "서울 중구 을지로 30", "02-1234-1234", "이진욱", "오채은", "010-0000-0000", "010-1111-1111", "0-0000-0000-00", "국민은행", "이진욱", "000-0000-000-00", "농협" , "오채은", "차남", "장녀", "이근석", "하예솔", "오창석", "박경남");
select * From tbl_info;

-- template data
select * from tbl_template;
insert into tbl_template (template_title, template_header, template_footer, template_etc) values
("기본템플릿", "HAPPY WEDDING DAY", "저희 결혼합니다.", "두 사람의 출발을 축하해주세요."),
("추가템플릿", "예쁜 예감이 들었다", "우리는 언제나 손을 잡고 있게 될 것이다", "이이체, <연인>");

-- invitation data / 5번까지만 데이터 넣음 6번부터 11번 까지 입력 가능
select * from tbl_invitation;
insert into tbl_invitation (info_seq, user_seq, template_seq, photo_url1, photo_url2) values
(1, 1, 1, "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/dudwls624/invitation/KakaoTalk_20230216_171500201_11.jpg", "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/dudwls624/invitation/KakaoTalk_20230216_171500201_01.jpg"),
(2, 2, 2, "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/invitation/KakaoTalk_20230214_125922695.png", "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/invitation/KakaoTalk_20230214_125922579.png"),
(3, 3, 1, "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/invitation/KakaoTalk_20230214_125922579.png", "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/invitation/KakaoTalk_20230214_125922695.png");
-- (6, 6, 1, "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/invitation/KakaoTalk_20230214_125922579.png"),
-- (7, 7, 2, "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/invitation/KakaoTalk_20230214_125922695.png"),
-- (8, 8, 2, "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/invitation/KakaoTalk_20230214_125922695.png"),
-- (9, 9, 1, "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/invitation/KakaoTalk_20230214_125922469.png"),
-- (10, 10, 1, "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/invitation/KakaoTalk_20230214_125922855.png"),
-- (11, 11, 1, "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/invitation/KakaoTalk_20230214_125922855.png");


-- 문구 수정 버전
insert into tbl_invitation (info_seq, user_seq, template_seq, photo_url1, photo_url2, template_header, template_footer, template_etc) values
(4, 4, 1, "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/invitation/KakaoTalk_20230214_125922855.png", "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/invitation/KakaoTalk_20230214_125922579.png", "오랜 시간을 함께한 저희 두사람, ", "이제 평생을 함께 하려 합니다.", "하나가 되는 뜻깊은 날을 축복해주세요."),
(5, 5, 2, "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/invitation/KakaoTalk_20230214_125922469.png", "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/invitation/KakaoTalk_20230214_125922695.png", "저희 두사람이 이제 믿음과 사랑으로", "한 가정을 이루게 되었습니다.", "부디 함께 하시어 축복해 주시기 바랍니다.");

-- album data / 6번까지 데이터 넣음 -> 7번부터 11번까지 입력가능
insert into tbl_album (info_seq, user_seq, album_name, album_access_id, album_photo_url, album_thanks_url) values
(1, 1, "소중한 결혼과 소중한 사람들", "123456789a",  "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/dudwls624/album/KakaoTalk_20230216_171500201_07.jpg",  "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/dudwls624/thanks/KakaoTalk_20230216_171506792.mp4"),
(2, 2, "Happy Day !", "123456789b",  "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/invitation/KakaoTalk_20230214_125922469.png", "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/dudwls624/video/00fce54f-555f-457e-a38b-d6f27c44ce4f.mp4"),
(3, 3, "포 터 블 웨딩 앨범", "123456789c",  "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/invitation/KakaoTalk_20230214_125922469.png", "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/dudwls624/video/00fce54f-555f-457e-a38b-d6f27c44ce4f.mp4"),
(4, 4, "castle환 과 르세라핌의 앨범", "123456789d",  "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/invitation/KakaoTalk_20230214_125922579.png", "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/dudwls624/video/00fce54f-555f-457e-a38b-d6f27c44ce4f.mp4"),
(5, 5, "방명로그", "123456789e",  "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/invitation/KakaoTalk_20230214_125922695.png", "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/dudwls624/video/00fce54f-555f-457e-a38b-d6f27c44ce4f.mp4"),
(6, 6, "album name", "123456789f",  "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/invitation/KakaoTalk_20230214_125922695.png", "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/dudwls624/video/00fce54f-555f-457e-a38b-d6f27c44ce4f.mp4");
-- (7, 7, "album name!", "123456789g",  "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/invitation/KakaoTalk_20230214_125922695.png", "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/dudwls624/video/00fce54f-555f-457e-a38b-d6f27c44ce4f.mp4"),
-- (8, 8, "album name!", "123456789h",  "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/invitation/KakaoTalk_20230214_125922695.png", "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/dudwls624/video/00fce54f-555f-457e-a38b-d6f27c44ce4f.mp4"),
-- (9, 9, "album name!", "123456789i",  "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/invitation/KakaoTalk_20230214_125922695.png", "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/dudwls624/video/00fce54f-555f-457e-a38b-d6f27c44ce4f.mp4"),
-- (10, 10, "album name!", "123456789j",  "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/invitation/KakaoTalk_20230214_125922695.png", "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/dudwls624/video/00fce54f-555f-457e-a38b-d6f27c44ce4f.mp4"),
-- (11, 11, "album name!", "123456789k",  "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/invitation/KakaoTalk_20230214_125922695.png", "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/dudwls624/video/00fce54f-555f-457e-a38b-d6f27c44ce4f.mp4");
select * from tbl_album;

-- relation_list = ['', 'family', 'relatives', 'friend', 'colleague', 'acquaintance']
-- receiver_list = ['', 'G', 'B']
-- media data / 2번 앨범까지 채움 -> 전부 영상은 아무거나 넣어놨으나 추후에 iot에서 찍은거 혹은 업로드한 사진으로 바꿔야함
select * from tbl_media;
-- insert into tbl_media (album_seq, storage_url, url_to_img, media_name, media_relation) values
-- (1, "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/dudwls624/video/76afe67e-5b83-45c3-b0d2-49febd48c378.mp4", "https://picsum.photos/200", "한창희", "friend"),
-- (1, "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", "https://picsum.photos/200", "김은유", "family"),
-- (1, "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", "https://picsum.photos/200", "전가영", "colleague"),
-- (1, "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", "https://picsum.photos/200", "고정욱", "colleague"),
-- (1, "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", "https://picsum.photos/200", "김태영", "acquaintance"),
-- (1, "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", "https://picsum.photos/200", "박도현", "colleague"),
-- (1, "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/dudwls624/video/76afe67e-5b83-45c3-b0d2-49febd48c378.mp4", "https://picsum.photos/200", "유동영", "friend"),
-- (1, "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", "https://picsum.photos/200", "이서정", "family"),
-- (1, "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", "https://picsum.photos/200", "민다훈", "colleague"),
-- (1, "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", "https://picsum.photos/200", "박경희", "colleague"),
-- (1, "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", "https://picsum.photos/200", "백진솔", "acquaintance"),
-- (1, "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", "https://picsum.photos/200", "석재윤", "colleague");
-- insert into tbl_media (album_seq, storage_url, url_to_img, media_name, media_relation, is_video) values
-- (1, "https://picsum.photos/1000/800", "https://picsum.photos/200", "nki", "friend", 0),
-- (1, "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/invitation/KakaoTalk_20230214_125922469.png", "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/invitation/KakaoTalk_20230214_125922469.png", "nki", "friend", 0),
-- (1,"https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/invitation/KakaoTalk_20230214_125922469.png", "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/invitation/KakaoTalk_20230214_125922469.png", "nki", "friend", 0),
-- (1, "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/invitation/KakaoTalk_20230214_125922695.png", "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/invitation/KakaoTalk_20230214_125922695.png", "nki", "friend", 0),
-- (1, "https://picsum.photos/1000/800", "https://picsum.photos/200", "nki", "friend", 0);
-- insert into tbl_media (album_seq, storage_url, url_to_img, media_name, media_relation) values
-- (2, "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", "https://picsum.photos/200", "박세리", "relatives"),
-- (2, "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", "https://picsum.photos/200", "박도현", "colleague"),
-- (2, "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/dudwls624/video/76afe67e-5b83-45c3-b0d2-49febd48c378.mp4", "https://picsum.photos/200", "유동영", "friend"),
-- (2, "https://picsum.photos/1000/800", "https://picsum.photos/200", "nki", "friend"),
-- (2, "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", "https://picsum.photos/200", "이서정", "family"),
-- (2, "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", "https://picsum.photos/200", "민다훈", "colleague"),
-- (2, "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", "https://picsum.photos/200", "박경희", "colleague"),
-- (2, "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", "https://picsum.photos/200", "백진솔", "acquaintance"),
-- (2, "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", "https://picsum.photos/200", "석재윤", "colleague");
-- select * from tbl_media;

-- question data 
select * from tbl_question;
insert into tbl_question (user_seq, question_title, question_content) values
(1, "앨범 유지기간이 언제까지 인가요?", "서비스 신청한 이후로 앨범 유지기간이 얼마까지 유지될까요? 유지 기간을 늘릴 수 있나요??"),
(2, "서비스 이용료", "서비스 이용료는 얼마인가요, "),
(3, "통합본 신청 개수는 제한이 있나요?", "통합본 신청은 무제한인가요?"),
(4, "개인 정보", "정보 수정에 대한 문의드립니다. 정보 수정이 안되는데 어디서 신청하면 되나요?"),
(5, "앨범 공개 여부", "앨범을 외부 사용자에게 공개할 수 있을까요?"),
(6, "문의드립니다.", "서비스 신청한 이후로 앨범 유지기간이 얼마까지 유지될까요? 유지 기간을 늘릴 수 있나요??"),
(7, "온라인 청첩장 문구 수정", "서비스 신청한 이후로 앨범 유지기간이 얼마까지 유지될까요? 유지 기간을 늘릴 수 있나요??"),
(8, "온라인 청첩장 유지 기간", "서비스 신청한 이후로 앨범 유지기간이 얼마까지 유지될까요? 유지 기간을 늘릴 수 있나요??"),
(9, "앨범 유지기간이 언제까지 인가요?", "서비스 신청한 이후로 앨범 유지기간이 얼마까지 유지될까요? 유지 기간을 늘릴 수 있나요??"),
(10, "앨범 유지기간이 언제까지 인가요?", "서비스 신청한 이후로 앨범 유지기간이 얼마까지 유지될까요? 유지 기간을 늘릴 수 있나요??"),
(11, "앨범 유지기간이 언제까지 인가요?", "서비스 신청한 이후로 앨범 유지기간이 얼마까지 유지될까요? 유지 기간을 늘릴 수 있나요??");

-- review data / 5번 앨범까지 작성함 6번부터 11번까지 작성가능 
select * from tbl_review;
insert into tbl_review (album_seq, review_title, review_rate, review_content) values
(1, "너무 좋은 서비스입니당 !!!", 10, "결혼식날 너무 바빠서 하객분들 하나하나 제대로 기억하지 못했는데 방명록 덕분에 감사인사를 전해드릴 수 있게 되었네요 ~~ 좋은 서비스에요 강추합니다"),
(2, "이건 무조건 하세요", 10, "친구들 사진이랑 영상보니까 너무 즐겁네요, 결혼식이 정말 좋은 추억으로 남을 수 있을 것 같습니다 감사합니당 ㅎㅎ"),
(3, " !GOOD!", 9, "결혼식날 너무 바빠서 하객분들 하나하나 제대로 기억하지 못했는데 방명록 덕분에 감사인사를 전해드릴 수 있게 되었네요 ~~ 좋은 서비스에요 강추합니다"),
(4, "사진보다 영상으로 보니 훨씬 좋네요", 10, "결혼식날 너무 바빠서 하객분들 하나하나 제대로 기억하지 못했는데 방명록 덕분에 감사인사를 전해드릴 수 있게 되었네요 ~~ 좋은 서비스에요 강추합니다"),
(5, "할머니 영상이 남아있어서 자주 들어와서 봅니다", 9, "결혼식날 너무 바빠서 하객분들 하나하나 제대로 기억하지 못했는데 방명록 덕분에 감사인사를 전해드릴 수 있게 되었네요 ~~ 좋은 서비스에요 강추합니다");
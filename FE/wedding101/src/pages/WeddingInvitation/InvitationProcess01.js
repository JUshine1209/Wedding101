// 청첩장 프로세스1: 템플릿 선택
import "./InvitationProcess01.css";

import { useNavigate } from "react-router";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Button } from "@mui/material/";
import Slider from "react-slick";
import axios from "axios";
import { useState, useEffect } from "react";
import InvitationForm from "../../components/WeddingInvitation/InvitationForm";
import ProgressBar from "../../components/common/ProgressBar";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// API 통신부
const request = axios.create({
  baseURL: "https://wedding101.shop/api",
});

const api = {
  wedding101: {
    findWeddingInfo: (userSeq) =>
      request.get("/Info", { params: { userSeq: userSeq } }),
  },
};

const InvitationProcess01 = () => {
  const [weddingInfoData, setWeddingInfoData] = useState({
    infoSeq: 1,
    userSeq: 1,
    weddingDay: 1676193211000,
    weddingHallName: "theariel",
    weddingHallAddress: null,
    weddingHallNumber: null,
    groomName: "lsh",
    brideName: "kwj",
    groomPhoneNumber: "010-0000-0000",
    bridePhoneNumber: "010-1111-1111",
    groomAccountNumber: null,
    groomAccountBank: null,
    groomAccountName: null,
    brideAccountNumber: null,
    brideAccountBank: null,
    brideAccountName: null,
    groomRelation: null,
    brideRelation: null,
    groomFatherName: null,
    groomMotherName: null,
    brideFatherName: null,
    brideMotherName: null,
    groomFatherIsAlive: true,
    groomMotherIsAlive: true,
    brideFatherIsAlive: true,
    brideMotherIsAlive: true,
  });

  const [invitationData, setInvitationData] = useState({
    templateHeader: "두 사람이 하나가 될 인생을 시작합니다.",
    templateFooter: "부디 걸음하시어 축복하여 주시면",
    templateEtc: "더없는 기쁨이 되겠습니다.",
  });

  useEffect(() => {
    const dataFetch = async () => {
      const res = await api.wedding101.findWeddingInfo(1);

      //   console.log(res.data.data);
      setWeddingInfoData(res.data.data);
    };
    dataFetch();
    console.log(weddingInfoData);
  }, []);

  const settings = {
    className: 'invitation_slider',
    dots: true, // 슬라이드 아래 점표시
    infinite: true, // 무한반복
    speed: 500, // 넘어가는 속도
    slidesToShow: 1, // 화면에 보일 슬라이드 수
    slidesToScroll: 1, // 스크롤 단위
    centerMode: true,
    centerPadding: "0", // 슬라이드 끝쪽 이미지 안잘리기
  };

  const navigate = useNavigate();
  const toProcess02 = () => {
    navigate("/invitation02");
  };

  return (
    <div className="process01">
      <Grid2 container spacing={3}>
        <Grid2 lg={3} sm={2}>
          <h1>Mobile Invitation</h1>
        </Grid2>
        <Grid2 lg={9} sm={10}>
          <div className="process-main">
            <ProgressBar
              steps={["step1", "step2", "step3", "step4"]}
              activeStep={0}
            />
            <h2>모바일 청첩장 템플릿 선택하기</h2>
            
            <Slider {...settings}>
              <div className="invitation-item">
                <InvitationForm
                  weddingInfoData={weddingInfoData}
                  invitationData={invitationData}
                />
              </div>
              <div className="invitation-item">
                <InvitationForm
                  weddingInfoData={weddingInfoData}
                  invitationData={invitationData}
                />
              </div>
            </Slider>
          </div>
          <div className="buttons">
            <Button variant="contained" onClick={() => navigate("/")}>
              메인으로
            </Button>
          </div>
          <div className="buttons">
            <Button variant="contained" onClick={toProcess02}>
              다음
            </Button>
          </div>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default InvitationProcess01;

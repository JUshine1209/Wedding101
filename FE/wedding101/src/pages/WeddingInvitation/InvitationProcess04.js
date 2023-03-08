// 청첩장 프로세스4: 모바일 청첩장 생성완료
// 1-3단계에서 sessionStorage에 저장한 photo, text를 전송
import "./InvitationProcess02.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Button } from "@mui/material/";
import InvitationForm from "../../components/WeddingInvitation/InvitationForm";
import ProgressBar from "../../components/common/ProgressBar";
import axios from "axios";

// API 통신부
const request = axios.create({
  baseURL: "https://wedding101.shop/api/",
});

const api = {
  wedding101: {
    findWeddingInfo: (userSeq) =>
      request.get("/Info", { params: { userSeq: userSeq } }),
  },
};

const InvitationProcess04 = () => {
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

  useEffect(() => {
    const dataFetch = async () => {
      const res = await api.wedding101.findWeddingInfo(1);

      //   console.log(res.data.data);
      setWeddingInfoData(res.data.data);
    };
    dataFetch();
    console.log(weddingInfoData);
  }, []);

  const [invitationForm, setInvitationForm] = useState({
    templateSeq: 1,
    photoUrl01: "",
    photoUrl02: "",
    templateHeader: "",
    templateFooter: "",
    templateEtc: "",
  });

  const [invitationData, setInvitationData] = useState({
    templateHeader: sessionStorage.getItem("templateHeader"),
    templateFooter: sessionStorage.getItem("templateFooter"),
    templateEtc: sessionStorage.getItem("templateEtc"),
  });

  const submitHandler = async (e) => {
    // sessionStorage to invitationForm
    alert("제출되었습니다.");
    setInvitationForm.photoUrl01(sessionStorage.getItem("photoUrl01"));
    setInvitationForm.photoUrl02(sessionStorage.getItem("photoUrl02"));
    setInvitationForm.templateHeader(sessionStorage.getItem("textInput01"));
    setInvitationForm.templateFooter(sessionStorage.getItem("textInput02"));
    setInvitationForm.templateEtc(sessionStorage.getItem("textInput03"));
    // axios 통신
    await axios
      .post("http://localhost:8080/", {
        data: invitationForm,
      })
      .then((res) => {
        alert('청첩장이 발급되었습니다.');
        navigate('/');
      })
      .catch((err) => {
        console.log(err)
        alert('청첩장 발급 실패!');
      });
  };

  const navigate = useNavigate();
  const toProcess03 = () => {
    navigate("/invitation03");
  };

  return (
    <div className="process04">
      <Grid2 container spacing={3}>
        <Grid2 lg={3} sm={2}>
          <h1>Mobile Invitation</h1>
        </Grid2>
        <Grid2 lg={8} sm={10}>
          <div className="process-main">
            <ProgressBar
              steps={["step1", "step2", "step3", "step4"]}
              activeStep={3}
            />
            <h2>모바일 청첩장이 생성되었습니다.</h2>
            <div>
              <InvitationForm
                weddingInfoData={weddingInfoData}
                invitationData={invitationData}
              />
            </div>
            <form onSubmit={submitHandler}>
              <div className="buttons">
                <Button variant="contained" onClick={() => navigate(-1)}>
                  이전
                </Button>
              </div>
              <div className="buttons">
                <Button variant="contained" type="submit">
                  완료
                </Button>
              </div>
            </form>
          </div>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default InvitationProcess04;

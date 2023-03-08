// 청첩장 프로세스3: 문구 변경
import "./InvitationProcess03.css";

import { useNavigate } from "react-router";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { TextField, Button } from "@mui/material/";
import ProgressBar from "../../components/common/ProgressBar";
import InvitationForm from "../../components/WeddingInvitation/InvitationForm";
import { useState, useEffect } from "react";
import axios from "axios";

// import UploadText from '../../components/WeddingInvitation/UploadText';

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

const InvitationProcess03 = () => {
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

  const [invitationData, setInvitationData] = useState({
    templateHeader: "초대합니다",
    templateFooter: "감사합니다",
    templateEtc: "돈많이주세요",
  });

  const onChange = (e) => {
    const newForm = {
      ...invitationData,
      [e.target.name]: e.target.value,
    };

    setInvitationData(newForm);
  };

  const navigate = useNavigate();
  const toProcess04 = () => {
    sessionStorage.setItem("templateHeader", invitationData.templateHeader);
    sessionStorage.setItem("templateFooter", invitationData.templateFooter);
    sessionStorage.setItem("templateEtc", invitationData.templateEtc);

    navigate("/invitation04");
  };

  return (
    <div>
      <Grid2 container spacing={3}>
        <Grid2 lg={3} sm={2}>
          <h1>Mobile Invitation</h1>
        </Grid2>
        <Grid2 lg={9} sm={10}>
          <div className="process-main">
            <ProgressBar
              steps={["step1", "step2", "step3", "step4"]}
              activeStep={2}
            />
            <h2>모바일 청첩장 문구 변경</h2>
            <div className="text-form">
              <div className="invitation-form">
                <InvitationForm
                  weddingInfoData={weddingInfoData}
                  invitationData={invitationData}
                />
              </div>
              <div className="upload-text">
                <div>
                  <TextField
                    id="templateHeader"
                    name="templateHeader"
                    type="text"
                    label="문구를 입력하세요"
                    variant="outlined"
                    value={invitationData.templateHeader}
                    onChange={onChange}
                  />{" "}
                  <br /> <br />
                  <TextField
                    id="templateFooter"
                    name="templateFooter"
                    type="text"
                    label="문구를 입력하세요"
                    variant="outlined"
                    value={invitationData.templateFooter}
                    onChange={onChange}
                  />{" "}
                  <br /> <br />
                  <TextField
                    id="templateEtc"
                    name="templateEtc"
                    type="text"
                    label="문구를 입력하세요"
                    variant="outlined"
                    value={invitationData.templateEtc}
                    onChange={onChange}
                  />{" "}
                  <br /> <br />
                </div>
              </div>
            </div>
          </div>

          <div className="buttons">
            <Button variant="contained" onClick={() => navigate(-1)}>
              이전
            </Button>
          </div>
          <div className="buttons">
            <Button variant="contained" onClick={toProcess04}>
              다음
            </Button>
          </div>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default InvitationProcess03;

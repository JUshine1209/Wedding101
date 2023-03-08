// 청첩장 프로세스2: 사진 업로드
import "./InvitationProcess02.css";

import { useNavigate } from "react-router";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Button, IconButton } from "@mui/material/";
import UploadIcon from "@mui/icons-material/Upload";
import axios from "axios";
import ProgressBar from "../../components/common/ProgressBar";
import InvitationForm from "../../components/WeddingInvitation/InvitationForm";
import invitation_image_1 from "../../assets/img/invitation_image_1.png";
import invitation_image_2 from "../../assets/img/invitation_image_2.png";
import { useState, useEffect } from "react";
import useUploadMedia from "../../modules/useUploadMedia";

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

const InvitationProcess02 = () => {
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

  const [photoURLform, setPhotoURLform] = useState({
    url01: "photoUrl01",
    url02: "photoUrl02",
  });

  const {
    filePreview: filePreview1,
    fileImageHandler: fileImageHandler1,
    deleteFileImage: deleteFileImage1,
    onFileUpload: onFileUpload1,
  } = useUploadMedia(photoURLform.url01);

  const {
    filePreview: filePreview2,
    fileImageHandler: fileImageHandler2,
    deleteFileImage: deleteFileImage2,
    onFileUpload: onFileUpload2,
  } = useUploadMedia(photoURLform.url02);

  const navigate = useNavigate();
  const toProcess03 = () => {
    navigate("/invitation03");
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
              activeStep={1}
            />
            <h2>모바일 청첩장 사진 넣기</h2>
            <div className="inner-content">
              <div className="invitation-item">
                <InvitationForm
                  weddingInfoData={weddingInfoData}
                  invitationData={invitationData}
                />
              </div>
              <div className="input-container">
                <div className="upload-input">
                  <div className="upload01">
                    <IconButton aria-label="upload picture" component="label">
                      <input
                        hidden
                        type="file"
                        accept="image/*, video/*"
                        onChange={(e) => {
                          fileImageHandler1(e);
                          setTimeout(
                            () =>
                              (document.getElementById(
                                "invitationImage01"
                              ).children[0].src = sessionStorage.getItem(
                                photoURLform.url01
                              )),
                            50
                          );
                        }}
                      />
                      <UploadIcon fontSize="large" />
                    </IconButton>
                    <Button
                      onClick={(e) => {
                        deleteFileImage1(e);
                        setTimeout(
                          () =>
                            (document.getElementById(
                              "invitationImage01"
                            ).children[0].src = invitation_image_1),
                          50
                        );
                      }}
                    >
                      삭제
                    </Button>
                  </div>
                  <br />
                  <div className="upload02">
                    <IconButton aria-label="upload picture" component="label">
                      <input
                        hidden
                        type="file"
                        accept="image/*, video/*"
                        onChange={(e) => {
                          fileImageHandler2(e);
                          setTimeout(
                            () =>
                              (document.getElementById(
                                "invitationImage02"
                              ).children[0].src = sessionStorage.getItem(
                                photoURLform.url02
                              )),
                            50
                          );
                        }}
                      />
                      <UploadIcon fontSize="large" />
                    </IconButton>
                    <Button
                      onClick={(e) => {
                        deleteFileImage2(e);
                        setTimeout(
                          () =>
                            (document.getElementById(
                              "invitationImage02"
                            ).children[0].src = invitation_image_2),
                          50
                        );
                      }}
                    >
                      삭제
                    </Button>
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
              <Button variant="contained" onClick={toProcess03}>
                다음
              </Button>
            </div>
          </div>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default InvitationProcess02;

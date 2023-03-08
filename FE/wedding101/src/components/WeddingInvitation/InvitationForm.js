import { React, MouseEvent, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./InvitationForm.css";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import SendIcon from "@mui/icons-material/Send";
import Calendar from "react-calendar";
import Checkbox from "@mui/material/Checkbox";
import "react-calendar/dist/Calendar.css"; // css import
import useUploadMedia from "../../modules/useUploadMedia";

import invitation_image_1 from "../../assets/img/invitation_image_1.png";
import invitation_image_2 from "../../assets/img/invitation_image_2.png";
import invitation_image_3 from "../../assets/img/invitation_image_3.png";
import invitation_image_4 from "../../assets/img/invitation_image_4.png";
import invitation_text_background from "../../assets/img/invitation_text_background.png";

// API 통신부
const request = axios.create({
  baseURL: "https://wedding101.shop/api/",
});

const api = {
  wedding101: {
    findWeddingInfo: (invitationSeq) =>
      request.get(`/invitation/${invitationSeq}`),
  },
};

function Title(props) {
  return (
    <div className="title">
      <h1 className="groomName">{props.groomName}</h1>
      <h1 className="brideName">{props.brideName}</h1>
    </div>
  );
}

function BriefInfo(props) {
  console.log(props);

  const date = new Date(props.datetime - 9 * 60 * 60 * 1000);
  let dateFormat =
    date.getFullYear() +
    "년 " +
    (date.getMonth() + 1) +
    "월 " +
    date.getDate() +
    "일, " +
    date.getHours() +
    "시 " +
    date.getMinutes() +
    "분";

  return (
    <div className="briefInfo">
      {dateFormat}
      <br />
      {props.place}
    </div>
  );
}

function WeddingPhoto(props) {
  // 사진을 가져와야함 -> props에 담겨있어야하는가?
  return (
    <div className="weddingPhoto" id={props.id}>
      <img src={props.src} alt="invitation_image"></img>
    </div>
  );
}

function WeddingMessage(props) {
  return (
    <div
      className="weddingMessage"
      style={{ backgroundImage: `url(${invitation_text_background})` }}
    >
      <h2 className="messageTitle">결혼합니다</h2>
      <div className="messageBody">
        {props.invitationData.templateHeader}
        <br />
        {props.invitationData.templateFooter}
        <br />
        {props.invitationData.templateEtc}
        {/* 두 사람이 하나가 될 인생을 시작합니다. 사랑으로 가득 채워 즐거움은
        나누고 어려움은 이겨내는 함께 나아가는 삶을 꾸리겠습니다. 부디
        걸음하시어 축복하여 주시면 더없는 기쁨이 되겠습니다. */}
        <br />
      </div>
      <FamilyInfo weddingInfoData={props.weddingInfoData} />
    </div>
  );
}

function FamilyInfo(props) {
  return (
    <div className="familyInfo">
      <div className="groomFamily">
        {props.weddingInfoData.groomFatherName}·
        {props.weddingInfoData.groomMotherName}의 아들{" "}
        {props.weddingInfoData.groomName}
      </div>
      <div className="brideFamily">
        {props.weddingInfoData.brideFatherName}·
        {props.weddingInfoData.brideMotherName}의 딸{" "}
        {props.weddingInfoData.brideName}
      </div>
    </div>
  );
}

function UploadMedia(props) {
  const {
    fileMedia,
    filePreview,
    fileImageHandler,
    deleteFileImage,
    onFileUpload,
  } = useUploadMedia("media");

  const albumSeq = props.albumSeq;

  const [sendTo, setSendTo] = useState("");
  const [sendFrom, setSendFrom] = useState("");
  const [sendName, setSendName] = useState("");
  const [sendAgree, setSendAgree] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const handleChange = (event, newAlignment) => {
    setSendTo(newAlignment);
    console.log(newAlignment);
  };

  const handleChange2 = (event, newAlignment) => {
    setSendFrom(newAlignment);
    console.log(newAlignment);
  };

  const handleChangeCheck = (event) => {
    setSendAgree(event.target.checked);
  };

  const handleChangeName = (event) => {
    // console.log(event.target.value);
    setSendName(event.target.value);
  };

  const onUploadVideo = async (data) =>{
    await axios
      .post("https://wedding101.shop/api/file/uploadMedia/video", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(async (res) => {
        console.log(res);
        let parser =
          "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/";

        await axios.post("https://wedding101.shop/api/media", {
          albumSeq: albumSeq,
          inBin: false,
          mediaName: sendName,
          mediaReceiver: sendTo,
          mediaRelation: sendFrom,
          mediaSeq: 0,
          onBooth: false,
          storageUrl: res.data.videoURL,
          urlToImg: res.data.thumbNailUrl,
          video: true,
          wish: false,
        });
      })
      .then(() => {
        alert("전송에 성공했습니다.");
        setIsDisabled(true);
      })
      .catch((err) => {
        console.log(err);
        alert("등록을 실패하였습니다.");
      });
  }
  const onUploadImage = async (data) =>{
    await axios
      .post("https://wedding101.shop/api/file/uploadMedia/image", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(async (res) => {
        console.log(res);
        let parser =
          "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/";

        await axios.post("https://wedding101.shop/api/media", {
          albumSeq: albumSeq,
          inBin: false,
          mediaName: sendName,
          mediaReceiver: sendTo,
          mediaRelation: sendFrom,
          mediaSeq: 0,
          onBooth: false,
          storageUrl: res.data,
          urlToImg: res.data,
          video: false,
          wish: false,
        });
      })
      .then(() => {
        alert("전송에 성공했습니다.");
        setIsDisabled(true);
      })
      .catch((err) => {
        console.log(err);
        alert("등록을 실패하였습니다.");
      });
  }
  const onMediaUpload = async (e) => {
    e.preventDefault();
    if (!sendTo) {
      alert("누구에게 보낼지 선택하세요");
      return;
    }
    if (!sendFrom) {
      alert("축하를 보낼 사람과의 관계를 선택하세요");
      return;
    }
    if (!sendName) {
      alert("보내는 사람의 이름을 입력해주세요");
      return;
    }
    if (!fileMedia) {
      alert("파일을 첨부해주세요");
      return;
    }
    if (!sendAgree) {
      alert("개인정보 제공에 동의해주세요");
      return;
    }

    let formData = new FormData();
    console.log(fileMedia);
    formData.append("multipartFile", fileMedia);
    formData.append("userSeq", albumSeq);
    console.log(formData);

    if(fileMedia.type==='video/mp4'){
      onUploadVideo(formData);
    }else{
      onUploadImage(formData);
    }
  };

  return (
    <div className="uploadMedia">
      <div className="toWhom">
        <ToggleButtonGroup
          className="toggleButtonGroup"
          size="small"
          color="primary"
          value={sendTo}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="G">신랑</ToggleButton>
          <ToggleButton value="B">신부</ToggleButton>
        </ToggleButtonGroup>
        에게
      </div>
      <div className="fromWhom">
        <TextField
          sx={{ maxWidth: 100 }}
          id="outlined-basic"
          label="이름"
          variant="outlined"
          size="small"
          onChange={handleChangeName}
        />{" "}
        (이)가
      </div>
      <div className="media-area">
        {filePreview && <img src={filePreview} alt="preview" />}
      </div>
      <Button className="uploadButton" variant="contained" component="label">
        Upload
        <input
          hidden
          // accept="image/*"
          accept="image/*, video/mp4"
          multiple
          type="file"
          onChange={fileImageHandler}
        />
      </Button>

      <div>
        관계선택:
        <ToggleButtonGroup
          className="toggleButtonGroup"
          size="small"
          color="primary"
          value={sendFrom}
          exclusive
          onChange={handleChange2}
          aria-label="Platform"
        >
          <ToggleButton value="family">가족</ToggleButton>
          <ToggleButton value="relative">친인척</ToggleButton>
          <ToggleButton value="friend">친구</ToggleButton>
          <ToggleButton value="colleague">동료</ToggleButton>
          <ToggleButton value="acquaintance">지인</ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className="checkAgreement">
        개인정보 제공 동의하기 <Checkbox onChange={handleChangeCheck} />
      </div>
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        onClick={onMediaUpload}
        disabled={isDisabled}
      >
        Send
      </Button>
    </div>
  );
}

function WeddingInfo(props) {
  return (
    <div className="weddingInfo">
      <WeddingCalendar date={props.datetime - 9 * 60 * 60 * 1000} />
      <div className="weddingPlace"></div>
      <div className="weddingTransportation"></div>
    </div>
  );
}

function WeddingCalendar(props) {
  const [value, onChange] = useState(new Date(props.date));

  useEffect(() => {
    onChange(new Date(props.date));
  }, [props]);

  return (
    <div>
      {/* <Calendar calendarType="US" value={value} /> */}
      <Calendar calendarType="US" value={value} />
    </div>
  );
}

function WeddingPhotoCarousel(props) {
  return (
    <div className="weddingPhotoCarousel">
      <img></img>
    </div>
  );
}

function WeddingSummary(props) {
  console.log(props);

  const date = new Date(props.datetime - 9 * 60 * 60 * 1000);
  let dateFormat =
    date.getFullYear() +
    "년 " +
    (date.getMonth() + 1) +
    "월 " +
    date.getDate() +
    "일, " +
    date.getHours() +
    "시 " +
    date.getMinutes() +
    "분";

  return (
    <div
      className="weddingSummary"
      style={{ backgroundImage: `url(${invitation_text_background})` }}
    >
      우리, 결혼합니다.
      <br />
      {props.groomName} & {props.brideName}
      <br />
      {dateFormat}
      {/* 12월 24일(일) 오후 2시 */}
      <br />
      {props.place}
      {/* 멀티캠퍼스 8층 */}
    </div>
  );
}

function WeddingMoney(props) {
  return (
    <div className="weddingMoney">
      마음 전하실 곳<div className="toBride">신부 측 계좌 정보 보기</div>
      <div className="toGroom">신랑 측 계좌 정보 보기</div>
    </div>
  );
}

function InvitationForm(props) {
  // const [data, setData] = useState(props.data);

  // useEffect(() => {
  //   setData(props);
  // }, []);
  // useEffect(() => {
  //   const dataFetch = async () => {
  //     const data = await api.wedding101.findWeddingInfo(1)
  //     console.log(data.data);
  //     setData(data.data);
  //   }
  //   dataFetch();
  // }, []);

  return (
    <div className="invitation">
      <Title
        groomName={props.weddingInfoData.groomName}
        brideName={props.weddingInfoData.brideName}
        // groomName="김성환"
        // brideName="권영진"
      />
      <BriefInfo
        datetime={props.weddingInfoData.weddingDay}
        place={props.weddingInfoData.weddingHallName}
        //datetime="2023년 2월 17일 오후 2시"
        //place="역삼 멀티캠퍼스 8층"
      />
      <WeddingPhoto
        src={props.invitationData.photoUrl1}
        id="invitationImage0"
      />
      <WeddingMessage
        invitationData={props.invitationData}
        weddingInfoData={props.weddingInfoData}
        // message1={props.invitationData.templateHeader}
        // message2={props.invitationData.templateFooter}
        // message3={props.invitationData.templateEtc}
      />
      {/* <FamilyInfo/> */}
      {/* <WeddingPhoto src={invitation_image_3} /> */}
      <div className="inducingMessage">
        결혼식 참여가 어려우신가요?
        <br />
        축하 영상을 전해보시는 건 어떨까요
      </div>
      <UploadMedia albumSeq={props.albumSeq} />
      <WeddingInfo datetime={props.weddingInfoData.weddingDay} />
      <WeddingPhoto
        src={props.invitationData.photoUrl2}
        id="invitationImage02"
      />
      {/* <WeddingPhoto src={invitation_image_4} /> */}
      {/* <WeddingPhotoCarousel/> */}
      <WeddingSummary
        groomName={props.weddingInfoData.groomName}
        brideName={props.weddingInfoData.brideName}
        datetime={props.weddingInfoData.weddingDay}
        place={props.weddingInfoData.weddingHallName}
      />
      {/* <WeddingMoney
        groomName={props.weddingInfoData.groomName}
        brideName={props.weddingInfoData.brideName}
        datetime={props.weddingInfoData.weddingDay}
        place={props.weddingInfoData.weddingHallName}
      /> */}
    </div>
  );
}

export default InvitationForm;

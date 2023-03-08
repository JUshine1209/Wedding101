import './AlbumCover.css';

import axios from 'axios';
import { useEffect, useState } from 'react';
import useUploadMedia from '../../modules/useUploadMedia';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useNavigate } from 'react-router';
import { Button, IconButton, Tooltip, Badge, List } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import MergedItem from '../../components/album/MergedItem';
import cutearrow from '../../assets/img/cutearrow.png';

const BASEURL = 'https://wedding101.shop/api';

function AlbumCover() {
  const [albumForm, setAlbumForm] = useState({
    albumSeq: '',
    infoSeq: '',
    userSeq: null,
    albumName: '',
    albumColor: '',
    albumPhotoUrl: '',
    albumAccessId: '',
    albumThanksUrl: '',
    albumMediaCnt: '',
    isValid: '',
    createdAt: '',
    updatedAt: '',
  });

  const accessToken = sessionStorage.getItem('accessToken');

  const [showUpdate, setShowUpdate] = useState(false);
  const [merriageDate, setMerriageDate] = useState();
  const [unifyCheck, setUnifyCheck] = useState(false); // 통합본 신청여부
  const [userAlbumSeq, setAlbumSeq] = useState();
  const [userSeq, setUserSeq] = useState();
  const [mergedMedia, setMergedMedia] = useState('');
  const albumCoverUrl = `${BASEURL}/file/uploadAlbumCover`;
  const { fileMedia, filePreview, fileImageHandler, deleteFileImage, onFileUpload } =
    useUploadMedia(albumCoverUrl, accessToken);

  // 앨범생성일 연산 yyyy-mm-dd
  const dateformat = new Date(albumForm.createdAt);
  const year = dateformat.getFullYear();
  const month = dateformat.getMonth() + 1;
  const date = dateformat.getDate();

  const albumCreated = `${year}년 ${month >= 10 ? month : month}월 ${date >= 10 ? date : date}일`;

  async function getUserSeq() {
    await axios
      .get(`${BASEURL}/user`, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      })
      .then((res) => {
        setUserSeq(res.data.data.userSeq);
        albumForm.userSeq = userSeq;
      });
  }

  // 앨범정보 가져오기
  async function getAlbum() {
    if (accessToken === null) {
      alert('로그인 후 서비스 신청을 이용해주세요');
      goMainPage();
    } else {
      await axios
        .get(`${BASEURL}/album?userSeq=${userSeq}`, {
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
        })
        .then((res) => {
          setAlbumForm(res.data.data);
          console.log(res.data.data);
          console.log('setMedia 성공');
        })
        .catch((err) => {
          if (err.response.status === 417) {
            alert('서비스 신청을 이용해주세요');
            goServicePage();
          } else {
            console.log(err.message);
          }
        });
    }
  }

  async function getMerriageDate() {
    if (userSeq === null) {
    } else {
      await axios({
        method: 'GET',
        url: `${BASEURL}/Info?userSeq=${userSeq}`,
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      })
        .then((response) => {
          const date = new Date(response.data.data.weddingDay - 9 * 60 * 60 * 1000);
          let dateFormat =
            date.getFullYear() + '년 ' + (date.getMonth() + 1) + '월 ' + date.getDate() + '일';
          // date.getHours() +
          // '시 ' +
          // date.getMinutes() +
          // '분';

          setMerriageDate(dateFormat);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  const showUpdateHandler = () => {
    setShowUpdate(!showUpdate);
  };

  // Navigate page
  const navigate = useNavigate();
  const onAlbumListHandler = () => {
    navigate('/album/list');
  };
  const onClickHandler = () => {
    navigate('/review');
  };
  const goMainPage = () => {
    navigate('/');
  };
  const goServicePage = () => {
    navigate('/user/service01');
  };

  // 통합본 가져오기
  const unifiedMedia = async () => {
    await axios
      .get(`${BASEURL}/unifiedVideo/all/${albumForm.albumSeq}`, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      })
      .then((res) => {
        console.log('setMedia 성공');
        console.log(res.data.data);
        // setMergedMedia([...mergedMedia, res.data.data]);
        setMergedMedia(res.data.data);
      })
      .catch((err) => {
        console.log('통합본가져오기실패');
      });
    console.log('mergedmedia', mergedMedia);
  };

  useEffect(() => {
    getUserSeq();
    getAlbum();
    getMerriageDate();
  }, [userSeq]);

  console.log(merriageDate);

  return (
    <div className='album-cover'>
      <Grid2 container spacing={3}>
        <Grid2 lg={3} sm={2}>
          <h1 className='nav-text'>Album Cover page</h1>
          <div hidden className='update-button'>
            <Button onClick={showUpdateHandler}>앨범 수정하기</Button>
          </div>
          <br />
          <br />
          <Tooltip title='눌러서 목록확인'>
            <div className='unify-button' onClick={unifiedMedia}>
              통합본 목록확인
            </div>
          </Tooltip>
          <div className='merged-list'>
            <List aria-label='merged-list'>
              {mergedMedia.length > 0
                ? mergedMedia.map((item) => <MergedItem mergedMedia={item} key={item.unifiedSeq} />)
                : null}
            </List>
          </div>
        </Grid2>
        <Grid2 lg={6} sm={6}>
          <div className='cover-album'>
            <div className='cover-album-inner'>
              <div className='cover-front' style={{ color: albumForm.albumColor }}>
                <div className='album-img'>
                  <div className='media-area'>
                    {albumForm.albumPhotoUrl && albumForm.albumPhotoUrl !== null ? (
                      <img src={albumForm.albumPhotoUrl} alt='preview' />
                    ) : (
                      <div className='media-area'>
                        {filePreview && <img src={filePreview} alt='preview' />}
                      </div>
                    )}
                  </div>
                </div>

                <div className='cover-id'>
                  <Badge badgeContent={albumForm.albumMediaCnt} color='secondary'>
                    {albumForm.albumName} &nbsp;
                  </Badge>
                </div>
              </div>
              <div className='cover-back' onClick={onAlbumListHandler}>
                <h1 className='open-album'>앨범 펼치기</h1>
                <img src={cutearrow} alt='arrow'></img>
              </div>
            </div>
          </div>
          {showUpdate ? (
            <div className='upload-media'>
              <IconButton aria-label='upload picture' component='label'>
                <input hidden type='file' accept='image/*, video/*' onChange={fileImageHandler} />
                <UploadIcon fontSize='large' />
              </IconButton>
              <Button color='success' onClick={deleteFileImage}>
                지우기
              </Button>
              <Button color='success' onClick={onFileUpload}>
                적용
              </Button>
            </div>
          ) : null}
        </Grid2>
        <Grid2 lg={3} sm={4}>
          <Grid2 lg={8}>
            <div className='days'>
              <h3>나의 결혼식 날짜</h3>
              <p>&nbsp;&nbsp;{merriageDate}</p>
              <h3>앨범 생성일</h3>
              <p>&nbsp;&nbsp;{albumCreated}</p>
            </div>
          </Grid2>
          <Grid2 lg={8}>
            <div className='move-review'>
              <Tooltip title='리뷰로 이동'>
                <h3 onClick={onClickHandler}>서비스 리뷰하기</h3>
              </Tooltip>
            </div>
          </Grid2>
        </Grid2>
      </Grid2>
    </div>
  );
}

export default AlbumCover;

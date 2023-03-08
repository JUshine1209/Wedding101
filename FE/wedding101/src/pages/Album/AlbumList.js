import './AlbumList.css';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import MediaItem from '../../components/album/MediaItem';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Button,
  Pagination,
  FormControlLabel,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Backdrop,
  Tooltip,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import usePagination from '../../utils/Pagination';
import FadeLoader from 'react-spinners/FadeLoader';
import axios from 'axios';

const AlbumList = () => {
  const [userSeq, setUserSeq] = useState('');
  const [albumSeq, setAlbumSeq] = useState('');
  const accessToken = sessionStorage.getItem('accessToken');

  const [page, setPage] = useState(1);
  const [media, setMedia] = useState([]);
  const [mergeVideo, setMergeVideo] = useState([]);
  const [mergePhoto, setMergePhoto] = useState([]);
  const [likeToggle, setLikeToggle] = useState(false); // 북마크 토글상태관리
  const [open, setOpen] = useState(false); // dialog open 관리
  const [loading, setLoading] = useState(false); // backdrop open 관리

  const baseurl = 'https://wedding101.shop/api/';
  // title dialog open
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // accessToken으로 userSeq 받아오기
  async function getUserSeq() {
    await axios
      .get(baseurl + 'user', {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      })
      .then((res) => {
        console.log(res.data.data.userSeq);
        setUserSeq(res.data.data.userSeq);
      });
  }

  // 앨범정보 가져오기
  async function getAlbum() {
    await axios
      .get(baseurl + `album?userSeq=${userSeq}`, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      })
      .then((res) => {
        setAlbumSeq(res.data.data);
        console.log(res.data.data);
        console.log('setAlbumSeq 성공');
      })
      .catch((err) => {
        console.log('실패');
      });
  }

  useEffect(() => {
    getUserSeq();
    getAlbum();
    if (likeToggle === true) {
      wishFilterHandler();
    } else {
      getAllMedia();
    }
  }, [userSeq, likeToggle, media.wish]);

  // axios 통신으로 DB 데이터 가져오기 구현
  async function getAllMedia() {
    console.log('hey', userSeq);
    await axios
      .get(baseurl + `media/all/${userSeq}`, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      })
      .then((res) => {
        setMedia(res.data.data);
        console.log('setMedia 성공');
        console.log(media);
      })
      .catch((err) => {
        console.log('실패');
      });
  }
  const merged = [...media].filter((item) => item.wish === true);

  // 북마크 목록불러오기
  const wishFilterHandler = () => {
    setMedia(merged);
  };

  const onLikeToggleHandler = () => {
    setLikeToggle(!likeToggle);
  };

  // sorting
  const [order, setOrder] = useState('createdAt');

  const orderHandler = (e) => {
    const orderBy = e.target.value;
    setOrder(orderBy);
    console.log('orderBy: ', orderBy);

    const options = {
      mediaName: [...media].sort((a, b) =>
        a.mediaName < b.mediaName ? -1 : a.mediaName > b.mediaName ? 1 : 0
      ),
      createdAt: [...media].sort((a, b) =>
        b.mediaSeq < a.mediaSeq ? -1 : b.mediaSeq > a.mediaSeq ? 1 : 0
      ),
      createdAtRev: [...media].sort((a, b) =>
        a.mediaSeq < b.mediaSeq ? -1 : a.mediaSeq > b.mediaSeq ? 1 : 0
      ),
    };
    setMedia(options[orderBy]);
  };

  // Album Deleted로 이동
  const navigate = useNavigate();
  const onMoveToDeletedHandler = () => {
    navigate('/album/deleted');
  };

  // pagination
  const PER_PAGE = 6;
  const count = Math.ceil(media.length / PER_PAGE);
  const mediaData = usePagination(media, PER_PAGE);

  const pageHandler = (e, p) => {
    setPage(p);
    mediaData.jump(p);
  };

  const Loading=()=>{
    return(
      <div className='loading-wrap'>
        <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <FadeLoader
          color="#C63DEE"
          height={15}
          width={5}
          radius={2}
          margin={2}
        />
      </div>
      </div>
    )
  }
  // 통합본 제목 받을 dialog창
  const SetTextAlert = () => {
    const [unifiedName, setUnifiedName] = useState(''); // 통합본 제목 입력받기

    const unifiedNameHandler = (e) => {
      setUnifiedName(e.target.value);
      console.log(unifiedName);
    };

    // 통합본 merge&split
    const mergeSplit = () => {
      setMergeVideo([]); //비우기
      setMergePhoto([]);
      console.log(merged);
      for (const value of Object.values(merged)) {
        console.log(value.storageUrl);
        console.log(value.video);
        value.video === true
          ? setMergeVideo((mergeVideo) => [...mergeVideo, value.storageUrl])
          : setMergePhoto((mergePhoto) => [...mergePhoto, value.storageUrl]);
      }
    };
  
    // 통합본신청
    const sendRequestHandler = async () => {
      handleClose();
      setLoading(true);
      await mergeSplit();
      console.log('video', mergeVideo);
      console.log('photo', mergePhoto);
      await axios({
        method: 'POST',
        url: baseurl + `file/mergeVideo`,
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
        data: {
          videoList: mergeVideo,
          imageList: mergePhoto,
        },
      })
      .then(async (res) => {
          console.log(res.data);
          console.log('uni', unifiedName);
          console.log('albumSeq', albumSeq.albumSeq);
          const url = res.data;
          await axios({
            method: 'POST',
            url: baseurl + `unifiedVideo`,
            headers: {
              Authorization: 'Bearer ' + accessToken,
            },
            data: {
              albumSeq: albumSeq.albumSeq,
              unifiedSeq: null,
              unifiedUrl: url,
              unifiedName: unifiedName,
              requestStatus: '2',
              createdAt: null,
              updatedAt: null,
            },
          })
            .then((res) => {
              console.log('out', res.data);
              setLoading(false)
              alert('신청이 완료되었습니다.');
            })
            .catch((err) => {
              console.log('unified 실패');
              setLoading(false)
            });
        })
        .then((res) => {
          alert('앨범표지에서 신청본을 확인해보세요');
        })
        .catch((err) => {
          console.log('merge실패!');
          setLoading(false)
        })
    };

    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>통합본을 신청하시겠습니까?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            신청할 통합본 제목을 입력하세요. <br />
            북마크 앨범이 하나의 미디어로 제공됩니다.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='통합본 제목'
            type='text'
            fullWidth
            variant='standard'
            value={unifiedName}
            onChange={unifiedNameHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={sendRequestHandler}>신청하기</Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <div className='album-list'>
      <Grid2 container spacing={3}>
        <Grid2 lg={3} sm={3}>
          <h1 className='nav-text'>Album List</h1>
          <br />
          <FormControl fullWidth>
            <InputLabel id='sort-label'>정렬조건</InputLabel>
            <Select
              labelId='sort-label'
              id='sort-select'
              value={order}
              label='Sort'
              onChange={orderHandler}
            >
              <MenuItem value={'createdAt'}>최근순</MenuItem>
              <MenuItem value={'createdAtRev'}>오래된순</MenuItem>
              <MenuItem value={'mediaName'}>이름</MenuItem>
            </Select>
          </FormControl>
          <br />
          <br />
          <div className='list-navbar'>
            <div className='filter-icons'>
              <div className='reset-icon'>
                <FormControlLabel
                  control={<Switch value={likeToggle} onChange={onLikeToggleHandler} />}
                  label='⭐ 좋아요보기'
                />
              </div>

              <div className='bin-icon'>
                <DeleteIcon onClick={onMoveToDeletedHandler} />
              </div>
            </div>
            <br />
            <br />
            <div className='send-request'>
              <Tooltip title='선택된 미디어를 하나로 모아줍니다.'>
                <div onClick={handleClickOpen}>통합본 신청하기</div>
              </Tooltip>
            </div>
          </div>
        </Grid2>
        <Grid2 lg={9} sm={9} spacing={3}>
          <div className='item-area'>
          <div className='media-items'>
            {media && (
              <div className='media-items'>
                {media.length > 0 ? (
                  mediaData
                  .currentData()
                    .map((item) => (
                      <MediaItem
                        media={item}
                        key={item.mediaSeq}
                        likeToggle={likeToggle}
                        pageHandler={pageHandler}
                        getAllMedia={getAllMedia}
                        wishFilterHandler={wishFilterHandler}
                        accessToken={accessToken}
                        />
                        ))
                        ) : (
                          <div>no media</div>
                          )}
              </div>
            )}
          </div>
          <div className='pagination'>
            <Pagination count={count} page={page} onChange={pageHandler} />
          </div>
      </div>
        </Grid2>
      </Grid2>
      <SetTextAlert />
      {loading && <Loading />}
    </div>
  );
};

export default AlbumList;

import './AlbumList.css';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import MediaItem from '../../components/album/MediaItem';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import usePagination from '../../utils/Pagination';
import axios from 'axios';

const AlbumDeleted = () => {
  const [userSeq, setUserSeq] = useState('');
  const accessToken = sessionStorage.getItem('accessToken');

  const baseurl = "https://wedding101.shop/api/";

  // accessToken으로 userSeq 받아오기
  async function getUserSeq() {
    await axios
      .get(baseurl + "user", {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      })
      .then((res) => {
        console.log(res.data.data.userSeq);
        setUserSeq(res.data.data.userSeq);
      });
  }

    const [page, setPage] = useState(1);
  // axios 통신으로 DB 데이터 가져오기 구현
  const [binMedia, setBinMedia] = useState([]);
  useEffect(() => {
    getUserSeq();
    getDeletedMedia();
  }, [userSeq]);
  
  async function getDeletedMedia() {
    await axios
      .get(baseurl + `media/${userSeq}/bin`,{
        headers: {
          "Authorization" : "Bearer " + accessToken,
        }
      })
      .then((res) => {
        setBinMedia(res.data.data);
        console.log('setMedia 성공');
        console.log(binMedia);
      })
      .catch((err) => {
        console.log('실패');
      });
  }

  // sorting
  const [order, setOrder] = useState('createdAt');

  const orderHandler = (e) => {
    const orderBy = e.target.value;
    setOrder(orderBy);
    console.log('orderBy: ', orderBy);
    const optoins = {
      mediaName: [...binMedia].sort((a, b) => (a.mediaName < b.mediaName ? -1 : 1)),
      createdAt: [...binMedia].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)),
      createdAtRev: [...binMedia].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    };
    setBinMedia(optoins[orderBy]);
  };

  // Album list로 이동
  const navigate = useNavigate();
  const onMoveToListHandler = () => {
    navigate('/album/list');
  };

  // pagination
  const PER_PAGE = 6;
  console.log(binMedia.length)
  const count = Math.ceil(binMedia.length / PER_PAGE);
  const mediaData = usePagination(binMedia, PER_PAGE);


  const pageHandler = (e, p) => {
    setPage(p);
    mediaData.jump(p);
  };

  return (
    <div className='album-deleted'>
      <Grid2 container spacing={3}>
        <Grid2 lg={3} sm={3}>
          <h1>Album Deleted</h1>
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


          <div className='bin-icon'>
            <Button onClick={onMoveToListHandler} >목록으로</Button>
          </div>
        </Grid2>
        <Grid2 lg={9} sm={9} spacing={2}>
          <div className='media-items'>
            {binMedia && (
              <div className='media-items'>
                {binMedia.length > 0 ? (
                  mediaData
                    .currentData()
                    .map((item) => <MediaItem media={item} key={item.mediaSeq} getDeletedMedia={getDeletedMedia}/>)
                ) : (
                  <div>no binMedia</div>
                )}
              </div>
            )}
          </div>
          <div className='pagination'>
            <Pagination count={count} page={page} onChange={pageHandler} />
          </div>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default AlbumDeleted;
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

const AlbumSelected = (props) => {
  const [page, setPage] = useState(1);
  // axios 통신으로 DB 데이터 가져오기 구현
  const [media, setMedia] = useState([]);
  useEffect(() => {
    getAllMedia();
  }, []);

  async function getAllMedia() {
    await axios
      .get(`https://wedding101.shop/api/media/wish/`)
      .then((res) => {
        setMedia(res.data.data);
        console.log('setMedia 성공');
        console.log(media);
        console.log('setMedia ', new Date(media[0].createdAt).getTime());
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

  return (
    <div className='album-list'>
      <Grid2 container spacing={3}>
        <Grid2 lg={3} sm={3}>
          <h1>Album List</h1>
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
          <Button>정렬</Button>
          <br />

          <div className='bin-icon'>
            <DeleteIcon onClick={onMoveToDeletedHandler} />
          </div>
        </Grid2>
        <Grid2 lg={9} sm={9} spacing={2}>
          <div className='media-items'>
            {media && (
              <div className='media-items'>
                {media.length > 0 ? (
                  mediaData
                    .currentData()
                    .map((item) => <MediaItem media={item} key={item.mediaSeq} />)
                ) : (
                  <div>no media</div>
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

export default AlbumSelected;

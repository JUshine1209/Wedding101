import './MediaItem.css';

import { useEffect, useState } from 'react';
import { Box, CardHeader, Modal } from '@mui/material';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import { CameraAlt, Videocam, Star, StarBorder } from '@mui/icons-material';

import axios from 'axios';
import MediaDialog from './MediaDialog';
import { useRef } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'transparent',
  boxShadow: 24,
  p: 0,
  justifyContent: 'center'
};

const MediaItem = ({
  media,
  likeToggle,
  pageHandler,
  getAllMedia,
  wishFilterHandler,
  getDeletedMedia,
  accessToken,
}) => {
  const {
    mediaSeq,
    albumSeq,
    storageUrl,
    urlToImg,
    onBooth,
    mediaName,
    mediaRelation,
    mediaReceiver,
    video,
    wish,
    inBin,
  } = media;
  const [like, setLike] = useState(wish); // 좋아요상태
  const [open, setOpen] = useState(false);
  const [isBin, setIsBin] = useState(inBin);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const menuRef = useRef({});
  const baseurl = 'https://wedding101.shop/api/';
  const deleteConfirm = inBin === false ? '삭제하시겠습니까?' : '복원하시겠습니까?';

  const dialogOpen = (e) => {
    e.preventDefault();
    menuRef.current.handleClickOpen();
  };

  useEffect(() => {
    if (media.inBin === true) {
      getDeletedMedia();
    } else if (likeToggle === true) {
      wishFilterHandler();
    } else {
      getAllMedia();
    }
    media.wish = like;
    media.inBin = isBin;
  }, [like, isBin, media.wish]);

  const toggleLike = async () => {
    await axios.get(baseurl + `media/wish/${mediaSeq}`, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    }); // [POST] 사용자가 좋아요를 누름 -> DB 갱신
    setLike((like) => !like);
    if (likeToggle === true) {
      wishFilterHandler();
    } else {
      getAllMedia();
    }
  };

  return (
    <div className='media-item'>
      <Card sx={{ width: 200, height: 350 }}>
        {/* 사진/비디오여부표시 및 좋아요표시 */}
        <CardHeader
          avatar={video || media.storageUrl.includes('mp4') ? <Videocam /> : <CameraAlt />}
          action={
            <IconButton aria-label='star' onClick={toggleLike}>
              {like ? <Star color='warning' fontSize='small' /> : <StarBorder fontSize='small' />}
            </IconButton>
          }
        ></CardHeader>
        {/* Card 본문 */}
        <CardActionArea
          sx={{ width: 200, height: 200 }}
          onClick={handleOpen}
          onContextMenu={dialogOpen}
        >
          <CardMedia component='img' height='200px' image={urlToImg} alt='img' />
          <CardContent sx={{ width: 200, height: 100 }}>
            <Typography gutterBottom variant='h5' component='div'>
              {mediaName}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {mediaRelation}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <br />
      {/* card 누르면 모달창오픈 */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          {media.video === true || media.storageUrl.includes('mp4') ? (
            <video src={storageUrl} controls autoPlay loop width='100%' />
          ) : (
            <img src={storageUrl} alt={storageUrl} width='600px' height='800px' />
          )}
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            {mediaName}님의 메세지
          </Typography>
        </Box>
      </Modal>
      {/* 우클릭시 삭제확인 */}
      <MediaDialog
        media={media}
        deleteConfirm={deleteConfirm}
        getAllMedia={getAllMedia}
        getDeletedMedia={getDeletedMedia}
        accessToken={accessToken}
        ref={menuRef}
      />
    </div>
  );
};

export default MediaItem;

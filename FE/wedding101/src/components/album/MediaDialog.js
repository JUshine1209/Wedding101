import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { useEffect } from 'react';
import { forwardRef } from 'react';
import { useImperativeHandle } from 'react';

const MediaDialog = forwardRef((props, ref) => {
  // {media, deleteConfirm, getAllMedia, getDeletedMedia, accessToken}
  const [isBin, setIsBin] = useState(props.media.inBin);
  const [open, setOpen] = useState(false);
  const baseurl = 'https://wedding101.shop/api/';

  useEffect(() => {
    console.log('mediaSeq', props.media.mediaSeq);
    console.log('isBin', isBin);
    props.media.inBin = isBin;
  }, [props.media.mediaSeq]);

  useImperativeHandle(ref, () => ({
    handleClickOpen,
  }));
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const binClickHandler = async () => {
    console.log('delete', isBin);
    setIsBin((isBin) => !isBin);
    console.log(props.media.mediaSeq);
    await axios({
      method: 'PUT',
      url: baseurl + `media/delete/${props.media.mediaSeq}`,
      headers: {
        Authorization: 'Bearer ' + props.accessToken,
      },
      data: {
        mediaSeq: props.media.mediaSeq,
      },
    });
    props.getAllMedia();
    setOpen(false);
  };

  const restoreHandler = async () => {
    console.log('restore', isBin);
    setIsBin((isBin) => !isBin);
    console.log(props.media.mediaSeq);
    await axios({
      method: 'PUT',
      url: baseurl + `media/restore/${props.media.mediaSeq}`,
      headers: {
        Authorization: 'Bearer ' + props.accessToken,
      },
      data: {
        mediaSeq: props.media.mediaSeq,
      },
    });
    props.getDeletedMedia();
    setOpen(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        삭제/복구
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{props.deleteConfirm}</DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          {isBin === false ? (
            <Button onClick={binClickHandler} autoFocus>
              삭제
            </Button>
          ) : (
            <Button onClick={restoreHandler} autoFocus>
              복원
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default MediaDialog;

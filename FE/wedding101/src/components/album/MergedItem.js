import { useState } from "react";
import { List, ListItemText, Divider, Modal, Box, Typography, ListItemButton, ListItem } from "@mui/material";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 0,
  };

const MergedItem = ({mergedMedia}) => {
    const [open, setOpen] = useState(false);    // modal open관리
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false)

    return(
        <>
        <List  aria-label='merged-list'>

        <ListItemButton>
              <ListItemText primary={mergedMedia.unifiedName} onClick={handleOpen}/>
        </ListItemButton>
        </List>

        {/* 통합본 제목 클릭시 모달창으로 영상재생 */}
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {console.log(mergedMedia.unifiedName)}
          <video src={mergedMedia.unifiedUrl} controls autoPlay loop width='100%' />
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            {mergedMedia.unifiedName}
          </Typography>
        </Box>
      </Modal>
        </>
    )
};

export default MergedItem;

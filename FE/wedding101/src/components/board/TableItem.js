import './TableItem.css';

import { TableRow, TableCell, Box, Modal, Typography} from '@mui/material';
import { useState } from 'react';

function TableItem({reviewItem}){
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {reviewSeq, albumSeq, reviewTitle, reviewRate, reviewContent, createdAt, updatedAt, isValid} = reviewItem;

    // modal 창 css
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 1000,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 0,
    };
    
    return(
      <>
        <TableRow
          key={reviewSeq}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {reviewSeq}
          </TableCell>
          <TableCell align="right" onClick={handleOpen}>{reviewTitle}</TableCell>
          <TableCell align="right">{reviewRate}</TableCell>
          <TableCell align="right">{updatedAt}</TableCell>
        </TableRow>

    {/* reviewtitle 누르면 모달창오픈 */}
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
          <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {reviewTitle}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {reviewContent}
          </Typography>
          </Box>
      </Modal>
      </>
    );
}

export default TableItem;
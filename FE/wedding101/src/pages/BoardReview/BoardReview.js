import './BoardReview.css';
import '../BoardQuestion/BoardQuestion.css';

import { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import TableItem from '../../components/board/TableItem';
import Paper from '@mui/material/Paper';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useNavigate } from 'react-router';
import testTable from '../../test/testReviews.json';
import { TableContainer, Table, TableHead, TableBody, TableRow, 
         TableCell, Pagination, Box, Modal, Typography, Button} from '@mui/material';
import usePagination from '../../utils/Pagination';
import { func } from 'prop-types';
import { TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const BASEURL = "https://wedding101.shop/api"

function ModalSubTitle(props){
    return (
        <div className="Modal_SubTitle">
            <div className="Modal_SubTitle_writer">작성자: {props.writer}</div>
            <div className="Modal_SubTitle_date">작성일: {props.date}</div>
        </div>
    );
}

function ReviewModal(props){
    return (
        <Modal  open={props.isOpen} 
                onClose={props.doClose} 
                className="Modal">
            <Box className="Modal__content">
                {/* Modal 창 제목 */}
                <Typography component="div" id="Modal__header">{props.title}</Typography>
                
                {/* Modal 창 유저 글 작성 */}
                <Typography  component="div" id="Modal__body">
                    <ModalSubTitle writer={props.writer} date={props.reviewDate}></ModalSubTitle>
                    <div className='Division_Line'></div>
                    <div className='BQ-Division-Line'></div>
                    <div className='BQ-Modal-Text-Align'>{props.content}</div>
                </Typography>
            </Box>
        </Modal>
    );
}

function ReviewTableItem({arg}){
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {reviewSeq, albumSeq, reviewTitle,  reviewContent, userNickname, createdAt, updatedAt, valid} = arg;
    const createdDate = createdAt.split(" ")[0];
    const updatedDate = updatedAt.split(" ")[0];
    const modalData = [open, handleClose, reviewTitle, reviewContent];
    
    return(
      <>
        <TableRow   key={reviewSeq}
             sx={{ '&:last-child td, &:last-child th': { border: 0 }}}>
        <TableCell component="th" scope="row">{reviewSeq}</TableCell>
        <TableCell align="center" onClick={handleOpen}>{reviewTitle}</TableCell>
        <TableCell align="center" >{userNickname}</TableCell>
        <TableCell align="right" >{createdDate}</TableCell>
        </TableRow>
        <ReviewModal
            isOpen={open} 
            doClose={handleClose} 
            title={reviewTitle} 
            content={reviewContent}
            writer={userNickname}
            reviewDate={createdDate}
            ansDate={updatedDate} ////<- ans date 정보가 필요
            className="style"/>
      </>
    );
}

function Navbar_(props) {
    return(
        <div className="navbar">
            <h1>{props.pageTitle}</h1>
        </div>
    );
}

function TableHead_(){
    return (
        <TableHead>
            <TableRow>
                <TableCell>문의 번호</TableCell>
                <TableCell align="center">문의 사항</TableCell>
                <TableCell align="center">작성자</TableCell>
                <TableCell align="right">문의 날짜</TableCell>
            </TableRow>
        </TableHead>
    );
}

function ReviewTable(props){
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 550 }} aria-label="simple table">
            {/* <TableHead_ /> */}
            <TableBody>
                {props.data.currentData().map( 
                    item => (<ReviewTableItem arg={item} key={item.reviewSeq} />)
                )}
            </TableBody>
            </Table>
        </TableContainer>
    );
}

function getCurrentDate(){
    const today = new Date();   
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);

    var dateString = year + '-' + month  + '-' + day;
    return dateString;
}

function ReviewWriteModal(props){
    const currDate = getCurrentDate();
    console.log(currDate);
    console.log("reviewWriteModal", props)

    const reviewCancel = () => {
        let cancelSelect = window.confirm("작성중이던 글을 지웁니다.");
        if (cancelSelect){
            document.getElementsByName('newReviewTitle')[0].value = "";
            document.getElementsByName('newReviewContent')[0].value = "";
            props.doClose();
        }
        else return;
    }

    const reviewSubmit = () => {
        const reviewTitle = document.getElementsByName('newReviewTitle')[0].value;
        const reviewContent = document.getElementsByName('newReviewContent')[0].value;
        console.log(reviewTitle);
        console.log(reviewContent);
        if (!reviewTitle || !reviewContent){
            alert('제목이나 내용이 비어있습니다.');
            return;
        }
        console.log("props.userAlbumSeq", props.userAlbumSeq)

        axios.post(`${BASEURL}/review`,{ 
            albumSeq: props.userAlbumSeq,
            reviewTitle: reviewTitle,
            reviewRate: 9,
            reviewContent: reviewContent
        },{
            headers: {"Authorization": "Bearer " + sessionStorage.getItem("accessToken")}
        }).then(function (response) {
            console.log(response.data.message);
            if(response.status === 200){
                alert(`리뷰가 등록되었습니다.`);
                props.renewPost();
                props.doClose();
                window.scrollTo(0,0);
            }
        }).catch(function (error) {
            console.log(error)
            if(error.response.status === 417) {
                alert('서비스 신청 전송 실패')
                console.log(error.response.data.message);
            }
        });
    }

    return (
        
        <Modal  open={props.isOpen} 
                onClose={props.doClose} 
                className="Modal">
            <Box className="Modal__content">
                {/* Modal 창 제목 */}
                <Typography component="div" 
                            id="Modal__header">리뷰 작성하기</Typography>
                <div className="BQ-Edit-Delete-Buttons"> 
                    <IconButton color="primary" 
                                className="BQ-Edit-Button" 
                                fontSize="large" 
                                onClick={reviewSubmit}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="gray" 
                                className="BQ-Delete-Button" 
                                fontSize="large" 
                                onClick={reviewCancel}>
                        <DeleteIcon />
                    </IconButton>
                </div>
                {/* Modal 창 유저 글 작성 */}
                <Typography  
                    component="div" 
                    id="Modal__body" 
                    sx={{'& .MuiTextField-root': { 
                        display: 'flex', flexDirection: 'row',
                        justifyContent: 'left', marginLeft: '1.5%'},}}>
                    
                    {/* props로 받아온 유저 닉네임 넣기 */}
                    <ModalSubTitle  writer={props.userNickname} 
                                    date={currDate}></ModalSubTitle> 
                
                    {/* 구분선 */}
                    <div className='BQ-Division-Line'></div>
                
                    {/* onChange 콜백용 함수 만들어서 content에 set, modal에 버튼 추가하고 컨텐츠 등록 */}
                    <TextField label="제목 : " 
                        variant="standard" 
                        InputProps={{ disableUnderline: true }}
                        fullWidth
                        fontSize="large"
                        name='newReviewTitle'
                    />
                    <div className="BQ-blank-for-askContent"></div>
                    <TextField  id="filled-multiline-static" 
                        label="내용 : " 
                        fullWidth
                        multiline 
                        variant="standard" 
                        row = {14}
                        InputProps={{ disableUnderline: true }}
                        name='newReviewContent'
                    />
                </Typography>
                
            </Box>
            
        </Modal>
    );
}

function WriteReviewButton(props){

    // review modal
    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [albumSeq, setAlbumSeq] = useState();
    const openReviewModal = () => { setReviewModalOpen(true); };
    const closeReviewModal = () => { setReviewModalOpen(false); };
    const navigate = useNavigate();

    console.log('writeButton props:', props)

    useEffect(()=> {
        getAlbumSeq();
    },[props])

    async function getAlbumSeq() {
        await axios
            .get(`${BASEURL}/album?userSeq=`+String(props.userSeq),{
                headers:{"Authorization": "Bearer " + sessionStorage.getItem('accessToken')}
            })
            .then((res) => {
                console.log('앨범 정보 수신 성공');
                setAlbumSeq(res.data.data.albumSeq);
            })
            .catch((err) => {
                console.log(err);
                console.log('앨범 정보 수신 실패');
            })
    }

    // review Modal
    function loginCheckHandler(){
        const isLogin = sessionStorage.getItem('accessToken')
        if (isLogin === null){
            alert("로그인을 먼저 해주세요");
            navigate("/user/login");
            return;
        }
        if (albumSeq === null){
            alert("서비스 이용 후 리뷰해주세요");
            navigate("/");
            return;
        }
        // Modal 창 띄우기
        openReviewModal(); // 창 열림 설정
    }

    return(
        <>
            <Button className="register_btn"
                color="primary" 
                variant="contained" 
                startIcon="✏️"
                size="small"
                onClick={loginCheckHandler}>리뷰 등록</Button>
            <ReviewWriteModal
                isOpen={reviewModalOpen} 
                doClose={closeReviewModal}
                renewPost={props.renewPost}
                userAlbumSeq={albumSeq}
                userNickname={props.userNickname}
                className="BQ-style"/>
        </>
    );
}

function BoardReview() {
    const [ page, setPage ] = useState(1);
    const [ reviewItem, setReviewItem ] = useState([]);
    const [ userSeq, setUserSeq] = useState('');
    const [ userNickname, setUserNickname] = useState('');

    async function getAllReviews() {
        await axios
        .get(`${BASEURL}/review/all`)
        .then((res) => {
            setReviewItem(res.data.data);
            console.log('리뷰 정보 수신 성공');
        })
        .catch((err) => {
            console.log('리뷰 정보 수신에 실패하였습니다.');
        });
    }

    async function getUserSeq() {
        if (sessionStorage.getItem("accessToken") === null){
            console.log("[BoardReview()] 로그인 해주세요")
        }
        else{
            await axios
            .get(`${BASEURL}/user`,{
                headers:{"Authorization": "Bearer " + sessionStorage.getItem('accessToken')}
            })
            .then((res) => {
                console.log('유저 정보 수신 성공');
                console.log(res.data)
                setUserSeq(res.data.data.userSeq)
                setUserNickname(res.data.data.userNickname)
            })
            .catch((err) => {
                console.log(err);
                console.log('유저 정보 수신 실패');
            })
        }
    }

    useEffect(() => {
        getAllReviews();
        getUserSeq();
    }, []);

    // pagination
    const PER_PAGE = 8;
    const count = Math.ceil(reviewItem.length / PER_PAGE);
    const reviewData = usePagination(reviewItem, PER_PAGE);
    const pageHandler = (e,p) => {
        setPage(p);
        reviewData.jump(p);
    };

    return (
        <div className='BQ-board-ask'>
            <Grid2 container spacing={2}>
                <Grid2 lg={3} sm={3}>
                    <Navbar_ pageTitle="Review 👍"/>
                </Grid2>
                <Grid2 lg={9} sm={10} id='BQ-grid-align'>
                    <div className='review-items'>
                        <ReviewTable data={reviewData}/>
                    </div>
                    <div className='BQ-button-style'>
                        <WriteReviewButton userSeq={userSeq} 
                                           userNickname={userNickname}
                                           renewPost={getAllReviews}/>
                    </div>
                    <div className='BQ-pagination'>
                        <Pagination count={count} page={page} onChange={pageHandler}/>
                    </div>
                </Grid2>
            </Grid2>
        </div>
    );
}
export default BoardReview;
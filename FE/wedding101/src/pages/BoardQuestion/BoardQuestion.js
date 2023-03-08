import './BoardQuestion.css';
import './BoardQuestionModal.css';
import React, { useState, useEffect } from 'react';
import usePagination from '../../utils/Pagination';
import sampleTable from '../../test/testContact.json';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { TableContainer, Table, TableHead, TableBody, TableRow, 
         TableCell, Pagination, Box, Modal, Typography, Button} from '@mui/material';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import EditIcon from '@mui/icons-material/Edit';

const BASEURL = "https://wedding101.shop/api"

function ModalSubTitle_(props){
    return (
        <div className="Modal_SubTitle">
            <div className="Modal_SubTitle_writer">작성자: {props.writer}</div>
            <div className="Modal_SubTitle_date">작성일: {props.date}</div>
        </div>
    );
}

function AskModal_(props){
    return (
        <Modal  open={props.isOpen} 
                onClose={props.doClose} 
                className="Modal">
            <Box className="Modal__content">
                {/* Modal 창 제목 */}
                <Typography component="div" id="Modal__header">{props.title}</Typography>

                {/* Modal 창 유저 글 작성 */}
                <Typography  component="div" id="Modal__body">
                    <ModalSubTitle_ writer={props.writer} date={props.askDate}></ModalSubTitle_>
                    {/* 구분선 */}
                    <div className='BQ-Division-Line'></div>
                    <div className='BQ-Modal-Text-Align'>{props.content}</div>
                </Typography>

                {/* Modal 창 관리자 글 작성 */}
                {/* <Typography  component="div" id="Modal__body">
                    <ModalSubTitle_ writer="관리자" date={props.ansDate}></ModalSubTitle_>
                    <div className='Division_Line'></div>
                    잘지냈지 넌 잘 지냈어?
                </Typography> */}
            </Box>
        </Modal>
    );
}

function AskTableItem_({arg}){
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {createdAt,questionContent, questionSeq, questionTitle, updatedAt, userId, userNickname, userSeq} = arg;
    const createdDate = createdAt.split(" ")[0];
    const updatedDate = updatedAt.split(" ")[0];
    
    return(
      <>
        <TableRow   key={questionSeq}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">{questionSeq}</TableCell>
            <TableCell align="center" onClick={handleOpen}>{questionTitle}</TableCell>
            <TableCell align="center" >{userNickname}</TableCell>
            <TableCell align="right" >{createdDate}</TableCell>
        </TableRow>

        <AskModal_  isOpen={open} 
                    doClose={handleClose} 
                    title={questionTitle} 
                    content={questionContent}
                    writer={userNickname}
                    askDate={createdDate}
                    ansDate={updatedDate} ////<- ans date 정보가 필요
                    className="BQ-style"/>
      </>
    );
}

function Navbar_(props) {
    return(
        <div className="BQ-navbar">
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

function AskTable_(props){
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 550 }} aria-label="simple table">
            {/* <TableHead_ /> */}
            <TableBody>
                {props.data.currentData().map( 
                    item => (<AskTableItem_ arg={item} key={item.questionSeq}/>)
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

function AskWriteModal_(props){
    // write data -> userId + currDate
    const currDate = getCurrentDate();

    let variables = [{
        userSeq: 0,
        questionSeq: 0,
        questionTitle: "string",
        questionContent: "string",
        userNickname: "string",
      }]

    const doEdit = () => {
        const askTitle = document.getElementById('askTitle').value;
        const askContent = document.getElementById('filled-multiline-static').value;

        variables['userSeq'] = props.userSeq;
        variables['questionTitle'] = askTitle;
        variables['questionContent'] = askContent;
        variables['userNickname'] = props.writer;

        if (!askTitle || !askContent){
            alert('제목이나 내용이 비어있습니다');
            return;
        }
        console.log(variables.userNickname);
        askDataUpload();
        alert("해당 게시글이 등록 되었습니다");
        props.refresh();
        props.doClose();
    };
    
    const doCancel = () => {
        alert("게시글 작성이 취소 되었습니다");
        document.getElementById('askTitle').value = "";
        document.getElementById('filled-multiline-static').value  = "";
        props.doClose();
    };
    

    // 문의 사항 업로드 구현
    const askDataUpload = async () => {
        await axios({
            method: "POST",
            url: `${BASEURL}/qna`,  // 파일 업로드 요청 URL
            headers : {
                "Authorization" : "Bearer " + sessionStorage.getItem("accessToken")
            },
            data: {
                userSeq: variables.userSeq,
                userNickname: variables.userNickname,
                questionSeq: variables.questionSeq,
                questionTitle: variables.questionTitle,
                questionContent: variables.questionContent
            }
        }).then((res) => {
            console.log(res.data.messsage);
        }).catch(err => {
            alert('등록을 실패하였습니다.');
        });
    }

    return (
            <Modal  open={props.isOpen} className="Modal">
                <Box className="Modal__content">
                    {/* Modal 창 제목 */}
                    <Typography component="div" id="Modal__header__2">문의 작성하기</Typography>

                    {/* Edit + Delete  */}
                    <div className="BQ-Edit-Cancel-Buttons"> 
                        <IconButton onClick={doEdit} color="primary" className="BQ-Edit-Button" fontSize="large">
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={doCancel} color="secondary" className="BQ-Cancel-Button" fontSize="large" >
                            <CloseRoundedIcon />
                        </IconButton>
                    </div>
                    
                    {/* Modal 창 유저 글 작성 */}
                    <Typography  
                        component="div" 
                        id="Modal__body__2" 
                        sx={{'& .MuiTextField-root': { 
                                display: 'flex', flexDirection: 'row',
                                justifyContent: 'left', marginLeft: '1.5%'},}}>
                        
                    {/* props로 받아온 유저 닉네임 넣기 */}
                    <ModalSubTitle_ writer={props.writer} date={currDate}></ModalSubTitle_> 
                    
                    {/* 구분선 */}
                    <div className='BQ-Division-Line'></div>
                    
                    {/* onChange 콜백용 함수 만들어서 content에 set, modal에 버튼 추가하고 컨텐츠 등록 */}
                    <TextField  id = "askTitle" 
                                label="제목 : " 
                                InputProps={{ disableUnderline: true }}
                                fullWidth
                                variant="standard" 
                                fontSize="large"
                    />
                    <div className="BQ-blank-for-askContent"></div>

                    <TextField  id="filled-multiline-static" 
                                label="내용 : " 
                                InputProps={{ disableUnderline: true }}
                                fullWidth
                                variant="standard" 
                                multiline 
                                row = {14}
                    />
                    </Typography>
                </Box>
            </Modal>
    );
}



function AskButton_(props){
    // ask modal
    const [askModalOpen, setAskModalOpen] = useState(false);
    const openAskModal = () => { setAskModalOpen(true); };
    const closeAskModal = () => { setAskModalOpen(false); };

    // ask Modal
    function loginCheckHandler(){
        if (sessionStorage.getItem('accessToken') === null){
            alert("로그인을 먼저 해주세요");
        }
        else{
            // Modal 창 띄우기
            openAskModal();
        }
    }
    return(
        <>
            <Button className="BQ-register_btn"
                    color="primary" 
                    variant="contained" 
                    startIcon="✏️"
                    size="small"
                    onClick={loginCheckHandler}>문의 등록</Button>

            <AskWriteModal_ 
                isOpen={askModalOpen} 
                doClose={closeAskModal} 
                refresh={props.refresh}
                writer={props.userNickname}
                userSeq={props.userSeq}
                className="BQ-style"/>
        </>
    );
}

function BoardQuestion() {
    const [ page, setPage ] = useState(1);
    const [userNickname, setUserNickname] = useState('');
    const [userSeq, setUserSeq] = useState('');
    const [ askItem, setAskItem ] = useState([]);

    async function AskListDownload_(){
        await axios({
            method: "GET",
            url: `${BASEURL}/qna/all`,
            headers : {
                "Authorization" : "Bearer " + sessionStorage.getItem("accessToken")
            }
        }).then(function (response) {
            console.log(response.data.data)
            setAskItem(response.data.data)
        }).catch(function (error) {
            console.log(error);
        })
    }
    
    async function LoginCheckGetNickname_(){
        await axios({ 
            method: "GET",
            url: `${BASEURL}/user`,
            headers : {
                "Authorization" : "Bearer " + sessionStorage.getItem("accessToken")
            }
        }).then(function (response) {
            setUserNickname(response.data.data.userNickname)
            setUserSeq(response.data.data.userSeq)
        }).catch(function (error) {
            console.log(error);
        })
    }

    // axios 통신으로 askItem 가져오기
    useEffect(() => {
        AskListDownload_();
        LoginCheckGetNickname_();
      }, []);

    // pagination
    const PER_PAGE = 8;
    const count = Math.ceil(askItem.length / PER_PAGE);
    const askData = usePagination(askItem, PER_PAGE);
    const pageHandler = (e,p) => {
        setPage(p);
        askData.jump(p);
    };
    return (
        <div className='BQ-board-ask'>
            <Grid2 container spacing={2}>
                <Grid2 lg={3} sm={3}>
                    <Navbar_ pageTitle="Contact ✍🏻"/>
                </Grid2>
                <Grid2 lg={9} sm={10} id="BQ-grid-align">
                    <div className='review-items'>
                        <AskTable_ data={askData}/>
                    </div>
                    <div className='BQ-button-style'>
                        <AskButton_ refresh={AskListDownload_}
                                    userNickname={userNickname}
                                    userSeq={userSeq}/>
                    </div>
                    <div className='BQ-pagination'>
                        <Pagination count={count} page={page} onChange={pageHandler}/>
                    </div>
                </Grid2>
            </Grid2>
        </div>
    );
}
export default BoardQuestion;
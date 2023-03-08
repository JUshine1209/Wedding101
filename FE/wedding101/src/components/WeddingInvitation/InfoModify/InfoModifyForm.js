import './InfoModifyForm.css';
import {Modal, Box, Typography, TextField, Button} from '@mui/material';
import {useState} from 'react';
import axios from 'axios';

const BASEURL =  "https://wedding101.shop/api";
function UserModifyForm(props) {
    const [weddingDay, setWeddingDay] = useState(props.data.weddingDay)
    const [weddingHallName, setWeddingHallName] = useState(props.data.weddingHallName)
    const [weddingHallAddress, setWeddingHallAddress] = useState(props.data.weddingHallAddress)
    const [weddingHallNumber, setWeddingHallNumber] = useState(props.data.weddingHallNumber)
    const [groomPhoneNumber, setGroomPhoneNumber] = useState(props.data.groomPhoneNumber)
    const [bridePhoneNumber, setBridePhoneNumber] = useState(props.data.bridePhoneNumber)
    const [groomAccountNumber, setGroomAccountNumber] = useState(props.data.groomAccountNumber)       
    const [groomAccountBank, setGroomAccountBank] = useState(props.data.groomAccountBank)
    const [groomAccountName, setGroomAccountName] = useState(props.data.groomAccountName)
    const [brideAccountNumber, setBrideAccountNumber] = useState(props.data.brideAccountNumber)       
    const [brideAccountBank, setBrideAccountBank] = useState(props.data.brideAccountBank)
    const [brideAccountName, setBrideAccountName] = useState(props.data.brideAccountName)
    const [groomRelation, setGroomRelation] = useState(props.data.groomRelation)
    const [groomFatherName, setGroomFatherName] = useState(props.data.groomFatherName)
    const [groomMotherName, setGroomMotherName] = useState(props.data.groomMotherName)
    const [brideRelation, setBrideRelation] = useState(props.data.brideRelation)
    const [brideFatherName, setBrideFatherName] = useState(props.data.brideFatherName)
    const [brideMotherName, setBrideMotherName] = useState(props.data.brideMotherName)

    const changeWeddingDay=(e)=> {
        setWeddingDay(e.target.value)
    }
    const changeWeddingHallName=(e)=> {
        setWeddingHallName(e.target.value)
    }
    const changeWeddingHallAddress=(e)=> {
        setWeddingHallAddress(e.target.value)
    }
    const changeWeddingHallNumber=(e)=> {
        setWeddingHallNumber(e.target.value)
    }  
    const changeGroomPhoneNumber=(e)=> {
        setGroomPhoneNumber(e.target.value)
    }   
    const changeBridePhoneNumber=(e)=> {
        setBridePhoneNumber(e.target.value)
    }
    const changeGroomAccountNumber=(e)=> {
        setGroomAccountNumber(e.target.value)
    }
    const changeGroomAccountBank=(e)=> {
        setGroomAccountBank(e.target.value)
    }
    const changeGroomAccountName=(e)=> {
        setGroomAccountName(e.target.value)
    }
    const changeBrideAccountNumber=(e)=> {
        setBrideAccountNumber(e.target.value)
    }
    const changeBrideAccountBank=(e)=> {
        setBrideAccountBank(e.target.value)
    }
    const changeBrideAccountName=(e)=> {
        setBrideAccountName(e.target.value)
    }
    const changeGroomRelation=(e)=> {
        setGroomRelation(e.target.value)
    }  
    const changeGroomFatherName=(e)=> {
        setGroomFatherName(e.target.value)
    }   
    const changeGroomMotherName=(e)=> {
        setGroomMotherName(e.target.value)
    }
    const changeBrideRelation=(e)=> {
        setBrideRelation(e.target.value)
    }  
    const changeBrideFatherName=(e)=> {
        setBrideFatherName(e.target.value)
    }   
    const changeBrideMotherName=(e)=> {
        setBrideMotherName(e.target.value)
    }        

    function changeDate(weddingdate){
        const date = new Date(weddingdate - 9 * 60 * 60 * 1000);
        let dateFormat =
            date.getFullYear() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getDate() +
            " " +
            date.getHours() +
            ":" +
            date.getMinutes() +
            ":" +
            date.getSeconds();
        return dateFormat
    }

    const ModifyInfo = async () => {
        await axios ({
            method: "PUT",
            url: `${BASEURL}/Info`,
            headers : {
                "Authorization" : "Bearer " + sessionStorage.getItem("accessToken")
            },
            data: {
                infoSeq: props.data.infoSeq,
                weddingDay: weddingDay,
                weddingHallName: weddingHallName,
                weddingHallAddress: weddingHallAddress,
                weddingHallNumber: weddingHallNumber,
                groomName: props.data.groomName,
                brideName: props.data.brideName,
                groomPhoneNumber: groomPhoneNumber,
                bridePhoneNumber: bridePhoneNumber,
                groomAccountNumber: groomAccountNumber,
                groomAccountBank: groomAccountBank,
                groomAccountName: groomAccountName,
                brideAccountNumber: brideAccountNumber,
                brideAccountBank: brideAccountBank,
                brideAccountName: brideAccountName,
                groomFatherName: groomFatherName,
                groomMotherName: groomMotherName,
                groomRelation: groomRelation,
                brideFatherName: brideFatherName,
                brideMotherName: brideMotherName,
                brideRelation: brideRelation,
                groomFatherIsAlive: props.data.groomFatherIsAlive,
                groomMotherIsAlive: props.data.groomMotherIsAlive,
                brideFatherIsAlive: props.data.brideFatherIsAlive,
                brideMotherIsAlive: props.data.brideMotherIsAlive
            }
        }).then((res) => {
            console.log(res.data.message)
        }).catch(err => {
            console.log(err)
            alert('수정을 실패하였습니다.')
        })
        props.doClose();
    }

    return(
        <Modal  open={props.isOpen}
                onClose={props.doClose}
                className="Modal">
            <Box className="Modal__content">
                {/* Modal 창 제목 */}
                <Typography component="div" id="Modal__header">결혼 정보 수정</Typography>
                <Typography  component="div" id="Modal__body">
                    <h2>{props.data.groomName} & {props.data.brideName}님의 결혼 정보</h2>
                    <div className='IM-Division-Line'></div>
                    <div className='scrollable-form'>
                        <div className='info-item'>
                        <div>결혼 날짜 : </div>
                        <TextField  value={changeDate(weddingDay)} 
                                    onChange={changeWeddingDay}></TextField>
                        </div>
                        <div className='info-item'>
                        <div>웨딩홀 이름 : </div>
                        <TextField  value={weddingHallName} 
                                    onChange={changeWeddingHallName}></TextField>
                        </div>
                        <div className='info-item'>
                        <div>웨딩홀 주소 : </div>
                        <TextField  value={weddingHallAddress} 
                                    onChange={changeWeddingHallAddress}></TextField>
                        </div>
                        <div className='info-item'>
                        <div>웨딩홀 전화번호 : </div>
                        <TextField  value={weddingHallNumber} 
                                    onChange={changeWeddingHallNumber}></TextField>
                        </div>
                        <div className='IM-Division-Line'></div>
                        <div className='info-item'>
                        <div>신랑 전화번호 : </div>
                        <TextField  value={groomPhoneNumber} 
                                    onChange={changeGroomPhoneNumber}></TextField>
                        </div>
                        <div className='info-item'>
                        <div>신부 전화번호 : </div>
                        <TextField  value={bridePhoneNumber} 
                                    onChange={changeBridePhoneNumber}></TextField>
                        </div>
                        <div className='info-item'>
                        <div>신랑측 계좌번호 : </div>
                        <TextField  value={groomAccountNumber} 
                                    onChange={changeGroomAccountNumber}></TextField>
                        </div>
                        <div className='info-item'>
                        <div>신랑측 계좌은행 : </div>
                        <TextField  value={groomAccountBank} 
                                    onChange={changeGroomAccountBank}></TextField>
                        </div>
                        <div className='info-item'>
                        <div>신랑측 예금주 : </div>
                        <TextField  value={groomAccountName} 
                                    onChange={changeGroomAccountName}></TextField>
                        </div>
                        <div className='info-item'>
                        <div>신부측 계좌번호 : </div>
                        <TextField  value={brideAccountNumber} 
                                    onChange={changeBrideAccountNumber}></TextField>
                        </div>
                        <div className='info-item'>
                        <div>신부측 계좌은행 : </div>
                        <TextField  value={brideAccountBank} 
                                    onChange={changeBrideAccountBank}></TextField>
                        </div>
                        <div className='info-item'>
                        <div>신부측 예금주 : </div>
                        <TextField  value={brideAccountName} 
                                    onChange={changeBrideAccountName}></TextField>
                        </div>
                        <div className='IM-Division-Line'></div>
                        {props.data.groomFatherIsAlive ?
                            <div className='info-item'> 
                            <div>신랑 아버지 : </div>
                            <TextField  value={groomFatherName} 
                                        onChange={changeGroomFatherName}></TextField></div> : null}
                        {props.data.groomMotherIsAlive ?
                            <div className='info-item'> 
                            <div>신랑 어머니 : </div>
                            <TextField  value={groomMotherName} 
                                        onChange={changeGroomMotherName}></TextField></div> : null}
                        <div className='info-item'>
                        <div>신랑 출생순위 : </div>
                        <TextField  value={groomRelation} 
                                    onChange={changeGroomRelation}></TextField>
                        </div>
                        {props.data.brideFatherIsAlive ?
                            <div className='info-item'> 
                            <div>신부 아버지 : </div>
                            <TextField  value={brideFatherName} 
                                        onChange={changeBrideFatherName}></TextField></div> : null}
                        {props.data.brideMotherIsAlive ?
                            <div className='info-item'> 
                            <div>신부 어머니 : </div>
                            <TextField  value={brideMotherName} 
                                        onChange={changeBrideMotherName}></TextField></div> : null}
                        <div className='info-item'>
                        <div>신부 출생순위 : </div>
                        <TextField  value={brideRelation} 
                                    onChange={changeBrideRelation}></TextField>
                        </div>           
                        
                    </div>
                </Typography>
                <Button sx={{mt:1}}
                        className = "user-modify-btn"
                        color = 'primary'
                        startIcon="✏️"
                        variant='contained'
                        size='medium'
                        onClick={ModifyInfo}>수정 완료</Button>
            </Box>


        </Modal>
);
}
export default UserModifyForm;
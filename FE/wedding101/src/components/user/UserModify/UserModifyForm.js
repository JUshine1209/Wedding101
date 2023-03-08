import './UserModifyForm.css';
import {Modal, Box, Typography, TextField, Button} from '@mui/material';
import {useState} from 'react';
import axios from 'axios';

const BASEURL =  "https://wedding101.shop/api";
function UserModifyForm(props) {
    const [name, setName] = useState(props.data.userName)
    const [nickname, setNickname] = useState(props.data.userNickname)
    const [email, setEmail] = useState(props.data.userEmail)

    const [nicknameChange, setNicknameChange] = useState(false)
    const [emailChange, setEmailChange] = useState(false)
    
    const [nicknameDuplicateCheck, setNicknameDuplicateCheck] = useState("중복확인")
    const [emailDuplicateCheck, setEmailDuplicateCheck] = useState("중복확인")

    const [possibleNickname, setPossibleNickname] = useState(true)
    const [possibleEmail, setPossibleEmail] = useState(true)
    
    const changeName = (e) => {setName(e.target.value)}
    const changeNickname = (e) => {
        setNicknameChange(true)
        setNickname(e.target.value)
        setNicknameDuplicateCheck("중복확인")
        setPossibleNickname(false)
    }
    const changeEmail = (e) => {
        setEmailChange(true)
        setEmail(e.target.value)
        setEmailDuplicateCheck("중복확인")
        setPossibleEmail(false)
    }

    const checkNull = (some) => {
        if(some != null) {
            return false;
        }
        return true;
    }
    
    const checkName =() => {
        let check = /^[ㄱ-ㅎ | ㅏ-ㅣ |가-힣]{2,12}$/; // 글자 2-12자리
        return !checkNull(name) && !check.test(name);
    }
    const checkEmail =()=>{
        let check =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        return !checkNull(email) && !check.test(email);
    }

    const checkNicknameDuplicate = async () => {
        await axios ({
            method: "GET",
            url: `${BASEURL}/user/exist/nickname/`+ nickname
        }).then((res) => {
            if(res.data === true) {
                alert('사용중인 닉네임입니다.')
                setPossibleNickname(false)
            }
            else {
                setNicknameDuplicateCheck("사용가능")
                setPossibleNickname(true) // 중복확인함
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    const checkEmailDuplicate = async () => {
        await axios ({
            method: "GET",
            url: `${BASEURL}/user/exist/nickname/`+ nickname
        }).then((res) => {
            if(res.data === true) {
                alert('사용중인 이메일입니다.')
                setPossibleNickname(false)
            }
            else {
                setNicknameDuplicateCheck("사용가능")
                setPossibleNickname(true) // 중복확인함
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const modifyUser = async () => {
        if(nicknameChange && !possibleNickname) {
            alert('닉네임 중복확인을 진행하세요')
            return
        }
        if(emailChange && !possibleEmail) {
            alert('이메일 중복확인을 진행하세요')
            return
        }
        await axios ({
            method: "PUT",
            url: `${BASEURL}/user`,
            headers: {
                "Authorization" : "Bearer " + sessionStorage.getItem("accessToken")
            },
            data: {
                userId: props.data.userId,
                userName : name,
                userNickname: nickname,
                userEmail: email
            }
        }).then((res) => {
            console.log(res.data)
        }).catch(err => {
            console.log(err)
            alert('수정을 실패하였습니다.')
        })
        props.doClose();
    }

    return (
        <Modal  open={props.isOpen}
                onClose={props.doClose}
                className="Modal">
            <Box className="Modal__content">
                {/* Modal 창 제목 */}
                <Typography component="div" id="Modal__header">내 정보 수정</Typography>

                {/* Modal 창 유저 글 작성 */}
                <Typography  component="div" id="Modal__body">
                    <h2>{props.data.userId}님의 회원 정보</h2>
                    <div className='UM-Division-Line'></div>
                    <div className="modify-label">수정 전 이름 : {props.data.userName} </div>
                    <TextField  value={name}
                                onChange={changeName}
                                error={checkName()}
                                helperText={checkName() ? "한글 이름을 입력하세요":""}></TextField>
                    <div className='UM-Division-Line'></div>
                    <div className="modify-label">수정 전 닉네임 : {props.data.userNickname} </div>
                    <div className='duplicate-btn'>
                        <TextField  value={nickname} 
                                    onChange={changeNickname}></TextField>
                        <Button color = 'primary' onClick={checkNicknameDuplicate} >{nicknameDuplicateCheck}</Button>
                    </div>
                    <div className='UM-Division-Line'></div>
                    <div className="modify-label">수정 전 이메일 : {props.data.userEmail} </div>
                    <div className='duplicate-btn'>
                        <TextField  value={email} 
                                    onChange={changeEmail}
                                    error={checkEmail()}
                                    helperText={checkEmail() ? "유효하지 않은 이메일입니다.":""}
                                    sx={{width:{sm:200, md:300}}}></TextField>
                        <Button color = 'primary' onClick={checkEmailDuplicate} >{emailDuplicateCheck}</Button>
                    </div>
                    <div></div>
                    
                </Typography>
                <Button className = "user-modify-btn"
                        sx ={{mt:1}}
                        color = 'primary'
                        startIcon="✏️"
                        variant='contained'
                        size='medium'
                        onClick={modifyUser}>수정 완료</Button>
            </Box>
           
        </Modal>
    );
}
export default UserModifyForm;
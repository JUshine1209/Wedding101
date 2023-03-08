import axios from 'axios';

import './UserDetailForm.css';
import { useEffect, useState } from 'react';
import { Paper, TableContainer, Table, TableBody, TableCell, TableRow, Button} from '@mui/material';
import UserModifyForm from './UserModifyForm'

const BASEURL =  "https://wedding101.shop/api";

function UserTable(props) {
    return (
        <TableContainer component={Paper}>
            <Table className="user-table" sx={{minWidth:500}}  aria-label="simple table">
                <TableBody>
                    <TableRow>
                        <TableCell style={{width:30}} variant="head" align="center">아이디</TableCell>
                        <TableCell style={{width:50}} >{props.data.userId}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" align="center">이름</TableCell>
                        <TableCell>{props.data.userName}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" align="center">닉네임</TableCell>
                        <TableCell>{props.data.userNickname}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" align="center">이메일</TableCell>
                        <TableCell>{props.data.userEmail}</TableCell>
                    </TableRow>

                </TableBody>
            </Table>

        </TableContainer>
    )
}

function UserDetailForm() {
    const [user, setUser] = useState([]);
    const {userId, userName, userNickname, userEmail} = user;
    const [userModifyOpen, setUserModifyOpen] = useState(false);

    const openModifyModal = () => {
        setUserModifyOpen((userModifyOpen) => !userModifyOpen)
        getUser()
    }

    useEffect(() =>  {
        // 컴포넌트 불러올때  getUser() 실행
        getUser();
    }, []);
    async function getUser() {
        await axios ({
            method : "GET",
            url : `${BASEURL}/user`,
            headers : {
                "Authorization" : "Bearer " + sessionStorage.getItem('accessToken')
            } 
        }).then((res) => {
            setUser(res.data.data);
        }).catch((error) => {
            if(error.response.status === 417) {
                console.log(error.response.data.message)
            }
        })
    }


    return (
        <div>
            <UserTable data = {user} className="user-table"/>
            <Button sx ={{mt:1}}
                    color = 'primary'
                    startIcon="✏️"
                    variant='contained'
                    size='small'
                    onClick={openModifyModal}>수정하기</Button>
            {userModifyOpen ? <UserModifyForm   data={user} 
                                                isOpen={userModifyOpen}
                                                doClose={openModifyModal} 
                                                className="user-modify-form" /> : null}
        </div>
    );
}
export default UserDetailForm;
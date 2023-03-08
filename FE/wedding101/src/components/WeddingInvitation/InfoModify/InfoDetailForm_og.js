import axios from 'axios';

import './InfoDetailForm.css';
import { useEffect, useState } from 'react';
import { Paper, TableContainer, Table, TableBody, TableCell, TableRow, Button} from '@mui/material';

const BASEURL = "https://wedding101.shop/api"

function InfoTable(props) {
    const [info, setInfo] = useState({
        userSeq: null,
        infoSeq: null,
        weddingDay: null,
        weddingHallName: null,
        weddingHallAddress: null,
        weddingHallNumber: null,
        groomName: null,
        brideName: null,
        groomPhoneNumber: null,
        bridePhoneNumber: null,
        groomAccountNumber: null,
        groomAccountBank: null,
        groomAccountName: null,
        brideAccountNumber: null,
        brideAccountBank: null,
        brideAccountName: null,
        groomRelation: null,
        brideRelation: null,
        groomFatherName: null,
        groomMotherName: null,
        brideFatherName: null,
        brideMotherName: null,
        groomFatherIsAlive: null,
        groomMotherIsAlive: null,
        brideFatherIsAlive: null,
        brideMotherIsAlive: null
    });

    {props.userSeq &&
        axios ({
            method : "GET",
            url : `${BASEURL}/Info?userSeq=${props.userSeq}`,
            headers : {
                "Authorization" : "Bearer " + sessionStorage.getItem('accessToken')
            }
        }).then((res) => {
            console.log(res.data.data);
            setInfo(res.data.data);
        }).catch((error) => {
            console.log(error);
            if(error.response.status === 417) {
                alert("결혼 정보를 등록해주세요")
                console.log(error.response.data.message);
                console.log("결혼 정보를 등록해주세요");
            }
        })
    }


    return (
        <TableContainer component={Paper} className="info-table-container">
            <Table className="info-table" sx={{minWidth:500}}  aria-label="simple table">
                <TableBody>
                    <TableRow>
                        <TableCell style={{width:30}} variant="head" align="center">신랑 이름</TableCell>
                        <TableCell style={{width:50}} >{info.groomName}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" align="center">신부 이름</TableCell>
                        <TableCell>{info.brideName}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" align="center">날짜</TableCell>
                        <TableCell>{info.weddingDay}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" align="center">장소</TableCell>
                        <TableCell>{info.weddingHallAddress}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" align="center">웨딩홀 번호</TableCell>
                        <TableCell>{info.weddingHallNumber}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" align="center">신랑 전화번호</TableCell>
                        <TableCell>{info.groomPhoneNumber}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" align="center">신부 전화번호</TableCell>
                        <TableCell>{info.bridePhoneNumber}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" align="center">신랑 계좌번호</TableCell>
                        <TableCell>{info.groomAccountNumber}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" align="center">은행</TableCell>
                        <TableCell>{info.groomAccountBank}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" align="center">예금주</TableCell>
                        <TableCell>{info.groomAccountName}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" align="center">신부 계좌번호</TableCell>
                        <TableCell>{info.brideAccountNumber}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" align="center">은행</TableCell>
                        <TableCell>{info.brideAccountBank}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" align="center">예금주</TableCell>
                        <TableCell>{info.brideAccountName}</TableCell>
                    </TableRow>
                    {info.groomFatherIsAlive ? 
                        <TableRow>
                            <TableCell variant="head" align="center">신랑 아버지</TableCell>
                            <TableCell>{info.groomFatherName}</TableCell>
                        </TableRow> : null}
                    {info.groomMotherIsAlive ? 
                        <TableRow>
                            <TableCell variant="head" align="center">신랑 어머니</TableCell>
                            <TableCell>{info.groomMotherName}</TableCell>
                        </TableRow> : null}
                    <TableRow>
                        <TableCell variant="head" align="center">신랑 출생순위</TableCell>
                        <TableCell>{info.groomRelation}</TableCell>
                    </TableRow>
                    {info.brideFatherIsAlive ? 
                        <TableRow>
                            <TableCell variant="head" align="center">신부 아버지</TableCell>
                            <TableCell>{info.brideFatherName}</TableCell>
                        </TableRow> : null}
                    {info.brideMotherIsAlive ? 
                        <TableRow>
                            <TableCell variant="head" align="center">신부 어머니</TableCell>
                            <TableCell>{info.brideMotherName}</TableCell>
                        </TableRow> : null}
                    <TableRow>
                        <TableCell variant="head" align="center">신부 출생순위</TableCell>
                        <TableCell>{info.brideRelation}</TableCell>
                    </TableRow>

                </TableBody>
            </Table>

        </TableContainer>
    )
}

function InfoDetailForm() {
    const [userSeq, setUserSeq] = useState();
    
    useEffect(() =>  {
        // 컴포넌트 불러올때  getInfo() 실행
        getUserSeq();
    }, []);
    
    const accessToken = sessionStorage.getItem('accessToken');

    async function getUserSeq() {
        await axios ({
            method : "GET",
            url : `${BASEURL}/user`,
            headers : {
                "Authorization" : "Bearer " + accessToken
            } 
        }).then((res) => {
            setUserSeq(res.data.data.userSeq)
        }).catch(function (error) {
            console.log(error)
            if(error.response.status === 417) {
                console.log(error.response.data.message)
            }
            return ;
        })
    }
    
    return (
        <InfoTable userSeq={userSeq}></InfoTable>
    );
}
export default InfoDetailForm;

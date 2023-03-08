import './ServiceProcess04.css';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import ProgressBar from '../../components/common/ProgressBar';
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Button } from "@mui/material";
import axios from 'axios';

function ServiceProcess04 () {
    const integratedInfo = JSON.parse(sessionStorage.getItem('integratedInfo'));
    const [userSeq, setUserSeq] = useState();
    const [processForm, setProcessForm] = useState();

    useEffect(()=>{
        getUserSeq();
    }, [])

    async function getUserSeq () {
        await axios
            .get(`https://wedding101.shop/api/user`,{
                headers:{"Authorization": "Bearer " + sessionStorage.getItem('accessToken')}
            })
            .then((res) => {
                console.log('유저 정보 수신 성공');
                console.log(res.data)
                setUserSeq(res.data.data.userSeq)
                setProcessForm({
                    ...integratedInfo,
                    userSeq : res.data.data.userSeq,
                    infoSeq : res.data.data.userSeq,
                })
            })
            .catch((err) => {
                console.log(err);
                console.log('유저 정보 수신 실패');
            })
    }

    const navigate = useNavigate();
    const submitWeddingInfo = () => {
        
        console.log(processForm);
        axios.post(`https://wedding101.shop/api/Info`, processForm, {
            headers : {"Authorization": "Bearer " + sessionStorage.getItem("accessToken")}
        }).then(function (response) {
            console.log(response);
            console.log(response.data.message);
            if(response.status === 200){
                alert(`서비스 신청 완료되었습니다.`);
                axios.post(`https://wedding101.shop/api/album`, {
                    "albumSeq": 0,
                    "infoSeq": processForm.infoSeq, 
                    "userSeq": processForm.userSeq, 
                    "albumName": "앨범",
                    "albumColor": null,
                    "albumPhotoUrl": null,
                    "albumAccessId": null,
                    "albumMediaCnt": 0,
                    "valid": true
                  },{
                    headers : {"Authorization": "Bearer " + sessionStorage.getItem("accessToken")}
                }).then((res) => {
                    console.log('앨범 생성 완료');
                }).catch((err) => {
                    console.log('앨범 생성 실패');
                    alert('앨범 생성에 문제가 생겼습니다.');
                })
                navigate("/album");
                window.scrollTo(0,0);
            }
        }).catch(function (error) {
            console.log(error)
            if (error.response.status === 417){
                axios.put(`https://wedding101.shop/api/Info`, processForm, {
                    headers : {"Authorization": "Bearer " + sessionStorage.getItem("accessToken")}
                }).then((res) => {
                    alert('서비스 신청 정보 수정 완료되었습니다.');
                    navigate('/album');
                    window.scrollTo(0,0);
                }).catch((err) => {
                    alert('에러 발생');
                })
            }
            else {
                alert('에러 발생');
            }
            
        });
    }

    return (
        <div className='service-process04'>
            <Grid2 container spacing={2}>
                <Grid2 xs={3}>
                <h1>Service Application</h1>
                </Grid2>

                <Grid2 xs={9}>
                <ProgressBar steps={['step1', 'step2', 'step3', 'step4']} activeStep={3} />
                    <h2>완료 버튼을 누르시면 서비스 신청이 완료됩니다.</h2>

                    <div className='buttons'>
                    <Button variant='contained' onClick={() => navigate(-1)}>이전</Button>
                    </div>
                    <div className='buttons'>
                    <Button variant='contained' onClick={submitWeddingInfo}>완료</Button>
                    </div>
                </Grid2>

            </Grid2>
        </div>
    )
}

export default ServiceProcess04;
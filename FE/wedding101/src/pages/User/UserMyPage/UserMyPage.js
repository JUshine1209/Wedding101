import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import UserDetailForm from '../../../components/user/UserModify/UserDetailForm'
import InfoDetailForm from '../../../components/WeddingInvitation/InfoModify/InfoDetailForm'
import { useEffect, useState } from 'react';
import './UserMyPage.css';
import { Button } from '@mui/material';

function UserMyPage() {
    const [userDetailOpen, setUserDetailOpen] = useState(false);
    const openUserModal = () => {
        if(userDetailOpen === false) {
            setInfoDetailOpen(false);
        }
        setUserDetailOpen((userDetailOpen) => !userDetailOpen);
    }

    const [infoDetailOpen, setInfoDetailOpen] = useState(false);
    const openInfoModal = () => {
        if(infoDetailOpen === false) {
            setUserDetailOpen(false);
        }
        setInfoDetailOpen((infoDetailOpen) => !infoDetailOpen);
    }
    
    return (
        <div className='user-mypage'>
            <Grid2 container spacing={2}>
                <Grid2 lg={3} xs={0}>
                    <h1>My Page</h1>
                </Grid2>
                
                <Grid2 lg={9} xs={12}>
                    <div className='user-mypage-items'>
                        <Grid2 container spacing={5}> 
                                <Grid2 xs={6}>
                                    <Button 
                                        color='primary'
                                        variant='contained'
                                        size='small'
                                        sx={{ width: 200, padding: 1, margin: 2 }}
                                        onClick={openUserModal}>내 정보</Button>
                                </Grid2>
                                <Grid2 xs={6}>
                                    <Button 
                                        color='primary'
                                        variant='contained'
                                        size='small'
                                        sx={{ width: 200, padding: 1, margin: 2 }}
                                        onClick={openInfoModal}>결혼정보</Button>
                                </Grid2>
                        </Grid2>
                    </div>
                    {userDetailOpen ? <UserDetailForm /> : null}
                    {infoDetailOpen ? <InfoDetailForm /> : null}
                </Grid2>
                
            </Grid2>

            
        </div>
    );
}
export default UserMyPage;
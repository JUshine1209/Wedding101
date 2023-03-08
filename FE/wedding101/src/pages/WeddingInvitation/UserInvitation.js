import './UserInvitation.css';

import React, { useState } from 'react';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import ProgressBar from '../../components/common/ProgressBar';
import { Button } from '@mui/material';

function UserInvitation(){

    const [invitationForm, setInvitationForm] = useState({
        invitationSeq: '',
        infoSeq: '',
        userSeq: '',
        templateSeq: '',
        photoUrl01: '',
        photoUrl02: '',
        templateHeader: '',
        templateFooter: '',
        templateEtc: '',
        createdAt: '',
        updatedAt: '',
        isValid: '',

    });

    return(
        <div className="user-invitation">
            <Grid2 container spacing={2}>
                 <Grid2 lg={3} sm={2}>
                    <h1>Mobile Invitation</h1>
                </Grid2>
                <Grid2 lg={9} sm={10}>
                    <ProgressBar />
                    <h2>모바일 청첩장 Form</h2>
                    
                    <Button className='sel-button' variant='contained'>선택</Button>
                    <Button className='cancel-button' variant='contained'>취소</Button>
                </Grid2>
            </Grid2>
        </div>
    );
}

export default UserInvitation;
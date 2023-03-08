import { TextField } from '@mui/material';
import { useState } from 'react';
import './WeddingInfoForm.css';

function WeddingInfoForm(props){
    let bridegroom = 0;
    let gender = '';
    let genderClass = '';
    if (props.bridegroom === 0) {gender = '예비 신랑'; genderClass = 'groom'}
    else {gender = '예비 신부'; genderClass = 'bride'}    

    const onSubmitHandler = () => {
    }
    return (
        <div className='wedding-info-form'>
            <form onSubmit={onSubmitHandler} className={genderClass}>
                <div className='verticalLayout' id='infoForm'>
                    <h3>{gender}</h3>
                    <div className='horizontalLayout'>
                        <h3>이름: </h3>
                        <TextField className='textInputField' id='name' placeholder='홍길동' onChange={props.onChangeInfo}/>
                    </div>
                    <div className='horizontalLayout'>
                        <h3>전화번호: </h3>
                        <TextField className='textInputField' id='phoneNumber' placeholder='010-xxxx-xxxx'  onChange={props.onChangeInfo}/>
                    </div>
                    <div className='horizontalLayout'>
                        <h3>은행: </h3>
                        <TextField className='textInputField' id='accountBank' placeholder='xx은행'  onChange={props.onChangeInfo}/>
                    </div>
                    <div className='horizontalLayout'>
                        <h3>계좌번호: </h3>
                        <TextField className='textInputField' id='accountNumber' onChange={props.onChangeInfo}/>
                    </div>
                    <div className='horizontalLayout'>
                        <h3>계좌주: </h3>
                        <TextField className='textInputField' id='accountName' placeholder='홍길동' onChange={props.onChangeInfo}/>
                    </div>
                    <div className='horizontalLayout'>
                        <h3>형제중: </h3>
                        <TextField className='textInputField' id='siblingOrder' placeholder='첫째/외동' onChange={props.onChangeInfo}/>
                    </div>
                    <div className='horizontalLayout'>
                        <h3>아버님 성함: </h3>
                        <TextField className='textInputField' id='fatherName' placeholder='홍상직' onChange={props.onChangeInfo}/>
                    </div>
                    <div className='horizontalLayout'>
                        <h3>어머님 성함: </h3>
                        <TextField className='textInputField' id='motherName' placeholder='옥영향' onChange={props.onChangeInfo}/>
                    </div>
                    <div className='horizontalLayout'>
                        <h3>부 생존 여부: </h3>
                        <select id='fatherAlive' onChange={props.onChangeInfo} defaultValue="생존">
                            <option value='true'>생존</option>
                            <option value='false'>작고</option>
                            <option value='unknown'>비공개</option>
                        </select>
                    </div>
                    <div className='horizontalLayout'>
                        <h3>모 생존 여부: </h3>
                        <select id='motherAlive' onChange={props.onChangeInfo} defaultValue='생존'>
                            <option value='true'>생존</option>
                            <option value='false'>작고</option>
                            <option value='unknown'>비공개</option>
                        </select>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default WeddingInfoForm;
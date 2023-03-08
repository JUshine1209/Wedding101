import './ServiceProcess01.css';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import ProgressBar from '../../components/common/ProgressBar';
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import ServiceTerms from '../../data/serviceTerms';
import { Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { fontSize } from '@mui/system';

function ServiceProcess01() {
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);
  const [isCheckAll, setIsCheckAll] = useState(false); // 모든 항목 체크확인 state
  const [termAgreed, setTermAgreed] = useState(false);
  const [privateInfoAgreed, setPrivateInfoAgreed] = useState(false);
  const [locationInfoAgreed, setLocationInfoAgreed] = useState(false);
  const [promotionAgreed, setPromotionAgreed] = useState(false);

  const allBtnEvent = () => {
    if (isCheckAll === false) {
      setIsCheckAll(true);
      setTermAgreed(true);
      setPrivateInfoAgreed(true);
      setLocationInfoAgreed(true);
      setPromotionAgreed(true);
    } else {
      setIsCheckAll(false);
      setTermAgreed(false);
      setPrivateInfoAgreed(false);
      setLocationInfoAgreed(false);
      setPromotionAgreed(false);
    }
  };

  const termBtnEvent = () => {
    if (termAgreed === false) {
      setTermAgreed(true);
    } else {
      setTermAgreed(false);
    }
    console.log(termAgreed)
  };
  const privateInfoBtnEvent = () => {
    if (privateInfoAgreed === false) {
      setPrivateInfoAgreed(true);
    } else {
      setPrivateInfoAgreed(false);
    }
    console.log(privateInfoAgreed)
  };
  const locationInfoBtnEvent = () => {
    if (locationInfoAgreed === false) {
      setLocationInfoAgreed(true);
    } else {
      setLocationInfoAgreed(false);
    }
    console.log(locationInfoAgreed)
  };
  const promoBtnEvent = () => {
    if (promotionAgreed === false) {
      setPromotionAgreed(true);
    } else {
      setPromotionAgreed(false);
    }
  };

  useEffect(() => {
    if (termAgreed === true && privateInfoAgreed === true && locationInfoAgreed === true) {
      setNextButtonDisabled(false);
      if(promotionAgreed === true) setIsCheckAll(true);
      else setIsCheckAll(false);
    } else {
      setNextButtonDisabled(true);
      setIsCheckAll(false);
    }
  }, [termAgreed, privateInfoAgreed, locationInfoAgreed, promotionAgreed]);

  const navigate = useNavigate();
  const toProcess02 = () => {
    // promotion agreed 값을 전송하고 다른곳에서 받아줘야함
    navigate('/user/service02');
    window.scrollTo(0,0);
  };

  return (
    <div className='service-process01'>
      <Grid2 container spacing={2}>
        <Grid2 lg={3} sm={2}>
          <div style={{position: 'fixed', fontSize: '5vh', fontFamily:'Bakbak One'}}>
            <div style={{position: 'relative', left: '20%'}}>
              SERVICE<br></br>
              APPLICATION
            </div>            
          </div>
        </Grid2>

        <Grid2 lg={9} sm={10}>
          <ProgressBar steps={['step1', 'step2', 'step3', 'step4']} activeStep={0} />
          <h2>서비스 이용 약관 동의</h2>
          
          <input
            type='checkbox'
            id='all-class-checkbox'
            onChange={allBtnEvent}
            checked={isCheckAll}
          />
          <label for='all-class-checkbox' className='checkIcons'>
            <CheckCircleOutlineIcon className='notChecked'/>
            <CheckCircleIcon className='checked'/>
            WEDDING 101 이용약관(필수), 개인정보 수집 및 이용약관(필수), 위치기반 서비스
            이용약관(필수), 프로모션 정보 수집(선택)에 모두 동의 합니다.
          </label>
          <div className='contentBox'>
            <div className='article-form'>
              <div className='check_title'>
                <input type='checkbox' id='termAgreed' checked={termAgreed} onChange={termBtnEvent} />
                <label for='termAgreed' className='checkIcons'>
                  <CheckCircleOutlineIcon className='notChecked'/>
                  <CheckCircleIcon className='checked'/>
                  WEDDING 101 이용약관 동의<span className='required'>(필수)</span>
                </label>
              </div>
              <div className='content-wrapper'>
                <div className='scrollable-content'>
                  약관내용1<br></br>
                  약관내용2<br></br>
                  약관내용3<br></br>
                  약관내용4<br></br>
                  약관내용5<br></br>
                  약관내용6<br></br>
                  약관내용7<br></br>
                  약관내용8<br></br>
                </div>
              </div>
            </div>
            <div className='article-form'>
              <div className='check_title'>
                <input type='checkbox' id='privateInfoAgreed' checked={privateInfoAgreed} onChange={privateInfoBtnEvent} />
                <label for='privateInfoAgreed' className='checkIcons'>
                  <CheckCircleOutlineIcon className='notChecked'/>
                  <CheckCircleIcon className='checked'/>
                  개인정보 수집 및 이용약관 동의<span className='required'>(필수)</span>
                </label>
              </div>
              <div className='content-wrapper'>
                <div className='scrollable-content'>
                  약관내용1<br></br>
                  약관내용2<br></br>
                  약관내용3<br></br>
                  약관내용4<br></br>
                  약관내용5<br></br>
                  약관내용6<br></br>
                  약관내용7<br></br>
                  약관내용8<br></br>
                </div>
              </div>
            </div>
            <div className='article-form'>
              <div className='check_title'>
                <input type='checkbox' id='locationInfoAgreed' checked={locationInfoAgreed} onChange={locationInfoBtnEvent} />
                <label for='locationInfoAgreed' className='checkIcons'>
                  <CheckCircleOutlineIcon className='notChecked'/>
                  <CheckCircleIcon className='checked'/>
                  위치기반 서비스 이용약관 동의<span className='required'>(필수)</span>
                </label>
              </div>
              <div className='content-wrapper'>
                <div className='scrollable-content'>
                  약관내용1<br></br>
                  약관내용2<br></br>
                  약관내용3<br></br>
                  약관내용4<br></br>
                  약관내용5<br></br>
                  약관내용6<br></br>
                  약관내용7<br></br>
                  약관내용8<br></br>
                </div>
              </div>
            </div>
            <div className='article-form'>
              <div className='check_title'>
                <input type='checkbox' id='promotionAgreed' checked={promotionAgreed} onChange={promoBtnEvent}/>
                <label for='promotionAgreed' className='checkIcons'>
                  <CheckCircleOutlineIcon className='notChecked'/>
                  <CheckCircleIcon className='checked'/>
                  프로모션 정보 수집 동의
                  <span className='not-required'>(선택)</span>
                </label>
              </div>
              <div className='content-wrapper'>
                <div className='scrollable-content'>
                  <ServiceTerms terms={3}/>
                </div>
              </div>
            </div>
          </div>
          <div className='buttons'>
            <Button variant='contained' onClick={() => {navigate('/'); window.scrollTo(0,0)}}>
              메인으로
            </Button>
          </div>
          <div className='buttons'>
            <Button variant='contained' disabled={nextButtonDisabled} onClick={toProcess02}>
              다음
            </Button>
          </div>
        </Grid2>
      </Grid2>
    </div>
  );
}

export default ServiceProcess01;

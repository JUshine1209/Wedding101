import './MainArea02.css';

import main02_3 from '../../assets/img/mainArea02_3.png';
import main02_4 from '../../assets/img/mainArea02_4.png';
import main02_5 from '../../assets/img/mainArea02_5.png';
import main02_6 from '../../assets/img/mainArea02_6.png';
import phoneFrame from '../../assets/img/mainArea02_2.png';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router';

const MainArea02 = () => {
  const settings = {
    className: 'main-slider',
    dots: true, // 슬라이드 아래 점표시
    infinite: true, // 무한반복
    speed: 500, // 넘어가는 속도
    slidesToShow: 3,    // 화면에 보일 슬라이드 수
    slidesToScroll: 1,  // 스크롤 단위
    centerMode: true,
    centerPadding: '0px', // 슬라이드 끝쪽 이미지 안잘리기
  };
  const navigate = useNavigate();
  const toInvitation=()=>{
    navigate('/invitation01');
  }

  return (
    
    <div className='main-area02'>
      <div className='phoneFrame'>
      <img src={phoneFrame} alt='phoneFrame'></img>
      </div>
      
      <div className='container'>
        <div className='horizontalLayout' id='HL_p2_01'>
          <div className='verticalLayout' id='VL_p2_01'>
            <div className='title_explain'>
              <div className='mainTitle' id='title_p2_01'>Mobile Invitation</div>
              <div className='explainText' id='explain_p2_01'>
                부담없이 초대하세요
              </div>
            </div>
            <div className='detailLayout'>
              <button className='detailButton' id='button02' onClick={toInvitation}>자세히 보러가기</button>
            </div>
          </div>
          <Slider {...settings}>
              <div>
                <div className='imgContainer'>
                  <img className='inFrame' src={main02_3} alt='main02_3'></img>
                </div>            
              </div>
              <div>
                <div className='imgContainer'>
                  <img className='inFrame' src={main02_4} alt='main02_4'></img>
                </div>
              </div>              
              <div>
                <div className='imgContainer'>
                  <img className='inFrame' src={main02_6} alt='main02_6'></img>
                </div>   
              </div>
              <div>
                <div className='imgContainer'>
                  <img className='inFrame' src={main02_5} alt='main02_5'></img>
                </div>
              </div>
          </Slider>
        </div>
      </div>
      
    </div>
  );
};

export default MainArea02;

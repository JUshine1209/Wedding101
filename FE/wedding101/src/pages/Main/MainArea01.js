import './MainArea01.css';

import main01_1 from '../../assets/img/mainArea01_1.png';
import main01_2 from '../../assets/img/mainArea01_2.png';
import main01_3 from '../../assets/img/mainArea01_3.png';
import main01_4 from '../../assets/img/mainArea01_4.png';
import main01_5 from '../../assets/img/mainArea01_5.png';
import main01_6 from '../../assets/img/mainArea01_6.png';
const MainArea01 = () => {
  return (
    <div className='main-area01'>
      
      <div className='container' id='container_main01'>
        <div className='verticalLayout' id='VL_p1_01'>
          <div className='title_explain'>
            <div className='mainTitle' id='title_p1_01'>Wedding101</div>
            <div className='explainText' id='explain_p1_01'>당신의 특별한 순간을 간직하세요</div>
          </div>
          <div className='horizontalLayout' id='HL_p1_01'>
            <div className='verticalLayout' id='VL_p1_02'>
              <div className='horizontalLayout' id='HL_p1_02'>
                <div className='emptyBox'>
                  <div className='innerEmptyBox'></div>
                </div>
                <div className='emptyBox'>
                  <div className='innerEmptyBox'></div>
                </div>
                <img src={main01_3} alt='main01_3'></img>
              </div>
              <div className='horizontalLayout' id='HL_p1_03'>
                <img src={main01_6} alt='main01_6' style={{position:"relative",left:"0.84%"}}></img>
                <img src={main01_5} alt='main01_5' style={{position:"relative",left:"0.42%"}}></img>
                <img src={main01_4} alt='main01_4'></img>
              </div>
            </div>
            <img src={main01_2} alt='main01_2' style={{position:"relative",left:"0.42%", height: '100%'}}></img>
          </div>
        </div>
        <img src={main01_1} alt='main01_1' style={{height:'100%'}}></img>
      </div>
    </div>
  );
};

export default MainArea01;

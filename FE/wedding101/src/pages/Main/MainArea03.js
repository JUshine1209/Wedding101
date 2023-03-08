import './MainArea03.css';
import main03_1 from '../../assets/img/mainArea03_1.png';
import main03_2 from '../../assets/img/mainArea03_2.png';
import { useNavigate } from 'react-router';

const MainArea03 = () => {
  const navigate = useNavigate();
  const toAlbum=()=>{
    navigate('/album');
  }

  return (
    <div className='main-area03'>
      <div className='container' id='container_p3'>
        <div className='horizontalLayout' id='HL_p3_01'>
          <div className='verticalLayout' id='VL_p3_01'>
            <div className='title_explain' id='title03'>
              <div className='mainTitle' id='title_p3_01'>Wedding Album</div>
              <div className='explainText' id='explain_03_01'>고마운 분들의 영상을 간직하세요</div>
            </div>
            <div className='detailLayout' id='DL03'>
              <img src={main03_2} alt='main03_2' id='img_main3_2'></img>
              <button className='detailButton' id='button03' onClick={toAlbum}>자세히 보러가기</button>
            </div>
          </div>
          <img src={main03_1} alt='main03_1' id='img_main3_1'></img>
        </div>
      </div>
    </div>
  );
};

export default MainArea03;

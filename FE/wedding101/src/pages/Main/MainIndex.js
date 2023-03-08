import './MainIndex.css';

import React from 'react';
import MainArea01 from '../../pages/Main/MainArea01';
import MainArea02 from '../../pages/Main/MainArea02';
import MainArea03 from '../../pages/Main/MainArea03';
import MainArea04 from '../../pages/Main/MainArea04';
import GoServiceButton from '../../components/common/GoServiceButton';
import { SectionsContainer, Header, Footer } from 'react-fullpage';
import Headers from '../../components/common/Header';
import Footers from '../../components/common/Footer';

const MainIndex = () => {
  const options = {
    anchors: ['MainArea01', 'MainArea02', 'MainArea03', 'MainArea04'],
    navigation: false,
  };

  return (
    <div className='mainindex'>
      <Header>
        <Headers />
      </Header>
      <Footer>
        {/* <Footers /> */}
      </Footer>
      <SectionsContainer {...options}>
        <div id='about'>
          <MainArea01 />
        </div>
        <div id='invitation'>
          <MainArea02 />
        </div>
        <div id='album'>
          <MainArea03 />
        </div>
        <div id='process'>
          <MainArea04 />
        </div>
      </SectionsContainer>
      <div className='goServiceButton'>
        <GoServiceButton />
      </div>
    </div>
  );
};

export default MainIndex;

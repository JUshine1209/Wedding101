import "./Header.css";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const BASEURL = "https://wedding101.shop/api";

function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const [userNickname, setUserNickname] = useState('');
  const navigate = useNavigate();

  const navigateToHome = () => {
    console.log('go to home!');
    navigate('/');
  };

  const navigateToInvitation = () => {
    console.log('go to invitation!');
    if(isLogin) navigate('/invitation01');
    else {
      alert('로그인 후 이용해 주세요');
      navigate('/user/login');
    }
  };

  const navigateToAlbum = () => {
    console.log('go to album!')
    navigate('/album');
  };

  const navigateToProcess = () => {
    console.log('go to process!')
    if(isLogin) navigate('/user/service01');
    else {
      alert('로그인 후 이용해 주세요');
      navigate('/user/login');
    }
  };

  const navigateToReview = () => {
    console.log('go to review!')
    navigate('/review');
  };
  const navigateToContact = () => {
    console.log('go to contact!')
    navigate('/contact');
  };

  const navigateToLogin= () =>{
    console.log('go to login!')
    navigate('/user/login');
  }

  const navigateToSignup = () => {
    console.log('go to signup!')
    navigate('/user/signup');
  };

  const navigateToMyPage = () => {
    console.log('go to myPage!')
    navigate('/user/mypage');
  };

  const onLogout = () => {
    // 메인으로 이동(새로고침)
    document.location.href = '/';
    // sessionStorage에 accessToken로 저장되어 있는 아이템을 삭제
    setUserNickname('');
    sessionStorage.clear();
  };

  useEffect(() => {
    if (sessionStorage.getItem("accessToken") === null){}
    else{
      // 로그인 상태 변경
      setIsLogin(true);

      // 회원 조회
      axios({
        method: "GET",
        url: `${BASEURL}/user`,
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem('accessToken')
        }
      }).then((res) => { 
          setUserNickname(res.data.data.userNickname);
      }).catch(function (error) {
        console.log(error);
      })
    };
    }, [isLogin]
  );

  return (
    <div className='header'>
        <div className='logo' onClick={navigateToHome}>
          <img src={ require('../../assets/favicon_io/wedding3-96.png') } />
          <div className='logo-font-tag'>WEDDING101</div>
        </div>

        <div  className='header-font-group'>
            <div  className='header-font-tag'
                  onClick={navigateToHome}>ABOUT&nbsp;</div>

            <div  className='header-font-tag'
                  onClick={navigateToInvitation}>INVITATION&nbsp;</div>

            <div  className='header-font-tag' 
                  onClick={navigateToAlbum}>ALBUM&nbsp;</div>

            <div  className='header-font-tag'
                  onClick={navigateToProcess}>PROCESS&nbsp;</div>

            <div  className='header-font-tag'
                  onClick={navigateToReview}>REVIEW&nbsp;</div>

            <div  className='header-font-tag'
                  onClick={navigateToContact}>CONTACT&nbsp;</div>
                  
            {isLogin ? (  <div  className='header-font-tag' 
                                onClick={navigateToMyPage}>
                              👤 {userNickname}님&nbsp;</div>)                              
                        :( <div className='header-font-tag' 
                                onClick={navigateToLogin}>LOGIN&nbsp;</div>)}

            {isLogin ? ( <div className='header-font-tag' 
                              onClick={onLogout}>LOGOUT&nbsp;</div>)
                        :( <div className='header-font-tag'
                                onClick={navigateToSignup}>SIGNUP&nbsp;</div> )}
        </div>
    </div>
  );
  
}
export default Header;

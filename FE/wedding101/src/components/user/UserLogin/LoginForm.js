import './LoginForm.css';

import axios from 'axios';
import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const BASEURL = "https://wedding101.shop/api/";

function LoginForm() {
  const [inputId, setInputId] = useState('');
  const [inputPw, setInputPw] = useState('');

  // input data의 변화가 있을 때마다 value값을 변경하여 반영하는 useState
  const handleInputId = (e) => {
    setInputId(e.target.value);
    console.log(setInputId)
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  const onSubmitHandler = async (event) => {
    console.log('click login');
    console.log("ID: ", inputId );
    console.log('PW: ', inputPw);

    // 버튼만 누르면 리프레시되는 것 막기
    event.preventDefault();

    await axios.post(BASEURL + 'user/login', {
        userId: inputId,
        userPassword: inputPw
      }
    )
    .then((res) => {
        //작업 완료되면 페이지 이동
        sessionStorage.setItem('accessToken', res.data.accessToken);
        document.location.href = '/';
      })
      .catch((err) => {
        alert(err.response.data.errorMessaage);
        return;
      });
  };

  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate('/user/signup');
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmitHandler}>
        <TextField
          id='id-input'
          autoFocus
          type='text'
          label='아이디를 입력하세요'
          variant='outlined'
          value={inputId}
          onChange={handleInputId}
        />
        <br />
        <br />
        <TextField
          id='password-input'
          type='password'
          label='비밀번호를 입력하세요'
          variant='outlined'
          value={inputPw}
          onChange={handleInputPw}
        />
        <br />

        <Button variant='text' type='submit'>
          로그인
        </Button>
        <br />
      </form>
        <Button variant='text'>아이디 찾기</Button>
        <Button variant='text'>비밀번호 찾기</Button>
        <Button variant='text' onClick={onClickHandler}>
          회원가입
        </Button>
    </div>
  );
}
export default LoginForm;

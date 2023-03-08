import './RegistForm.css';

import { useCallback, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router';
import axios from 'axios';

const BASEURL =  "https://wedding101.shop/api/";

function RegistForm() {
    const [form, setForm] = useState({
        id: null,
        password: null,
        passwordConfirm: null,
        name: null,
        nickname: null,
        email: null,
    });
    const {id, password, passwordConfirm, name, nickname, email} = form;

    const [error, setError] = useState({
        empty: null
    });

    const onChange = (e)=> {
        const newForm = {
            ...form,
            [e.target.name] : e.target.value
        };
        setForm(newForm);
    }

    const [usableId, setUsableId] = useState(false);
    const [usableNickname, setUsableNickname] = useState(false);
    const [usableEmail, setUsableEmail] = useState(false);
    const [id_duplicate_message, setIdMessage] = useState("");
    const [nickname_duplicate_message, setNicknameMessage] = useState("");
    const [email_duplicate_message, setEmailMessage] = useState("");

    const onInputId = ()=> {
        setUsableId(false);
        setIdMessage("");
    }

    const onInputNickname = ()=> {
        setUsableNickname(false);
        setNicknameMessage("");
    }

    const onInputEmail = ()=> {
        setUsableEmail(false);
        setEmailMessage("");
    }

    const checkDuplicateId = (e) => {
        const id = form.id;
        axios
            .get(`https://wedding101.shop/api/user/exist/id/${id}`)
            .then(res => {
                if(res.data === false) {
                    setUsableId(true);
                    setIdMessage("사용 가능한 아이디 입니다.");
                }
                else {
                    setIdMessage("사용할 수 없는 아이디 입니다.");
                }
            })
    }

    const checkDuplicateNickname = (e) => {
        const nickname = form.nickname;
        axios
            .get(`https://wedding101.shop/api/user/exist/nickname/${nickname}`)
            .then(res => {
                if(res.data === false) {
                    setUsableNickname(true);
                    setNicknameMessage("사용 가능한 닉네임 입니다.");
                }
                else {
                    setNicknameMessage("사용할 수 없는 닉네임 입니다.");
                }
            })
    }
    
    const checkDuplicateEmail = (e) => {
        const email = form.email;
        axios
            .get(`https://wedding101.shop/api/user/exist/email/${email}`)
            .then(res => {
                if(res.data === false) {
                    setUsableEmail(true);
                    setEmailMessage("사용 가능한 이메일 입니다.");
                }
                else {
                    setEmailMessage("사용할 수 없는 이메일 입니다.");
                }
            })
    }

    const checkNull = (some) => {
        if(some != null) {
            return false;
        }
        return true;
    }

    const checkId =()=>{
        let check = /[~!@#$%^&*()_+|<>?:{}.,/;='"ㄱ-ㅎ | ㅏ-ㅣ |가-힣]$/;
        return check.test(form.id);
    }
    const checkPassword =()=>{
        let check = /^[A-Za-z0-9]{8,12}$/; // 단순 8~12자리
        return !checkNull(form.password) && !check.test(form.password);
    }
    const checkPasswordConfim =()=>{
        let check = false;
        if(!checkNull(form.passwordConfirm) && form.password !== form.passwordConfirm) {
            check = true;
        }
        return !checkNull(form.password) && check;
    }
    const checkName =()=>{
        let check = /^[ㄱ-ㅎ | ㅏ-ㅣ |가-힣]{2,12}$/; // 글자 2-12자리
        return !checkNull(form.name) && !check.test(form.name);
    }
    const checkEmail =()=>{
        let check =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        return !checkNull(form.email) && !check.test(form.email);
    }
    
    const validate = useCallback(() => {
        if(!checkNull(form.id) && !checkNull(form.password) && !checkNull(form.passwordConfirm) && !checkNull(form.name)
            && !checkNull(form.nickname) && !checkNull(form.email)) {
                return null
        }
        else {
            return "모든 항목을 입력해주세요"
        }
    }, [form])

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const error = validate();
        setError(error);
        console.log(error)
        if(error != null ) {
            alert(error)
            return
        }

        if(usableId === false) {
            alert("아이디 중복확인을 해주세요")
            return
        }
        if(usableNickname === false) {
            alert("닉네임 중복확인을 해주세요")
            return
        }
        if(usableEmail === false) {
            alert("이메일 중복확인을 해주세요")
            return
        }

        axios.post(`https://wedding101.shop/api/user/signup`, {
            userId: id,
            userPassword: password,
            userName: name,
            userNickname: nickname,
            userEmail: email,
        }).then(function (response) {
            console.log(response);
            console.log(response.data.message);
            if(response.status === 200){
                alert(`${form.id}님 회원가입 완료!`)
                navigate("/user/login");
            }
        }).catch(function (error) {
            console.log(error)
            if(error.response.status === 417) {
                alert('회원가입 실패')
                console.log(error.response.data.message);
            }
            console.log(error);
        });
    }

    const navigate = useNavigate();
    const onClickHandler = () =>{
        alert("로그인 페이지로 이동합니다.");
        navigate('/user/login');
    };    

    return (
        <div>
            <h3>회원가입</h3>
            <form onSubmit={onSubmitHandler} >
            
            <div className='verticalLayout' id='loginForm'>
                <div className='horizontalLayout' id='loginFormHL'>
                    <TextField
                        id="id-input" 
                        type="text" 
                        name='id'
                        label="아이디를 입력하세요" 
                        variant="outlined"
                        size='small'
                        margin='dense'
                        value={form.id}
                        onInput={onInputId}
                        onChange={onChange}
                        error={checkId()}
                        helperText={checkId() ? "한글과 특수문자는 사용하실 수 없습니다.":"" } />
                    <div style={{width: '3%'}}></div>
                    <button type="button" onClick={checkDuplicateId} >중복확인</button>
                </div>
                <span>{id_duplicate_message}</span>
                <div className='horizontalLayout' id='loginFormHL'>
                    <TextField
                    id="pw-input" 
                    type="password" 
                    name='password'
                    label="비밀번호를 입력하세요" 
                    variant="outlined"
                    size='small'
                    margin='dense'
                    value={form.password}
                    onChange={onChange}
                    error={checkPassword()}
                    helperText={checkPassword() ? "비밀번호는 8-12자로 입력해주세요":"" } />
                </div>
                <div className='horizontalLayout' id='loginFormHL'>
                    <TextField
                    id="pw-confirm-input" 
                    type="password"
                    name='passwordConfirm' 
                    label="비밀번호를 다시 입력하세요" 
                    variant="outlined"
                    size='small'
                    margin='dense'
                    value={form.passwordConfirm}
                    onChange={onChange}
                    error={checkPasswordConfim()}
                    helperText={checkPasswordConfim() ? "비밀번호가 일치하지 않습니다.":"" }  />
                </div>
                <div className='horizontalLayout' id='loginFormHL'>
                    <TextField
                    id="name-input" 
                    type="text" 
                    name='name'
                    label="이름을 입력하세요" 
                    variant="outlined"
                    size='small'
                    margin='dense'
                    value={form.name}
                    onChange={onChange}
                    error={checkName()}
                    helperText={checkName() ? "이름을 입력하세요":""}  />
                </div>
                <div className='horizontalLayout' id='loginFormHL'>
                    <TextField
                        id="nickname-input" 
                        type="text" 
                        name='nickname'
                        label="닉네임을 입력하세요" 
                        variant="outlined"
                        size='small'
                        margin='dense'
                        value={form.nickname}
                        onInput={onInputNickname}
                        onChange={onChange}  />
                    <div style={{width: '3%'}}></div>
                    <button type="button" onClick={checkDuplicateNickname} >중복확인</button>
                </div>
                <span>{nickname_duplicate_message}</span>
                <div className='horizontalLayout' id='loginFormHL'>
                    <TextField
                        id="email-input" 
                        type="text" 
                        name='email'
                        label="이메일을 입력하세요" 
                        variant="outlined"
                        size='small'
                        margin='dense'
                        value={form.email}
                        onInput={onInputEmail}
                        onChange={onChange}
                        error={checkEmail()}
                        helperText={checkEmail() ? "유효하지 않은 이메일입니다.":"" } />
                    <div style={{width: '3%'}}></div>
                    <button type="button" onClick={checkDuplicateEmail} >중복확인</button>
                </div>
                <br/>
                <span>{email_duplicate_message}</span>
                <Button variant="contained" type='submit' >회원가입</Button>
                <br />
            </div>
            </form>
            <Button variant="text" onClick={onClickHandler}>로그인 페이지로 이동하기</Button>
        </div>
    );
}
export default RegistForm;
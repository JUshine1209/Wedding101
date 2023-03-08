import './UserLogin.css';
import loginimg from '../../../assets/img/weddingLogin.png';

import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import LoginForm from '../../../components/user/UserLogin/LoginForm';

function UserLogin() {
  return (
    <div className='user-login'>
      <Grid2 container spacing={2}>
        <Grid2 lg={8} sm={0}>
          <div className='loginimg'>
            <img src={loginimg} alt='weddingLogin'></img>
          </div>
        </Grid2>

        <Grid2 lg={4} sm={8}>
          <h3>Wedding101</h3>
          <LoginForm />
        </Grid2>
      </Grid2>
    </div>
  );
}
export default UserLogin;

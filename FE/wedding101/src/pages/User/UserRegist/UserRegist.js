import './UserRegist.css';
import signupimg from '../../../assets/img/weddingSignup.png';

import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import RegistForm from '../../../components/user/UserRegist/RegistForm';

function UserRegist() {
  return (
    <div className='user-regist'>
      <Grid2 container spacing={2}>
        <Grid2 lg={8} sm={0}>
          <div className='signupimg'>
            <img src={signupimg} alt='weddingLogin'></img>
          </div>
        </Grid2>
        <Grid2 lg={4} sm={8}>
          <RegistForm />
        </Grid2>
      </Grid2>
    </div>
  );
}
export default UserRegist;

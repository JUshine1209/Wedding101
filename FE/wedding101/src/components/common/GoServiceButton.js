import { Button } from '@mui/material';
import { useNavigate } from 'react-router';

function GoServiceButton() {
  const navigate = useNavigate();
  const navigateToService = () => {
    if (sessionStorage.getItem('accessToken') !== null) {
      navigate('/user/service01');
    } else {
      alert('로그인 후 이용 가능합니다.');
      navigate('/user/login');
    }
  };
  return (
    <Button
      variant='outlined'
      sx={{ borderRadius: 50,}, 
          {':hover': { bgcolor: 'violet', color:'white',},}}
      color='secondary'
      onClick={navigateToService}
    >
      신청하러 가기
    </Button>
  );
}

export default GoServiceButton;

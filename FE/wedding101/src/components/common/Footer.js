import './Footer.css';

function Footer() {
  return (
    <div className='footer'>
      <footer>
      <span className='a101'>A101&nbsp;&nbsp;&nbsp; </span>
        <span> &nbsp;&nbsp;&nbsp;팀장: 김성환 </span>||
        <span> 팀원: 권영진 </span>|
        <span> 김지현 </span>|
        <span> 류제엽 </span>|
        <span> 이동형 </span>|
        <span> 이진욱 </span>
        <p>
          <span>이용약관 </span>|
          <span> 개인정보처리방침 </span>|
          <span> 사업자정보확인</span>
        </p>
        <p>
          <span className='mock'>This is not a real page. It's a mock Page </span><br />
          <span> Copyright ⓒ 2023. Wedding101 all rights reserved.</span>
        </p>
      </footer>
    </div>
  );
}
export default Footer;

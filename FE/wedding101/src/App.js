import "./App.css";

import { Route, Routes, useParams } from "react-router-dom";
import MainLayout from "./pages/Main/MainLayout";
import UserLogin from "./pages/User/UserLogin/UserLogin";
import UserRegist from "./pages/User/UserRegist/UserRegist";
import UserMyPage from "./pages/User/UserMyPage/UserMyPage";
import InvitationProcess01 from "./pages/WeddingInvitation/InvitationProcess01";
import InvitationProcess02 from "./pages/WeddingInvitation/InvitationProcess02";
import InvitationProcess03 from "./pages/WeddingInvitation/InvitationProcess03";
import InvitationProcess04 from "./pages/WeddingInvitation/InvitationProcess04";
import BoardReview from "./pages/BoardReview/BoardReview";
import BoardQuestion from "./pages/BoardQuestion/BoardQuestion";
import AlbumCover from "./pages/Album/AlbumCover";
import AlbumList from "./pages/Album/AlbumList";
import ServiceProcess01 from "./pages/ServiceProcess/ServiceProcess01";
import ServiceProcess02 from "./pages/ServiceProcess/ServiceProcess02";
import ServiceProcess03 from "./pages/ServiceProcess/ServiceProcess03";
import ServiceProcess04 from "./pages/ServiceProcess/ServiceProcess04";
import MainIndex from "./pages/Main/MainIndex";
import AlbumDeleted from "./pages/Album/AlbumDeleted";
import AlbumSelected from "./pages/Album/AlbumSelected";
import InvitationShared from "./pages/WeddingInvitation/InvitationShared";

function App() {
  return (
    <Routes>
      {/*Header, Footer 보여줄 페이지 */}
      <Route element={<MainLayout />}>
        <Route path="/invitation01" element={<InvitationProcess01 />} />
        <Route path="/invitation02" element={<InvitationProcess02 />} />
        <Route path="/invitation03" element={<InvitationProcess03 />} />
        <Route path="/invitation04" element={<InvitationProcess04 />} />
        <Route path="/album" element={<AlbumCover />} />
        <Route path="/album/list" element={<AlbumList />} />
        <Route path="/album/deleted" element={<AlbumDeleted />} />
        <Route path="/album/wish" element={<AlbumSelected />} />
        <Route path="/review" element={<BoardReview />} />
        <Route path="/contact" element={<BoardQuestion />} />
        <Route path="/user/service01" element={<ServiceProcess01 />} />
        <Route path="/user/service02" element={<ServiceProcess02 />} />
        <Route path="/user/service03" element={<ServiceProcess03 />} />
        <Route path="/user/service04" element={<ServiceProcess04 />} />
        <Route path="/user/mypage" element={<UserMyPage />} />
      </Route>
      {/*Header, Footer 보여주지 않을 페이지 */}
      <Route exact path="/" element={<MainIndex />} />
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/user/signup" element={<UserRegist />} />
      <Route path="/invitation/:albumSeq" element={<InvitationShared />} />
    </Routes>
  );
}

export default App;

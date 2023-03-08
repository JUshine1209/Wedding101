import './Navbar.css';

function Navbar() {
    const navbarName = ['mypage', 'serviceApplication', 'mobileApplication', 'weddingAlbum','album','albumList','review', 'contactus'];
    
    return(
        <div className="navbar">
            <h1>This is {navbarName[6]}</h1>
        </div>
    );
}

export default Navbar;
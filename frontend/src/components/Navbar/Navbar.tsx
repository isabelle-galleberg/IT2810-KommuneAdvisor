import './Navbar.css';

export default function Navbar() {
  return <div className='logoContainer'>
    <a href="/">
      <img
        className="logo"
        src={require("../../assets/logo.png")}
        alt=""
      />
    </a>
  </div>;
}
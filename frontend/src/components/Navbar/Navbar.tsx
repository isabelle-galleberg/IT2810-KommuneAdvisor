import './Navbar.css';

export default function Navbar() {
  return (
    <div className='navbar'>
      <a href='/kommuneadvisor'>
        <img
          className='logo'
          src={require('../../assets/logo.png')}
          alt='navbar'
        />
      </a>
    </div>
  );
}

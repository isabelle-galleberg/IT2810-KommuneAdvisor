import './Navbar.css';

export default function Navbar() {
  return (
    <div className='navbar'>
      <a href='/'>
        <img
          className='logo'
          src={require('../../assets/logo.png')}
          alt='navbar'
        />
      </a>
    </div>
  );
}

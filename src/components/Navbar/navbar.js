import { Link } from 'react-router-dom';
const Navbar = () => (
  <nav className="navbar navbar-expand navbar-dark bg-dark text-left">
    <div className="container">
      <Link className="navbar-brand" to="/"> <img src="https://www.mymoneykarma.com/assets/img/logo-light.png" width="40%"  /></Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/"><a className="nav-link">Home</a></Link>
          </li>
          <li className="nav-item">
            <Link to="/about"><a className="nav-link">About</a></Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
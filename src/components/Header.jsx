import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="header">
      <div className="brand">Game Vault</div>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/categoria/Jogos">Jogos</Link>
        <Link to="/categoria/Quadrinhos">Quadrinhos</Link>
        <Link to="/categoria/Séries">Séries</Link>
      </nav>
    </header>
  )
}

export default Header

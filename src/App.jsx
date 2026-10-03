import { BrowserRouter, Link, Route, Routes, useParams } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Card from './components/Card'
import { catalog, categories } from './data/catalog'

function HomePage({ favorites, onFavorite }) {
  return (
    <section className="content-section">
      <div className="hero">
        <div className="hero-text">
          <p className="eyebrow">Catálogo geek</p>
          <h1>Minha coleção favorita</h1>
          <p>Explore jogos, quadrinhos e séries em um só lugar.</p>
        </div>

        <div className="category-buttons">
          {categories.map((category) => (
            <Link key={category} className="category-button" to={`/categoria/${category}`}>
              {category}
            </Link>
          ))}
        </div>
      </div>

      <div className="card-grid">
        {catalog.map((item) => (
          <Card
            key={item.id}
            item={item}
            isFavorite={favorites.includes(item.id)}
            onFavorite={onFavorite}
          />
        ))}
      </div>
    </section>
  )
}

function CategoryPage({ favorites, onFavorite }) {
  const { categoryName } = useParams()
  const filteredItems = catalog.filter((item) => item.category === categoryName)

  return (
    <section className="content-section">
      <div className="section-top">
        <h2>{categoryName}</h2>
        <Link className="simple-link" to="/">
          Voltar para a home
        </Link>
      </div>

      <div className="card-grid">
        {filteredItems.map((item) => (
          <Card
            key={item.id}
            item={item}
            isFavorite={favorites.includes(item.id)}
            onFavorite={onFavorite}
          />
        ))}
      </div>
    </section>
  )
}

function DetailPage({ favorites, onFavorite }) {
  const { id } = useParams()
  const item = catalog.find((product) => product.id === Number(id))

  if (!item) {
    return <p>Item não encontrado.</p>
  }

  return (
    <section className="detail-page">
      <Link className="back-link" to="/">
        ← Voltar
      </Link>

      <div className="detail-card">
        <img src={item.image} alt={item.title} />

        <div className="detail-info">
          <span className="category-tag">{item.category}</span>
          <h2>{item.title}</h2>
          <p>{item.longDescription}</p>

          <div className="detail-meta">
            <span>⭐ {item.score}</span>
            <span>🎮 {item.genre}</span>
          </div>

          <button type="button" onClick={() => onFavorite(item.id)} className="favorite-button">
            {favorites.includes(item.id) ? 'Curtido' : 'Curtir'}
          </button>
        </div>
      </div>
    </section>
  )
}

function App() {
  const [favorites, setFavorites] = useState([1, 4])

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favoriteId) => favoriteId !== id))
      return
    }

    setFavorites([...favorites, id])
  }

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Header />

        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={<HomePage favorites={favorites} onFavorite={toggleFavorite} />}
            />
            <Route
              path="/categoria/:categoryName"
              element={<CategoryPage favorites={favorites} onFavorite={toggleFavorite} />}
            />
            <Route
              path="/detalhes/:id"
              element={<DetailPage favorites={favorites} onFavorite={toggleFavorite} />}
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App

import { Link } from 'react-router-dom'

function Card({ item, isFavorite, onFavorite }) {
  return (
    <article className="card">
      <img src={item.image} alt={item.title} />

      <div className="card-content">
        <div className="card-topline">
          <span className="category-tag">{item.category}</span>
          <span className="rating">⭐ {item.score}</span>
        </div>

        <h3>{item.title}</h3>
        <p>{item.description}</p>

        <div className="card-actions">
          <Link className="details-link" to={`/detalhes/${item.id}`}>
            Ver detalhes
          </Link>

          <button type="button" onClick={() => onFavorite(item.id)}>
            {isFavorite ? 'Curtido' : 'Curtir'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default Card

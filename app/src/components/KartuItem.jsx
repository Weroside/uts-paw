import { Link } from 'react-router-dom'

export default function KartuItem({ item }) {
  const { id, judul, kategori, tahunRilis, rating } = item
  return (
    <article className="kartu">
      <h2><Link to={`/koleksi/${id}`}>{judul}</Link></h2>
      <p>{kategori} · {tahunRilis}</p>
      <p>Rating: {rating}/10</p>
    </article>
  )
}
import { Link, useNavigate, useParams } from 'react-router-dom'
import useKoleksi from '../hooks/useKoleksi.js'

export default function Detail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { items, loading, error, hapus } = useKoleksi()
  const item = items.find((data) => String(data.id) === id)
  if (loading) return <p>Memuat data...</p>
  if (error) return <p role="alert">Gagal memuat: {error}</p>
  if (!item) return (
    <section><h1>Tontonan tidak ditemukan</h1><Link to="/koleksi">Kembali ke koleksi</Link></section>
  )
  const konfirmasiHapus = () => {
    if (window.confirm(`Hapus "${item.judul}" dari koleksi?`)) {
      hapus(item.id)
      navigate('/koleksi')
    }
  }
  return (
    <section>
      <h1>{item.judul}</h1>
      <dl>
        <dt>ID</dt><dd>{item.id}</dd>
        <dt>Kategori</dt><dd>{item.kategori}</dd>
        <dt>Sutradara</dt><dd>{item.sutradara}</dd>
        <dt>Tahun Rilis</dt><dd>{item.tahunRilis}</dd>
        <dt>Rating</dt><dd>{item.rating}/10</dd>
      </dl>
      <div className="aksi">
        <button type="button" onClick={konfirmasiHapus}>Hapus</button>
        <Link to="/koleksi">Kembali ke koleksi</Link>
      </div>
    </section>
  )
}
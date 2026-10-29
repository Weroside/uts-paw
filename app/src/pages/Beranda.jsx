import { Link } from 'react-router-dom'
import useKoleksi from '../hooks/useKoleksi.js'
import mahasiswa from '../../mahasiswa.json'

export default function Beranda() {
  const { items, loading, error } = useKoleksi()
  const jumlahKategori = new Set(items.map((item) => item.kategori)).size
  return (
    <section>
      <h1>Catatan Tontonan</h1>
      <p>Tema: {mahasiswa.tema}</p>
      <p>Tempat mencatat film dan serial yang ingin saya tonton.</p>
      {loading ? <p>Memuat ringkasan...</p> : error ?
        <p role="alert">Gagal memuat: {error}</p> :
        <p>Ada {items.length} tontonan dalam {jumlahKategori} kategori.</p>}
      <Link to="/koleksi">Lihat koleksi tontonan</Link>
    </section>
  )
}
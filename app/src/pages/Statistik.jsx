import useKoleksi from '../hooks/useKoleksi.js'
import './Statistik.css'

export default function Statistik() {
  const { items, loading, error } = useKoleksi()
  if (loading) return <p>Memuat statistik...</p>
  if (error) return <p role="alert">Gagal memuat: {error}</p>
  const perKategori = items.reduce((hitung, { kategori }) => ({
    ...hitung, [kategori]: (hitung[kategori] ?? 0) + 1,
  }), {})
  return (
    <section>
      <h1>Statistik Tontonan</h1>
      <div className="tabel-gulir">
        <table className="tabel-data">
          <thead><tr><th scope="col">Kategori</th><th scope="col">Jumlah</th></tr></thead>
          <tbody>
            {Object.entries(perKategori).map(([kategori, jumlah]) => (
              <tr key={kategori}><td>{kategori}</td><td>{jumlah}</td></tr>
            ))}
          </tbody>
          <tfoot><tr><th scope="row">Total</th><td>{items.length}</td></tr></tfoot>
        </table>
      </div>
    </section>
  )
}
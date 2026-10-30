import { useState } from 'react'
import useKoleksi from '../hooks/useKoleksi.js'
import KotakPencarian from '../components/KotakPencarian.jsx'
import FilterKategori from '../components/FilterKategori.jsx'
import KartuItem from '../components/KartuItem.jsx'

export default function Koleksi() {
  const { items, loading, error } = useKoleksi()
  const [cari, setCari] = useState('')
  const [kategori, setKategori] = useState('')
  if (loading) return <p>Memuat data...</p>
  if (error) return <p role="alert">Gagal memuat: {error}</p>
  const daftarKategori = [...new Set(items.map((item) => item.kategori))]
  const tampil = items.filter((item) =>
    item.judul.toLowerCase().includes(cari.trim().toLowerCase()) &&
    (kategori === '' || item.kategori === kategori),
  )
  return (
    <section>
      <h1>Koleksi Tontonan</h1>
      <div className="alat-koleksi">
        <KotakPencarian nilai={cari} onUbah={setCari} />
        <FilterKategori daftar={daftarKategori} nilai={kategori} onUbah={setKategori} />
      </div>
      {tampil.length === 0 ? <p>Belum ada tontonan yang cocok.</p> :
        <div className="daftar-kartu">
          {tampil.map((item) => <KartuItem key={item.id} item={item} />)}
        </div>}
    </section>
  )
}
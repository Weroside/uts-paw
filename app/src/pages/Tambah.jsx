import { useNavigate } from 'react-router-dom'
import useKoleksi from '../hooks/useKoleksi.js'
import FormItem from '../components/FormItem.jsx'
import './Tambah.css'

export default function Tambah() {
  const { tambah, loading, error } = useKoleksi()
  const navigate = useNavigate()
  const simpan = (item) => {
    tambah(item)
    navigate('/koleksi')
  }
  if (loading) return <p>Memuat data...</p>
  if (error) return <p role="alert">Gagal memuat: {error}</p>
  return (
    <section>
      <h1>Tambah Tontonan</h1>
      <p>Isi judulnya terlebih dahulu. Informasi lain bisa memakai nilai bawaan.</p>
      <FormItem onSimpan={simpan} />
    </section>
  )
}
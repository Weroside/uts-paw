import { useState } from 'react'

const AWAL = { judul: '', kategori: 'Drama', sutradara: '', tahunRilis: '2026', rating: '0' }
const KATEGORI = ['Drama', 'Aksi', 'Komedi', 'Misteri', 'Fiksi Ilmiah', 'Fantasi', 'Musikal', 'Romansa', 'Petualangan', 'Dokumenter']

export default function FormItem({ onSimpan }) {
  const [form, setForm] = useState(AWAL)
  const [galat, setGalat] = useState('')
  const ubah = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const simpan = (e) => {
    e.preventDefault()
    if (!form.judul.trim()) {
      setGalat('Judul wajib diisi.')
      return
    }
    const tahunRilis = form.tahunRilis === '' ? 2026 : Number(form.tahunRilis)
    const rating = form.rating === '' ? 0 : Number(form.rating)
    if (!Number.isInteger(tahunRilis) || tahunRilis < 1888 || tahunRilis > 2100) {
      setGalat('Tahun rilis harus berupa angka antara 1888 dan 2100.')
      return
    }
    if (!Number.isFinite(rating) || rating < 0 || rating > 10) {
      setGalat('Rating harus berada di antara 0 dan 10.')
      return
    }
    setGalat('')
    onSimpan({ ...form, judul: form.judul.trim(), sutradara: form.sutradara.trim() || 'Belum dicatat', tahunRilis, rating })
  }
  return (
    <form className="formulir" onSubmit={simpan} noValidate>
      <label htmlFor="judul">Judul</label>
      <input id="judul" name="judul" value={form.judul} onChange={ubah} />
      {galat && <p role="alert">{galat}</p>}
      <label htmlFor="kategori">Kategori</label>
      <select id="kategori" name="kategori" value={form.kategori} onChange={ubah}>
        {KATEGORI.map((kategori) => <option key={kategori}>{kategori}</option>)}
      </select>
      <label htmlFor="sutradara">Sutradara</label>
      <input id="sutradara" name="sutradara" value={form.sutradara} onChange={ubah} />
      <label htmlFor="tahunRilis">Tahun Rilis</label>
      <input id="tahunRilis" name="tahunRilis" type="number" value={form.tahunRilis} onChange={ubah} />
      <label htmlFor="rating">Rating</label>
      <input id="rating" name="rating" type="number" step="0.1" value={form.rating} onChange={ubah} />
      <button type="submit">Simpan</button>
    </form>
  )
}
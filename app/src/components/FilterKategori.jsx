export default function FilterKategori({ daftar, nilai, onUbah }) {
  return (
    <select aria-label="Kategori" value={nilai} onChange={(e) => onUbah(e.target.value)}>
      <option value="">Semua</option>
      {daftar.map((kategori) => <option key={kategori} value={kategori}>{kategori}</option>)}
    </select>
  )
}
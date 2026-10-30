export default function KotakPencarian({ nilai, onUbah }) {
  return (
    <input type="search" aria-label="Cari judul" placeholder="Cari judul tontonan..."
      value={nilai} onChange={(e) => onUbah(e.target.value)} />
  )
}
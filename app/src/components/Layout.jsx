import { NavLink, Outlet } from 'react-router-dom'
import './Layout.css'

const MENU = [
  { ke: '/', label: 'Beranda' },
  { ke: '/koleksi', label: 'Koleksi' },
  { ke: '/tambah', label: 'Tambah' },
  { ke: '/statistik', label: 'Statistik' },
  { ke: '/tentang', label: 'Tentang' },
]

export default function Layout() {
  return (
    <div className="kerangka">
      <header id="kepala-situs" className="kepala">
        <strong className="merek">Catatan Tontonan</strong>
        <nav className="menu" aria-label="Navigasi utama">
          {MENU.map(({ ke, label }) => (
            <NavLink key={ke} to={ke} end={ke === '/'}>{label}</NavLink>
          ))}
        </nav>
      </header>
      <main id="isi-utama" className="isi"><Outlet /></main>
      <footer id="kaki-situs" className="kaki">
        Richard Halim · UTS Pengembangan Aplikasi Web
      </footer>
    </div>
  )
}
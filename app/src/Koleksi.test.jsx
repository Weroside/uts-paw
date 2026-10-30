import { cleanup, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import App from './App.jsx'

const DATA = [
  { id: '1', judul: 'Senja di Pelabuhan', kategori: 'Drama', sutradara: 'Ardi Pramana', tahunRilis: 2017, rating: 7 },
  { id: '2', judul: 'Jejak di Utara', kategori: 'Misteri', sutradara: 'Nadia Putri', tahunRilis: 2018, rating: 7.1 },
]

beforeEach(() => {
  localStorage.clear()
  vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true, json: async () => DATA })))
})
afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})
function buka(path) {
  return render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>)
}

test('koleksi menampilkan data hasil fetch', async () => {
  buka('/koleksi')
  expect(await screen.findByRole('link', { name: 'Senja di Pelabuhan' })).toBeTruthy()
  expect(screen.getByRole('link', { name: 'Jejak di Utara' })).toBeTruthy()
})

test('pencarian menyaring judul tanpa membedakan huruf besar', async () => {
  const user = userEvent.setup()
  buka('/koleksi')
  await screen.findByText('Senja di Pelabuhan')
  await user.type(screen.getByRole('searchbox'), 'SENJA')
  expect(screen.getByText('Senja di Pelabuhan')).toBeTruthy()
  expect(screen.queryByText('Jejak di Utara')).toBeNull()
})

test('filter kategori menampilkan kategori yang dipilih', async () => {
  const user = userEvent.setup()
  buka('/koleksi')
  await screen.findByText('Senja di Pelabuhan')
  await user.selectOptions(screen.getByRole('combobox', { name: 'Kategori' }), 'Misteri')
  expect(screen.queryByText('Senja di Pelabuhan')).toBeNull()
  expect(screen.getByText('Jejak di Utara')).toBeTruthy()
})

test('judul berisi spasi ditolak', async () => {
  const user = userEvent.setup()
  buka('/tambah')
  await screen.findByLabelText('Judul')
  await user.type(screen.getByLabelText('Judul'), '   ')
  await user.click(screen.getByRole('button', { name: 'Simpan' }))
  expect(screen.getByRole('alert').textContent).toContain('Judul wajib diisi')
})

test('tambah menyimpan item dan tetap ada setelah aplikasi dibuka ulang', async () => {
  const user = userEvent.setup()
  const tampilan = buka('/tambah')
  await screen.findByLabelText('Judul')
  await user.type(screen.getByLabelText('Judul'), 'Jalan Pulang')
  await user.click(screen.getByRole('button', { name: 'Simpan' }))
  expect(await screen.findByRole('link', { name: 'Jalan Pulang' })).toBeTruthy()
  await waitFor(() => {
    expect(JSON.parse(localStorage.getItem('uts-paw-koleksi')).some((item) => item.judul === 'Jalan Pulang')).toBe(true)
  })
  tampilan.unmount()
  buka('/koleksi')
  expect(await screen.findByRole('link', { name: 'Jalan Pulang' })).toBeTruthy()
})

test('detail menampilkan ketiga field tema', async () => {
  buka('/koleksi/1')
  await screen.findByRole('heading', { name: 'Senja di Pelabuhan' })
  for (const label of ['Sutradara', 'Tahun Rilis', 'Rating']) expect(screen.getByText(label)).toBeTruthy()
  expect(screen.getByText('Ardi Pramana')).toBeTruthy()
})

test('id yang tidak ada menampilkan pesan tanpa 404', async () => {
  buka('/koleksi/tidak-ada')
  expect(await screen.findByRole('heading', { name: /tidak ditemukan/i })).toBeTruthy()
  expect(screen.queryByText('404')).toBeNull()
})

test('hapus dengan konfirmasi menghapus item dan menyimpan hasilnya', async () => {
  const user = userEvent.setup()
  vi.spyOn(window, 'confirm').mockReturnValue(true)
  buka('/koleksi/1')
  await screen.findByRole('button', { name: 'Hapus' })
  await user.click(screen.getByRole('button', { name: 'Hapus' }))
  await screen.findByRole('heading', { name: 'Koleksi Tontonan' })
  expect(screen.queryByRole('link', { name: 'Senja di Pelabuhan' })).toBeNull()
  await waitFor(() => expect(JSON.parse(localStorage.getItem('uts-paw-koleksi')).length).toBe(1))
})

test('membatalkan hapus mempertahankan item', async () => {
  const user = userEvent.setup()
  vi.spyOn(window, 'confirm').mockReturnValue(false)
  buka('/koleksi/1')
  await screen.findByRole('button', { name: 'Hapus' })
  await user.click(screen.getByRole('button', { name: 'Hapus' }))
  expect(screen.getByRole('heading', { name: 'Senja di Pelabuhan' })).toBeTruthy()
})

test('statistik menampilkan tabel dan total', async () => {
  buka('/statistik')
  const tabel = await screen.findByRole('table')
  const barisTotal = within(tabel).getByRole('row', { name: 'Total 2' })
  expect(barisTotal).toBeTruthy()
})

test('gagal fetch menampilkan pesan error', async () => {
  vi.stubGlobal('fetch', vi.fn(async () => { throw new Error('Koneksi terputus') }))
  buka('/koleksi')
  expect((await screen.findByRole('alert')).textContent).toContain('Koneksi terputus')
})

test('rute tidak dikenal menampilkan halaman 404', () => {
  buka('/alamat-asing')
  expect(screen.getByRole('heading', { name: '404' })).toBeTruthy()
  expect(screen.getByRole('link', { name: 'Kembali ke beranda' })).toBeTruthy()
})
import mahasiswa from '../../mahasiswa.json'

const REPO = 'https://github.com/Weroside/uts-paw'

export default function Tentang() {
  const { nama, nim, kelas, tema } = mahasiswa
  return (
    <section>
      <h1>Tentang</h1>
      <p>Aplikasi ini saya gunakan untuk menyusun daftar tontonan dan melihat koleksinya berdasarkan kategori.</p>
      <dl>
        <dt>Nama</dt><dd>{nama}</dd>
        <dt>NIM</dt><dd>{nim}</dd>
        <dt>Kelas</dt><dd>{kelas}</dd>
        <dt>Tema</dt><dd>{tema}</dd>
      </dl>
      <p>Kode sumber: <a href={REPO}>{REPO}</a></p>
    </section>
  )
}
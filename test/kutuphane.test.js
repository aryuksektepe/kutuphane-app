'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const depo = require('../src/depo');
const { kitapEkle, kitaplariListele } = require('../src/kitap');
const { oduncVer } = require('../src/odunc');
const { iadeAl } = require('../src/iade');
const { stokGetir } = require('../src/stok');

test.beforeEach(() => {
  depo.depoyuSifirla();
});

test('kitap eklendiğinde listede görünür ve stoğu adet kadar olur', () => {
  const kitap = kitapEkle('Simyacı', 'Paulo Coelho', 3);
  assert.equal(kitaplariListele().length, 1);
  assert.equal(kitap.toplamStok, 3);
  assert.equal(kitap.mevcutStok, 3);
});

test('başlıksız kitap eklenemez', () => {
  assert.throws(() => kitapEkle('   ', 'Yazar', 2), /boş olamaz/);
});

test('kitap ödünç verildiğinde stok bir azalır', () => {
  const kitap = kitapEkle('1984', 'George Orwell', 2);
  oduncVer(kitap.id, 'Ahmet');
  assert.equal(stokGetir(kitap.id), 1);
});

test('stoğu biten kitap ödünç verilemez', () => {
  const kitap = kitapEkle('Körlük', 'Jose Saramago', 1);
  oduncVer(kitap.id, 'Ahmet');
  assert.throws(() => oduncVer(kitap.id, 'Mehmet'), /kalmadı/);
});

test('kitap iade edildiğinde ödünç kaydı kapanır', () => {
  const kitap = kitapEkle('Suç ve Ceza', 'Dostoyevski', 2);
  const kayit = oduncVer(kitap.id, 'Ahmet');
  const guncelKayit = iadeAl(kayit.id);
  assert.ok(guncelKayit.iadeTarihi, 'iade tarihi dolu olmalı');
});

test('zaten iade edilmiş bir kayıt tekrar iade edilemez', () => {
  const kitap = kitapEkle('Fareler ve İnsanlar', 'John Steinbeck', 1);
  const kayit = oduncVer(kitap.id, 'Ahmet');
  iadeAl(kayit.id);
  assert.throws(() => iadeAl(kayit.id), /zaten iade edilmiş/);
});


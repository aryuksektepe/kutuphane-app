'use strict';

// Bellek içi (in-memory) veri deposu.
// Uygulama kapanınca veriler kaybolur; bu lab için yeterli.
//
// kitaplar: { id, baslik, yazar, toplamStok, mevcutStok }
// oduncKayitlari: { id, kitapId, kisi, oduncTarihi, iadeTarihi }

let kitaplar = [];
let oduncKayitlari = [];
let sonrakiKitapId = 1;
let sonrakiOduncId = 1;

function depoyuSifirla() {
  kitaplar = [];
  oduncKayitlari = [];
  sonrakiKitapId = 1;
  sonrakiOduncId = 1;
}

function yeniKitapIdUret() {
  return sonrakiKitapId++;
}

function yeniOduncIdUret() {
  return sonrakiOduncId++;
}

function kitapEkle(kitap) {
  kitaplar.push(kitap);
  return kitap;
}

function kitaplariGetir() {
  return kitaplar;
}

function kitapBul(id) {
  return kitaplar.find((k) => k.id === id);
}

function oduncEkle(kayit) {
  oduncKayitlari.push(kayit);
  return kayit;
}

function oduncKayitlariniGetir() {
  return oduncKayitlari;
}

function oduncBul(id) {
  return oduncKayitlari.find((k) => k.id === id);
}

// Bir kitabın mevcut stoğunu belirtilen miktar kadar artırır.
function stokArtir(kitapId, miktar) {
  const kitap = kitapBul(kitapId);
  if (!kitap) {
    throw new Error(`${kitapId} numaralı kitap bulunamadı.`);
  }
  kitap.mevcutStok += miktar;
  return kitap;
}

// Bir kitabın mevcut stoğunu belirtilen miktar kadar azaltır.
function stokAzalt(kitapId, miktar) {
  const kitap = kitapBul(kitapId);
  if (!kitap) {
    throw new Error(`${kitapId} numaralı kitap bulunamadı.`);
  }
  kitap.mevcutStok -= miktar;
  return kitap;
}

module.exports = {
  depoyuSifirla,
  yeniKitapIdUret,
  yeniOduncIdUret,
  kitapEkle,
  kitaplariGetir,
  kitapBul,
  oduncEkle,
  oduncKayitlariniGetir,
  oduncBul,
  stokArtir,
  stokAzalt,
};

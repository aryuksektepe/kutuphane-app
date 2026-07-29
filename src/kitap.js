'use strict';

const depo = require('./depo');

// Yeni bir kitap ekler. `adet`, kütüphanenin sahip olduğu toplam kopya sayısıdır;
// başlangıçta tüm kopyalar rafta olduğu için mevcutStok da aynı değerle başlar.
function kitapEkle(baslik, yazar, adet) {
  if (!baslik || !baslik.trim()) {
    throw new Error('Kitap başlığı boş olamaz.');
  }
  if (!Number.isInteger(adet) || adet < 1) {
    throw new Error('Adet en az 1 olan bir tam sayı olmalı.');
  }

  const kitap = {
    id: depo.yeniKitapIdUret(),
    baslik: baslik.trim(),
    yazar: (yazar || '').trim(),
    toplamStok: adet,
    mevcutStok: adet,
  };

  depo.kitapEkle(kitap);
  return kitap;
}

// Tüm kitapları listeler.
function kitaplariListele() {
  return depo.kitaplariGetir();
}

module.exports = { kitapEkle, kitaplariListele };

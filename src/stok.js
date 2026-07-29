'use strict';

const depo = require('./depo');

// Bir kitabın güncel stok sayısını döndürür.
function stokGetir(kitapId) {
  const kitap = depo.kitapBul(kitapId);
  if (!kitap) {
    throw new Error(`${kitapId} numaralı kitap bulunamadı.`);
  }
  return kitap.mevcutStok;
}

module.exports = { stokGetir };

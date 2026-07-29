'use strict';

const depo = require('./depo');
const odunc = require('./odunc');

// Bir kitabı iade alır: ödünç kaydını kapatır ve kitabı stoğa geri koyar.
function iadeAl(oduncId) {
  const kayit = depo.oduncBul(oduncId);
  if (!kayit) {
    throw new Error(`${oduncId} numaralı ödünç kaydı bulunamadı.`);
  }
  if (kayit.iadeTarihi) {
    throw new Error('Bu ödünç kaydı zaten iade edilmiş.');
  }

  // Ödünç kaydını "iade edildi" olarak güncelle.
  odunc.oduncKaydiGuncelle(oduncId, { iadeTarihi: new Date().toISOString() });

  // İade edilen kitabı tekrar rafa koy: stoğu bir artır.
  depo.stokArtir(kayit.kitapId, 1);

  return kayit;
}

module.exports = { iadeAl };

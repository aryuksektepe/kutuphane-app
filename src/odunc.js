'use strict';

const depo = require('./depo');

// Bir kitabı ödünç verir: stoğu bir azaltır ve bir ödünç kaydı oluşturur.
function oduncVer(kitapId, kisi) {
  const kitap = depo.kitapBul(kitapId);
  if (!kitap) {
    throw new Error(`${kitapId} numaralı kitap bulunamadı.`);
  }
  if (!kisi || !kisi.trim()) {
    throw new Error('Ödünç alan kişi belirtilmeli.');
  }
  if (kitap.mevcutStok < 1) {
    throw new Error('Bu kitaptan ödünç verilecek kopya kalmadı.');
  }

  depo.stokAzalt(kitapId, 1);

  const kayit = {
    id: depo.yeniOduncIdUret(),
    kitapId,
    kisi: kisi.trim(),
    oduncTarihi: new Date().toISOString(),
    iadeTarihi: null,
  };

  depo.oduncEkle(kayit);
  return kayit;
}

// Bir ödünç kaydını günceller (genel amaçlı güncelleme fonksiyonu).
function oduncKaydiGuncelle(oduncId, guncelleme) {
  const kayit = depo.oduncBul(oduncId);
  if (!kayit) {
    throw new Error(`${oduncId} numaralı ödünç kaydı bulunamadı.`);
  }

  const ilkIadeTarihiVardiMi = Boolean(kayit.iadeTarihi);
  Object.assign(kayit, guncelleme);

  // Kayıt ilk kez "iade edildi" olarak işaretleniyorsa, kitabı rafa
  // geri koymak bu güncellemenin de sorumluluğu: iade edilen bir kayıt
  // güncellenince kitabın stoğu burada da bir artırılıyor.
  if (!ilkIadeTarihiVardiMi && kayit.iadeTarihi) {
    depo.stokArtir(kayit.kitapId, 1);
  }

  return kayit;
}

function oduncKayitlariniListele() {
  return depo.oduncKayitlariniGetir();
}

module.exports = { oduncVer, oduncKaydiGuncelle, oduncKayitlariniListele };

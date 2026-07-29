#!/usr/bin/env node
'use strict';

// Kütüphane ödünç takip uygulaması — minimal HTTP sunucusu.
// Sıfır harici bağımlılık; sadece Node.js'in yerleşik `http` modülü kullanılır.
//
// Uç noktalar:
//   POST /kitaplar        { baslik, yazar, adet }         -> yeni kitap ekler
//   GET  /kitaplar                                        -> tüm kitapları listeler
//   POST /odunc           { kitapId, kisi }                -> kitabı ödünç verir
//   POST /iade            { oduncId }                      -> kitabı iade alır
//   GET  /stok/:kitapId                                    -> kitabın güncel stoğu

const http = require('node:http');

const { kitapEkle, kitaplariListele } = require('./src/kitap');
const { oduncVer } = require('./src/odunc');
const { iadeAl } = require('./src/iade');
const { stokGetir } = require('./src/stok');

const PORT = process.env.PORT || 3000;

function govdeyiOku(req) {
  return new Promise((resolve, reject) => {
    let veri = '';
    req.on('data', (parca) => {
      veri += parca;
    });
    req.on('end', () => {
      if (!veri) return resolve({});
      try {
        resolve(JSON.parse(veri));
      } catch (hata) {
        reject(new Error('Geçersiz JSON gövdesi.'));
      }
    });
    req.on('error', reject);
  });
}

function jsonYaz(res, durumKodu, veri) {
  const govde = JSON.stringify(veri);
  res.writeHead(durumKodu, { 'Content-Type': 'application/json' });
  res.end(govde);
}

async function istekYoneticisi(req, res) {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  try {
    if (req.method === 'POST' && url.pathname === '/kitaplar') {
      const { baslik, yazar, adet } = await govdeyiOku(req);
      const kitap = kitapEkle(baslik, yazar, adet);
      return jsonYaz(res, 201, kitap);
    }

    if (req.method === 'GET' && url.pathname === '/kitaplar') {
      return jsonYaz(res, 200, kitaplariListele());
    }

    if (req.method === 'POST' && url.pathname === '/odunc') {
      const { kitapId, kisi } = await govdeyiOku(req);
      const kayit = oduncVer(Number(kitapId), kisi);
      return jsonYaz(res, 201, kayit);
    }

    if (req.method === 'POST' && url.pathname === '/iade') {
      const { oduncId } = await govdeyiOku(req);
      const kayit = iadeAl(Number(oduncId));
      return jsonYaz(res, 200, kayit);
    }

    const stokEslesme = url.pathname.match(/^\/stok\/(\d+)$/);
    if (req.method === 'GET' && stokEslesme) {
      const kitapId = Number(stokEslesme[1]);
      return jsonYaz(res, 200, { kitapId, stok: stokGetir(kitapId) });
    }

    return jsonYaz(res, 404, { hata: 'Bulunamadı.' });
  } catch (hata) {
    return jsonYaz(res, 400, { hata: hata.message });
  }
}

const sunucu = http.createServer((req, res) => {
  istekYoneticisi(req, res).catch((hata) => {
    jsonYaz(res, 500, { hata: hata.message });
  });
});

if (require.main === module) {
  sunucu.listen(PORT, () => {
    console.log(`Kütüphane uygulaması http://localhost:${PORT} adresinde çalışıyor.`);
  });
}

module.exports = { sunucu };

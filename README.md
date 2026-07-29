# kutuphane-app

Küçük bir kütüphane ödünç takip uygulaması. **Claude Code ile Yazılım Geliştirme** kursunun
**Lab 3**'ü için hazırlandı: bu repoyu fork'layıp bir bug'ı keşfedecek, reprodüksiyon testi
yazacak, düzeltecek ve kendi fork'unuzda bir PR açacaksınız.

> **Kullanıcı raporu:** "Bir kitap iade edildiğinde stok sayısı bazen ikiye katlanıyor."

Bu repo bilinçli olarak buglu bırakılmıştır. Belirti görünür, kök neden ilk bakışta görünmez —
gerçek bir projede karşılaşacağınız türden bir hata.

## Kurulum ve çalıştırma

```bash
npm test      # bağımlılık yok; Node 18+ yeterli
npm start     # http://localhost:3000
```

`npm test` başlangıçta **6 testin 6'sını da yeşil** gösterir. Bug'ı kanıtlayan reprodüksiyon
testini siz ekleyeceksiniz — test kırmızıya döndüğünde hatayı yakalamışsınız demektir.

## Uç noktalar

| Yöntem | Yol | Gövde |
|--------|-----|-------|
| `POST` | `/kitaplar` | `{ baslik, yazar, adet }` |
| `GET` | `/kitaplar` | — |
| `POST` | `/odunc` | `{ kitapId, kisi }` |
| `POST` | `/iade` | `{ oduncId }` |
| `GET` | `/stok/:kitapId` | — |

## Lab akışı

Adım adım görevler, ön koşullar ve kontrol noktaları için dersin kaynaklarındaki
`senaryo.md` dosyasını takip edin. Özet akış:

1. **Keşfet** — Plan mode'da projeyi okuyun, hiçbir şeyi değiştirmeden
2. **Reprodüksiyon** — hatayı gösteren, başarısız bir test yazın
3. **Düzelt** — kök nedeni giderin, test yeşile dönsün
4. **Commit** — anlamlı bir commit mesajıyla kaydedin
5. **PR** — `gh` CLI ile kendi fork'unuzda pull request açın

Kök nedeni kendi keşfinizle bulmanız lab'ın asıl değeridir. Çözüm bu repoda yok; dersin
kaynaklarındaki zip'in `cozum/` klasöründe, yalnızca gerçekten tıkandığınızda bakmanız için.

## Yapı

```
server.js              HTTP sunucusu ve yönlendirme
src/kitap.js           kitap ekleme ve listeleme
src/odunc.js           ödünç verme ve ödünç kaydı güncelleme
src/iade.js            iade alma
src/stok.js            stok sorgulama
src/depo.js            bellek içi veri deposu
test/kutuphane.test.js mevcut testler
```

## Lisans

Eğitim amaçlı kullanım içindir.

Hilton Hotel Personel Karar Destek Sistemi (KDS)
Bu proje, İzmir bölgesindeki Hilton Hotel operasyonları için geliştirilmiş, veri odaklı bir Personel Karar Destek Sistemi (KDS) uygulamasıdır. Sistem; doluluk oranları, verimlilik metrikleri ve personel devir oranlarını analiz ederek yöneticilerin operasyonel kararlarını optimize etmeyi amaçlar.

Kullanılan Teknolojiler
Frontend: React (Vite), Leaflet (Harita), Chart.js (Veri Görselleştirme).

Backend: Node.js, Express.js.

Veritabanı: MySQL.

Mimari: Model-View-Controller (MVC) / Katmanlı Mimari.

Proje Yapısı (Layered Architecture)
Proje, sunucu tabanlı programlama prensiplerine uygun olarak katmanlı bir yapıda kurgulanmıştır:

Routes: API uç noktalarının (endpoints) tanımlandığı katman.

Controllers: İş mantığının (Business Logic) ve hata yönetiminin yürütüldüğü katman.

Models: Veritabanı sorgularının ve veri erişiminin yönetildiği katman.

Config/DB: Veritabanı bağlantısı ve çevre değişkenlerinin (Environment) yapılandırıldığı katman.

İş Kuralları ve Senaryolar (Business Rules)
Projenin veri güvenliğini ve operasyonel zekasını sağlamak amacıyla veritabanı seviyesinde çalışan 3 adet SQL Trigger (Tetikleyici) geliştirilmiştir. Bu kurallar manuel müdahaleye gerek kalmadan otomatik olarak çalışır:

Senaryo 1: Hatalı Veri Girişini Engelleme (Data Validation)
Açıklama: Otelcilik matematiğinde doluluk oranı %0'ın altında veya %100'ün üzerinde olamaz. Kullanıcı hatalarını önlemek için bu kontrol veritabanında sağlanır.

Uygulama: Veri girişi veya güncellemesi sırasında doluluk_orani kontrol edilir.

Eğer değer > 100 veya < 0 ise; sistem işlemi reddeder ve "HATA: Doluluk oranı %100 den büyük olamaz!" veya "negatif olamaz" uyarısını döndürür.

Senaryo 2: Otomatik Risk Analizi ve Sınıflandırma
Açıklama: Yöneticilerin her departmanı tek tek incelemesine gerek kalmadan, iş yükü yoğunluğu sistem tarafından otomatik olarak etiketlenir.

Uygulama: Kayıt eklenirken veya güncellenirken fazla_mesai_saati verisine bakılır ve risk_durumu sütunu otomatik hesaplanır:

> 40 Saat: 'KRITIK' (Kırmızı Alarm)

> 20 Saat: 'YUKSEK' (Sarı Alarm)

Diğerleri: 'NORMAL' (Yeşil)

Senaryo 3: Veri Güncelliği Takibi (Audit Trail)
Açıklama: Veriler üzerinde yapılan her değişikliğin zaman damgası tutulmalıdır.

Uygulama: Bir kayıt üzerinde güncelleme yapıldığında, guncelleme_tarihi sütunu manuel giriş gerektirmeden otomatik olarak o anki sunucu saatine (NOW()) eşitlenir.

Uygulama: Backend katmanında hesaplanan bu risk durumu, frontend tarafında kullanıcıya görsel uyarılar (kırmızı renk kodları) olarak sunulur.

API Endpoint Listesi
Sistem, RESTful API standartlarında şu uç noktaları sağlar:

GET /api/dashboard/summary: Sistem genelindeki temel KPI özetlerini döner.

GET /api/trends/:districtId: Belirli bir bölgenin dönemsel trend analizlerini sağlar.

GET /api/dashboard/kds-analytics/:districtId: Departman bazlı personel ihtiyacı ve risk analizini sunar.

ER Diyagramı
Veritabanı mimarisi, ilçeler, iş yükü verileri ve departman standartları arasındaki ilişkileri 3. Normal Form (3NF) kurallarına uygun şekilde organize eder.

Kurulum ve Çalıştırma
1. Çevre Değişkenleri (.env)
Projenin çalışması için backend klasöründe bir .env dosyası oluşturulmalı ve şu bilgiler tanımlanmalıdır:

Kod snippet'i

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=personel_kds
DB_PORT=8889
PORT=5001
(Not: Frontend tarafında VITE_API_BASE=http://localhost:5001 değişkeni kullanılmaktadır.)

2. Çalıştırma Komutları
Backend: node app.js

Frontend: npm run dev

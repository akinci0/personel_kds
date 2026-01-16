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
Projenin veri bütünlüğünü sağlamak amacıyla en az 2 özel iş senaryosu veritabanı seviyesinde SQL Triggers (Tetikleyiciler) kullanılarak uygulanmıştır:

Senaryo 1: Geçmiş Verilerin Korunması (Silme Engeli)
Açıklama: Tarihsel analizlerin ve raporların doğruluğunu korumak adına, geçmiş dönemlere ait operasyonel veriler sistemden silinemez.

Uygulama: is_yuku tablosu üzerinde tanımlı olan BEFORE DELETE tetikleyicisi, silinmek istenen kaydın tarihini bugünün tarihiyle kıyaslar ve geçmiş veriler için işlemi SIGNAL SQLSTATE ile engeller.

Senaryo 2: Kritik Risk Tespiti ve Görselleştirme
Açıklama: Personel devir oranı (Turnover) %12'den yüksek veya fazla mesai saati 45 saati aşan bölgeler "KRİTİK" olarak işaretlenir.

Uygulama: Backend katmanında hesaplanan bu risk durumu, frontend tarafında kullanıcıya görsel uyarılar (kırmızı renk kodları) olarak sunulur.

API Endpoint Listesi
Sistem, RESTful API standartlarında şu uç noktaları sağlar:

GET /api/dashboard/summary: Sistem genelindeki temel KPI özetlerini döner.

GET /api/trends/:districtId: Belirli bir bölgenin dönemsel trend analizlerini sağlar.

GET /api/dashboard/kds-analytics/:districtId: Departman bazlı personel ihtiyacı ve risk analizini sunar.

DELETE /api/dashboard/workload/:id: Veri silme işlemi (İş kuralı tetikleyicisine tabidir).

📊 ER Diyagramı
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

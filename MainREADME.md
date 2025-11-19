# 🚀 16 Individual Fullstack Apps - Tələbə Layihələri

Bu repository 16 müxtəlif fullstack tətbiq üçün starter template-lərini ehtiva edir. Hər tələbə öz tətbiqini seçir və əvvəldən sonuna qədər tamamlayır.

## 📚 Tətbiqlər Siyahısı

| #   | Tətbiq                                     | Port | Çətinlik | Açıqlama                         |
| --- | ------------------------------------------ | ---- | -------- | -------------------------------- |
| 1   | [Meme Generator](./01-meme-generator/)     | 3000 | ⭐⭐     | Meme yaratmaq və saxlamaq        |
| 2   | [Trivia Quiz](./02-trivia-quiz/)           | 3001 | ⭐⭐     | Bilik yarışması oyunu            |
| 3   | [Todo Battle](./03-todo-battle/)           | 3002 | ⭐⭐⭐   | Gamified todo list - XP & levels |
| 4   | [Playlist Creator](./04-playlist-creator/) | 3003 | ⭐⭐     | Musiqi pleylist idarəetməsi      |
| 5   | [Recipe Roulette](./05-recipe-roulette/)   | 3004 | ⭐⭐     | Random yemək resepti generator   |
| 6   | [Mood Tracker](./06-mood-tracker/)         | 3005 | ⭐⭐     | Gündəlik əhval-ruhiyyə izləyici  |
| 7   | [Pomodoro Focus](./07-pomodoro-focus/)     | 3006 | ⭐⭐⭐   | Pomodoro timer və məhsuldarlıq   |
| 8   | [Habit Streak](./08-habit-streak/)         | 3007 | ⭐⭐⭐   | Vərdiş izləyici və streak        |
| 9   | [Quote Wall](./09-quote-wall/)             | 3008 | ⭐⭐     | Sitat paylaşma və voting         |
| 10  | [Draw & Guess](./10-draw-guess/)           | 3009 | ⭐⭐⭐⭐ | Canvas ilə rəsm çəkmə oyunu      |
| 11  | [Memory Game](./11-memory-game/)           | 3010 | ⭐⭐⭐   | Kart yaddaş oyunu                |
| 12  | [Speed Typing](./12-speed-typing/)         | 3011 | ⭐⭐⭐   | Yazı sürəti test                 |
| 13  | [Movie Voting](./13-movie-voting/)         | 3012 | ⭐⭐⭐   | Tinder-style film voting         |
| 14  | [Pet Collection](./14-pet-collection/)     | 3013 | ⭐⭐⭐⭐ | Virtual pet yığma və böyütmə     |
| 15  | [Expense Splitter](./15-expense-splitter/) | 3014 | ⭐⭐⭐⭐ | Qrup xərcləri bölüşdürücü        |
| 16  | [Chat Roulette](./16-chat-roulette/)       | 3015 | ⭐⭐⭐⭐ | Random anonim chat               |

## 🛠️ Texnologiyalar

Hər tətbiq eyni texnoloji yığından istifadə edir:

**Backend:**

- Node.js + Express
- TypeScript
- Zod (validation)
- Pino (logging)
- In-memory storage (Map/Array)

**Frontend:**

- HTML5
- CSS3
- Vanilla JavaScript

## 📁 Layihə Strukturu

Hər tətbiq aşağıdakı strukturu izləyir:

```
XX-app-name/
├── backend/
│   ├── src/
│   │   ├── types/          # TypeScript interface-lər
│   │   ├── validators/     # Zod validation schema-lar
│   │   ├── storage/        # In-memory data
│   │   ├── controllers/    # Request handler-lər
│   │   ├── routes/         # Express route-lar
│   │   └── server.ts       # Əsas server
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── README.md              # Layihə haqqında
├── TASKS.md              # Tapşırıqlar siyahısı
└── EXAMPLE.md            # API istifadə nümunələri
```

## 🚀 Başlamaq

### 1. Tətbiq Seçimi

Hər tələbə siyahıdan bir tətbiq seçir.

### 2. Quraşdırma

```bash
cd XX-app-name/backend
npm install
cp .env.example .env
npm run dev
```

### 3. Təlimatları Oxu

1. `README.md` - Layihə haqqında ümumi məlumat
2. `TASKS.md` - Addım-addım tapşırıqlar
3. `EXAMPLE.md` - API nümunələri

### 4. Kodlamağa Başla!

Backend-dən başla, sonra frontend-ə keç.

## 📋 Hər Layihədə Öyrənilənlər

### Backend Skills

- ✅ Express server quraşdırma
- ✅ TypeScript ilə type-safe development
- ✅ REST API design principles
- ✅ Zod ilə input validation
- ✅ Pino ilə structured logging
- ✅ Error handling patterns
- ✅ In-memory data management
- ✅ CORS və static file serving

### Frontend Skills

- ✅ Fetch API ilə backend communication
- ✅ DOM manipulation
- ✅ Event handling
- ✅ Form validation
- ✅ Responsive CSS layout
- ✅ CSS animations
- ✅ State management

### Fullstack Integration

- ✅ Frontend-Backend əlaqəsi
- ✅ JSON data exchange
- ✅ Error handling və feedback
- ✅ Loading states
- ✅ User experience patterns

## 🎯 Qiymətləndirmə Meyarları

Hər layihə aşağıdakı meyarlara görə qiymətləndirilir:

1. **Funksionallıq (40%)**
   - Bütün əsas funksiyalar işləyir
   - TASKS.md-dəki tapşırıqlar tamamlanıb
   - Error-sız işləyir

2. **Kod Keyfiyyəti (30%)**
   - TypeScript types düzgün istifadə olunub
   - Validation əlavə edilib
   - Logging implementasiya olunub
   - Kod təmiz və oxunaqlıdır

3. **UI/UX (20%)**
   - Responsive dizayn
   - İstifadəçi dostu interfeys
   - Loading və error state-lər
   - CSS animasiyaları

4. **Kreativlik (10%)**
   - Əlavə funksiyalar
   - Unikal dizayn elementləri
   - İnnovasiya

## 💡 Tövsiyələr

### İşə Başlamazdan Əvvəl

1. README.md faylını tam oxuyun
2. EXAMPLE.md-də API nümunələrinə baxın
3. TASKS.md-də tapşırıqları əvvəldən sona oxuyun
4. Layihə strukturunu başa düşün

### Development Zamanı

1. Kiçik addımlarla irəliləyin
2. Hər funksional ı test edin
3. Console-da error-lara baxın
4. Git ilə mütəmadi commit edin
5. Kod yazmadan əvvəl planlayın

### Sıxıldıqda

1. EXAMPLE.md faylına baxın
2. Console error mesajlarını oxuyun
3. Network tab-da request/response yoxlayın
4. README.md-də oxşar nümunələrə baxın
5. Müəllimdən kömək istəyin

## 🤝 Yardım və Dəstək

- Her bir layihənin EXAMPLE.md faylı çox detallı nümunələr ehtiva edir
- TASKS.md faylındakı hər tapşırıq kod nümunələri ilə təchiz olunub
- Sıxıldıqda müəllimdən və ya digər tələbələrdən kömək istəmək olar

## 📚 Resurslar

### Əsas Sənədlər

- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Quraşdırma təlimatı
- [ADD_RESOURCES.md](./ADD_RESOURCES.md) - Əlavə resurslar və linklər

### Texnologiya Dokumentasiyası

- [Express Documentation](https://expressjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zod Documentation](https://zod.dev/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Pino Logging](https://getpino.io/)

### Faydalı Alətlər

- [Postman](https://www.postman.com/) - API test üçün
- [Thunder Client](https://www.thunderclient.com/) - VS Code extension
- [Git](https://git-scm.com/) - Version control

## 💡 İpuçları

1. **Sənədləri oxuyun** - Hər app-in README, TASKS və EXAMPLE faylları var
2. **Addım-addım** - TASKS.md-dəki sıranı izləyin
3. **Test edin** - Hər funksiya yazdıqdan sonra test edin
4. **Git istifadə edin** - Hər feature üçün commit edin
5. **Kod oxuyun** - EXAMPLE.md-də API nümunələri var
6. **Kömək istəyin** - İlişdiyiniz zaman soruşun

## 🏆 Uğurlar!

Hər bir tətbiq sizin backend və frontend bacarıqlarınızı inkişaf etdirəcək. Əsas odur ki, mərhələ-mərhələ irəliləyəsiniz və hər addımı başa düşəsiniz.

**Unutmayın:** Kod yazmaq öyrənmə prosesidir. Səhv etmək normaldır, əsas odur ki, səhvlərdən öyrənək!

---

Yaradılıb ❤️ ilə Backend Development kursu üçün

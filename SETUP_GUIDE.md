# 🛠️ Quraşdırma və İstifadə Təlimatı

## 📋 Ön Şərtlər

Kompüterinizdə aşağıdakılar quraşdırılmalıdır:

- **Node.js** (v18 və ya daha yeni versiya)
- **npm** və ya **yarn**
- Kod editoru (VS Code tövsiyə olunur)

## 🚀 Başlamaq

### 1. App Seçin

16 app-dən birini seçin və onun folderinə keçin:

```bash
cd 01-meme-generator
# və ya
cd 05-recipe-roulette
# və s.
```

### 2. Backend Quraşdırın

```bash
cd backend
npm install
```

### 3. Environment Variables

`.env.example` faylını `.env` olaraq kopyalayın:

```bash
cp .env.example .env
```

Lazım olarsa `.env` faylındakı dəyərləri dəyişdirin.

### 4. Development Server-i Başladın

```bash
npm run dev
```

Server `http://localhost:PORT` ünvanında işə düşəcək (hər app-in öz portu var).

## 📁 Layihə Strukturu

```
your-app/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Request handler funksiyaları
│   │   ├── routes/           # Express route-lar
│   │   ├── types/            # TypeScript type və interface-lər
│   │   ├── validators/       # Zod validation schema-ları
│   │   ├── storage/          # In-memory data storage
│   │   └── server.ts         # Ana server fayl
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── frontend/
│   ├── index.html            # HTML
│   ├── style.css             # CSS
│   └── app.js                # JavaScript
├── README.md                 # Layihə haqqında məlumat
├── TASKS.md                  # Tapşırıqlar siyahısı
└── EXAMPLE.md                # API nümunələri
```

## 📝 İşləmə Qaydasý

### Backend (TypeScript + Express)

1. **Types** - `src/types/` folderində type-lar yaradın
2. **Storage** - `src/storage/` folderində in-memory data strukturları yaradın
3. **Validators** - `src/validators/` folderində Zod schema-ları yazın
4. **Controllers** - `src/controllers/` folderində business logic yazın
5. **Routes** - `src/routes/` folderində route-ları təyin edin
6. **Server** - `src/server.ts`-də route-ları import edib qoşun

### Frontend (HTML/CSS/JS)

1. **HTML** - `index.html`-də UI strukturunu qurun
2. **CSS** - `style.css`-də dizayn yazın
3. **JavaScript** - `app.js`-də API-yə request göndərin və UI-ı update edin

## 🔧 Faydalı Komandalar

```bash
# Development mode (auto-reload)
npm run dev

# Production build
npm run build

# Production-da işə sal
npm start
```

## 📚 Öyrənmə Qaynaqları

- **Express.js:** https://expressjs.com/
- **TypeScript:** https://www.typescriptlang.org/
- **Zod:** https://zod.dev/
- **Pino Logger:** https://getpino.io/

## ❓ Yardım

Hər app-in öz folderində:

- `README.md` - App haqqında məlumat
- `TASKS.md` - Tapşırıqlar və addımlar
- `EXAMPLE.md` - API endpoint nümunələri

## 🎯 Məsləhətlər

1. ✅ Kiçik addımlarla irəliləyin - hər funksiyonu test edin
2. ✅ `TASKS.md`-dəki sıraya riayət edin
3. ✅ API-nı `EXAMPLE.md`-dəki kimi qurün
4. ✅ Console-da error-lara diqqət edin
5. ✅ Browser Developer Tools istifadə edin
6. ✅ Pino logger ilə backend log-larına baxın

Uğurlar! 🚀

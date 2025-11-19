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

**Backend:**

- Node.js + Express
- TypeScript
- Zod (validation)
- Pino (logging)
- In-memory storage (Map/Array)

### Backend Skills

- ✅ Express server quraşdırma
- ✅ TypeScript ilə type-safe development
- ✅ REST API design principles
- ✅ Zod ilə input validation
- ✅ Pino ilə structured logging
- ✅ Error handling patterns
- ✅ In-memory data management
- ✅ CORS və static file serving


src/server.ts
    express()
    app.use(cors())
    app.use(express.json())
    app.use(pinoHttp())
    app.use(express.static(...frontend path...))
    app.listen(3014, ...)

src/storage/:
    groups.ts – const groups = new Map<string, Group>()
    expenses.ts – const expenses = new Map<string, Expense>()
    settlements.ts – const settlements = new Map<string, Settlement>()
        Əlavə köməkçi funksiyalar: addGroup, addExpense, listExpensesByGroupId və s.
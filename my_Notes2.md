1. Ümumi olaraq nə qurursan?
    “Expense Splitter” – qrup xərcləri bölən app:
    Bir qrup var (məsələn, “Quba səyahəti”).
    Qrupda üyələr var (Aga, Ayten, Leyla və s.).
    Kimlərsə müəyyən vaxtlarda xərclər edir:
    Məsələn: “Restoran – 120 AZN – ödənib: Aga – paylaşanlar: [Aga, Ayten, Leyla]”.
    App:
    Hər xərci yadda saxlayır.
    Hesablayır ki, kim kimə nə qədər borcludur.
    İstəsən, bu borcları minimum sayda ödəniş ilə “settle up” edir (debt simplification).
    Backend bu hesablamanı aparır, frontend sadəcə onu göstərir və request-lər göndərir.

2.  -Express server quraşdır (server.ts)
        express() yarat
        port: 3014
    -Middleware-lər:
        cors() – CORS üçün
        express.json() – JSON body parse üçün
        pino-http() – request loglamaq üçün
    -Frontend-i static serve et
        app.use(express.static(path.join(__dirname, "../../frontend")))
        Beləliklə localhost:3014 açanda frontend/index.html gəlir.
    -API route-larını əlavə et
        Məsələn: app.use("/api/groups", groupsRouter)
        Route-lar src/routes qovluğunda olur.
    -Error handler yaz
        Sonda app.use(errorHandler) kimi middleware:
        Zod error-u, öz AppError-ların, ümumi 500 error-ları eyni formatda cavab versin.

3.  Balance / Debt simplification
    Sadə nümunə (equal split, simplification YOX)
    Üç nəfər var: A, B, C.
    -Xərc 1:
        A yeməyə 90 AZN ödəyir.
        Paylaşanlar: [A, B, C]
        Equal split:
        Hər kəsin payı = 90 / 3 = 30
        Deməli:
        B → A: 30 borcludur
        C → A: 30 borcludur
        A öz payını özü ödədiyi üçün, A-ya görə borc yoxdur.
    -Xərc 2:
        B taksiyə 60 AZN ödəyir.
        Paylaşanlar: [A, B, C]
        Equal split:
        Hər kəsin payı = 60 / 3 = 20
        Deməli:
        A → B: 20 borcludur
        C → B: 20 borcludur
    -İndi ümumi borclar:
        A:
        B-yə 20 borcludur.
        C-yə borcu yoxdur.
        Ona borcu olan yoxdur.
        B:
        A-ya 30 borcludur? Xeyr.
        Birinci xərclə B, A-ya 30 borclu oldu.
        İkinci xərclə A, B-yə 20 borclu oldu.
        Bunları netləşdirəndə: B → A: 30, A → B: 20 → nəticə: B → A: 10
        C-yə borcu yoxdur.
        C:
        A-ya 30 (1-ci xərci) borclu
        B-yə 20 (2-ci xərci) borclu
    -Yəni sonda belə bir net balance çıxmalıdır, məsələn:
        A: +40 (A-nın ümumi alacağı: B-dən 10 + C-dən 30)
        B: −10 (A-ya 10 borcludur)
        C: −30 (A-ya 30 borcludur)
    Bunu calculateBalances(expenses) funksiyası etməlidir.

# calculateBalances
    function calculateBalances(expenses: Expense[]): Map<string, Balance> {
        const balances = new Map<string, Balance>();
        expenses.forEach((expense) => {
            const perPerson = expense.amount / expense.splitBetween.length;
            expense.splitBetween.forEach((userId) => {
                if (userId !== expense.paidBy) {
                    // User owes paidBy
                    addDebt(balances, userId, expense.paidBy, perPerson);
                }
            });
        });
        return balances;
    }

# INFO
    Burada:
        balances – hər user üçün Balance saxlayan Map:
            balances.get(userId) → { userId, owes, owedBy, netBalance }
        perPerson – hər iştirakçının payı:
            amount / splitBetween.length
        Hər expense üçün:
            splitBetween içindəki userId-lərə baxır.
            Əgər userId !== paidBy:
                deməli bu user ödəyənə borcludur.
                addDebt(balances, from = userId, to = expense.paidBy, amount = perPerson)
        addDebt funksiyası:
            from user-in owes[to] dəyərini artırır (borcu).
            to user-in owedBy[from] dəyərini artırır (onun alacağı).
            Hər iki user-in netBalance dəyərini yeniləyir:
                from.netBalance -= amount
                to.netBalance += amount
        Sonda:
            netBalance > 0 → başqaları ona borcludur (creditor).
            netBalance < 0 → başqalarına borcludur (debtor).
            netBalance = 0 → neytraldır.

# Optimal Settlement
    const balances: Balance[] = [
        { userId: "A", netBalance: 40, ... },
        { userId: "B", netBalance: -10, ... },
        { userId: "C", netBalance: -30, ... },
    ];

    Demək:
        A = +40 (ona 40 ödənməlidir)
        B = −10 (10 borcludur)
        C = −30 (30 borcludur)
    Optimal settlement nə edir? Prinsip:
        “Kim kimə ödəməlidir ki, ən az sayda transaction olsun?”
    Greedy algoritm ideyası:
        Creditors – pozitiv netBalance-lılar:
            [A: +40]
        Debtors – negativ netBalance-lılar:
            [B: −10, C: −30]
        Addım-addım:
            En çox borclu / en çox alacaqlı ilə “match”:
                Məsələn:
                Debtor: C (−30)
                Creditor: A (+40)
                Ödəniş: min(30, 40) = 30
            Settlement:
                C → A: 30
            Yeni balans:
                C: 0
                A: +10 (40 − 30)
            Sonra:
                Debtor: B (−10)
                Creditor: A (+10)
                Settlement:
                    B → A: 10
            Yeni balans:
                B: 0
                A: 0
        Nəticə:
            Settlement list:
                [ { from: "C", to: "A", amount: 30 }, { from: "B", to: "A", amount: 10 } ]
            Hamının netBalance = 0 olur.
        Bu optimizeSettlements(balances: Balance[]): Settlement[] funksiyasının işi budur.

# Split methods (equal, percentage, exact)
    Expense obyektində:
        splitMethod: "equal" | "percentage" | "exact";
        splits?: { [userId: string]: number };
    Backend-in etməli olduğu:
        Equal
            perPerson = amount / splitBetween.length
            Hər user-in payı eyni dəyərdə.
        Percentage
            splits içində faizlər verilir:
        Məsələn:
            "splits": {
                "user1": 50,
                "user2": 30,
                "user3": 20
            }
        Backend:
            Hər user üçün pay = amount * (splits[userId] / 100).
        Exact
            splits içində birbaşa məbləğlər verilir:
                "splits": {
                    "user1": 40,
                    "user2": 35,
                    "user3": 25
                }
        Backend:
            Hər user üçün pay = splits[userId].
        Validasiya:
            sum(Object.values(splits)) === amount olmalıdır (Zod ilə yoxlaya bilərsən).
    calculateBalances içində:
        Əvvəl splitAmounts map-i hesablayırsan:
            const share = getShareForUser(expense, userId);
        Sonra addDebt çağıranda bu share dəyərini verirsən.    

        
# 📚 Expense Splitter - Əlavə Resurslar və Kömək

## Xüsusi Texnologiyalar və Konseptlər

### 1. Expense Splitting Logic

- **Group Members** - Qrup iştirakçıları
- **Expense Entry** - Xərc qeydi (kim ödədi, kim paylaşır)
- **Balance Calculation** - Kim kimə borcludur
- **Debt Simplification** - Ödənişləri minimuma endirmək

### 2. Complex Algorithm

- **Split Types** - Equally, Custom amounts, Percentage
- **Who Paid** - Ödəyən şəxs
- **Who Owes** - Paylaşanlar
- **Net Balance** - Son balans hesablama

## 🔗 Faydalı Linklər

### Algorithm Design

- [Debt Simplification Algorithm](https://www.geeksforgeeks.org/minimize-cash-flow-among-given-set-friends-borrowed-money/) - **ÖNƏMLİ**
- [Split Bill Calculator](https://stackoverflow.com/questions/877728/what-algorithm-to-use-to-determine-minimum-number-of-actions-required-to-get-the)
- [Graph Theory](https://en.wikipedia.org/wiki/Graph_theory) - Debt network

### Math Operations

- [Precision in JavaScript](https://stackoverflow.com/questions/1458633/how-to-deal-with-floating-point-number-precision-in-javascript)
- [Rounding Numbers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round)

## 💡 İpuçları

```typescript
interface Member {
  id: string;
  name: string;
}

interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string; // member id
  splitBetween: string[]; // member ids
  date: Date;
}

// Sadə split hesablama
function calculateSimpleSplit(expenses: Expense[], members: Member[]) {
  const balances = new Map<string, number>();

  // Initialize balances
  members.forEach((m) => balances.set(m.id, 0));

  expenses.forEach((expense) => {
    const perPerson = expense.amount / expense.splitBetween.length;

    // Ödəyən şəxs + alır
    balances.set(
      expense.paidBy,
      balances.get(expense.paidBy)! + expense.amount
    );

    // Paylaşanlar - ödəyir
    expense.splitBetween.forEach((memberId) => {
      balances.set(memberId, balances.get(memberId)! - perPerson);
    });
  });

  return balances;
}

// Kim kimə borcludur
function calculateDebts(balances: Map<string, number>) {
  const debts: Array<{ from: string; to: string; amount: number }> = [];

  const creditors = Array.from(balances.entries())
    .filter(([_, balance]) => balance > 0)
    .sort((a, b) => b[1] - a[1]);

  const debtors = Array.from(balances.entries())
    .filter(([_, balance]) => balance < 0)
    .sort((a, b) => a[1] - b[1]);

  // Simplification algoritmi (greedy approach)
  // Bu mürəkkəb hissədir - addım-addım düşünün

  return debts;
}
```

**⚠️ Qeyd:** Bu app ən çətin app-lardan biridir. Debt simplification algoritmi mürəkkəbdir. Əvvəlcə sadə versiya yazın (hər ödəniş ayrıca), sonra optimize edin.

## ❓ Tez-tez Verilən Suallar

**S: Debt simplification nədir?**  
C: Ödənişləri minimuma endirmək. Məsələn: A→B 10₼, B→C 10₼ = A→C 10₼ (1 ödəniş).

**S: Equal split-dən başqa split type-lar?**  
C: Custom amounts (hər kəs fərqli) və percentage split. Equal ən sadəsidir.

**S: Float point precision problemi?**  
C: Pul hesablamalarında rounding lazımdır. `Math.round(amount * 100) / 100`

**S: Qrup üzvləri necə idarə olunur?**  
C: Member array. Add/remove funksiyaları lazımdır.

**S: Bu app üçün minimum feature set?**  
C: 1) Add expense, 2) Equal split, 3) Sadə balance (kim kimə borclu). Simplification bonus.

Uğurlar! 💰

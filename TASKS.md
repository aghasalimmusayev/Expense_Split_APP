# Tapşırıqlar - Expense Splitter

## 📋 Əsas Tapşırıqlar

### 1. TypeScript Types ✅

```typescript
export interface Group {
  id: string;
  name: string;
  members: string[]; // user IDs
  createdBy: string;
  createdAt: Date;
}

export interface Expense {
  id: string;
  groupId: string;
  description: string;
  amount: number;
  paidBy: string; // user ID
  splitBetween: string[]; // user IDs
  splitMethod: "equal" | "percentage" | "exact";
  splits?: { [userId: string]: number }; // for exact/percentage
  category: string;
  date: Date;
}

export interface Balance {
  userId: string;
  owes: { [userId: string]: number };
  owedBy: { [userId: string]: number };
  netBalance: number;
}

export interface Settlement {
  id: string;
  groupId: string;
  from: string;
  to: string;
  amount: number;
  settledAt: Date;
}
```

---

### 2. Balance Hesablama ✅

```typescript
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
```

---

### 3. Optimal Settlement ✅

Kim kimə ödəməlidir minimal transaction ilə:

```typescript
function optimizeSettlements(balances: Balance[]): Settlement[] {
  // Greedy algorithm
  // Match highest debtor with highest creditor
}
```

---

### 4. Split Methods ✅

**Equal:**

```json
{
  "amount": 100,
  "splitBetween": ["user1", "user2", "user3"]
}
// Each owes 33.33
```

**Percentage:**

```json
{
  "amount": 100,
  "splitMethod": "percentage",
  "splits": {
    "user1": 50,
    "user2": 30,
    "user3": 20
  }
}
```

**Exact:**

```json
{
  "amount": 100,
  "splitMethod": "exact",
  "splits": {
    "user1": 40,
    "user2": 35,
    "user3": 25
  }
}
```

---

### 5. Controllers ✅

- `createGroup` - Qrup yarat
- `addExpense` - Xərc əlavə et
- `getBalances` - Balansları hesabla
- `settleUp` - Borcu ödə
- `getGroupExpenses` - Qrup xərcləri
- `getStatistics` - Xərc statistikası

---

### 6. Frontend Visualization ✅

Balance chart: Kim kimə nə qədər borcludur.

---

## 🚀 Əlavə Tapşırıqlar

### 7. Receipt Scanner ⭐⭐

Şəkildən xərci oxu (OCR)

### 8. Currency Converter ⭐⭐

Multi-currency support

### 9. Recurring Expenses ⭐⭐⭐

Təkrarlanan xərclər (məsələn, kirayə)

---

## ✅ Yoxlama

- [ ] Qrup CRUD
- [ ] Xərc əlavə etmə
- [ ] Balance hesablama
- [ ] Split methods
- [ ] Settlement

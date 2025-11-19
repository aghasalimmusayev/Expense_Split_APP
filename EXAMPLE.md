# API Nümunələri - Expense Splitter

## Base URL: `http://localhost:3014/api`

---

## 👥 Qrup Yaratmaq

### POST /api/groups

```json
{
  "name": "Türkiyə səfəri",
  "members": ["user1", "user2", "user3"],
  "createdBy": "user1"
}
```

---

## 💳 Xərc Əlavə Etmək

### POST /api/expenses

```json
{
  "groupId": "group-1",
  "description": "Restoran xərci",
  "amount": 150,
  "paidBy": "user1",
  "splitBetween": ["user1", "user2", "user3"],
  "splitMethod": "equal",
  "category": "food"
}
```

---

## 💰 Balanslar

### GET /api/groups/:id/balances

```json
{
  "balances": [
    {
      "userId": "user1",
      "owes": {},
      "owedBy": {
        "user2": 50,
        "user3": 50
      },
      "netBalance": 100
    },
    {
      "userId": "user2",
      "owes": {
        "user1": 50
      },
      "owedBy": {},
      "netBalance": -50
    }
  ],
  "settlements": [
    {
      "from": "user2",
      "to": "user1",
      "amount": 50
    },
    {
      "from": "user3",
      "to": "user1",
      "amount": 50
    }
  ]
}
```

Uğurlar! 💰

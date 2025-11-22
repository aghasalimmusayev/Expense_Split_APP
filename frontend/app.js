// const BASE_URL = window.API_BASE || "/api";
const BASE_URL = "http://localhost:3014/api";

const els = {
    groupsList: document.getElementById("groups-list"),
    groupForm: document.getElementById("group-form"),
    groupName: document.getElementById("group-name"),
    groupMembers: document.getElementById("group-members"),
    groupFormError: document.getElementById("group-form-error"),

    emptyState: document.getElementById("empty-state"),
    groupView: document.getElementById("group-view"),
    groupTitle: document.getElementById("group-title"),
    groupMembersChips: document.getElementById("group-members-chips"),
    deleteGroupBtn: document.getElementById("delete-group-btn"),
    editGroupBtn: document.getElementById("edit-group-btn"),

    // Tabs
    tabs: document.querySelectorAll(".tab"),
    tabExpenses: document.getElementById("tab-expenses"),
    tabSettlements: document.getElementById("tab-settlements"),
    tabStats: document.getElementById("tab-stats"),

    // Expenses
    expenseForm: document.getElementById("expense-form"),
    expenseDesc: document.getElementById("expense-desc"),
    expenseAmount: document.getElementById("expense-amount"),
    expensePaidBy: document.getElementById("expense-paidby"),
    expenseSplitBetween: document.getElementById("expense-splitbetween"),
    expenseCategory: document.getElementById("expense-category"),
    expenseFormError: document.getElementById("expense-form-error"),
    expensesList: document.getElementById("expenses-list"),
    expensesCount: document.getElementById("expenses-count"),

    // Settlements
    settlementForm: document.getElementById("settlement-form"),
    settlementFrom: document.getElementById("settlement-from"),
    settlementTo: document.getElementById("settlement-to"),
    settlementAmount: document.getElementById("settlement-amount"),
    settlementFormError: document.getElementById("settlement-form-error"),
    settlementsList: document.getElementById("settlements-list"),
    settlementsCount: document.getElementById("settlements-count"),

    // Stats
    statsTotal: document.getElementById("stats-total"),
    statsMostSp: document.getElementById("stats-mostsp"),
    statsPaidPerUser: document.getElementById("stats-paidperuser"),
    statsBalances: document.getElementById("stats-balances"),

    // Modals
    modalGroup: document.getElementById("modal-group"),
    modalExpense: document.getElementById("modal-expense"),
    modalSettlement: document.getElementById("modal-settlement"),

    groupEditForm: document.getElementById("group-edit-form"),
    groupEditName: document.getElementById("group-edit-name"),
    groupEditMembers: document.getElementById("group-edit-members"),
    groupEditError: document.getElementById("group-edit-error"),

    expenseEditForm: document.getElementById("expense-edit-form"),
    expenseEditDesc: document.getElementById("expense-edit-desc"),
    expenseEditAmount: document.getElementById("expense-edit-amount"),
    expenseEditPaidBy: document.getElementById("expense-edit-paidby"),
    expenseEditSplitBetween: document.getElementById("expense-edit-splitbetween"),
    expenseEditCategory: document.getElementById("expense-edit-category"),
    expenseEditError: document.getElementById("expense-edit-error"),

    settlementEditForm: document.getElementById("settlement-edit-form"),
    settlementEditFrom: document.getElementById("settlement-edit-from"),
    settlementEditTo: document.getElementById("settlement-edit-to"),
    settlementEditAmount: document.getElementById("settlement-edit-amount"),
    settlementEditError: document.getElementById("settlement-edit-error"),
};

const state = {
    groups: [],
    selectedGroup: null,
    expenses: [],
    settlements: [],
    stats: null,
    editingExpense: null,
    editingSettlement: null,
};

function money(n) {
    if (n === null || n === undefined || Number.isNaN(n)) return "0";
    return new Intl.NumberFormat("az-AZ", { maximumFractionDigits: 2 }).format(n);
}

async function api(path, options = {}) {
    const res = await fetch(`${BASE_URL}${path}`, {
        headers: { "Content-Type": "application/json" },
        ...options,
    });
    const ct = res.headers.get("content-type") || "";
    const data = ct.includes("application/json") ? await res.json() : null;

    if (!res.ok) {
        const msg = data?.message || res.statusText;
        throw new Error(msg);
    }
    return data;
}

/* ---------------- Modals ---------------- */

function openModal(modalEl) {
    modalEl.classList.remove("hidden");
}
function closeModal(modalEl) {
    modalEl.classList.add("hidden");
}

// backdrop + close buttons
document.addEventListener("click", (e) => {
    const closeId = e.target?.dataset?.close;
    if (!closeId) return;
    const modal = document.getElementById(closeId);
    if (modal) closeModal(modal);
});

/* ---------------- Groups ---------------- */

async function loadGroups() {
    state.groups = await api("/groups");
    renderGroups();

    if (state.selectedGroup) {
        const stillThere = state.groups.find(g => g.id === state.selectedGroup.id);
        if (!stillThere) selectGroup(null);
    }
}

function renderGroups() {
    els.groupsList.innerHTML = "";
    if (!state.groups.length) {
        els.groupsList.innerHTML = `<div class="muted" style="padding:6px;">Hələ qrup yoxdur</div>`;
        return;
    }

    state.groups.forEach(g => {
        const item = document.createElement("div");
        item.className = "list-item";
        item.innerHTML = `
      <div>
        <div class="item-title">${g.name}</div>
        <div class="item-sub">${(g.members || []).join(", ")}</div>
      </div>
      <div>
        <button class="btn" data-id="${g.id}">Aç</button>
      </div>
    `;
        item.querySelector("button").addEventListener("click", () => selectGroup(g));
        els.groupsList.appendChild(item);
    });
}

els.groupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    els.groupFormError.textContent = "";

    const name = els.groupName.value.trim();
    const members = els.groupMembers.value
        .split(",")
        .map(s => s.trim())
        .filter(Boolean);

    if (!members.length) {
        els.groupFormError.textContent = "Ən azı 1 üzv daxil et.";
        return;
    }

    try {
        await api("/groups", {
            method: "POST",
            body: JSON.stringify({ name, members }),
        });
        els.groupName.value = "";
        els.groupMembers.value = "";
        await loadGroups();
    } catch (err) {
        els.groupFormError.textContent = err.message;
    }
});

async function deleteSelectedGroup() {
    if (!state.selectedGroup) return;
    const ok = confirm(`"${state.selectedGroup.name}" qrupunu silmək istəyirsən?`);
    if (!ok) return;

    try {
        await api(`/groups/${state.selectedGroup.id}`, { method: "DELETE" });
        selectGroup(null);
        await loadGroups();
    } catch (err) {
        alert(err.message);
    }
}

els.deleteGroupBtn.addEventListener("click", deleteSelectedGroup);

/* --------- Group Update (Modal) --------- */

els.editGroupBtn.addEventListener("click", () => {
    const g = state.selectedGroup;
    if (!g) return;

    els.groupEditError.textContent = "";
    els.groupEditName.value = g.name || "";
    els.groupEditMembers.value = (g.members || []).join(", ");

    openModal(els.modalGroup);
});

els.groupEditForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    els.groupEditError.textContent = "";

    const g = state.selectedGroup;
    if (!g) return;

    const name = els.groupEditName.value.trim();
    const members = els.groupEditMembers.value
        .split(",").map(x => x.trim()).filter(Boolean);

    if (!members.length) {
        els.groupEditError.textContent = "Ən azı 1 üzv daxil et.";
        return;
    }

    try {
        await api(`/groups/${g.id}`, {
            method: "PATCH",
            body: JSON.stringify({ name, members }),
        });

        closeModal(els.modalGroup);
        await loadGroups();
        const updated = state.groups.find(x => x.id === g.id);
        await selectGroup(updated);
    } catch (err) {
        els.groupEditError.textContent = err.message;
    }
});

/* ---------------- Select group & load data ---------------- */

async function selectGroup(group) {
    state.selectedGroup = group;

    if (!group) {
        els.groupView.classList.add("hidden");
        els.emptyState.classList.remove("hidden");
        return;
    }

    els.emptyState.classList.add("hidden");
    els.groupView.classList.remove("hidden");
    els.groupTitle.textContent = group.name;

    renderMembers(group.members || []);
    buildExpenseMemberControls(group.members || []);
    buildSettlementMemberControls(group.members || []);

    await refreshGroupData();
}

function renderMembers(members) {
    els.groupMembersChips.innerHTML = "";
    members.forEach(m => {
        const chip = document.createElement("div");
        chip.className = "chip";
        chip.textContent = m;
        els.groupMembersChips.appendChild(chip);
    });
}

async function refreshGroupData() {
    const g = state.selectedGroup;
    if (!g) return;

    const [expenses, settlements, stats] = await Promise.all([
        api(`/groups/${g.id}/expenses`),
        api(`/groups/${g.id}/settlements`),
        api(`/groups/${g.id}/stats`),
    ]);

    state.expenses = expenses || [];
    state.settlements = settlements || [];
    state.stats = stats || null;

    renderExpenses();
    renderSettlements();
    renderStats();
}

/* ---------------- Tabs ---------------- */

els.tabs.forEach(t => {
    t.addEventListener("click", () => {
        els.tabs.forEach(x => x.classList.remove("active"));
        t.classList.add("active");
        const tab = t.dataset.tab;
        els.tabExpenses.classList.toggle("hidden", tab !== "expenses");
        els.tabSettlements.classList.toggle("hidden", tab !== "settlements");
        els.tabStats.classList.toggle("hidden", tab !== "stats");
    });
});

/* ---------------- Expenses ---------------- */

function buildExpenseMemberControls(members) {
    els.expensePaidBy.innerHTML =
        members.map(m => `<option value="${m}">${m}</option>`).join("");

    els.expenseSplitBetween.innerHTML = "";
    members.forEach(m => {
        const label = document.createElement("label");
        label.className = "checkbox";
        label.innerHTML = `
      <input type="checkbox" value="${m}" checked>
      <span>${m}</span>
    `;
        els.expenseSplitBetween.appendChild(label);
    });
}

els.expenseForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    els.expenseFormError.textContent = "";
    const g = state.selectedGroup;
    if (!g) return;

    const description = els.expenseDesc.value.trim();
    const amount = Number(els.expenseAmount.value);
    const paidBy = els.expensePaidBy.value;
    const category = els.expenseCategory.value.trim();

    const splitBetween = [...els.expenseSplitBetween.querySelectorAll("input:checked")]
        .map(i => i.value);

    if (!splitBetween.length) {
        els.expenseFormError.textContent = "Bölüşdürüləcək ən azı bir iştirakçı seç.";
        return;
    }

    try {
        await api(`/groups/${g.id}/expenses`, {
            method: "POST",
            body: JSON.stringify({
                groupId: g.id,
                description,
                amount,
                paidBy,
                splitBetween,
                category,
            }),
        });

        els.expenseDesc.value = "";
        els.expenseAmount.value = "";
        els.expenseCategory.value = "";
        await refreshGroupData();
    } catch (err) {
        els.expenseFormError.textContent = err.message;
    }
});

function renderExpenses() {
    els.expensesList.innerHTML = "";
    els.expensesCount.textContent = state.expenses.length;

    if (!state.expenses.length) {
        els.expensesList.innerHTML = `<div class="muted" style="padding:6px;">Xərc yoxdur</div>`;
        return;
    }

    state.expenses
        .slice()
        .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
        .forEach(exp => {
            const item = document.createElement("div");
            item.className = "list-item";
            item.innerHTML = `
        <div>
          <div class="item-title">${exp.description}</div>
          <div class="item-sub">
            ${money(exp.amount)} · ${exp.category} · ödədi: ${exp.paidBy}
          </div>
          <div class="item-sub">
            bölündü: ${(exp.splitBetween || []).join(", ")}
          </div>
        </div>
        <div style="display:flex; flex-direction:column; gap:6px;">
          <button class="btn" data-edit="${exp.id}">Düzəliş</button>
          <button class="btn danger" data-id="${exp.id}">Sil</button>
        </div>
      `;

            item.querySelector("button[data-id]")
                .addEventListener("click", () => deleteExpense(exp.id));

            item.querySelector("button[data-edit]")
                .addEventListener("click", () => openExpenseEdit(exp));

            els.expensesList.appendChild(item);
        });
}

async function deleteExpense(id) {
    const ok = confirm("Bu xərci silmək istəyirsən?");
    if (!ok) return;
    try {
        await api(`/expenses/${id}`, { method: "DELETE" });
        await refreshGroupData();
    } catch (err) {
        alert(err.message);
    }
}

/* --------- Expense Update (Modal) --------- */

function buildExpenseEditMemberControls(members, exp) {
    els.expenseEditPaidBy.innerHTML =
        members.map(m => `<option value="${m}">${m}</option>`).join("");

    els.expenseEditSplitBetween.innerHTML = "";
    members.forEach(m => {
        const checked = (exp.splitBetween || []).includes(m);
        const label = document.createElement("label");
        label.className = "checkbox";
        label.innerHTML = `
      <input type="checkbox" value="${m}" ${checked ? "checked" : ""}>
      <span>${m}</span>
    `;
        els.expenseEditSplitBetween.appendChild(label);
    });
}

function openExpenseEdit(exp) {
    const g = state.selectedGroup;
    if (!g) return;

    state.editingExpense = exp;
    els.expenseEditError.textContent = "";

    els.expenseEditDesc.value = exp.description || "";
    els.expenseEditAmount.value = exp.amount ?? "";
    els.expenseEditCategory.value = exp.category || "";

    buildExpenseEditMemberControls(g.members || [], exp);
    els.expenseEditPaidBy.value = exp.paidBy || (g.members?.[0] || "");

    openModal(els.modalExpense);
}

els.expenseEditForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    els.expenseEditError.textContent = "";

    const g = state.selectedGroup;
    const exp = state.editingExpense;
    if (!g || !exp) return;

    const description = els.expenseEditDesc.value.trim();
    const amount = Number(els.expenseEditAmount.value);
    const paidBy = els.expenseEditPaidBy.value;
    const category = els.expenseEditCategory.value.trim();
    const splitBetween =
        [...els.expenseEditSplitBetween.querySelectorAll("input:checked")]
            .map(i => i.value);

    if (!splitBetween.length) {
        els.expenseEditError.textContent = "Ən azı bir iştirakçı seç.";
        return;
    }

    try {
        await api(`/expenses/${exp.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                description,
                amount,
                paidBy,
                splitBetween,
                category,
            }),
        });

        state.editingExpense = null;
        closeModal(els.modalExpense);
        await refreshGroupData();
    } catch (err) {
        els.expenseEditError.textContent = err.message;
    }
});

/* ---------------- Settlements ---------------- */

function buildSettlementMemberControls(members) {
    const options = members.map(m => `<option value="${m}">${m}</option>`).join("");
    els.settlementFrom.innerHTML = options;
    els.settlementTo.innerHTML = options;
}

els.settlementForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    els.settlementFormError.textContent = "";
    const g = state.selectedGroup;
    if (!g) return;

    const fromUser = els.settlementFrom.value;
    const toUser = els.settlementTo.value;
    const amount = Number(els.settlementAmount.value);

    if (fromUser === toUser) {
        els.settlementFormError.textContent = "fromUser və toUser eyni ola bilməz.";
        return;
    }

    try {
        await api(`/groups/${g.id}/settlements`, {
            method: "POST",
            body: JSON.stringify({ groupId: g.id, fromUser, toUser, amount }),
        });
        els.settlementAmount.value = "";
        await refreshGroupData();
    } catch (err) {
        els.settlementFormError.textContent = err.message;
    }
});

function renderSettlements() {
    els.settlementsList.innerHTML = "";
    els.settlementsCount.textContent = state.settlements.length;

    if (!state.settlements.length) {
        els.settlementsList.innerHTML = `<div class="muted" style="padding:6px;">Hesablaşma yoxdur</div>`;
        return;
    }

    state.settlements
        .slice()
        .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
        .forEach(s => {
            const item = document.createElement("div");
            item.className = "list-item";
            item.innerHTML = `
        <div>
          <div class="item-title">${s.fromUser} → ${s.toUser}</div>
          <div class="item-sub">${money(s.amount)}</div>
        </div>
        <div style="display:flex; flex-direction:column; gap:6px;">
          <button class="btn" data-edit="${s.id}">Düzəliş</button>
          <button class="btn danger" data-id="${s.id}">Sil</button>
        </div>
      `;

            item.querySelector("button[data-id]")
                .addEventListener("click", () => deleteSettlement(s.id));

            item.querySelector("button[data-edit]")
                .addEventListener("click", () => openSettlementEdit(s));

            els.settlementsList.appendChild(item);
        });
}

async function deleteSettlement(id) {
    const ok = confirm("Bu hesablaşmanı silmək istəyirsən?");
    if (!ok) return;
    try {
        await api(`/settlements/${id}`, { method: "DELETE" });
        await refreshGroupData();
    } catch (err) {
        alert(err.message);
    }
}

/* --------- Settlement Update (Modal) --------- */

function openSettlementEdit(s) {
    const g = state.selectedGroup;
    if (!g) return;

    state.editingSettlement = s;
    els.settlementEditError.textContent = "";

    const options = (g.members || []).map(m => `<option value="${m}">${m}</option>`).join("");
    els.settlementEditFrom.innerHTML = options;
    els.settlementEditTo.innerHTML = options;

    els.settlementEditFrom.value = s.fromUser;
    els.settlementEditTo.value = s.toUser;
    els.settlementEditAmount.value = s.amount ?? "";

    openModal(els.modalSettlement);
}

els.settlementEditForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    els.settlementEditError.textContent = "";

    const s = state.editingSettlement;
    if (!s) return;

    const fromUser = els.settlementEditFrom.value;
    const toUser = els.settlementEditTo.value;
    const amount = Number(els.settlementEditAmount.value);

    if (fromUser === toUser) {
        els.settlementEditError.textContent = "fromUser və toUser eyni ola bilməz.";
        return;
    }

    try {
        await api(`/settlements/${s.id}`, {
            method: "PATCH",
            body: JSON.stringify({ fromUser, toUser, amount }),
        });

        state.editingSettlement = null;
        closeModal(els.modalSettlement);
        await refreshGroupData();
    } catch (err) {
        els.settlementEditError.textContent = err.message;
    }
});

/* ---------------- Stats ---------------- */

function renderStats() {
    const stats = state.stats;
    if (!stats) {
        els.statsTotal.textContent = "0";
        els.statsMostSp.textContent = "—";
        els.statsPaidPerUser.innerHTML = "";
        els.statsBalances.innerHTML = "";
        return;
    }

    els.statsTotal.textContent = money(stats.totalExpenses);

    if (stats.mostSpender && Array.isArray(stats.mostSpender)) {
        const [userId, amt] = stats.mostSpender;
        els.statsMostSp.textContent = `${userId} (${money(amt)})`;
    } else {
        els.statsMostSp.textContent = "—";
    }

    // totalPaidPerUser
    els.statsPaidPerUser.innerHTML = "";
    const paidEntries = Object.entries(stats.totalPaidPerUser || {});
    if (!paidEntries.length) {
        els.statsPaidPerUser.innerHTML = `<div class="muted" style="padding:6px;">Məlumat yoxdur</div>`;
    } else {
        paidEntries
            .sort((a, b) => b[1] - a[1])
            .forEach(([u, amt]) => {
                const item = document.createElement("div");
                item.className = "list-item";
                item.innerHTML = `
          <div class="item-title">${u}</div>
          <div>${money(amt)}</div>
        `;
                els.statsPaidPerUser.appendChild(item);
            });
    }

    // balances
    els.statsBalances.innerHTML = "";
    const balances = stats.balances || [];
    if (!balances.length) {
        els.statsBalances.innerHTML = `<div class="muted" style="padding:6px;">Balans hesablanmayıb</div>`;
    } else {
        balances.forEach(b => {
            const item = document.createElement("div");
            item.className = "list-item";
            const sign = b.netBalance > 0 ? "+" : "";
            item.innerHTML = `
        <div>
          <div class="item-title">${b.userId}</div>
          <div class="item-sub">netBalance: ${sign}${money(b.netBalance)}</div>
        </div>
      `;
            els.statsBalances.appendChild(item);
        });
    }
}

/* ---------------- Init ---------------- */

(async function init() {
    try {
        await loadGroups();
    } catch (err) {
        alert(err.message);
    }
})();

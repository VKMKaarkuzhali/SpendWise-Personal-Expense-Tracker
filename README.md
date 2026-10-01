# 💰 SpendWise – Personal Expense Tracker

> **Full Stack Web Development Task 2 Project**  
> A clean, modern, student-friendly personal expense tracking Single Page Application (SPA) built with **ReactJS**, **React Router**, and browser **LocalStorage**.

---

## 📌 Project Description

**SpendWise** is a lightweight, intuitive personal finance and expense tracking web application. It empowers individuals and students to take full control of their personal finances by recording income and expenses, categorizing transactions, visualizing budget reports, and monitoring net balance in real time.

All data persists directly within the user's browser using client-side **LocalStorage**, ensuring that no financial information is lost upon page refresh, without requiring any complex backend or external database server. The interface is crafted to be clean, responsive, and easy to explain during academic viva and live evaluations.

---

## ✨ Features

- **💰 Income & Expense Management**: Record both earnings (Salary, Freelance, Investments) and expenditures (Food, Transport, Bills, Shopping, etc.).
- **📊 Real-Time Financial Overview**: Instantly compute Total Income, Total Expenses, and Remaining Net Balance using dynamic ES6 calculations.
- **✏️ Add, Edit & Delete**: Full CRUD capabilities on transactions. Editing updates the existing record directly without creating duplicates.
- **🛡️ Safe Delete Confirmation**: Built-in modal dialog to confirm before removing any transaction record.
- **🔍 Instant Search & Multi-Criteria Filtering**: Filter transactions simultaneously by transaction type (Income/Expense), category, and search keywords (title or description).
- **📋 Category Breakdown**: Visual progress bars displaying exact amounts and percentage share of total expenditure per category.
- **📈 Comprehensive Reports & Trends**: Monthly income vs. expense comparison charts alongside data-driven insights (top spending category, largest single expense, savings rate %, and average expense).
- **💾 Client-Side Persistence**: Automatic sync to browser `localStorage` using the key `"spendwise_transactions"`.
- **📱 Fully Responsive Design**: Seamless layout scaling across desktop monitors, laptops, tablets, and smartphones with mobile drawer navigation.
- **🧪 Sample Data Integration**: Pre-populated with realistic starter transactions if LocalStorage is empty, with one-click reload/reset buttons for evaluation testing.

---

## 🛠️ Technologies Used

- **ReactJS (v18.3)**: Component-based UI architecture.
- **JavaScript (ES6+)**: Arrow functions, destructuring, array methods (`map`, `filter`, `reduce`), template literals, modules.
- **HTML5**: Semantic document layout (`<header>`, `<main>`, `<nav>`, `<section>`, `<aside>`, `<footer>`).
- **CSS3**: Custom design system, CSS variables, Flexbox, CSS Grid, media queries, keyframe animations, and soft shadows (no heavy CSS frameworks).
- **React Router DOM (v6)**: Declarative multi-page routing (`/`, `/transactions`, `/reports`) with active navigation links.
- **LocalStorage API**: Browser persistence for storing and retrieving JSON-serialized transaction records.
- **Vite (v6)**: Next-generation ultra-fast frontend build tooling and local development server.

---

## 🧠 React Concepts Used

1. **Functional Components**: Modular, reusable UI components (`Navbar`, `SummaryCard`, `TransactionForm`, `TransactionList`, `TransactionItem`, `SearchFilter`, `CategorySummary`).
2. **JSX (JavaScript XML)**: Declarative syntax blending HTML structure with dynamic JavaScript expressions.
3. **`useState` Hook**:
   - Manages state for transactions list, form input values, validation errors, active search/filter queries, editing mode, delete modals, and mobile menu toggles.
4. **`useEffect` Hook**:
   - Manages synchronization of transactions to browser `localStorage` whenever the state is updated.
   - Synchronizes editing transaction data into the form when an item is selected for editing.
5. **Props & Unidirectional Data Flow**:
   - Passes data and callback handlers (e.g., `onAddTransaction`, `onUpdateTransaction`, `onDelete`) cleanly between parent and child components.
6. **Conditional Rendering**:
   - Renders empty states when no transactions or search results exist (`&&`, ternary operators).
   - Renders confirmation modal, validation error alerts, and edit badges dynamically.
7. **ES6 Array Methods**:
   - `reduce()` for calculating total income, total expenses, category totals, and max monthly spending.
   - `filter()` for search matching, category filtering, and item deletion.
   - `map()` for rendering lists of cards, table items, select options, and chart bars.

---

## 📄 Application Pages

The application utilizes **React Router** to provide three distinct, functional views:

### 1. Dashboard (`/`)
- **Welcome Banner**: Welcoming header with quick action shortcuts.
- **4 Metric Cards**: Total Income (green), Total Expenses (red), Remaining Balance (indigo/cyan), and Total Transaction Count.
- **Recent Activity**: Live list of the 5 most recent transactions with type badges and formatted amounts.
- **Top Categories Widget**: Visual progress bars representing the top spending categories.
- Auto-updates dynamically whenever any transaction is added, updated, or removed.

### 2. Transactions (`/transactions`)
- **Add / Edit Transaction Form**:
  - Fields: Type (Expense / Income toggle), Title, Amount, Category, Date, and Description.
  - Client-side validation: Ensures Title is non-empty, Amount is numeric and > 0, Category is chosen, and Date is provided.
  - Edit mode replaces the record in-place.
- **Search & Filter Controls**: Real-time title/description keyword search, type filter, category filter, and a single-click "Reset Filters" button.
- **Transaction List**: Clean responsive transaction cards with category icons, formatted dates, amounts, and action buttons (`Edit` and `Delete`).
- **Confirmation Modal**: Prevents accidental data deletion with an interactive popup.

### 3. Reports (`/reports`)
- **Financial Health Summary**: Metric cards showing Total Income, Total Expenses, Net Balance, and overall Savings Rate %.
- **💡 Smart Spending Insights**:
  - Top Expense Category & percentage.
  - Single largest expense recorded.
  - Average expenditure per transaction.
  - Expense-to-income ratio.
- **Category-wise Expense Breakdown**: All expense categories with monetary totals, percentage of total expenses, and colored progress bars.
- **Monthly Spending Trends**: Interactive CSS-based bar chart comparing monthly income vs. monthly expenses side-by-side.

---

## 🚀 How to Run the Project

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v16 or higher recommended).

### 1. Clone or Open Project Directory
```bash
cd "Personal Expense Tracker"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:5173/
```
*(or the port indicated in your terminal)*

### 4. Build for Production (Optional)
```bash
npm run build
```

---

## 📂 Project Structure

```text
Personal Expense Tracker/
├── index.html                  # HTML5 entry template with Google Fonts & SEO meta tags
├── package.json                # Project dependencies, metadata, and scripts
├── vite.config.js              # Vite bundler configuration
├── README.md                   # Comprehensive project documentation
├── public/                     # Static public assets
└── src/
    ├── main.jsx                # Application root mounting with BrowserRouter & StrictMode
    ├── App.jsx                 # Top-level component: state management, routing, & LocalStorage
    ├── App.css                 # Vanilla CSS3 styling, design system tokens, responsive queries
    ├── components/
    │   ├── Navbar.jsx          # Responsive header with brand logo, links, and mobile menu
    │   ├── SummaryCard.jsx     # Reusable KPI metric card
    │   ├── TransactionForm.jsx # Add/edit form with real-time client-side validation
    │   ├── TransactionList.jsx # List renderer, empty states, and delete confirmation modal
    │   ├── TransactionItem.jsx # Single transaction row with category badge & action buttons
    │   ├── SearchFilter.jsx    # Search input, dropdown filters, and reset button
    │   └── CategorySummary.jsx # Expense category breakdown with progress bars
    ├── pages/
    │   ├── Dashboard.jsx       # Overview page with summary cards and recent activity
    │   ├── Transactions.jsx    # Transaction management page (Form, Filters, List)
    │   └── Reports.jsx         # Analytics, monthly bar charts, and data-driven insights
    ├── data/
    │   └── sampleData.js       # Initial demonstration transactions and category definitions
    └── utils/
        └── formatters.js       # Currency (₹), date formatters, and financial calculation helpers
```

---

## 🔮 Future Enhancements

- 🔐 **User Authentication**: Multi-user support with secure sign-in (Firebase Auth / JWT).
- ☁️ **Cloud Database**: Cloud sync using MongoDB, PostgreSQL, or Cloud Firestore.
- 📄 **Data Export**: Export transaction history to CSV and PDF financial statements.
- 🎯 **Budget Limits & Alerts**: Setting monthly category spending budgets with warning alerts when near 80% or 100% capacity.
- 📊 **Advanced Interactive Charts**: Integration of interactive charting libraries such as Chart.js or Recharts for area charts and doughnut graphs.
- 💱 **Multi-Currency Support**: Currency switching (USD, EUR, GBP, INR) with live conversion rates.

---

## 🎓 Academic Compliance Summary

| Requirement | Implementation Location |
|---|---|
| **ReactJS + ES6+** | `src/App.jsx`, `src/pages/*.jsx`, `src/components/*.jsx` |
| **`useState` Hook** | `App.jsx`, `TransactionForm.jsx`, `Transactions.jsx`, `Navbar.jsx`, `TransactionList.jsx` |
| **`useEffect` Hook** | `App.jsx` (LocalStorage synchronization), `TransactionForm.jsx` (edit mode sync) |
| **Client-Side Validation** | `TransactionForm.jsx` (Title non-empty, Amount > 0, Category selected, Date selected) |
| **React Router** | `src/main.jsx` (`BrowserRouter`), `src/App.jsx` (`Routes`, `Route`, `Navigate`) |
| **LocalStorage** | `src/App.jsx` (key: `"spendwise_transactions"`) |
| **Add / Edit / Delete** | `App.jsx`, `TransactionForm.jsx`, `TransactionItem.jsx`, `TransactionList.jsx` |
| **Search & Filters** | `src/components/SearchFilter.jsx`, `src/pages/Transactions.jsx` (`useMemo`, `filter`) |
| **Dynamic Calculations** | `src/utils/formatters.js` (`calculateTotals`, `getCategorySummary`, `getMonthlySummary`) |
| **Responsive CSS3** | `src/App.css` (CSS Grid, Flexbox, Media Queries for <=1024px, <=768px, <=520px) |

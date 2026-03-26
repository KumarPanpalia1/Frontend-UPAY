# UPAY Finance Portal

A full-stack finance management portal for UPAY NGO (Under Privileged Advancement by Youth).

## Tech Stack

- **Frontend**: React + Vite, React Router v6, Chart.js (via react-chartjs-2), Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Auth**: JWT stored in localStorage

## Features

- **Authentication**: Login with role-based access (Admin/Volunteer)
- **Dashboard**: KPI cards, line chart, donut chart, recent activities
- **Donations**: View, add, import from Excel, filter and search
- **Expenses**: Submit, approve/reject (admin), track status
- **Fund Allocation**: Allocate funds, track utilization, transactions

## Setup

### Prerequisites

- Node.js
- MongoDB
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
# Set up MongoDB URI in .env
npm run seed  # Seed database with sample data
npm run dev   # Start server on port 5000
```

### Frontend Setup

```bash
npm install
npm run dev  # Start on port 5173
```

### Login Credentials

- **Admin**: admin@upay.org / admin123
- **Volunteer**: volunteer@upay.org / vol123

## Project Structure

See src/ for frontend components, backend/ for server code.

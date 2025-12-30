# Test Back-end Developer (Node.js)

Backend API project menggunakan **Node.js + TypeScript**, Prisma ORM, PostgreSQL, JWT Authentication.

---

## A. Cara Menjalankan Project

### 1. Clone Repository
```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Install Dependency
```bash
npm install
```

### 3. Setup Environment Variable
Buat file `.env` di root project (contoh ada di bagian B).

### 4. Jalankan Prisma Migration
```bash
npx prisma migrate dev
```

### 5. Jalankan Seeder Data
```bash
npx prisma db seed
```

### 6. Jalankan Server
```bash
npm run dev
```

Server akan berjalan di:
```
http://localhost:3000
```

---

## B. Environment Variable yang Dibutuhkan

File `.env`:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
JWT_SECRET="jwt_secret_key"
```

Keterangan:
- `DATABASE_URL` : koneksi ke database PostgreSQL
- `JWT_SECRET` : secret key untuk signing JWT

---

## C. Daftar Endpoint API

### 1. Authentication
| Method | Endpoint | Description |
|------|--------|------------|
| POST | `/api/auth/v1/register` | Register user |
| POST | `/api/auth/v1/login` | Login & mendapatkan JWT |

---

### 2. Product CRUD (Protected)
| Method | Endpoint | Description |
|------|--------|------------|
| POST | `/api/products/v1` | Create product |
| GET | `/api/products/v1` | Get list product (ADMIN: all, USER: own) |
| GET | `/api/products/v1/:id` | Get product detail |
| PUT | `/api/products/v1/:id` | Update product (owner / ADMIN) |
| DELETE | `/api/products/v1/:id` | Delete product (owner / ADMIN) |

Authorization Header:
```
Authorization: Bearer <JWT_TOKEN>
```

---

### 3. Summary / Chart API
| Method | Endpoint | Description |
|------|--------|------------|
| GET | `/api/summary/v1/countDailyProducts` | Total product per hari |
| GET | `/api/summary/v1/countProductsPerRole` | Total product per user |
| GET | `/api/summary/v1/countProductsPerUser` | Total product per role |

---

### 4. Export Report (Bonus)
| Method | Endpoint | Description |
|------|--------|------------|
| GET | `/api/report/v1/exportProducts` | Export product report (CSV) |

Optional Query:
```
?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
```

Output:
- File CSV otomatis ter-download
- Nama file dinamis (`product-report-YYYY-MM-DD.csv`)

---

## D. Catatan Tambahan

### Default Seeder User
Seeder menyediakan data awal:

**ADMIN**
- Email: `admin@example.com`
- Password: `admin123`

**USER**
- Email: `user1@example.com`
- Password: `user123`

---

### Library Tambahan
- `bcrypt` → hashing password
- `jsonwebtoken` → JWT authentication
- `json2csv` → export CSV report
- `prisma` → ORM & migration
- `tsx` → runtime TypeScript

---

### Testing
- Semua endpoint dapat dites menggunakan **Postman**
- Untuk export CSV, gunakan fitur **Send and Download** di Postman


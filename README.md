# myWebJune2026 - Dự án kết nối NodeJS với MySQL (CRUD API)

## 1. Thông tin sinh viên
- **Họ và tên:** [Nguyễn Văn Nhật Minh ]
- **Mã sinh viên:** [24100084]

## 2. Các công nghệ sử dụng (Yêu cầu 1)
- **Backend:** Node.js, Express framework
- **Cơ sở dữ liệu:** MySQL (Sử dụng thư viện kết nối `mysql2`)
- **Quản lý cấu hình:** `dotenv`

## 3. Cấu trúc Database `studentreg` (Yêu cầu 2)
Dự án sử dụng cơ sở dữ liệu tên là `studentreg` gồm bảng `Student` có cấu trúc:
- `id` (INT, Khóa chính, Tự động tăng)
- `full_name` (VARCHAR - Tên sinh viên)
- `email` (VARCHAR - Email)
- `major` (VARCHAR - Ngành học)

## 4. Các API Đã Hiện Thực (Yêu cầu 3 & 4)
Dự án triển khai đầy đủ 4 hàm API bất đồng bộ (async/await) xử lý lỗi chặt chẽ:
- **[GET]** `/api/students`: Lấy danh sách toàn bộ sinh viên từ CSDL.
- **[POST]** `/api/students`: Thêm sinh viên mới (Truyền body JSON gồm full_name, email, major).
- **[PUT]** `/api/students/:id`: Cập nhật thông tin sinh viên dựa theo ID.
- **[DELETE]** `/api/students/:id`: Xóa sinh viên khỏi hệ thống dựa theo ID.

## 5. Hướng dẫn cài đặt và khởi chạy ứng dụng
1. Cài đặt các thư viện cần thiết:
   ```bash
   npm install

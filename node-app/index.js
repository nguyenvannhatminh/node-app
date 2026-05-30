// index.js
const express = require("express");
const { establishConnection, query } = require('./localdb');

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());

// Thực hiện kết nối tới CSDL khi khởi động Server
establishConnection();

// --- THỰC HIỆN CRUD (YÊU CẦU SỐ 4) ---

// 1. READ (Lấy danh sách sinh viên) - Trả về test GET
app.get('/api/students', async (req, res) => {
    try {
        const sql = "SELECT * FROM Student";
        const results = await query(sql);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: 'Database query failed' });
    }
});

// 2. CREATE (Thêm sinh viên mới) - Trả về test POST
app.post('/api/students', async (req, res) => {
    const { full_name, email, major } = req.body;
    try {
        const sql = "INSERT INTO Student (full_name, email, major) VALUES (?, ?, ?)";
        const results = await query(sql, [full_name, email, major]);
        res.status(201).json({ message: "Thêm sinh viên thành công!", id: results.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Không thể thêm sinh viên' });
    }
});

// 3. UPDATE (Cập nhật thông tin sinh viên) 
app.put('/api/students/:id', async (req, res) => {
    const { full_name, email, major } = req.body;
    try {
        const sql = "UPDATE Student SET full_name = ?, email = ?, major = ? WHERE student_id = ?";
        await query(sql, [full_name, email, major, req.params.id]);
        res.status(200).json({ message: "Cập nhật sinh viên thành công!" });
    } catch (error) {
        res.status(500).json({ error: 'Không thể cập nhật sinh viên' });
    }
});

// 4. DELETE (Xóa sinh viên)
app.delete('/api/students/:id', async (req, res) => {
    try {
        const sql = "DELETE FROM Student WHERE student_id = ?";
        await query(sql, [req.params.id]);
        res.status(200).json({ message: "Xóa sinh viên thành công!" });
    } catch (error) {
        res.status(500).json({ error: 'Không thể xóa sinh viên' });
    }
});

// Khởi chạy Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const express = require("express");
const { establishConnection, query } = require('./localdb');

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());

// Thực hiện kết nối tới CSDL khi khởi động Server
establishConnection();

// 1. READ (Lấy danh sách sinh viên)
app.get('/api/students', async (req, res) => {
    try {
        const sql = "SELECT * FROM STUDENT";
        const results = await query(sql);
        res.status(200).json(results);
    } catch (error) {
        console.error("LỖI GET:", error);
        res.status(500).json({ error: 'Database query failed', details: error.message });
    }
});

// 2. CREATE (Thêm sinh viên mới)
app.post('/api/students', async (req, res) => {
    // Nhận các trường tương ứng với CSDL mới (sid, sname, email, tutor_id)
    const { sid, sname, email, tutor_id } = req.body;
    try {
        const sql = "INSERT INTO STUDENT (SID, SNAME, EMAIL, Tutor_Id) VALUES (?, ?, ?, ?)";
        await query(sql, [sid, sname, email, tutor_id]);
        res.status(201).json({ message: "Thêm sinh viên thành công!", sid: sid });
    } catch (error) {
        console.error("LỖI POST:", error);
        res.status(500).json({ error: 'Không thể thêm sinh viên', details: error.message });
    }
});

// 3. UPDATE (Cập nhật thông tin sinh viên) 
app.put('/api/students/:id', async (req, res) => {
    const { sname, email, tutor_id } = req.body;
    try {
        // Cập nhật theo khóa chính SID
        const sql = "UPDATE STUDENT SET SNAME = ?, EMAIL = ?, Tutor_Id = ? WHERE SID = ?";
        await query(sql, [sname, email, tutor_id, req.params.id]);
        res.status(200).json({ message: "Cập nhật sinh viên thành công!" });
    } catch (error) {
        console.error("LỖI PUT:", error);
        res.status(500).json({ error: 'Không thể cập nhật sinh viên', details: error.message });
    }
});

// 4. DELETE (Xóa sinh viên)
app.delete('/api/students/:id', async (req, res) => {
    try {
        // Xóa theo khóa chính SID
        const sql = "DELETE FROM STUDENT WHERE SID = ?";
        await query(sql, [req.params.id]);
        res.status(200).json({ message: "Xóa sinh viên thành công!" });
    } catch (error) {
        console.error("LỖI DELETE:", error);
        res.status(500).json({ error: 'Không thể xóa sinh viên', details: error.message });
    }
});

// Khởi chạy Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
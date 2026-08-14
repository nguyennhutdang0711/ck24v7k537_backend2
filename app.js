const express = require("express");
const cors = require("cors");
const contactsRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Chào mừng đến với ứng dụng Danh Sách Liên Hệ." });
});

app.use("/api/contacts", contactsRouter);

// handle 404 response
app.use((req, res, next) => {
    // Code ở đây sẽ chạy khi không có route nào khớp với yêu cầu
    // Gọi next() để chuyển sang middleware xử lý lỗi tiếp theo
    return next(new ApiError(404, "Resource not found"));
});

// define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
    // Middleware xử lý lỗi tập trung
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;
# Yii2 Blog - React Frontend

Giao diện người dùng hiện đại và hiệu năng cao dành cho nền tảng Yii2 Blog. Được xây dựng trên phong cách Dark Theme sang trọng, tối ưu trải nghiệm đọc và tương tác với các bài viết công nghệ.

## 🚀 Các tính năng đã hoàn thiện

### 1. Đăng ký & Đăng nhập (Auth Flow)
- **Đăng ký tài khoản (`/register`)**: Biểu mẫu đăng ký đầy đủ (Tên đăng nhập, Email, Mật khẩu, Xác nhận mật khẩu), xác thực dữ liệu tại Client & hiển thị lỗi chi tiết từ Server.
- **Đăng nhập (`/login`)**: Tích hợp xác thực thông qua JWT Bearer Token, tự động lưu trữ và quản lý phiên đăng nhập (`auth_token`).
- **Phản hồi người dùng**: Sau khi đăng ký thành công, tự động chuyển hướng về trang Đăng nhập và hiển thị banner thông báo màu xanh lá vô cùng trực quan.

### 2. Trang chủ & Phân trang (`/`)
- **Danh sách bài viết**: Hiển thị dạng lưới (Grid) trực quan với ảnh Thumbnail đại diện thực tế từ Unsplash, hiển thị danh mục, ngày xuất bản (định dạng tiếng Việt) và lượt xem.
- **Phân trang (Pagination)**: Giới hạn hiển thị 6 bài viết mỗi trang. Hỗ trợ thanh điều hướng trang trước/sau và chọn trang số nhanh chóng, giao tiếp trực tiếp với cơ chế phân trang của Yii2 API.

### 3. Trang chi tiết bài viết (`/posts/:id`)
- **Hiển thị đầy đủ**: Tiêu đề lớn, chuyên mục, thông tin tác giả, ngày đăng, lượt xem và nội dung bài viết định dạng HTML chuẩn.
- **Thích bài viết (Like)**: Người dùng đã đăng nhập có thể nhấn Thích/Bỏ thích bài viết, đồng bộ trực tiếp trạng thái lên database backend thông qua API.
- **Tags**: Hiển thị danh sách các thẻ hashtag liên quan dưới bài viết.

---

## 🛠️ Công nghệ sử dụng
- **Core**: React JS, React Router DOM v6
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4, Custom CSS variables
- **HTTP Client**: Axios (Cấu hình Interceptors tự động đính kèm Token & xử lý lỗi Unauthorized 401)

---

## 💻 Hướng dẫn chạy local

### 1. Cài đặt các gói phụ thuộc
```bash
npm install
```

### 2. Cấu hình biến môi trường (`.env`)
Tạo file `.env` tại thư mục gốc và cấu hình URL của Yii2 API:
```env
VITE_API_BASE_URL=http://yii2-app-basic.test
```

### 3. Khởi chạy môi trường phát triển
```bash
npm run dev -- --port 5173
```
Ứng dụng sẽ khả dụng tại địa chỉ: `http://localhost:5173`

---

## 📸 Hình ảnh giao diện thực tế

### Đăng nhập & Thông báo đăng ký thành công
![Đăng nhập thành công](https://raw.githubusercontent.com/giathu012a3/yii2_Blog_Frontend/main/success_banner_shown_1783170541402.png)

### Trang chủ kèm Phân trang bài viết
![Trang chủ Phân trang](https://raw.githubusercontent.com/giathu012a3/yii2_Blog_Frontend/main/homepage_page2_1783171034469.png)

### Chi tiết bài viết hiển thị đầy đủ
![Chi tiết bài viết](https://raw.githubusercontent.com/giathu012a3/yii2_Blog_Frontend/main/full_page_from_top_1783170830603.png)

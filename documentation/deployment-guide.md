# Hướng dẫn deploy TDG Tea

## Phương án hosting

Website hiện là static HTML/CSS/JavaScript, không cần Node.js hoặc database để chạy phần giao diện.

Có thể upload toàn bộ nội dung bên trong `website/` lên thư mục public của hosting, thường là `public_html/` hoặc `dist/`.

## File khởi chạy

- Trang mặc định: `index.html`.
- Trang sản phẩm: `product.html`.
- Trang blog: `blog.html`.

Không đổi tên hoặc di chuyển các thư mục hình ảnh nếu chưa cập nhật lại đường dẫn trong HTML.

## Trước khi đưa production

1. Thay thông tin liên hệ trong `index.html`.
2. Thay các social link mẫu.
3. Kết nối form liên hệ với email, Formspree, Google Forms hoặc backend thật.
4. Xác nhận giá, thành phần, khối lượng hộp và hướng dẫn sử dụng.
5. Bổ sung Privacy Policy, Terms of Service và health disclaimer.
6. Bổ sung favicon, meta description, Open Graph image và domain chính thức.
7. Kiểm tra toàn bộ ảnh trên hosting sau khi upload.
8. Bật HTTPS và kiểm tra redirect HTTP sang HTTPS.

## Kiểm tra sau deploy

- Mở domain ở cửa sổ ẩn danh.
- Mở trên Chrome desktop, mobile Chrome và Safari iPhone.
- Kiểm tra `index.html`, `product.html#solanum`, `product.html#perilla`, `blog.html#blog1` và `blog.html#blog2`.
- Kiểm tra menu mobile, hero slider, Trust Gallery, bộ lọc sản phẩm, FAQ và modal liên hệ.
- Mở DevTools và xác nhận không có lỗi Console hoặc lỗi 404.
- Gửi thử form bằng dữ liệu test và xác nhận email nhận được thật.

## Rollback

Giữ lại bản website production trước đó trong `archive/` với ngày và phiên bản rõ ràng. Không xóa bản cũ trước khi bản mới được nghiệm thu.

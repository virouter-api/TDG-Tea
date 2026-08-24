# TDG Tea - Delivery Package

Đây là gói demo tĩnh để gửi chủ đầu tư xem trước và tiếp tục bổ sung thông tin chính thức.

## Cấu trúc

- `website/`: bản website có thể upload lên hosting tĩnh.
- `brand/`: nơi lưu logo, guideline và tài nguyên thương hiệu chính thức.
- `content/`: biểu mẫu nội dung cần chủ đầu tư xác nhận.
- `documentation/`: hướng dẫn deploy, kiểm thử và nghiệm thu.
- `archive/`: nơi lưu bản backup hoặc phiên bản bàn giao cũ.

## Chạy demo local

Mở `website/index.html` bằng trình duyệt. Nếu trình duyệt chặn một số tài nguyên local, chạy một static server tại thư mục `website/`.

Trang chính là `website/index.html`. File `website/tdg_tea.html` được giữ lại để tương thích với các liên kết hiện tại trong bản demo.

## Trạng thái demo

- Đã có trang chủ, 6 sản phẩm, trang chi tiết sản phẩm và 2 bài blog.
- Hình ảnh, nội dung liên hệ, social link và một số thông tin thương hiệu vẫn cần chủ đầu tư xác nhận.
- Form `Book a tasting` hiện chỉ mô phỏng trạng thái gửi thành công, chưa kết nối email hoặc CRM.
- Giá `$25 / box` là giá demo, cần xác nhận lại đơn vị tiền tệ và giá chính thức.
- Các claim liên quan sức khỏe cần được duyệt nội dung trước khi phát hành production.
- Đã bổ sung 12 infographic công dụng và thành phần cho 6 sản phẩm trong `website/CÔNG DỤNG/` và `website/THÀNH PHẦN/`.
- Bộ infographic hiện giữ nguyên chất lượng gốc và có dung lượng khoảng 221,6 MB; cần tạo bản web tối ưu trước production để giảm thời gian tải.

## Việc cần bổ sung

Xem `content/project-information-template.md`, `content/product-content-template.md` và `documentation/acceptance-checklist.md`.

## Quyền quản lý cần bàn giao

Sau khi chốt production, cần xác định người giữ quyền truy cập cho domain, DNS, hosting, email theo tên miền, analytics và các tài khoản social.

## Phiên bản

- Package: demo handover
- Ngày tạo: 2026-02-21
- Nguồn: TDG Tea static website

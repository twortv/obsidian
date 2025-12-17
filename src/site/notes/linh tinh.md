---
{"dg-publish":true,"permalink":"/linh-tinh/","noteIcon":""}
---

Chào bạn, để cấu hình VPN này trên Mac Mini (macOS), bạn cần lưu ý một điểm quan trọng: Trên Windows có chế độ **"Automatic"** (Tự động chọn giao thức), nhưng trên macOS bạn **phải chọn thủ công** giao thức cụ thể (thường là **L2TP over IPSec** hoặc **IKEv2**).

Dựa trên thông tin trong ảnh (Username/Password và IP), khả năng cao nhất đây là giao thức **L2TP over IPSec**.

Dưới đây là hướng dẫn từng bước (áp dụng cho macOS Ventura/Sonoma trở lên):

### Bước 1: Mở cài đặt mạng

1. Bấm vào biểu tượng **Apple ()** ở góc trái trên cùng > chọn **System Settings** (Cài đặt hệ thống).
    
2. Chọn mục **VPN** ở thanh bên trái (hoặc vào Network > VPN).
    
3. Bấm vào nút **Add VPN Configuration** (Thêm cấu hình VPN) > Chọn **L2TP over IPSec**.
    

### Bước 2: Điền thông tin cấu hình

Một cửa sổ sẽ hiện ra, bạn điền các thông tin từ ảnh vào như sau:

- **Display Name (Tên hiển thị):** `VPN CHUNG - VAN PHONG LUKLAK` (Bạn có thể đặt tùy ý).
    
- **Server Address (Địa chỉ máy chủ):** `222.252.29.95`
    
- **Account Name (Tên tài khoản):** `artele`
    
- **Password (Mật khẩu):** `weeb-jek-CLAW`
    
- **User Authentication (Xác thực người dùng):** Chọn "Password".
    

### Bước 3: Điền Shared Secret (Quan trọng)

Đây là phần **thiếu trong ảnh** của bạn. Với giao thức L2TP, ngoài User/Pass, bạn bắt buộc phải có một chuỗi khóa bí mật gọi là **Shared Secret** (hoặc Pre-Shared Key).

- **Machine Authentication (Xác thực máy):** Chọn "Shared Secret".
    
- **Shared Secret:** Bạn cần hỏi quản trị viên mạng (IT) của văn phòng để lấy chuỗi ký tự này. _(Trên Windows, nó thường bị ẩn trong nút Advanced Settings > thẻ Security > mục preshared key)._
    

### Bước 4: Tùy chỉnh nâng cao (Để vào được mạng nội bộ)

Sau khi điền xong, đừng vội kết nối ngay.

1. Bấm vào chữ **(i)** hoặc nút **Options** bên cạnh cấu hình vừa tạo.
    
2. Đảm bảo tích chọn mục **"Send all traffic over VPN connection"** (Gửi tất cả lưu lượng qua kết nối VPN). Điều này giúp bạn truy cập được các server nội bộ của công ty.
    
3. Bấm **OK** / **Create**.
    

### Bước 5: Kết nối

- Gạt công tắc sang **ON** để kết nối.
    

---

### Lưu ý nếu không kết nối được:

Nếu bạn chọn **L2TP over IPSec** mà báo lỗi, hãy thử xóa đi và tạo lại với loại **IKEv2**:

- **Server Address:** `222.252.29.95`
    
- **Remote ID:** `222.252.29.95` (Nhập giống Server IP).
    
- **Local ID:** (Để trống).
    
- **Authentication:** Username & Password.
    

Nhưng theo kinh nghiệm của tôi với các form "Windows built-in" như ảnh, 90% trường hợp là **L2TP over IPSec** và bạn cần hỏi xin **Shared Secret Key** để điền vào.
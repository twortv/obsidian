---
{"dg-publish":true,"permalink":"/linh-tinh/","noteIcon":""}
---

Dựa theo màn hình cấu hình VPN trên **Windows** bạn gửi (L2TP/IPsec với Pre-shared key), dưới đây là **cách cấu hình tương đương trên macOS** (Ventura / Sonoma / Monterey đều gần giống nhau).

---

## 1️⃣ Mở phần cấu hình VPN trên macOS

1. Vào **System Settings (Cài đặt hệ thống)**
    
2. Chọn **Network**
    
3. Nhấn **`+`** (Add Service)
    
4. Chọn:
    
    - **Interface**: `VPN`
        
    - **VPN Type**: `L2TP over IPSec`
        
    - **Service Name**:  
        👉 `VPN CHUNG - VĂN PHÒNG LUKLAK`
        
5. Nhấn **Create**
    

---

## 2️⃣ Nhập thông tin tương ứng từ Windows sang macOS

### 🔹 General (Chung)

|Windows|macOS|
|---|---|
|Server name or address|**Server Address**|
|`222.252.29.95`|`222.252.29.95`|
|User name|**Account Name**|
|`van`|`van`|

📌 **Account Name** = User name trên Windows

---

### 🔹 Authentication Settings…

Nhấn nút **Authentication Settings…**

#### 🔐 User Authentication

- Chọn **Password**
    
- Nhập **Password** (giống Windows)
    

#### 🔐 Machine Authentication

- Chọn **Shared Secret**
    
- Nhập **Pre-shared key**  
    (giống mục _Pre-shared key_ trên Windows)
    

👉 Nhấn **OK**

---

## 3️⃣ Cấu hình nâng cao (RẤT QUAN TRỌNG)

Nhấn **Advanced…**

✔ Tick:

- ✅ **Send all traffic over VPN connection**  
    (nếu muốn toàn bộ mạng đi qua VPN – giống hành vi Windows)
    

❌ Không cần tick các mục khác trừ khi IT yêu cầu

👉 Nhấn **OK**

---

## 4️⃣ Lưu & Kết nối

1. Nhấn **Apply**
    
2. Nhấn **Connect**
    

Nếu đúng thông tin:

- Trạng thái sẽ chuyển sang **Connected**
    
- Biểu tượng VPN xuất hiện trên thanh menu
    

---

## 5️⃣ So sánh nhanh Win vs Mac (để bạn dễ đối chiếu)

|Windows|macOS|
|---|---|
|VPN type: L2TP/IPsec with PSK|L2TP over IPSec|
|Server IP|Server Address|
|Pre-shared key|Shared Secret|
|Username|Account Name|
|Password|Password|

---

## 6️⃣ Nếu không kết nối được – checklist nhanh

Nếu lỗi ❌, hãy kiểm tra:

- 🔹 IP `222.252.29.95` có ping được không
    
- 🔹 Pre-shared key **có đúng 100% không** (phân biệt hoa/thường)
    
- 🔹 Router / firewall **có chặn UDP 500, 1701, 4500 không**
    
- 🔹 macOS **không bật iCloud Private Relay**
    

---

Nếu bạn muốn, bạn có thể:

- 📸 Gửi **ảnh màn hình lỗi trên Mac**
    
- ❓ Cho biết **phiên bản macOS**
    
- 🔐 Cho biết VPN này là **server gì (MikroTik / Fortigate / Windows RRAS / strongSwan …)**
    

👉 mình sẽ debug chính xác từng bước cho bạn.
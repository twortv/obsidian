---
{
  "dg-publish": true,
  "permalink": "/contract-invoice/",
  "tags": ["gardenEntry"],
  "noteIcon": "",
}
---

# File giải pháp chức năng Contract & Invoice

### **A. TỔNG QUAN**

#### **1\. Mô tả chung** 2

**Mục đích**: Chức năng này được thiết kế để quản lý toàn bộ vòng đời của hợp đồng và các chứng từ tài chính liên quan như hóa đơn, phiếu thu. Nó giúp chuẩn hóa quy trình, tự động hóa các tác vụ lặp lại và cung cấp một cái nhìn tổng thể về tình hình tài chính, công nợ với khách hàng.

==**Logic nghiệp vụ:** Quy trình bắt đầu từ việc tạo và soạn thảo Hợp đồng. Hợp đồng sau đó sẽ qua các bước soát xét nội bộ (Pháp chế, Quản lý) trước khi gửi cho khách hàng và ký kết. Sau khi hợp đồng được ký, hệ thống cho phép tạo các Hóa đơn và Phiếu thu tương ứng với các đợt thanh toán. Các phiếu thu được theo dõi tình trạng thanh toán (chờ thanh toán, đã thanh toán, quá hạn) và dữ liệu sẽ được cập nhật tự động ngược lại vào hợp đồng gốc để theo dõi tiến độ thanh toán tổng thể.==

**Tác động kinh doanh:**

- **Minh bạch hóa dòng tiền:** Theo dõi chính xác giá trị hợp đồng, số tiền đã thanh toán và công nợ còn lại theo thời gian thực.
- **Tăng tốc độ xử lý:** Chuẩn hóa và tự động hóa các bước từ soạn thảo, phê duyệt hợp đồng đến xuất hóa đơn, giúp giảm thời gian chờ đợi giữa các bộ phận.
- **Giảm thiểu sai sót:** Các quy trình và biểu mẫu chuẩn giúp hạn chế sai sót do nhập liệu thủ công, đảm bảo tính nhất quán của dữ liệu.
- **Nâng cao hiệu quả phối hợp:** Các bộ phận (Kinh doanh, Kế toán, Pháp chế) phối hợp nhịp nhàng trên một luồng công việc duy nhất, loại bỏ việc trao đổi thông tin qua nhiều kênh rời rạc.

#### **2\. Chức năng**

##### **2.1. Loại việc & Luồng nghiệp vụ**

| _Tên_         | _Mô tả ngắn_                                                                                                                    |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------ |
| **Hợp đồng**  | Quản lý thông tin, tài liệu và vòng đời của một hợp đồng ký kết với khách hàng. Đây là loại việc chính.                         |
| **Hóa đơn**   | \[Loại việc con của Hợp đồng\]. Quản lý việc tạo, xuất và gửi hóa đơn cho khách hàng theo các điều khoản của hợp đồng.          |
| **Phiếu thu** | \[Loại việc con của Hợp đồng\]. Theo dõi các khoản thanh toán của khách hàng cho từng hóa đơn hoặc đợt thanh toán của hợp đồng. |

#####

##### **2.2. Mối quan hệ giữa các Loại việc**

| _Quan hệ_              | _Mô tả_                                                                                                                |
| :--------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| Hợp đồng \- Hóa đơn    | Một Hợp đồng có thể có nhiều Hóa đơn. Hóa đơn là việc con được tạo ra từ Hợp đồng.                                     |
| Hợp đồng \- Phiếu thu  | Một Hợp đồng có thể có nhiều Phiếu thu. Phiếu thu là việc con được tạo ra từ Hợp đồng để theo dõi từng đợt thanh toán. |
| Hợp đồng \- Cơ hội     | Một Hợp đồng được tạo ra từ một Cơ hội. Hợp đồng \- Cơ hội kết nối với nhau                                            |
| Hợp đồng \- Khách hàng | Khách hàng có thể gồm nhiều hợp đồng thành công. Khách hàng \- Hợp đồng thành công kết nối với nhau                    |

#####

##### **2.3. Vai trò**

| _Vai trò_            | _Mô tả_                                                                                                                 | _Phân Quyền & Thông báo_                                                                                                                                     |
| :------------------- | :---------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Sales Manager**    | Quản lý bán hàng, chịu trách nhiệm tạo, đàm phán và theo dõi hợp đồng với khách hàng.                                   | **Phân quyền**: Tạo và cập nhật Hợp đồng. **Thông báo**: Nhận thông báo về các thay đổi trạng thái quan trọng của Hợp đồng.                                  |
| **Legal**            | Bộ phận Pháp chế, chịu trách nhiệm soát xét các điều khoản pháp lý của hợp đồng.                                        | **Phân quyền**: Chuyển trạng thái Soát xét, yêu cầu chỉnh sửa Hợp đồng. **Thông báo**: Nhận thông báo khi có Hợp đồng cần soát xét.                          |
| **Accountant**       | Kế toán, quản lý việc xuất hóa đơn, tạo phiếu thu và xác nhận thanh toán.                                               | **Phân quyền**: Tạo và quản lý Hóa đơn, Phiếu thu.**Thông báo**: Nhận thông báo khi Hợp đồng được ký kết để xuất hóa đơn và khi có các vấn đề về thanh toán. |
| **Finance Director** | Giám đốc tài chính, có quyền giám sát tổng thể, xem báo cáo và phê duyệt các trường hợp đặc biệt (ví dụ: hủy hợp đồng). | **Phân quyền**: Xem toàn bộ dữ liệu, có quyền hủy bỏ Hợp đồng. **Thông báo**: Nhận thông báo về các hợp đồng có giá trị lớn hoặc các trường hợp bất thường.  |

###

### **B. LOẠI VIỆC & NGHIỆP VỤ**

#### **1\. Danh sách Loại việc**

##### **1.1. Hợp đồng**

- **Mô tả nghiệp vụ**: Quản lý toàn bộ thông tin và vòng đời của một hợp đồng từ khi khởi tạo, soạn thảo, phê duyệt cho đến khi hoàn thành và lưu trữ. Đây là đối tượng trung tâm, liên kết với khách hàng và các chứng từ tài chính khác.
- **Ví dụ**: Hợp đồng Cung cấp dịch vụ Marketing cho Công ty ABC, Hợp đồng thi công nội thất văn phòng cho Tòa nhà XYZ.
- **Luồng tiến trình**:  
  MỚI TẠO → SOẠN THẢO → SOÁT XÉT → GỬI KHÁCH HÀNG → KÝ KẾT → HOÀN THÀNH  
   ↓ ↓ ↓  
   CHỈNH SỬA TỪ CHỐI TẠM DỪNG  
   ↓  
   HỦY BỎ
- **Chi tiết các Trạng thái**:

| _Trạng thái_       | _Nghiệp vụ_                                                                                            | _Cài đặt nâng cao_                                                                                                                             |
| :----------------- | :----------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| 1\. MỚI TẠO        | Sales Manager tạo yêu cầu hợp đồng với các thông tin cơ bản ban đầu.                                   |                                                                                                                                                |
| 2\. SOẠN THẢO      | Sales Manager điền đầy đủ thông tin chi tiết, giá trị, điều khoản và đính kèm file dự thảo hợp đồng.   | **Nhập liệu**: Khách hàng, Giá trị hợp đồng, VAT, File hợp đồng.                                                                               |
| 3\. SOÁT XÉT       | Bộ phận Legal nhận hợp đồng để kiểm tra, rà soát các điều khoản pháp lý và tính hợp lệ.                | **Phân quyền**: Chỉ vai trò Legal được chuyển trạng thái.                                                                                      |
| 4\. CHỈNH SỬA      | Sales Manager nhận lại hợp đồng để chỉnh sửa theo yêu cầu từ bộ phận Legal.                            | **Nhập liệu**: Hiển thị trường "Nội dung chỉnh sửa", "Lý do chỉnh sửa" để Legal ghi chú.                                                       |
| 5\. GỬI KHÁCH HÀNG | Hợp đồng đã được nội bộ thông qua, Sales Manager gửi cho khách hàng để xem xét.                        | **Tự động hoá**: Gửi email cho khách hàng (lấy từ trường "Email liên hệ") kèm file hợp đồng và nội dung tóm tắt.                               |
| 6\. TỪ CHỐI        | Khách hàng từ chối ký hợp đồng. Sales Manager ghi nhận lý do.                                          | **Nhập liệu**: Bắt buộc nhập trường "Lý do từ chối", “Yêu cầu chỉnh sửa”.                                                                      |
| 7\. KÝ KẾT         | Khách hàng đồng ý, hai bên tiến hành ký kết. Sales Manager cập nhật ngày ký và bản hợp đồng cuối cùng. | **Nhập liệu**: Yêu cầu nhập "Ngày ký" và tải lên "File hợp đồng" đã có chữ ký.                                                                 |
| 8\. TẠM DỪNG       | Tạm dừng hợp đồng vì một lý do nào đó (VD: chờ bổ sung thông tin từ khách hàng).                       | **Nhập liệu**: Yêu cầu nhập trường "Lý do tạm dừng", “Kế hoạch xử lý”.                                                                         |
| 9\. HOÀN THÀNH     | Hợp đồng đã thực hiện xong tất cả nghĩa vụ và các đợt thanh toán đã hoàn tất.                          | **Điều kiện**: Trường "Số tiền còn lại" phải bằng 0\.                                                                                          |
| 10\. HỦY BỎ        | Hợp đồng bị hủy bỏ do các vấn đề phát sinh và được sự đồng ý của cấp quản lý.                          | **Phân quyền**: Chỉ vai trò Finance Director được chuyển sang trạng thái này. **Nhập liệu**: Yêu cầu nhập "Lý do hủy bỏ" và "Xử lý tài chính". |

- **Màn hình trường dữ liệu**:

| _Nhóm thông tin_              | _Trường dữ liệu_                                                                                                                                                                                    | _Ghi chú_                                                                                                                                                    |
| :---------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Thông tin chung** \- 6      | Số hợp đồng, Tên hợp đồng, Loại hợp đồng, Ngày ký, Ngày kết thúc hợp đồng, Người bán hàng                                                                                                           | Các thông tin cơ bản để nhận diện và phân loại hợp đồng. Loại hợp đồng (Sổ xuống chọn một), Người bán hnagf (Chọn một người)                                 |
| **Thông tin khách hàng** \- 4 | Khách hàng, Tên khách hàng, Email liên hệ, Địa chỉ, Công ty                                                                                                                                         | Tham chiếu đến chức năng CRM hoặc nhập thủ công thông tin khách hàng. Khách hàng chọn một đầu việc.                                                          |
| **Giá trị & Thanh toán** \- 7 | Giá trị hợp đồng, VAT (%), Tổng giá trị hợp đồng, Đã thanh toán, Số tiền còn lại, Tiến độ thanh toán, Ngày hoàn thành dự kiến                                                                       | Quản lý các số liệu tài chính của hợp đồng. "Tổng giá trị", "Số tiền còn lại" là trường công thức tính tự động.                                              |
| **Nội dung & Tài liệu** \- 2  | File hợp đồng, Ghi chú                                                                                                                                                                              | Lưu trữ bản mềm của hợp đồng và các ghi chú liên quan.                                                                                                       |
| **Phê duyệt & Xử lý** \- 11   | Legal phụ trách, Kế toán, Lý do chỉnh sửa, Nội dung chỉnh sửa, Lý do từ chối, Yêu cầu chỉnh sửa, Lý do tạm dừng, Kế hoạch xử lý, Lý do hủy bỏ, Xử lý tài chính, Lý do điều chỉnh, Nội dung thay đổi | Các trường phục vụ cho quy trình phê duyệt và xử lý các tình huống phát sinh. Kế toán, Legal phụ trách (Chọn một người), Xử lý tài chính (Sổ xuống chọn một) |
| **Tổng số trường**            | **30**                                                                                                                                                                                              |                                                                                                                                                              |

---

##### **1.2. Phiếu thu**

- **Mô tả nghiệp vụ**: Ghi nhận và theo dõi các khoản thanh toán thực tế từ khách hàng, đối chiếu với hợp đồng và hóa đơn.
- **Ví dụ**: Phiếu thu đợt 1 \- 50.000.000đ cho hợp đồng ABC, Phiếu thu thanh toán muộn cho hóa đơn XYZ.
- **Luồng tiến trình**:  
  CHỜ THANH TOÁN → ĐÃ THANH TOÁN  
   ↓  
   THANH TOÁN MUỘN
- **Chi tiết các Trạng thái**:

| _Trạng thái_        | _Nghiệp vụ_                                                                    | _Cài đặt nâng cao_                                                                                                   |
| :------------------ | :----------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------- |
| 1\. CHỜ THANH TOÁN  | Phiếu thu được tạo và gửi cho khách hàng, đang trong thời gian chờ thanh toán. | **Tự động hoá**: Có thể kích hoạt gửi Email nhắc thanh toán cho khách hàng.                                          |
| 2\. ĐÃ THANH TOÁN   | Khách hàng đã thanh toán. Kế toán xác nhận và cập nhật thông tin.              | **Nhập liệu**: Yêu cầu nhập "Ngày thanh toán".**Tự động hoá**: Tự động cập nhật số tiền thanh toán trên Hợp đồng gốc |
| 3\. THANH TOÁN MUỘN | Hết hạn thanh toán nhưng khách hàng vẫn chưa thanh toán.                       |                                                                                                                      |

- **Màn hình trường dữ liệu**:

| _Nhóm thông tin_               | _Trường dữ liệu_                                                                                                                                      | _Ghi chú_                                                                                |
| :----------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------- |
| **Thông tin thanh toán** \- 10 | Mã phiếu thu, Đợt thu, Số tiền, Hạn thanh toán, Ngày cam kết thanh toán, Ngày thanh toán, Hình thức thanh toán, Ngân hàng, Số tài khoản, Nội dung thu | Các thông tin chi tiết về khoản thu. Hình thức thanh toán, Ngân hàng (Sổ xuống chọn một) |
| **Thông tin liên quan** \- 1   | Hợp đồng                                                                                                                                              | Tham chiếu đến Hợp đồng gốc.                                                             |
| **Ghi chú & QR Code** \- 2     | Ghi chú, Link mã QR                                                                                                                                   | Ghi chú thêm và lưu link mã QR thanh toán (nếu có).                                      |
| **Tổng số trường**             | **13**                                                                                                                                                |                                                                                          |

##### **1.3. Hóa đơn**

- **Mô tả nghiệp vụ**: Quản lý việc tạo, xuất và gửi hóa đơn cho khách hàng dựa trên hợp đồng đã ký. Mỗi hóa đơn tương ứng với một lần xuất chứng từ tài chính.
- **Ví dụ**: Hóa đơn GTGT số 001 cho đợt 1 hợp đồng ABC, Hóa đơn điều chỉnh cho hợp đồng XYZ.
- **Luồng tiến trình**:  
  CHỜ XUẤT → ĐANG XỬ LÝ → ĐÃ XUẤT → ĐÃ GỬI  
   ↓ ↓  
   TẠM DỪNG ĐIỀU CHỈNH → CHỜ XUẤT
- **Chi tiết các Trạng thái**:

| Trạng thái     | Nghiệp vụ                                                               | Cài đặt nâng cao                                                                                                          |
| :------------- | :---------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| 1\. CHỜ XUẤT   | Kế toán tạo hóa đơn với đầy đủ thông tin và chờ xử lý.                  | .                                                                                                                         |
| 2\. ĐANG XỬ LÝ | Kế toán đang trong quá trình tạo hóa đơn trên hệ thống hóa đơn điện tử. | **Nhập liệu**: Yêu cầu nhập Thông tin xuất hóa đơn, Loại hóa đơn, MST Khách hàng, Giá trị trước VAT, Tiền VAT, Tổng tiền. |
| 3\. ĐÃ XUẤT    | Hóa đơn đã được xuất thành công trên hệ thống hóa đơn điện tử.          | **Nhập liệu**: Yêu cầu nhập "Số hóa đơn" và "Ngày xuất".                                                                  |
| 4\. ĐÃ GỬI     | Hóa đơn đã được gửi cho khách hàng.                                     |                                                                                                                           |
| 5\. ĐIỀU CHỈNH | Hóa đơn cần điều chỉnh thông tin theo yêu cầu.                          | **Nhập liệu**: Yêu cầu nhập "Lý do điều chỉnh" và "Nội dung thay đổi".                                                    |
| 6\. TẠM DỪNG   | Tạm dừng xử lý hóa đơn vì lý do nào đó.                                 | **Nhập liệu**: Yêu cầu nhập "Lý do tạm dừng".                                                                             |

- **Màn hình trường dữ liệu**:

| Nhóm thông tin               | Trường dữ liệu                                                                                          | Ghi chú                                                                                                     |
| :--------------------------- | :------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------- |
| **Thông tin hóa đơn** \- 7   | Số hóa đơn, Loại hóa đơn, Ngày xuất, MST Khách hàng, Giá trị trước VAT, Tiền VAT, Tổng tiền, Khách hàng | Các thông tin cần thiết để xuất hóa đơn. "Tiền VAT" là trường công thức. Khách hàng là trường chọn Đầu việc |
| **Thông tin liên quan** \- 2 | Hợp đồng, Phiếu thu                                                                                     | Tham chiếu ngược lại Hợp đồng gốc và Phiếu thu tương ứng (nếu có). Phiếu thu (Chọn một đầu việc)            |
| **Xử lý & Ghi chú** \- 4     | Thông tin xuất hóa đơn, Lý do điều chỉnh, Nội dung thay đổi, Lý do tạm dừng                             | Các trường phục vụ quy trình xử lý nội bộ.                                                                  |
| **Tổng số trường**           | **14**                                                                                                  |                                                                                                             |

---

#### **2\. Mối quan hệ & tham chiếu giữa các Loại việc**

##### **2.1. Loại việc Cha \- con**

| _Quan hệ Cha \- Con_    | _Mô tả_                                                                                                                  |
| :---------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| Hợp đồng \=\> Hóa đơn   | Hóa đơn là một phần của quy trình thực hiện hợp đồng, được tạo ra để yêu cầu thanh toán cho các hạng mục trong hợp đồng. |
| Hợp đồng \=\> Phiếu thu | Phiếu thu ghi nhận các khoản thanh toán thực tế của khách hàng cho hợp đồng, giúp theo dõi công nợ.                      |

##### **2.2. Kết nối Loại việc**

| _Loại Kết nối_            | _Mô tả_                                                                                            |
| :------------------------ | :------------------------------------------------------------------------------------------------- |
| Hợp đồng \<=\> Khách hàng | \[Khách hàng\] \<=\> \[Hợp đồng\]. Cho biết hợp đồng thuộc về khách nào và khách có hợp đồng nào   |
| Hợp đồng \<=\> Cơ hội     | \[Cơ hội\] \<=\> \[Hợp đồng\]. Cho biết hợp đồng thuộc về cơ hội nào và cơ hội có các hợp đồng nào |

##### **2.3. Trường chọn Đầu việc**

| _Trường_                  | _Tham chiếu_                                                                                               | _Mô tả_                                                                                                              |
| :------------------------ | :--------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------- |
| Hợp đồng / **Khách hàng** | **Loại việc tham chiếu đến**: Khách hàng (từ chức năng CRM) / **Hiển thị**: Tên khách hàng, Mã khách hàng. | Cho phép chọn một khách hàng từ danh sách có sẵn trong chức năng CRM để tự động điền thông tin, tránh nhập liệu lại. |

### **C. TỰ ĐỘNG HOÁ**

#### **1\. Hành động trên Đầu việc**

| _Quy tắc_                    | _Kích hoạt_                          | _Hành động_                                                                                                                                                                                                                                   |
| :--------------------------- | :----------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1\. Tạo Phiếu thu            | **Hợp đồng** / Menu "Tạo Phiếu thu"  | **Nhập liệu**: Yêu cầu người dùng nhập các trường: Số tiền, Đợt thu, Hạn thanh toán.**Hành động**: Tự động tạo một Đầu việc con loại "Phiếu thu" với các thông tin đã nhập                                                                    |
| 2\. Tạo mã QR thanh toán     | **Phiếu thu** / Menu "Tạo mã QR"     | **Nhập liệu**: Yêu cầu xác nhận Số tiền, Ngân hàng, Số tài khoản, Nội dung thu. **Hành động**: Gọi đến dịch vụ bên ngoài (Sepay) để tạo link mã QR và cập nhật vào trường "Link mã QR". Gửi tin nhắn chứa link QR vào phần chat của Đầu việc. |
| 3\. In hợp đồng              | **Hợp đồng** / Menu "In hợp đồng"    | **Nhập liệu**: Yêu cầu người dùng xác nhận các thông tin chính.**Hành động**: Gửi dữ liệu của Hợp đồng qua HTTP Request đến một dịch vụ bên ngoài (N8N) để tạo file GG docs/PDF theo mẫu và trả link về.                                      |
| 4\. Gửi thông báo thanh toán | **Phiếu thu** / Menu "Gửi thông báo" | **Nhập liệu**: Xác nhận thông tin thanh toán.**Hành động**: Gửi email tới khách hàng với nội dung thông báo thanh toán, bao gồm số tiền, hạn thanh toán và link QR.                                                                           |

#### **2\. Hành động trên Đầu việc**

| _Quy tắc_                         | _Kích hoạt_                                                        | _Hành động_                                                                                                                                                             |
| :-------------------------------- | :----------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 5\. Cập nhật công nợ vào Hợp đồng | Khi Đầu việc **Phiếu thu** chuyển sang trạng thái "ĐÃ THANH TOÁN". | **Luồng thực thi**: Chuyển đến Đầu việc Hợp đồng cha.**Hành động**: Lấy giá trị trường "Số tiền" của Phiếu thu và cộng dồn vào trường "Đã thanh toán" của Hợp đồng cha. |

#### **3\. Kết nối app bên ngoài**

| _Quy tắc_                                 | _Kích hoạt_                                                        | _Hành động_                                                                                                                                                                                |
| :---------------------------------------- | :----------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 6\. \[N8N\] Tạo file Hợp đồng GG docs/PDF | Khi người dùng chọn menu "In hợp đồng" trên Đầu việc **Hợp đồng**. | **Hành động**: Luklak gửi HTTP Request chứa dữ liệu của Hợp đồng (Tên KH, giá trị, điều khoản...) sang N8N. N8N xử lý, điền vào template và trả về một webhook chứa link file GG docs/PDF. |
| 7\. \[N8N\] Cập nhật link file PDF        | Khi N8N gửi webhook về Luklak sau khi đã tạo file thành công.      | **Hành động**: Cập nhật giá trị link file PDF vào trường "File hợp đồng" trên Đầu việc Hợp đồng tương ứng. Gửi email chứa link hợp đồng cho khách hàng.                                    |

### **D. GIAO DIỆN LÀM VIỆC, BÁO CÁO, BỘ LỌC**

#### **1\. Giao diện**

| _Giao diện_                           | _Mô tả_                                                                                                                                                                  | _Nguồn dữ liệu_                |
| :------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------- |
| 1\. \[Kanban\] Quy trình Hợp đồng     | Hiển thị các Hợp đồng dưới dạng các thẻ Kanban được phân theo các cột trạng thái (Mới tạo, Soạn thảo, Soát xét...). Giúp theo dõi trực quan tiến độ của tất cả hợp đồng. | Loại việc: Hợp đồng            |
| 2\. \[Danh sách\] Danh sách Hợp đồng  | Hiển thị tất cả Hợp đồng dưới dạng bảng với các cột thông tin quan trọng như: Số hợp đồng, Khách hàng, Giá trị, Đã thanh toán, Còn lại, Ngày ký, Người phụ trách.        | Toàn bộ chức năng              |
| 3\. \[Lịch\] Lịch thanh toán & Ký kết | Hiển thị các Hợp đồng và Phiếu thu trên lịch dựa vào "Ngày ký" và "Hạn thanh toán" để tiện theo dõi các mốc thời gian quan trọng.                                        | Loại việc: Hợp đồng, Phiếu thu |

####

#### **2\. Báo cáo**

####

| _Khối trình bày_                                        | _Dữ liệu_                                                                                  | _Mô tả_                                                                                                                                             |
| :------------------------------------------------------ | :----------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1\. Tổng quan Doanh thu \[Bộ đếm & Tính toán\]          | Tổng hợp dữ liệu từ tất cả Hợp đồng đã ký kết.                                             | Hiển thị các chỉ số chính: Tổng giá trị hợp đồng đã ký, Tổng số tiền đã thu, Tổng công nợ còn lại.                                                  |
| 2\. Tình hình Hợp đồng theo Trạng thái \[Biểu đồ tròn\] | Dữ liệu từ tất cả các Đầu việc loại "Hợp đồng".                                            | Biểu đồ thể hiện tỷ lệ phần trăm số lượng hợp đồng ở mỗi trạng thái (Soạn thảo, Soát xét, Đã ký...), giúp nhận biết các điểm nghẽn trong quy trình. |
| 3\. Doanh thu theo Nhân viên Kinh doanh \[Biểu đồ cột\] | Dữ liệu từ các Hợp đồng đã ký, nhóm theo trường "Người bán hàng".                          | So sánh hiệu suất của các nhân viên kinh doanh dựa trên tổng giá trị hợp đồng họ mang về trong một khoảng thời gian.                                |
| 4\. Danh sách Hóa đơn quá hạn \[Danh sách Đầu việc\]    | Lọc các Đầu việc loại "Hóa đơn" có trạng thái "CHỜ THANH TOÁN" và "Hạn thanh toán" đã qua. | Cung cấp danh sách các hóa đơn cần đốc thúc thu nợ ngay lập tức.                                                                                    |

####

#### **3\. Bộ lọc**

| _Bộ lọc_                   | _Tiêu chí lọc_                                                               | _Nhắc việc_                                                               |
| :------------------------- | :--------------------------------------------------------------------------- | :------------------------------------------------------------------------ |
| 1\. Hợp đồng chờ tôi xử lý | assignee \= currentUser() AND statusCategory \!= "Hoàn thành"                |                                                                           |
| 2\. Hợp đồng cần soát xét  | issuetype \= "Hợp đồng" AND status \= "SOÁT XÉT"                             | **Lịch trình**: 9h sáng hàng ngày. **Người nhận**: Nhóm "Phòng Pháp chế". |
| 3\. Phiếu thu quá hạn      | issuetype \= "Phiếu thu" AND status \= "CHỜ THANH TOÁN" AND dueDate \< now() | **Lịch trình**: 9h30 sáng hàng ngày.**Người nhận**: Vai trò "Accountant". |

###

### **D. VAI TRÒ, PHÂN QUYỂN, THÔNG BÁO**

#### **1\. Vai trò**

| _Vai trò_            | _Mô tả_                                    | _Phân quyền & Thông báo_                                                                                                |
| :------------------- | :----------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| 1\. Sales Manager    | Quản lý bán hàng tạo và theo dõi hợp đồng. | Được cấp quyền tạo, cập nhật Hợp đồng. Nhận thông báo khi hợp đồng thay đổi trạng thái.                                 |
| 2\. Legal            | Pháp chế soát xét hợp đồng.                | Được cấp quyền chuyển trạng thái "Soát xét". Nhận thông báo khi có hợp đồng mới cần soát xét.                           |
| 3\. Accountant       | Kế toán quản lý hóa đơn và tài chính.      | Được cấp quyền tạo, quản lý Hóa đơn & Phiếu thu. Nhận thông báo khi hợp đồng được ký kết.                               |
| 4\. Finance Director | Giám đốc tài chính giám sát tổng thể.      | Có quyền xem toàn bộ, và quyền thực hiện các hành động quan trọng như "Hủy bỏ". Nhận thông báo các trường hợp đặc biệt. |

####

#### **2\. Phân quyền**

Sử dụng **Phương án Phân quyền Tùy chỉnh** dựa trên phương án có sẵn **"Phân quyền vừa phải"** và mở rộng thêm các quyền đặc thù cho các vai trò:

- **Xem Mảng việc**: Mọi vai trò trong Mảng việc đều xem được.
- **Xem Đầu việc**: Chỉ những người được gán vào Đầu việc (Người làm, Giám sát, Người liên quan) hoặc có vai trò cấp cao (Finance Director) mới xem được.
- **Cập nhật Đầu việc**:
  - **Sales Manager**: Có quyền tạo và cập nhật Hợp đồng ở các trạng thái ban đầu.
  - **Legal**: Chỉ có quyền cập nhật và chuyển trạng thái ở bước "Soát xét".
  - **Accountant**: Có quyền tạo và cập nhật Hóa đơn, Phiếu thu.
- **Hành động đặc biệt** (Xóa, Hủy bỏ): Chỉ vai trò **Finance Director** được thực hiện.

#### **3\. Thông báo**

Sử dụng **Phương án Thông báo Tùy chỉnh** dựa trên phương án có sẵn **"Thông báo quan trọng tới người liên quan"** và bổ sung:

- Khi một **Hợp đồng** chuyển sang trạng thái "SOÁT XÉT", gửi thông báo cho vai trò **Legal**.
- Khi một **Hợp đồng** chuyển sang trạng thái "KÝ KẾT", gửi thông báo cho vai trò **Accountant** để tiến hành xuất hóa đơn.
- Khi một **Phiếu thu** được tạo, thông báo sẽ được gửi tới **Người làm** (Kế toán) và **Người giám sát** (nếu có).

### **THỐNG KÊ KHỐI LƯỢNG CÀI ĐẶT**

#### **Tổng khối lượng cài đặt**

| Yếu tố                            | Số lượng | Điểm đơn vị | Tổng điểm |
| :-------------------------------- | :------- | :---------- | :-------- |
| Loại việc                         | 3        | 0,3         | 0,9       |
| Trạng thái                        | 20       | 0,2         | 4,0       |
| Trường dữ liệu                    | 56       | 0,09        | 5,04      |
| Quy tắc tự động hoá nội bộ Luklak | 2        | 0,6         | 1,2       |
| Quy tắc Kết nối với app ngoài     | 3        | 3           | 9,0       |
| Giao diện làm việc                | 3        | 0,4         | 1,2       |
| Bộ lọc                            | 3        | 0,35        | 1,05      |
| Khối trình bày trong dashboard    | 4        | 0,5         | 2         |
| **Tổng cộng**                     |          |             | **24,39** |

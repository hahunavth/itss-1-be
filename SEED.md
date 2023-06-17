# Test database và tạo dữ liệu cho các bảng

- Vào: http://localhost:3000/api#/users/UserController_signupUser

## Cách gọi api:
- Chọn 1 api bất kỳ
- Click `Try it out`
- Nhập field cần thiết
- Click `Execute`
- Xem kết quả

## Tạo dữ liệu cho các bảng

### Tạo dữ liệu cho bảng users
- Mỗi người đăng ký 1 user với tên của mình. Mẫu dữ liệu ở đây:

```json
{
  "password": "string",
  "email": "string",
  "username": "string",
  "phone_number": "string",
  "date_of_birth": "2023-06-14T09:56:18.568Z",
  "image_url": "string",
  "role": 0
}
```

### Bảng category
- Check
  - Các category mặc định:
  ```json
  [

  ]
  ```
  - Nếu trong db thiếu category mặc định nào thì tạo thêm category đó

- Test:
  - Vào link: http://localhost:3000/api#/categories/CategoriesController_findMany
  - Tạo 1 category mới
  - Update category vừa tạo
  - Xóa category vừa tạo


### Bảng devices
- Check
  - Các device mặc định:
  ```json
  [

  ]
  ```
  - Nếu trong db thiếu device mặc định nào thì tạo thêm device đó

- Test: tương tự category

### Bảng coffee-shops
- Crate:
  - Mỗi người tạo 2 coffee shop, yêu cầu thông tin coffee

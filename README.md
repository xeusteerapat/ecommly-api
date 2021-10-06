# Ecommly - Ecommerce Shop API

Udacity Cloud Developer Nanodegree Capstone Project

## Functionality

This project is a simple ecommerce online shop using AWS Lambda and Serverless framework. The main feature of application can be devided into 2 parts,

1. Admin Role - as an admin can create/read/update/delete products.
2. Customer Role - as a customer can visit products, create order and create payment.

## Diagram

![diagram](project-images/diagram.png)

## Tech Stacks

- Node.js
- Typescript
- Serverless Framework
- AWS Lambda
- AWS S3
- AWS Cognito
- DynamoDB

## Endpoints

### 1. Signup new user (I recommend you create the fake email using <https://10minemail.com/en/>)

```json
POST - {{BASE_API_URL}}/signup

payload

{
    "email": "ritaci4725@nubenews.com",
    "password": "Iamxeus$$001"
}

======================================
response

{
    "result": {
        "statusCode": 200,
        "email": "ritaci4725@nubenews.com",
        "message": "User successfully registered"
    }
}
```

### 2. Verify account using verification code, the code will send to your email account

```json
POST - {{BASE_API_URL}}/confirmed

payload

{
    "email": "ritaci4725@nubenews.com",
    "verificationCode": "863999"
}

======================================
response

{
    "result": {
        "statusCode": 200,
        "response": "SUCCESS"
    }
}
```

### 3. Signin user

```json
POST - {{BASE_API_URL}}/signin

payload

{
    "email": "ritaci4725@nubenews.com",
    "password": "Iamxeus$$001"
}

======================================
response

{
    "result": {
        "statusCode": 200,
        "token": {{CUSTOMER_TOKEN}},
        "role": [
            "Customer-develop"
        ]
    }
}
```

### 4. Create new product - only Admin can create the product

```json
POST - {{BASE_API_URL}}/products

authorization headers: {{Bearer ADMIN_TOKEN}}

payload

{
    "name": "Kyrie 6",
    "price": 169
}

======================================
response

{
    "item": {
        "productId": "PffnFziz93ff5e0aRF-LA",
        "createdAt": "2021-10-06T07:02:03.547Z",
        "updatedAt": "2021-10-06T07:02:03.547Z",
        "name": "Kyrie 6",
        "price": 169
    }
}
```

### 5. Upload image Url - Only for Admin

```json
POST - {{BASE_API_URL}}/products/{productId}/upload

authorization headers: {{Bearer ADMIN_TOKEN}}

======================================
response

{
    "uploadUrl": "https://ecommly-images-develop.s3.ap-southeast-1.amazonaws.com/bbDBF2apS-dDEYi2R_-pu?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA6JK756DTDGPQWY7V%2F20211003%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20211003T042012Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLXNvdXRoZWFzdC0xIkYwRAIgdGgt17kqp2OF%2BXDBk2HkMcclNG4VsCazJO7813OdR9sCIATYsOt9sNN9wIlLkp5%2BSW%2BEiCYSgMUkG4O0nBAkoRb5KqQCCCUQABoMOTgyMTM4MDg5NzAyIgz5GdU7nxVLCmHObH8qgQIAwI4%2BJxbHRbKgXGsyiWLtC866Q7SJxgIqglDX8qryn0k5qpfaVygdssEanwwgagY3gWnoyf%2BUJ1L%2FCGlvuxF2ze97TXlhXZ0V0MW9HhvsvMncjOqWY2MOxQEEIEs2i1ijBi1c8yrD9o%2FoIRD6ZZX42PBvMs0G0KsRhTw4Mfa6ja3s2UXSDWOtHE8hKxaBEy1PDhvjTjammVT5sEEs3KIimavDYilgD20kuBmPKdo3Ul9oCB7pnJ7Bh92xWhmGTI2OWiyeNL6pq9iq5NI7g13uMucq4Uk4hzSnzz78sczw7HWThE7XWpJ52oaP7M3rW8cKrRjFudRvbCnykj4x2BigYzD73uSKBjqbAe1Naazc%2FFRpujmrF3JIBMtcRe414e8bis%2FtqxAApT1JhMrDRyE1BAhQc6H1XZVItw1p2w0UDzVh6EErqA2mAAjwQBK14jMzpjN%2FA%2BprZn8t1c5Pbb0hAWTfjS5OSx8YaJkuWorfujiOlhqYYF2BzMnIQbN9OGxUL6ccW%2Fs3PdQ2cLPwEUFQezqxKb06mAwPohO7qh9t6lQk981t&X-Amz-Signature=409984f117d54c587e312a294fb2d9a90af0bb2d24c7859488783488de529d89&X-Amz-SignedHeaders=host"
}
```

### 6. After received signed url image, then send `PUT` request to signed url and upload binary file

![upload](./project-images/upload_signed_url.png)

### 7. Get all products - either admin or customer can visit this route

```json
GET - {{BASE_API_URL}}/products

authorization headers: {{Bearer ADMIN_TOKEN or CUSTOMER_TOKEN}}

======================================
response

{
    "items": [
        {
            "imageUrl": "https://ecommly-images-develop.s3.ap-southeast-1.amazonaws.com/51Es_c_K4zgBQJ41GmU6I",
            "updatedAt": "2021-10-02T13:41:49.088Z",
            "createdAt": "2021-10-02T13:41:49.088Z",
            "price": "229.00",
            "name": "Reebok - The Answer 1",
            "productId": "51Es_c_K4zgBQJ41GmU6I"
        },
        {
            "imageUrl": "https://ecommly-images-develop.s3.ap-southeast-1.amazonaws.com/WXLVn4Bzfxk2mKzztm9Fi",
            "updatedAt": "2021-10-02T03:22:55.286Z",
            "createdAt": "2021-10-02T03:22:55.286Z",
            "price": "179.00",
            "name": "Nike Kobe1 Re-Issue",
            "productId": "WXLVn4Bzfxk2mKzztm9Fi"
        },
        {
            "imageUrl": "https://ecommly-images-develop.s3.ap-southeast-1.amazonaws.com/kyRuH59MlG5kJFa2zkfs_",
            "updatedAt": "2021-10-01T02:52:36.130Z",
            "createdAt": "2021-10-01T02:52:36.130Z",
            "price": "199.00",
            "name": "Air Jordan",
            "productId": "kyRuH59MlG5kJFa2zkfs_"
        },
        {
            "imageUrl": "https://ecommly-images-develop.s3.ap-southeast-1.amazonaws.com/L15gT-CPWO1b80dUiqaqi",
            "updatedAt": "2021-10-02T13:48:43.214Z",
            "createdAt": "2021-10-02T13:48:43.214Z",
            "price": "159.00",
            "name": "Air Jordan Wade 2",
            "productId": "L15gT-CPWO1b80dUiqaqi"
        },
        {
            "imageUrl": "https://ecommly-images-develop.s3.ap-southeast-1.amazonaws.com/_VcgM1pLLQjatVMkRD6yK",
            "updatedAt": "2021-10-02T03:33:09.722Z",
            "createdAt": "2021-10-02T03:33:09.722Z",
            "price": "269.00",
            "name": "Nike Air Zoom Generation",
            "productId": "_VcgM1pLLQjatVMkRD6yK"
        }
    ]
}
```

### 8. Get product by id - either Admin or Customer can visit this route

```json
GET - {{BASE_API_URL}}/products/{productId}

authorization headers: {{Bearer ADMIN_TOKEN or CUSTOMER_TOKEN}}

======================================
response

{
    "items": {
        "imageUrl": "https://ecommly-images-develop.s3.ap-southeast-1.amazonaws.com/L15gT-CPWO1b80dUiqaqi",
        "updatedAt": "2021-10-02T13:48:43.214Z",
        "createdAt": "2021-10-02T13:48:43.214Z",
        "price": "159.00",
        "name": "Air Jordan Wade 2",
        "productId": "L15gT-CPWO1b80dUiqaqi"
    }
}
```

### 9. Update product by id - only Admin or Customer can visit this route

```json
PUT - {{BASE_API_URL}}/products/{productId}

authorization headers: {{Bearer ADMIN_TOKEN}}

payload

{
    "price": 269.00,
    "name": "Reebok-Answer 1 AI"
}

======================================
response

{
    "items": {
        "imageUrl": "https://ecommly-images-develop.s3.ap-southeast-1.amazonaws.com/51Es_c_K4zgBQJ41GmU6I",
        "updatedAt": "2021-10-02T13:41:49.088Z",
        "createdAt": "2021-10-02T13:41:49.088Z",
        "price": 269,
        "name": "Reebok-Answer 1 AI",
        "productId": "51Es_c_K4zgBQJ41GmU6I"
    }
}
```

### 10. Delete product by id - only Admin or Customer can visit this route

```json
DELETE - {{BASE_API_URL}}/products/{productId}

authorization headers: {{Bearer ADMIN_TOKEN}}

======================================
response

{
    "items": {
        "imageUrl": "https://ecommly-images-develop.s3.ap-southeast-1.amazonaws.com/51Es_c_K4zgBQJ41GmU6I",
        "updatedAt": "2021-10-02T13:41:49.088Z",
        "createdAt": "2021-10-02T13:41:49.088Z",
        "price": 269,
        "name": "Reebok-Answer 1 AI",
        "productId": "51Es_c_K4zgBQJ41GmU6I"
    }
}
```

### 11. Create new order - Customer can create their order

```json
POST - {{BASE_API_URL}}/orders

authorization headers: {{Bearer CUSTOMER_TOKEN}}

payload

[
    {
        "productId": "WXLVn4Bzfxk2mKzztm9Fi",
        "quantity": 1,
        "name": "Nike Kobe1 Re-Issue",
        "price": 179
    },
    {
        "productId": "51Es_c_K4zgBQJ41GmU6I",
        "quantity": 1,
        "name": "Reebok - The Answer 1",
        "price": 229
    }
]

======================================
response

{
    "item": {
        "userId": "fc0cba92-10b4-477a-9cdc-cc0cb861e964",
        "orderId": "uW49np_-Py5vsO8hFgPtB",
        "createdAt": "2021-10-06T04:40:01.851Z",
        "updatedAt": "2021-10-06T04:40:01.851Z",
        "orderItems": [
            {
                "productId": "WXLVn4Bzfxk2mKzztm9Fi",
                "quantity": 1,
                "name": "Nike Kobe1 Re-Issue",
                "price": 179
            },
            {
                "productId": "51Es_c_K4zgBQJ41GmU6I",
                "quantity": 1,
                "name": "Reebok - The Answer 1",
                "price": 229
            }
        ],
        "status": "pending",
        "totalPrice": 408
    }
}
```

### 12. Create payment - Customer can complete payment

```json
POST - {{BASE_API_URL}}/payment/{orderId}

authorization headers: {{Bearer CUSTOMER_TOKEN}}

payload

{
    "amount": 408,
    "currency": "usd",
    "description": "Second payment for ecommly"
}

======================================
response

{
    "result": {
        "orderId": "uW49np_-Py5vsO8hFgPtB",
        "userId": "fc0cba92-10b4-477a-9cdc-cc0cb861e964",
        "status": "succeeded"
    }
}
```

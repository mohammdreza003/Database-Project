USE store;
--تعریف  TABLE ها برای فروشگاه آنلاین

CREATE TABLE Categories(
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE Products(
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    category_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);
CREATE TABLE Customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20)
);
CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);
CREATE TABLE Order_Items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT ,
    product_id INT ,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);
CREATE TABLE Payments(
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    amount DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);
CREATE TABLE Shipping(
    shipping_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    shipping_method VARCHAR(50) NOT NULL,
    shipping_cost DECIMAL(10,2) NOT NULL,
    shipping_address TEXT NOT NULL,
    tracking_code VARCHAR(50),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);
-- پیدا کردن پرفروشترین محصول در بازه زمانی مشخص
SET @start_date = '2025-07-01';
SET @end_date = '2025-07-05 01:45:00';

SELECT 
    p.product_id,
    p.name,
    SUM(oi.quantity) AS total_sold
FROM 
    Products p
JOIN 
    Order_Items oi ON p.product_id = oi.product_id
JOIN 
    Orders o ON oi.order_id = o.order_id
WHERE 
    o.order_date BETWEEN @start_date AND @end_date
GROUP BY 
    p.product_id, p.name
ORDER BY 
    total_sold DESC
LIMIT 1;
-- محاسبه کل فروش ماهانه هر دستهبندی محصول
SELECT 
    c.category_id,
    c.name AS category_name,
    DATE_FORMAT(o.order_date, '%Y-%m') AS month,
    SUM(oi.quantity * p.price) AS total_revenue
FROM 
    Categories c
JOIN 
    Products p ON c.category_id = p.category_id
JOIN 
    Order_Items oi ON p.product_id = oi.product_id
JOIN 
    Orders o ON oi.order_id = o.order_id
GROUP BY 
    c.category_id, c.name, DATE_FORMAT(o.order_date, '%Y-%m')
ORDER BY 
    c.category_id, month;

--نمایش محصولات با موجودی کمتر از ۱۰ تا.
SELECT 
    product_id,
    name,
    stock,
    category_id,
    created_at
FROM 
    Products
WHERE 
    stock < 10
ORDER BY 
    stock ASC;

--  نمایش اطلاعات مشتریان با بیش از ۵ سفارش در ماه گذشته
SELECT 
    c.customer_id,
    c.first_name,
    c.last_name,
    c.email,
    c.phone,
    COUNT(o.order_id) AS order_count
FROM 
    Customers c
JOIN 
    Orders o ON c.customer_id = o.customer_id
WHERE 
    o.order_date BETWEEN '2025-06-05' AND '2025-07-05 02:39:00'
GROUP BY 
    c.customer_id, c.first_name, c.last_name, c.email, c.phone
HAVING 
    COUNT(o.order_id) > 5
ORDER BY 
    order_count DESC;
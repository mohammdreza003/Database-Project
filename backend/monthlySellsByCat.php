<?php
header("Conect-type: application/json");
header("Access-Control-Allow-Origin: *");
include "connection.php";

$sql = "SELECT 
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
    c.category_id, month;";
$stmt = $conn->prepare($sql);
if($stmt ===false){
    echo json_encode(["error" => "Failed to prepare statement"]);
    exit();
};
$stmt->execute();
$result = $stmt->get_result();
$categorys = array();
if ($result->num_rows >0){
    while ($row = $result->fetch_assoc()){
        $categorys[] = $row;
    }

}else{
    echo json_encode(["message" => "no sales found"]);
    exit();
}
echo json_encode($categorys);

$stmt->close();
$conn->close();
?>
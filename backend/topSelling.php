<?php
header("Conect-type: application/json");
header("Access-Control-Allow-Origin: *");
include "connection.php";
$start_date = $_GET["start_date"];
$end_date = $_GET["end_date"];

if (!$start_date || !$end_date){
    echo json_encode(["error" => "invalid date" ]);
    exit();
}

$sql = "SELECT 
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
    o.order_date BETWEEN ? AND ?
GROUP BY 
    p.product_id, p.name
ORDER BY 
    total_sold DESC
LIMIT 1;";
$stmt = $conn->prepare($sql);
if($stmt ===false){
    echo json_encode(["error" => "Failed to prepare statement"]);
    exit();
};
$stmt->bind_param("ss",$start_date,$end_date);
$stmt->execute();
$result = $stmt->get_result();
$top_selling = $result->fetch_assoc() ?: ["message" => "no products found"];
echo json_encode($top_selling);

$stmt->close();
$conn->close();
?>
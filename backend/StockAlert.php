<?php
header("Conect-type: application/json");
header("Access-Control-Allow-Origin: *");
include("connection.php");

$sql = "SELECT 
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
    stock ASC;";
$stmt = $conn->prepare(($sql));
if ($stmt ===false){
    echo json_encode(["error" =>"Failed to prepare statement"]);
    exit();
}
$stmt->execute();
$result = $stmt->get_result();
$stock_alert = array();
if($result->num_rows>0){
    while($row = $result->fetch_assoc()){
        $stock_alert[] = $row;
    }
}else{
    echo json_encode(["error"=> "No products found with low stock"]);
}
echo json_encode($stock_alert);
$stmt->close();
$conn->close();


?>
<?php
header("Conect-type: application/json");
header("Access-Control-Allow-Origin: *");
include "connection.php";
$sql = "SELECT 
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
    order_count DESC;";
$stmt = $conn->prepare($sql);
if ($stmt === false){
    echo json_encode(["error" => "Failed to prepare statement"]);
    exit();
}
$stmt->execute();
$result = $stmt->get_result();
$customers = array();
if($result->num_rows > 0){
    while($row = $result->fetch_assoc()){
        $customers[] = $row;
    }
}
else{
    echo json_encode(["message" => "No customers found with more than 5 orders"]);
    exit();
}
echo json_encode($customers);
$stmt->close();
$conn->close();


?>
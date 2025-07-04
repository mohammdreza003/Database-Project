<?php
header("Conect-type: application/json");
header("Access-Control-Allow-Origin: *");
include "connection.php";
$sql = "SELECT product_id, name, price, stock ,category_id FROM Products";
$stmt = $conn->prepare($sql);
if($stmt ===false){
    echo json_encode(["error" => "Failed to prepare statement"]);
    exit();
};
$stmt->execute();
$result = $stmt->get_result();
$products = array();
if ($result->num_rows > 0){
    while($row = $result->fetch_assoc()){
        $products[] = $row;
    }
}else{
    echo json_encode(["message" => "mahsooli yaft nashod"]);
    exit();
}
echo json_encode($products);

$stmt->close();
$conn->close();
?>
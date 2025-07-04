<?php
$host = "localhost";
$username = "root";
$password = "mmd123";
$dbname = "store";

$conn = new mysqli($host,$username,$password,$dbname);

if ($conn->connect_error){
    die("connetion error: " . $conn->connect_error);
}

?>
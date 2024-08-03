<?php
    include "dbConnect.php";

    $id = $_POST["id"];
    $price = $_POST["price"];
    if(isset($_POST["lessons"]) ? $lessons = $_POST["lessons"] : $lessons = 1);

    try{
        $query="INSERT INTO activityprices(activityId,lessons,price) values (:ID,:LESSONS,:PRICE);";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(":ID",$id);
        $stmt->bindParam(":LESSONS",$lessons);
        $stmt->bindParam(":PRICE",$price);
        $stmt->execute();

        header ("Content-Type:text/xml; charset=utf-8");
        http_response_code(200);
        echo "<created status='OK'/>";
    } 
    catch (PDOException $e) {
        err("Error!: ".$e->getMessage()."<br/>");
        die();
    }
?>

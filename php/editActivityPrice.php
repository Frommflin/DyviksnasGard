<?php
    include "dbConnect.php";

    $activityId = $_POST["activityId"];
    $groupId = $_POST["groupId"];
    $price = $_POST["price"];
    $lessons = $_POST["lessons"];

    try{
        $query="UPDATE activityprices SET lessons=:LESSONS, price=:PRICE WHERE activityId=:ACTIVITYID AND groupId=:GROUPID;";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(":ACTIVITYID",$activityId);
        $stmt->bindParam(":GROUPID",$groupId);
        $stmt->bindParam(":PRICE",$price);
        $stmt->bindParam(":LESSONS",$lessons);
        $stmt->execute();

        header ("Content-Type:text/xml; charset=utf-8");
        http_response_code(200);
        echo "<updated status='OK'/>";
    } 
    catch (PDOException $e) {
        err("Error!: ".$e->getMessage()."<br/>");
        die();
    }
?>

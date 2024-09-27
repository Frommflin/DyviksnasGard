<?php
    include "dbConnect.php";

    $activityId = $_POST["activityId"];
    $groupId = $_POST["groupId"];

    try
    {
        $query = "DELETE FROM `activityprices` WHERE activityId=:ACTIVITYID AND groupId=:GROUPID;";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(":ACTIVITYID",$activityId);
        $stmt->bindParam(":GROUPID",$groupId);
        $stmt->execute();

        header ("Content-Type:text/xml; charset=utf-8");
        http_response_code(200);
        echo "<deleted status='OK'/>";
    }
    catch(PDOException $error)
    {
        echo "Error: ".$error->getMessage()."<br/>";
    }
?>

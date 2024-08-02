<?php
    include "dbConnect.php";

    $id = $_POST["horseId"];
    $fileName = $_POST["image"];

    try
    {
        //Removing image from folder
        unlink("../images/horseProfiles/" . $fileName);

        //Removing horse from db
        $query = "DELETE FROM `horses` WHERE id=:ID";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(":ID",$id);
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

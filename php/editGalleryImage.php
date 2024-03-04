<?php
    include "dbConnect.php";

    $fileName = $_POST["image"];
    $newText = $_POST["description"];

    try{

        $query="UPDATE galleries SET imgDescription=:NEWDESC WHERE img=:IMG;";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(":IMG",$fileName);
        $stmt->bindParam(":NEWDESC",$newText);
        $stmt->execute();

        header ("Content-Type:text/xml; charset=utf-8");  
        echo "<updated status='OK'/>";
    } 
    catch (PDOException $e) {
        err("Error!: ".$e->getMessage()."<br/>");
        die();
    }
?>

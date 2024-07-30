<?php
    include "dbConnect.php";

    $id = $_POST["animalId"];
    $fileName = $_POST["image"];

    try
    {
        //Removing image from folder
        unlink("../images/animalUploads/" . $fileName);

        //Removing horse from db
        $query = "DELETE FROM `animals` WHERE id=:ID";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(":ID",$id);
        $stmt->execute();

        header ("Content-Type:text/xml; charset=utf-8");
        echo "<deleted status='OK'/>";
    }
    catch(PDOException $error)
    {
        echo "Error: ".$error->getMessage()."<br/>";
    }
?>

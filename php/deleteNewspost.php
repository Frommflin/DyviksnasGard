<?php
    include "dbConnect.php";

    $id = $_POST["postId"];
    $fileName = $_POST["image"];

    try
    {
        //Removing image from folder
        if($fileName != ""){
            unlink("../images/newsUploads/" . $fileName);
        }

        //Removing newspost from db
        $query = "DELETE FROM `newsposts` WHERE id=:ID";
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

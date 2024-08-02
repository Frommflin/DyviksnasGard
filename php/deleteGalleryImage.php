<?php
    include "dbConnect.php";

    $img = $_POST["image"];

    try
    {
        //Removing image from folder
        unlink("../images/galleryUploads/" . $img);

        //Removing image from db
        $query = "DELETE FROM `galleries` WHERE img=:IMG";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(":IMG",$img);
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

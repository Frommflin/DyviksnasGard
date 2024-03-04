<?php
    include "dbConnect.php";

    $id = $_POST["horseId"];
    $images = $_POST["images"];

    //Decoding json string and convert to php array
    $decodedImages = json_decode($images, true);

    try
    {
        foreach($decodedImages as $image){
            //Removing all images from folder
            unlink("../images/horseUploads/" . $image);
        }

        //Removing all images connected to 'id' from db
        $query = "DELETE FROM `photos` WHERE horse=:ID";
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

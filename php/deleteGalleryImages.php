<?php
    include "dbConnect.php";

    $id = $_POST["albumId"];
    $images = $_POST["images"];

    //Decoding json string and convert to php array
    $decodedImages = json_decode($images, true);

    try
    {
        foreach($decodedImages as $image){
            //Removing all images from folder
            unlink("../images/galleryUploads/" . $image);
        }

        // Deleting all images in given album
        $query = "DELETE FROM `galleries` WHERE album=:ID";
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

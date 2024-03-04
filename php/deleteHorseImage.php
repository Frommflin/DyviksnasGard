<?php
    include "dbConnect.php";

    $id = $_POST["horseId"];
    $images = $_POST["images"];

    //Decoding json string and convert to php array
    $decodedImages = json_decode($images, true);

    try
    {
        foreach($decodedImages as $image){
            //Removing image from folder
            unlink("../images/horseUploads/" . $image);

            //Removing image from db
            $query = "DELETE FROM `photos` WHERE horse=:ID AND img=:IMG";
            $stmt = $pdo->prepare($query);
            $stmt->bindParam(":ID",$id);
            $stmt->bindParam(":IMG",$image);
            $stmt->execute();
        }
        header ("Content-Type:text/xml; charset=utf-8");
        echo "<deleted status='OK'/>";
    }
    catch(PDOException $error)
    {
        echo "Error: ".$error->getMessage()."<br/>";
    }
?>

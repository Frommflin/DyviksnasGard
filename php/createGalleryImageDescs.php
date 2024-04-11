<?php
    include "dbConnect.php";

    $album = $_POST["sendToAlbum"];
    $images = $_POST["images"];

    //Decoding json string and convert to php array
    $decodedImages = json_decode($images, true);

    try{
        foreach($decodedImages as $image){
            if($image["name"] != ""){

                $query="INSERT INTO galleries(img,imgDescription,album) values (:IMG,:IMGDESC,:ALBUM);";
                $stmt = $pdo->prepare($query);
                $stmt->bindParam(":IMG",$image["name"]);
                $stmt->bindParam(":IMGDESC",$image["description"]);
                $stmt->bindParam(":ALBUM",$album);
                $stmt->execute();

            }
        }
        header ("Content-Type:text/xml; charset=utf-8");  
        echo "<created status='OK'/>";
    } 
    catch (PDOException $e) {
        err("Error!: ".$e->getMessage()."<br/>");
        die();
    }
?>

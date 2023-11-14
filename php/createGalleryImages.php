<?php
    include "dbConnect.php";

    $album = $_POST["toAlbum"];

    try{
        foreach($_FILES["galleryUploads"]["name"] as $key=>$val){
            if($_FILES["galleryUploads"]["name"] != ""){
                $extension = explode(".", $_FILES["galleryUploads"]["name"][$key]);
                $newName = rand() . "." . $extension[1];
                $destination = "../images/galleryUploads/" . $newName;
                move_uploaded_file($_FILES["galleryUploads"]["tmp_name"][$key], $destination);

                $query="INSERT INTO galleries(img,album) values (:IMG,:ALBUM);";
                $stmt = $pdo->prepare($query);
                $stmt->bindParam(":IMG",$newName);
                $stmt->bindParam(":ALBUM",$album);
                $stmt->execute();

                header ("Content-Type:text/xml; charset=utf-8");  
                echo "<created status='OK'/>";
            }
        }
    } 
    catch (PDOException $e) {
        err("Error!: ".$e->getMessage()."<br/>");
        die();
    }
?>
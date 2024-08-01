<?php
    include "dbConnect.php";
    include "functions.php";

    $id = $_POST["id"];
    $info = $_POST["newDesc"];
    $oldImg = $_POST["oldImage"];
    $newImg = "";

    try{
        if($_POST["noImage"] == "true"){
            $newImg = $oldImg;
        } else {
            if($_FILES["newImage"]["name"] != ""){
                // //Deleting old image
                unlink("../images/aboutUploads/" . $oldImg);
    
                $fileName = set_image_name("aboutUploads", $_FILES["newImage"]["name"]);
                $filePath = "../images/aboutUploads/" . $fileName;
                move_uploaded_file($_FILES["newImage"]["tmp_name"], $filePath);
    
                $newImg = $fileName;
            }
        }

        $query="UPDATE abouts SET aboutDescription=:INFO, img=:IMG WHERE id=:ID;";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(":ID",$id);
        $stmt->bindParam(":INFO",$info);
        $stmt->bindParam(":IMG",$newImg);
        $stmt->execute();

        header ("Content-Type:text/xml; charset=utf-8");  
        echo "<updated status='OK'/>";
    } 
    catch (PDOException $e) {
        err("Error!: ".$e->getMessage()."<br/>");
        die();
    }
?>

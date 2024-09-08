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

        $text = preg_replace('/&(?!#?[a-z0-9]+;)/', '&amp;', $info);

        $query="UPDATE abouts SET aboutDescription=:INFO, img=:IMG WHERE id=:ID;";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(":ID",$id);
        $stmt->bindParam(":INFO",$text);
        $stmt->bindParam(":IMG",$newImg);
        $stmt->execute();

        header ("Content-Type:text/xml; charset=utf-8");
        http_response_code(200);
        http_response_code(200);
        echo "<updated status='OK'/>";
    } 
    catch (PDOException $e) {
        err("Error!: ".$e->getMessage()."<br/>");
        die();
    }
?>

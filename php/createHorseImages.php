<?php
    include "dbConnect.php";
    include "functions.php";

    $id = $_POST["horseID"];

    try{
        foreach($_FILES["uploadHorse"]["name"] as $key=>$val){
            if($_FILES["uploadHorse"]["name"] != ""){
                $fileName = set_image_name("horseUploads", $_FILES["uploadHorse"]["name"][$key]);
                $filePath = "../images/horseUploads/" . $fileName;
                move_uploaded_file($_FILES["uploadHorse"]["tmp_name"][$key], $filePath);

                $query="INSERT INTO photos(img,horse) values (:IMG,:ID);";
                $stmt = $pdo->prepare($query);
                $stmt->bindParam(":IMG",$fileName);
                $stmt->bindParam(":ID",$id);
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

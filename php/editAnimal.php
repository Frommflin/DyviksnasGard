<?php
    include "dbConnect.php";
    include "functions.php";

    $id = $_POST["animalId"];
    $name = $_POST["newName"];
    $breed = $_POST["newBreed"];
    $year = $_POST["newYOB"];
    $info = $_POST["newDesc"];
    $oldImg = $_POST["oldImage"];
    $newImg = "";

    try{
        if($_POST["noNewImage"] == "true"){
            $newImg = $oldImg;
        } else {
            if($_FILES["newImage"]["name"] != ""){
                //Deleting old image
                unlink("../images/animalUploads/" . $oldImg);
    
                $fileName = set_image_name("animalUploads", $_FILES["newImage"]["name"]);
                $filePath = "../images/animalUploads/" . $fileName;
                move_uploaded_file($_FILES["newImage"]["tmp_name"], $filePath);
    
                $newImg = $fileName;
            }
        }

        $query="UPDATE animals SET petName=:ANIMAL, petBreed=:BREED, petYOB=:YOB, petImg=:IMG, petInfo=:INFO WHERE id=:ID;";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(":ID",$id);
        $stmt->bindParam(":ANIMAL",$name);
        $stmt->bindParam(":BREED",$breed);
        $stmt->bindParam(":YOB",$year);
        $stmt->bindParam(":IMG",$newImg);
        $stmt->bindParam(":INFO",$info);
        $stmt->execute();

        header ("Content-Type:text/xml; charset=utf-8");  
        echo "<updated status='OK'/>";
    } 
    catch (PDOException $e) {
        err("Error!: ".$e->getMessage()."<br/>");
        die();
    }
?>

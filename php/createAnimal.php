<?php
    include "dbConnect.php";
    include "functions.php";

    $name = $_POST["animalName"];
    $breed = $_POST["animalBreed"];
    $year = $_POST["animalYOB"];
    $info = $_POST["animalDesc"];
    $img = "";

    try{
        if($_FILES["animalImg"]["name"] != ""){
            $fileName = set_image_name("animalUploads", $_FILES["animalImg"]["name"]);
            $filePath = "../images/animalUploads/" . $fileName;
            move_uploaded_file($_FILES["animalImg"]["tmp_name"], $filePath);

            $img = $fileName;
        }

        $query="INSERT INTO animals(petName,petBreed,petYOB,petImg,petInfo) values (:ANIMAL,:BREED,:YOB,:IMG,:INFO);";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(":ANIMAL",$name);
        $stmt->bindParam(":BREED",$breed);
        $stmt->bindParam(":YOB",$year);
        $stmt->bindParam(":IMG",$img);
        $stmt->bindParam(":INFO",$info);
        $stmt->execute();

        header ("Content-Type:text/xml; charset=utf-8");  
        echo "<created status='OK'/>";
    } 
    catch (PDOException $e) {
        err("Error!: ".$e->getMessage()."<br/>");
        die();
    }
?>

<?php
    include "dbConnect.php";
    include "functions.php";

    $name = $_POST["horseName"];
    $nickname = $_POST["nickname"];
    $color = $_POST["color"];
    $breed = $_POST["breed"];
    $height = $_POST["height"];
    $year = $_POST["yearOfBirth"];
    $info = $_POST["description"];
    $img = "";

    try{
        if($_FILES["profileImg"]["name"] != ""){
            $fileName = set_image_name("horseProfiles", $_FILES["profileImg"]["name"]);
            $filePath = "../images/horseProfiles/" . $fileName;
            move_uploaded_file($_FILES["profileImg"]["tmp_name"], $filePath);

            $img = $fileName;
        }

        $query="INSERT INTO horses(horseName,nickname,color,breed,height,yearOfBirth,img,longInfo) values (:HORSE,:NICK,:COLOR,:BREED,:HEIGHT,:YOB,:IMG,:INFO);";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(":HORSE",$name);
        $stmt->bindParam(":NICK",$nickname);
        $stmt->bindParam(":COLOR",$color);
        $stmt->bindParam(":BREED",$breed);
        $stmt->bindParam(":HEIGHT",$height);
        $stmt->bindParam(":YOB",$year);
        $stmt->bindParam(":IMG",$img);
        $stmt->bindParam(":INFO",$info);
        $stmt->execute();

        header ("Content-Type:text/xml; charset=utf-8");
        http_response_code(200);
        echo "<created status='OK'/>";
    } 
    catch (PDOException $e) {
        err("Error!: ".$e->getMessage()."<br/>");
        die();
    }
?>

<?php
    include "dbConnect.php";
    include "functions.php";

    $title = $_POST["title"];
    $info = $_POST["description"];
    $img = "";

    try{
        if($_FILES["image"]["name"] != ""){
            $fileName = set_image_name("activityUploads", $_FILES["image"]["name"]);
            $filePath = "../images/activityUploads/" . $fileName;
            move_uploaded_file($_FILES["image"]["tmp_name"], $filePath);

            $img = $fileName;
        }

        $query="INSERT INTO activities(activityName,activityInfo,img) values (:TITLE,:IMG,:INFO);";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(":TITLE",$title);
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

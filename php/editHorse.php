<?php
    include "dbConnect.php";
    include "functions.php";

    $id = $_POST["horseId"];
    $name = $_POST["updateHorseName"];
    $nickname = $_POST["updateNickname"];
    $color = $_POST["updateColor"];
    $breed = $_POST["updateBreed"];
    $height = $_POST["updateHeight"];
    $year = $_POST["updateYearOfBirth"];
    $info = $_POST["updateDescription"];
    $oldImg = $_POST["oldProfile"];
    $newImg = "";

    try{
        if($_POST["noImage"] == "true"){
            $newImg = $oldImg;
        } else {
            if($_FILES["newProfile"]["name"] != ""){
                //Deleting old image
                unlink("../images/horseProfiles/" . $oldImg);
    
                $fileName = set_image_name("horseProfiles", $_FILES["newProfile"]["name"]);
                $filePath = "../images/horseProfiles/" . $fileName;
                move_uploaded_file($_FILES["newProfile"]["tmp_name"], $filePath);
    
                $newImg = $fileName;
            }
        }

        $text = preg_replace('/&(?!#?[a-z0-9]+;)/', '&amp;', $info);

        $query="UPDATE horses SET horseName=:HORSE, nickname=:NICK, color=:COLOR, breed=:BREED, height=:HEIGHT, yearOfBirth=:YOB, img=:IMG, longInfo=:INFO WHERE id=:ID;";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(":ID",$id);
        $stmt->bindParam(":HORSE",$name);
        $stmt->bindParam(":NICK",$nickname);
        $stmt->bindParam(":COLOR",$color);
        $stmt->bindParam(":BREED",$breed);
        $stmt->bindParam(":HEIGHT",$height);
        $stmt->bindParam(":YOB",$year);
        $stmt->bindParam(":IMG",$newImg);
        $stmt->bindParam(":INFO",$text);
        $stmt->execute();

        header ("Content-Type:text/xml; charset=utf-8");
        http_response_code(200);
        echo "<updated status='OK'/>";
    } 
    catch (PDOException $e) {
        err("Error!: ".$e->getMessage()."<br/>");
        die();
    }
?>

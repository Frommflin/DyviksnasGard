<?php
    include "dbConnect.php";

    $id = $_POST["horseID"];

    try{
        foreach($_FILES["uploadHorse"]["name"] as $key=>$val){
            if($_FILES["uploadHorse"]["name"] != ""){
                $extension = explode(".", $_FILES["uploadHorse"]["name"][$key]);
                $newName = rand() . "." . $extension[1];
                $destination = "../images/horseUploads/" . $newName;
                move_uploaded_file($_FILES["uploadHorse"]["tmp_name"][$key], $destination);

                $query="INSERT INTO photos(img,horse) values (:IMG,:ID);";
                $stmt = $pdo->prepare($query);
                $stmt->bindParam(":IMG",$newName);
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

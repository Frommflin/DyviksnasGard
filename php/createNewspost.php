<?php
    include "dbConnect.php";
    include "functions.php";

    if(isset($_POST["newsName"]) ? $title = $_POST["newsName"] : $title = "");
    $image = "";
    $description = $_POST["newsDescription"];
    $author = $_POST["author"];
    $postDate = date("Y-m-d");

    try{
        if($_POST["noImage"] == "false"){
            if($_FILES["newsImg"]["name"] != ""){
                $fileName = set_image_name("newsUploads", $_FILES["newsImg"]["name"]);
                $filePath = "../images/newsUploads/" . $fileName;
                move_uploaded_file($_FILES["newsImg"]["tmp_name"], $filePath);
                $image = $fileName;
            }
        }

        $text = preg_replace('/&(?!#?[a-z0-9]+;)/', '&amp;', $description);
        
        $query="INSERT INTO newsposts(title,article,author,postDate,img) values (:TITLE,:ARTICLE,:AUTHOR,:POSTDATE,:IMG);";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(":TITLE",$title);
        $stmt->bindParam(":ARTICLE",$text);
        $stmt->bindParam(":AUTHOR",$author);
        $stmt->bindParam(":POSTDATE",$postDate);
        $stmt->bindParam(":IMG",$image);
        $stmt->execute();

        header ("Content-Type:text/xml; charset=utf-8");
        http_response_code(200);
        echo "<created status='OK'/>";

    } catch (PDOException $e) {
        err("Error!: ".$e->getMessage()."<br/>");
        die();
    }
?>

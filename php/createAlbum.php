<?php
    include "dbConnect.php";

    $name = $_POST["albumName"];
    $description = $_POST["albumDescription"];

    try{
        $text = preg_replace('/&(?!#?[a-z0-9]+;)/', '&amp;', $description);

        $query="INSERT INTO albums(albumName,albumDescription) values (:ALBUM,:ALBUMDESC);";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(":ALBUM",$name);
        $stmt->bindParam(":ALBUMDESC",$text);
        $stmt->execute();

        header ("Content-Type:text/xml; charset=utf-8");  
        echo "<created status='OK'/>";

    } catch (PDOException $e) {
        err("Error!: ".$e->getMessage()."<br/>");
        http_response_code(200);
        die();
    }
?>

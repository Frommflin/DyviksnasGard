<?php
    include "dbConnect.php";

    $id = $_POST["postId"];
    $title = $_POST["title"];
    $text = $_POST["description"];

    try{

        $query="UPDATE newsposts SET title=:TITLE, article=:ARTICLE WHERE id=:ID;";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(":ID",$id);
        $stmt->bindParam(":TITLE",$title);
        $stmt->bindParam(":ARTICLE",$text);
        $stmt->execute();

        header ("Content-Type:text/xml; charset=utf-8");  
        echo "<updated status='OK'/>";
    } 
    catch (PDOException $e) {
        err("Error!: ".$e->getMessage()."<br/>");
        die();
    }
?>

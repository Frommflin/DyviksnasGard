<?php
    include "dbConnect.php";

    $id = $_POST["postId"];
    $title = $_POST["title"];
    $info = $_POST["description"];

    try{
        $text = preg_replace('/&(?!#?[a-z0-9]+;)/', '&amp;', $info);

        $query="UPDATE newsposts SET title=:TITLE, article=:ARTICLE WHERE id=:ID;";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(":ID",$id);
        $stmt->bindParam(":TITLE",$title);
        $stmt->bindParam(":ARTICLE",$text);
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

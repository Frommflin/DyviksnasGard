<?php
    include "dbConnect.php";

    $fileName = $_POST["image"];
    $newText = $_POST["description"];

    try{

        $text = preg_replace('/&(?!#?[a-z0-9]+;)/', '&amp;', $newText);

        $query="UPDATE galleries SET imgDescription=:NEWDESC WHERE img=:IMG;";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(":IMG",$fileName);
        $stmt->bindParam(":NEWDESC",$text);
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

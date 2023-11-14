<?php
    include "dbConnect.php";

    $email = $_POST("forgotEmail");
    $pwd = $_POST("forgotPwd1");

    try{
        $query2="UPDATE users SET pwd=:PWD WHERE email=:EMAIL;";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(":EMAIL",$email);
        $stmt->bindParam(":PWD",$pwd);
        $stmt->execute();

        header ("Content-Type:text/xml; charset=utf-8");  
        echo "<created status='OK'/>";

    } catch (PDOException $e) {
            err("Error!: ".$e->getMessage()."<br/>");
            die();
    }
?>
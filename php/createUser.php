<?php
    include 'dbConnect.php';

    $email = $_POST('createEmail');
    $name = $_POST('createName');
    $pwd = $_POST('createPwd');

    try{
        $query="INSERT INTO users(email,userName,pwd) values (:EMAIL,:USER,:PWD);";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':EMAIL',$email);
        $stmt->bindParam(':USER',$name);
        $stmt->bindParam(':PWD',$pwd);
        $stmt->execute();

        header ("Content-Type:text/xml; charset=utf-8");  
        echo '<created status="OK"/>';

    } catch (PDOException $e) {
            err("Error!: ".$e->getMessage()."<br/>");
            die();
    }
?>
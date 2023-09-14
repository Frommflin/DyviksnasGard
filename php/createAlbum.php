<?php
    include 'dbConnect.php';

    $name = $_POST('albumName');
    $description = $_POST('albumDescription');

    try{
        $query="INSERT INTO albums(albumName,albumDescription) values (:ALBUM,:ALBUMDESC);";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':ALBUM',$name);
        $stmt->bindParam(':ALBUMDESC',$description);
        $stmt->execute();

        header ("Content-Type:text/xml; charset=utf-8");  
        echo '<created status="OK"/>';

    } catch (PDOException $e) {
            err("Error!: ".$e->getMessage()."<br/>");
            die();
    }
?>
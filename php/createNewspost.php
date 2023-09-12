<?php
    include 'dbConnect.php';

    $title = $_POST('newsName');
    $image = $_FILES('newsImg');
    $description = $_POST('newsDescription');
    $author = $_POST('author');
    $postDate = date('Y-m-d');

    try{
        $query="INSERT INTO newsposts(title,article,author,postDate,img) values (:TITLE,:ARTICLE,:AUTHOR,:POSTDATE,:IMG);";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':TITLE',$title);
        $stmt->bindParam(':ARTICLE',$description);
        $stmt->bindParam(':AUTHOR',$author);
        $stmt->bindParam(':POSTDATE',$postDate);
        $stmt->bindParam(':IMG',$image);
        $stmt->execute();

        header ("Content-Type:text/xml; charset=utf-8");  
        echo '<created status="OK"/>';

    } catch (PDOException $e) {
            err("Error!: ".$e->getMessage()."<br/>");
            die();
    }
?>
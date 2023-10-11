<?php
    include 'dbConnect.php';

    try
    {
        $query = "SELECT * FROM `newsposts` ORDER BY `id` DESC";
        $stmt = $pdo->prepare($query);
        $stmt->execute();

        $output="<newsposts>\n";
        foreach($stmt as $key => $row){
                $output.="<post \n";
                $output.="    title='".$row['title']."'\n";
                $output.="    article='".$row['article']."'\n";
                $output.="    author='".$row['author']."'\n";
                $output.="    date='".$row['postDate']."'\n";
                $output.="    image='".$row['img']."'\n";
                $output.=" />\n";
        }
        $output.="</newsposts>";

        header ("Content-Type:text/xml; charset=utf-8");
        echo $output;
    }
    catch(PDOException $error)
    {
         echo "Error: ".$error->getMessage()."<br/>";
    }
?>

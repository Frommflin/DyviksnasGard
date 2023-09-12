<?php
    include 'dbConnect.php';

    try
    {
        $query = "SELECT * FROM `newsposts`";
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

        // Update first so if it crashes we have not printed the data first
        $query="UPDATE newsposts SET lastvisit=now()";
        $stmt = $pdo->prepare($query);
        $stmt->execute();

        header ("Content-Type:text/xml; charset=utf-8");
        echo $output;
    }
    catch(PDOException $error)
    {
        console.log("Error: ".$error->getMessage()."<br/>");
    }
?>
<?php
    include 'dbConnect.php';

    try
    {
        $query = "SELECT * FROM `albums`";
        $stmt = $pdo->prepare($query);
        $stmt->execute();

        $output="<albums>\n";
        foreach($stmt as $key => $row){
                $output.="<album \n";
                $output.="    id='".$row['id']."'\n";
                $output.="    name='".$row['albumName']."'\n";
                $output.="    description='".$row['albumDescription']."'\n";
                $output.=" />\n";
        }
        $output.="</albums>";

        // Update first so if it crashes we have not printed the data first
        $query="UPDATE albums SET lastvisit=now()";
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
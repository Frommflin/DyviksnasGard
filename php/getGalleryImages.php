<?php
    include 'dbConnect.php';

    $album = $_POST['albumID'];

    try
    {
        $query = "SELECT * FROM `galleries` WHERE album=:ALBUM";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':ALBUM',$album);
        $stmt->execute();

        $output="<gallery>\n";
        foreach($stmt as $key => $row){
                $output.="<image \n";
                $output.="    name='".$row['img']."'\n";
                $output.="    description='".$row['imgDescription']."'\n";
                $output.=" />\n";
        }
        $output.="</gallery>";

        header ("Content-Type:text/xml; charset=utf-8");
        echo $output;
    }
    catch(PDOException $error)
    {
        echo "Error: ".$error->getMessage()."<br/>";
    }
?>
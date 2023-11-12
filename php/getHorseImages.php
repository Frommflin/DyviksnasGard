<?php
    include 'dbConnect.php';

    $horse = $_POST['horseID'];

    try
    {
        $query = "SELECT * FROM `photos` WHERE horse=:ID";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':ID',$horse);
        $stmt->execute();

        $output="<photos>\n";
        foreach($stmt as $key => $row){
                $output.="<image \n";
                $output.="    file='".$row['img']."'\n";
                $output.=" />\n";
        }
        $output.="</photos>";

        header ("Content-Type:text/xml; charset=utf-8");
        echo $output;
    }
    catch(PDOException $error)
    {
        echo "Error: ".$error->getMessage()."<br/>";
    }
?>

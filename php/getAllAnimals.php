<?php
    include "dbConnect.php";

    try
    {
        $query = "SELECT * FROM `animals`";
        $stmt = $pdo->prepare($query);
        $stmt->execute();

        $output="<animals>\n";
        foreach($stmt as $key => $row){
                $output.="<animal \n";
                $output.="    id='".$row["id"]."'\n";
                $output.="    name='".$row["petName"]."'\n";
                $output.="    breed='".$row["petBreed"]."'\n";
                $output.="    yob='".$row["petYOB"]."'\n";
                $output.="    img='".$row["petImg"]."'\n";
                $output.="    description='".$row["petInfo"]."'\n";
                $output.=" />\n";
        }
        $output.="</animals>";

        header ("Content-Type:text/xml; charset=utf-8");
        echo $output;
    }
    catch(PDOException $error)
    {
         echo "Error: ".$error->getMessage()."<br/>";
    }
?>

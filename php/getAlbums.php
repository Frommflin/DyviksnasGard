<?php
    include "dbConnect.php";

    try
    {
        $query = "SELECT * FROM `albums`";
        $stmt = $pdo->prepare($query);
        $stmt->execute();

        $output="<albums>\n";
        foreach($stmt as $key => $row){
                $output.="<album \n";
                $output.="    id='".$row["id"]."'\n";
                $output.="    name='".$row["albumName"]."'\n";
                $output.="    description='".$row["albumDescription"]."'\n";
                $output.=" />\n";
        }
        $output.="</albums>";

        header ("Content-Type:text/xml; charset=utf-8");
        http_response_code(200);
        echo $output;
    }
    catch(PDOException $error)
    {
        echo "Error: ".$error->getMessage()."<br/>";
    }
?>

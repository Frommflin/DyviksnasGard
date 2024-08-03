<?php
    include "dbConnect.php";

    try
    {
        $query = "SELECT * FROM `activities`";
        $stmt = $pdo->prepare($query);
        $stmt->execute();

        $output="<activities>\n";
        foreach($stmt as $key => $row){
                $output.="<activity \n";
                $output.="    id='".$row["id"]."'\n";
                $output.="    name='".$row["activityName"]."'\n";
                $output.=" />\n";
        }
        $output.="</activities>";

        header ("Content-Type:text/xml; charset=utf-8");
        http_response_code(200);
        echo $output;
    }
    catch(PDOException $error)
    {
         echo "Error: ".$error->getMessage()."<br/>";
    }
?>

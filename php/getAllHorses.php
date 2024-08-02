<?php
    include "dbConnect.php";

    try
    {
        $query = "SELECT id,horseName,img FROM `horses`";
        $stmt = $pdo->prepare($query);
        $stmt->execute();

        $output="<horses>\n";
        foreach($stmt as $key => $row){
                $output.="<horse \n";
                $output.="    id='".$row["id"]."'\n";
                $output.="    name='".$row["horseName"]."'\n";
                $output.="    image='".$row["img"]."'\n";
                $output.=" />\n";
        }
        $output.="</horses>";

        header ("Content-Type:text/xml; charset=utf-8");
        http_response_code(200);
        echo $output;
    }
    catch(PDOException $error)
    {
         echo "Error: ".$error->getMessage()."<br/>";
    }
?>

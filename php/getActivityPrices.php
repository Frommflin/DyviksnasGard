<?php
    include "dbConnect.php";

    $id = $_POST["activityId"];

    try
    {
        $query = "SELECT * FROM `activityprices` WHERE activityId=:ID";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(":ID",$id);
        $stmt->execute();

        $output="<activity>\n";
        foreach($stmt as $key => $row){
                $output.="<lesson \n";
                $output.="    groupId='".$row["groupId"]."'\n";
                $output.="    lesson='".$row["lessons"]."'\n";
                $output.="    price='".$row["price"]."'\n";
                $output.=" />\n";
        }
        $output.="</activity>";

        header ("Content-Type:text/xml; charset=utf-8");
        http_response_code(200);
        echo $output;
    }
    catch(PDOException $error)
    {
        echo "Error: ".$error->getMessage()."<br/>";
    }
?>

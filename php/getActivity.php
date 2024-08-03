<?php
    include "dbConnect.php";

    $id = $_POST["activityId"];

    try
    {
        $query = "SELECT * FROM `activities` WHERE id=:ID";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(":ID",$id);
        $stmt->execute();

        $output="<activities>\n";
        foreach($stmt as $key => $row){
                $output.="<activity \n";
                $output.="    id='".$row["id"]."'\n";
                $output.="    name='".$row["activityName"]."'\n";
                $output.="    description='".$row["activityInfo"]."'\n";
                $output.="    image='".$row["img"]."'\n";
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

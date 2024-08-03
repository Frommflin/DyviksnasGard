<?php
    include "dbConnect.php";

    try{
        $query = "SELECT id FROM `activities` ORDER BY id DESC LIMIT 1;";
        $stmt = $pdo->prepare($query);
        $stmt->execute();

        $output="<activities>\n";
        foreach($stmt as $key => $row){
            $output.="<activity id='".$row["id"]."'/>\n";
        }
        $output.="</activities>";

        header ("Content-Type:text/xml; charset=utf-8");
        http_response_code(200);
        echo $output;
    } 
    catch (PDOException $e) {
        err("Error!: ".$e->getMessage()."<br/>");
        die();
    }
?>

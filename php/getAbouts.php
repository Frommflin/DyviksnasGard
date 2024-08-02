<?php
    include "dbConnect.php";

    try
    {
        $query = "SELECT * FROM `abouts`";
        $stmt = $pdo->prepare($query);
        $stmt->execute();

        $output="<abouts>\n";
        foreach($stmt as $key => $row){
                $output.="<about \n";
                $output.="    id='".$row["id"]."'\n";
                $output.="    name='".$row["aboutName"]."'\n";
                $output.="    description='".$row["aboutDescription"]."'\n";
                $output.="    img='".$row["img"]."'\n";
                $output.=" />\n";
        }
        $output.="</abouts>";

        header ("Content-Type:text/xml; charset=utf-8");
        http_response_code(200);
        echo $output;
    }
    catch(PDOException $error)
    {
        echo "Error: ".$error->getMessage()."<br/>";
    }
?>

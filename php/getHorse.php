<?php
    include 'dbConnect.php';

    $horse = $_POST['horseID'];

    try
    {
        $query = "SELECT * FROM `horses` WHERE id=:HORSE";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':HORSE',$horse);
        $stmt->execute();

        $output="<horses>\n";
        foreach($stmt as $key => $row){
                $output.="<horse \n";
                $output.="    id='".$row['id']."'\n";
                $output.="    name='".$row['horseName']."'\n";
                $output.="    nickname='".$row['nickname']."'\n";
                $output.="    color='".$row['color']."'\n";
                $output.="    breed='".$row['breed']."'\n";
                $output.="    height='".$row['height']."'\n";
                $output.="    year='".$row['yearOfBirth']."'\n";
                $output.="    image='".$row['img']."'\n";
                $output.="    info='".$row['longInfo']."'\n";
                $output.=" />\n";
        }
        $output.="</horses>";

        header ("Content-Type:text/xml; charset=utf-8");
        echo $output;
    }
    catch(PDOException $error)
    {
         echo "Error: ".$error->getMessage()."<br/>";
    }
?>

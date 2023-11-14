<?php
    include "dbConnect.php";

    $email = $_POST["loginEmail"];
    $pwd = $_POST["loginPwd"];

    try
    {
        $query = "SELECT * FROM `users` WHERE email=:EMAIL AND pwd=:PWD";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(":EMAIL",$email);
        $stmt->bindParam(":PWD",$pwd);
        $stmt->execute();

        $output="<users>\n";
        foreach($stmt as $key => $row){
                $output.="<user \n";
                $output.="    email='".$row["email"]."'\n";
                $output.="    name='".$row["userName"]."'\n";
                $output.=" />\n";
        }
        $output.="</users>";

        header ("Content-Type:text/xml; charset=utf-8");
        echo $output;
    }
    catch(PDOException $error)
    {
        console.log("Error: ".$error->getMessage()."<br/>");
    }
?>
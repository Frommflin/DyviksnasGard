<?php
    include "dbConnect.php";

    $email = $_POST["loginEmail"];
    $pwd = $_POST["loginPwd"];

    try
    {
        $query = "SELECT * FROM `users` WHERE email=:EMAIL";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(":EMAIL",$email);
        $stmt->execute();


        $output="<users>\n";
        foreach($stmt as $key => $row){
            if(password_verify($pwd,$row["pwd"])){
                $output.="<user \n";
                $output.="    email='".$row["email"]."'\n";
                $output.="    name='".$row["userName"]."'\n";
                if($row["isAdmin"]){
                    $output.="    role='Admin'\n";
                } else {
                    $output.="    role='Guest'\n";
                }
                $output.=" />\n";
            }
        }
        $output.="</users>";

        header ("Content-Type:text/xml; charset=utf-8");
        http_response_code(200);
        echo $output;
    }
    catch(PDOException $error)
    {
        echo "Error: ".$error->getMessage()."<br/>";
    }
?>

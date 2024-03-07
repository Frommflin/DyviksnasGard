<?php
    $images = $_POST["images"];
    //Decoding json string and convert to php array
    $decodedImages = json_decode($images, true);

    foreach($decodedImages as $image){
        //Removing all images from folder
        unlink("../images/galleryUploads/" . $image);
    }
    
    header ("Content-Type:text/xml; charset=utf-8");  
    echo "<unlinked status='OK'/>";
?>

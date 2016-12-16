<!DOCTYPE html>
<html>
    <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" />
        
        <style>
            body {
                padding-top:50px;
            }
        </style>
        
        <title>Card war</title>
    </head>
    
    <body>
        <div class="container">
              <h1>Card war</h1>
              
              <p>Hey there! Here you can find the latest version of card war.</p>
              
              <br/>
              
              <a href='/release/card-war.zip'><button class='btn btn-success'><big>Download</big></button></a>
              
              <br/>
              
              <?php
                $version_data = json_decode(file_get_contents('./release/version.json'), true);
                
                echo "<p>Build: " . '<b>' . $version_data['version'] . '</b>' . "</p>";
                echo "<p>Date: " . $version_data['date'] . "</p>";
              ?>
        </div>
    </body>
</html>


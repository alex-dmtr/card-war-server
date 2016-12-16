<?php

    // $m = new MongoClient(); // connect
    // $db = $m->selectDB("example");
    
$dbconn = pg_connect("host=ec2-54-75-248-193.eu-west-1.compute.amazonaws.com
dbname=df287ddnrmgv7p 
user=zeoucxfliyvuga 
password=75acd52173ec2333583d9d0ba0d46577eaa8bd58b44bae2de99aa5aafe89d0d4")
    or die('Could not connect: ' . pg_last_error());
    
    
    if (isset($_GET['table'])) {
        
        
        $query = 'SELECT * FROM ' . $_GET['table'];
        $result = pg_query($query) or die('Query failed: ' . pg_last_error());
    
        
        // echo "<table>\n";
        
        $json = array();
        while ($line = pg_fetch_array($result, null, PGSQL_ASSOC)) {
            $json[] = $line;
            // echo "\t<tr>\n";
            // foreach ($line as $col_value) {
                // echo "\t\t<td>$col_value</td>\n";
            // }
            // echo "\t</tr>\n";
        }
        // echo "</table>\n";
        
    
            
        echo json_encode($json);
        // Free resultset
        pg_free_result($result);
        
        // Closing connection
        pg_close($dbconn);
    
    }
    
    else
    
    {
        require 'home.html';
    }
    // echo "Hello, world!";
?>
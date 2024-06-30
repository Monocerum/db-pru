<?php
    include 'connect.php';

    $sql = $conn->query("SELECT * FROM pru_db");
    $result = array();

    while ($data = $sql -> fetch_assoc()) {
        $result[] = $data;
    }

    echo json_encode($result);

    mysqli_close($conn);
?>
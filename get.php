<?php
    include 'connnect.php';

    $id = (int) $_GET['id'];

    $sql = $conn -> query("SELECT * FROM pru_db WHERE id = $id");
    $data = $sql -> fetch_assoc();
    echo json_encode($data);

    if ($data == null) {
        echo "
            <script>
                document.location.href = 'http://localhost:3000';
            </script>
        ";
    }

    mysqli_close($conn);
?>
<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (is_array($data)) {
        include './connect.php';
        include './insert.php';
        include './query.php';

        $insert = new Insert(Conn::connect());
        $query = new Query(Conn::connect());

        switch ($data['access']) {
            case '01':
                $nome = $data['nome'];
                $telefone = $data['telefone'];
                $email = $data['email'];
                $senha = password_hash($data['senha'], PASSWORD_DEFAULT);

                $insert->createUsuario(['nome' => $nome, 'telefone' => $telefone, 'email' => $email, 'senha' => $senha]);
                break;
            case '02':
                $email = $data['email'];
                $senha = $data['senha'];

                $query->accessLogin(['email' => $email, 'senha' => $senha]);
                break;
        }
    }
}
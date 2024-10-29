<?php

require './config/vendor/autoload.php';
use React\EventLoop\Factory;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (is_array($data)) {
        include './connect.php';
        include './insert.php';
        include './query.php';
        include './update.php';

        $insert = new Insert(Conn::connect());
        $query = new Query(Conn::connect());
        $update = new Update(Conn::connect());

        switch ($data['access']) {
            case '00':
                $email = $data['email'];
                $code = $data['code'];

                include_once './mailer.php';
                $loop = Factory::create();
                Mailer::run($email, $code)->then(
                    function ($result) {
                        echo json_encode(['success' => true, 'code' => $result['code']]);
                    },
                    function ($error) {
                        echo json_encode(['success' => false, 'error' => $error]);
                    }
                );
                $loop->run();
                break;
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
            case '03':
                $email = $data['email'];

                $query->dataUsuario(['email' => $email]);
                break;
            case '04':
                $email = $data['email'];
                $value = $data['value'];

                $update->activeProfile(['email' => $email, 'value' => $value]);
                break;
            case '05':
                $email = $data['email'];
                $value = $data['json'];

                $update->setSobreMim($email, $value);
                break;
            case '06':
                $email = $data['email'];
                $nome = $data['nome'];
                $telefone = $data['telefone'];
                $genero = $data['genero'];

                $update->setInfoLogin(['email' => $email, 'nome' => $nome, 'telefone' => $telefone, 'genero' => $genero]);
                break;
            case '07':
                $search = $data['search'];

                $query->searchProfissionais($search);
                break;
            case '08':
                $id = $data['id'];

                $query->viewProfessional($id);
                break;
            case '09':
                $email = $data['email'];

                $update->setConfirmCode($email);
                break;
            case '10':
                $id = $data['id'];
                $search = $data['search'];

                $query->searchMyServices($id, $search);
                break;
        }
    }
}
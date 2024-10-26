<?php

include './mailer.php';
require './config/vendor/autoload.php';
use React\EventLoop\Factory;

class Insert {
    private mixed $pdo;
    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    function createUsuario($items): void {
        try {
            $code = mt_rand(10000, 99999);
            $stmt = $this->pdo->prepare('INSERT INTO usuarios (nome, email, telefone, senha, code) VALUES (:nome, :email, :telefone, :senha, :code)');
            $params = [
                  ':nome' => $items['nome'],
                  ':email' => $items['email'],
                  ':telefone' => $items['telefone'],
                  ':senha' => $items['senha'],
                  ':code' => $code,
            ];
            $stmt->execute($params);

            if ($this->isCreateUsuarioExist($items['email'])) {
                $loop = Factory::create();
                Mailer::run($items['email'], $code)->then(
                    function ($result) {
                        echo json_encode(['success' => true, 'code' => $result['code']]);
                    },
                    function ($error) {
                        echo json_encode(['success' => false, 'error' => $error]);
                    }
                );
                $loop->run();
            } else {
                echo json_encode(['success' => false]);
            }
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    }

    function isCreateUsuarioExist($email): bool {
        try {
            $stmt = $this->pdo->prepare('SELECT email FROM usuarios WHERE email = :email');
            $stmt->execute([':email' => $email]);
            $fetch = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($fetch) {
                return true;
            }
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
        return false;
    }
}
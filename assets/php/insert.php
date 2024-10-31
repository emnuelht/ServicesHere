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
            $stmt = $this->pdo->prepare('INSERT INTO usuarios (nome, email, telefone, senha) VALUES (:nome, :email, :telefone, :senha)');
            $params = [
                  ':nome' => $items['nome'],
                  ':email' => $items['email'],
                  ':telefone' => $items['telefone'],
                  ':senha' => $items['senha'],
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

    function createSearch($items): void {
        try {
            $stmt = $this->pdo->prepare('INSERT INTO servicos (_id_usuario, titulo, descricao, orcamento, local, contatos) VALUES (:_id_usuario, :titulo, :descricao, :orcamento, :local, :contatos)');
            $params = [
                ':_id_usuario' => $items['id'],
                ':titulo' => $items['titulo'],
                ':descricao' => $items['descricao'],
                ':orcamento' => $items['orcamento'],
                ':local' => $items['local'],
                ':contatos' => $items['contatos'],
            ];
            $stmt->execute($params);

            if ($this->isCreateServiceExist($items['id'])) {
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false]);
            }
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    }

    function isCreateServiceExist($id): bool {
        try {
            $stmt = $this->pdo->prepare('SELECT email FROM servicos WHERE _id_usuario = :id');
            $stmt->execute([':id' => $id]);
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
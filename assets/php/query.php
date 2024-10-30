<?php

class Query {

    private mixed $pdo;
    function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function accessLogin($items): void {
        try {
            $stmt = $this->pdo->prepare('SELECT email, senha, confirm_code FROM usuarios WHERE email = :email');
            $stmt->execute([':email' => $items['email']]);
            $fetch = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($fetch) {
                if (password_verify($items['senha'], $fetch['senha'])) {
                    echo json_encode(['success' => true, 'confirm' => $fetch['confirm_code']]);
                } else {
                    echo json_encode(['success' => false]);
                }
            } else {
                echo json_encode(['success' => false]);
            }
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    }

    public function dataUsuario($items): void {
        try {
            $stmt = $this->pdo->prepare('SELECT * FROM usuarios WHERE email = :email');
            $stmt->execute([':email' => $items['email']]);
            $fetch = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($fetch) {
                echo json_encode(['success' => true, 'data' => $fetch]);
            } else {
                echo json_encode(['success' => false]);
            }
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    }

    public function searchProfissionais($search): void {
        try {
            $search = $search != '' ? '%'.$search.'%' : $search;
            if ($search == '') {
                $stmt = $this->pdo->prepare('SELECT * FROM usuarios');
                $stmt->execute();
            } else {
                $stmt = $this->pdo->prepare('SELECT * FROM usuarios WHERE nome LIKE :nome OR sobre_mim LIKE :sobre ');
                $stmt->execute([':nome' => $search, ':sobre' => $search]);
            }
            $fetch = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if (count($fetch) > 0) {
                echo json_encode(['success' => true, 'search' => $fetch]);
            } else {
                echo json_encode(['success' => false]);
            }
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    }

    public function viewProfessional($id): void {
        try {
            $stmt = $this->pdo->prepare('SELECT * FROM usuarios WHERE _id = :id ');
            $stmt->execute([':id' => $id]);
            $fetch = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($fetch) {
                echo json_encode(['success' => true, 'search' => $fetch]);
            } else {
                echo json_encode(['success' => false]);
            }
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    }

    public function searchMyServices($id, $search): void {
        try {
            $search = $search != '' ? '%'.$search.'%' : $search;
            if ($search == '') {
                $stmt = $this->pdo->prepare('SELECT * FROM servicos WHERE _id_usuario = :id');
                $stmt->execute([':id' => $id]);
            } else {
                $stmt = $this->pdo->prepare('SELECT * FROM servicos WHERE _id_usuario = :id AND (titulo LIKE :search OR orcamento LIKE :search OR palavra_chave LIKE :search OR local LIKE :search)');
                $stmt->execute([':id' => $id, ':search' => $search]);
            }
            $fetch = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if (count($fetch) > 0) {
                echo json_encode(['success' => true, 'search' => $fetch]);
            } else {
                echo json_encode(['success' => false]);
            }
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    }
}
<?php

class Query {

    private mixed $pdo;
    function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function accessLogin($items): void {
        try {
            $stmt = $this->pdo->prepare('SELECT email, senha FROM usuarios WHERE email = :email');
            $stmt->execute([':email' => $items['email']]);
            $fetch = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($fetch) {
                if (password_verify($items['senha'], $fetch['senha'])) {
                    echo json_encode(['success' => true]);
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
}
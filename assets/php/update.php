<?php

class Update {
    private mixed $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    function activeProfile($items):void {
        try {
            $stmt = $this->pdo->prepare('UPDATE usuarios SET profissional = :val, modificado = :mod WHERE email = :email');
            $stmt->execute([':email' => $items['email'], ':val' => $items['value'], ':mod' => $this->getHoraAtual()]);
            echo json_encode(['success' => true]);
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    }

    function setSobreMim($email, $json):void {
        try {
            $stmt = $this->pdo->prepare('UPDATE usuarios SET sobre_mim = :val, modificado = :mod WHERE email = :email');
            $stmt->execute([':email' => $email, ':val' => $json, ':mod' => $this->getHoraAtual()]);
            echo json_encode(['success' => true]);
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    }

    function setInfoLogin($items):void {
        try {
            $stmt = $this->pdo->prepare('UPDATE usuarios SET nome = :nome, telefone = :telefone, genero = :genero, modificado = :mod WHERE email = :email');
            $stmt->execute([':email' => $items['email'], ':nome' => $items['nome'], ':telefone' => $items['telefone'], ':genero' => $items['genero'], ':mod' => $this->getHoraAtual()]);
            echo json_encode(['success' => true]);
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    }

    function setConfirmCode($email):void {
        try {
            $stmt = $this->pdo->prepare('UPDATE usuarios SET confirm_code = 1, modificado = :mod WHERE email = :email');
            $stmt->execute([':email' => $email, ':mod' => $this->getHoraAtual()]);
            echo json_encode(['success' => true]);
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    }

    private function getHoraAtual():string {
        date_default_timezone_set('America/Sao_Paulo');
        return date('Y-m-d H:i:s');
    }
}
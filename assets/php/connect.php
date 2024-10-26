<?php

class Conn {
    static function connect(): false|PDO {
        $host = 'localhost';
        $dbname = 'serviceshere';
        $username = 'root';
        $password = '';
        try {
            $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,      // Ativar exceções para erros
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, // Retornar resultados como arrays associativos
                PDO::ATTR_EMULATE_PREPARES => false,              // Desativar emulação de prepared statements para maior segurança
                PDO::ATTR_PERSISTENT => false                     // Evitar conexões persistentes para maior controle de recursos
            ];

            return new PDO($dsn, $username, $password, $options);
        } catch (PDOException $e) {
            echo "Erro ao conectar ao banco de dados.";
            error_log($e->getMessage());
        }
        return false;
    }
}
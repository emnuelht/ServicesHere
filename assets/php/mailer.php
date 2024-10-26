<?php

require './config/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

use React\Promise\Promise;

class Mailer {
    static function run($para, $code):Promise {
        return new Promise(function ($resolve, $reject) use ($para, $code) {
            $mail = new PHPMailer(true);

            try {
                $mail->isSMTP();
                $mail->Host = 'smtp.gmail.com';            // Servidor SMTP do Gmail
                $mail->SMTPAuth = true;
                $mail->Username = 'serviceshere.org@gmail.com';        // Seu e-mail Gmail
                $mail->Password = 'yywc gckb hhwh ydri';          // Senha do app para autenticação
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                $mail->Port = 587;

                $mail->setFrom('serviceshere.org@gmail.com', 'ServicesHere'); // Remetente
                $mail->addAddress($para);                         // Destinatário

                // Conteúdo do e-mail
                $mail->CharSet = 'UTF-8';
                $mail->isHTML(true);                              // Define e-mail como HTML
                $mail->Subject = 'Código de verificação!';
                $mail->Body = 'Seu codigo: <b>' . $code . '</b>';

                // Envia o e-mail
                $mail->send();
                $resolve(['success' => true, 'code' => $code]);
            } catch (Exception $e) {
                $reject("Erro ao enviar e-mail: {$mail->ErrorInfo}");
            }
        });
    }
}
<?php

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    header("Location: ../sponsoring.html");

    exit;

}


$company =
    htmlspecialchars(
        trim($_POST["company"] ?? "")
    );


$name =
    htmlspecialchars(
        trim($_POST["name"] ?? "")
    );


$email =
    filter_var(
        trim($_POST["email"] ?? ""),
        FILTER_SANITIZE_EMAIL
    );


$phone =
    htmlspecialchars(
        trim($_POST["phone"] ?? "")
    );


$partnership =
    htmlspecialchars(
        trim($_POST["partnership"] ?? "")
    );


$message =
    htmlspecialchars(
        trim($_POST["message"] ?? "")
    );



if (
    empty($company) ||
    empty($name) ||
    empty($email) ||
    empty($phone)
) {

    die(
        "Veuillez remplir tous les champs obligatoires."
    );

}



if (
    !filter_var(
        $email,
        FILTER_VALIDATE_EMAIL
    )
) {

    die(
        "Adresse email invalide."
    );

}



// EMAIL DESTINATAIRE

$to =
    "sponsoring@fcvictoria.mg";



$subject =
    "Nouvelle demande de sponsoring - "
    . $company;



$body =

"Nouvelle demande de sponsoring\n\n"

. "Entreprise : "
. $company
. "\n"

. "Responsable : "
. $name
. "\n"

. "Email : "
. $email
. "\n"

. "Téléphone : "
. $phone
. "\n"

. "Type de partenariat : "
. $partnership
. "\n\n"

. "Message :\n"
. $message;



$headers =

"From: "
. $email
. "\r\n"

. "Reply-To: "
. $email
. "\r\n"

. "Content-Type: text/plain; charset=UTF-8";



if (
    mail(
        $to,
        $subject,
        $body,
        $headers
    )
) {

    echo "

    <!DOCTYPE html>

    <html lang='fr'>

    <head>

    <meta charset='UTF-8'>

    <title>Demande envoyée</title>

    </head>

    <body>

    <h1>
    Merci !
    </h1>

    <p>
    Votre demande de sponsoring
    a bien été envoyée.
    </p>

    <a href='../index.html'>
    Retour au site
    </a>

    </body>

    </html>

    ";

} else {

    echo "

    <h1>
    Une erreur est survenue.
    </h1>

    <p>
    Impossible d'envoyer votre demande.
    </p>

    ";

}

?>
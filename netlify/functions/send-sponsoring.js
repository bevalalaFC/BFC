const nodemailer = require("nodemailer");

exports.handler = async (event) => {

    // Vérifier la méthode HTTP
    if (event.httpMethod !== "POST") {

        return {
            statusCode: 405,
            headers: {
                "Content-Type": "text/html; charset=UTF-8"
            },
            body: "Méthode non autorisée"
        };

    }


    try {

        // Récupérer les données du formulaire
        const params = new URLSearchParams(
            event.body
        );


        const company =
            params.get("company") || "";


        const name =
            params.get("name") || "";


        const email =
            params.get("email") || "";


        const phone =
            params.get("phone") || "";


        const partnership =
            params.get("partnership") || "";


        const message =
            params.get("message") || "";


        // Vérification des champs obligatoires
        if (
            !company ||
            !name ||
            !email ||
            !phone
        ) {

            return {

                statusCode: 400,

                headers: {
                    "Content-Type":
                        "text/html; charset=UTF-8"
                },

                body: `

                    <h1>
                        Erreur
                    </h1>

                    <p>
                        Veuillez remplir tous
                        les champs obligatoires.
                    </p>

                    <a href="/sponsoring.html">
                        Retour au formulaire
                    </a>

                `

            };

        }


        // Vérification email
        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailRegex.test(email)) {

            return {

                statusCode: 400,

                headers: {
                    "Content-Type":
                        "text/html; charset=UTF-8"
                },

                body: `

                    <h1>
                        Email invalide
                    </h1>

                    <a href="/sponsoring.html">
                        Retour au formulaire
                    </a>

                `

            };

        }


        // Configuration SMTP
        const transporter =
            nodemailer.createTransport({

                host:
                    process.env.SMTP_HOST,

                port:
                    Number(
                        process.env.SMTP_PORT
                    ),

                secure:
                    process.env.SMTP_SECURE === "true",

                auth: {

                    user:
                        process.env.SMTP_USER,

                    pass:
                        process.env.SMTP_PASSWORD

                }

            });


        // Envoi de l'email
        await transporter.sendMail({

            from:
                `"BEVALALA FC" <${process.env.SMTP_USER}>`,

            to:
                process.env.SPONSOR_EMAIL,

            replyTo:
                email,

            subject:
                `Nouvelle demande de sponsoring - ${company}`,

            text: `

Nouvelle demande de sponsoring

Entreprise :
${company}

Responsable :
${name}

Email :
${email}

Téléphone :
${phone}

Type de partenariat :
${partnership}

Message :

${message}

            `

        });


        // Réponse succès
        return {

            statusCode: 302,

            headers: {

                Location:
                    "/merci.html"

            },

            body: ""

        };


    } catch (error) {

        console.error(
            "Erreur email :",
            error
        );


        return {

            statusCode: 500,

            headers: {

                "Content-Type":
                    "text/html; charset=UTF-8"

            },

            body: `

                <h1>
                    Erreur d'envoi
                </h1>

                <p>
                    Impossible d'envoyer
                    votre demande.
                </p>

                <p>
                    Veuillez réessayer
                    ultérieurement.
                </p>

                <a href="/sponsoring.html">
                    Retour au formulaire
                </a>

            `

        };

    }

};
export default [
    {
        name: 'server',
        description: "Get server avatar",
        description_localizations: {
            "fr": "Récupérer l'avatar du serveur",
            "es-ES": "Obtener el avatar del servidor",
            "ru": "Получить аватар сервера"
        },
        type: 1,
    },
    {
        name: 'user',
        description: 'User to get avatar',
        description_localizations: {
            "fr": "L'utilisateur à qui avoir l'avatar",
            "es-ES": "Usuario para obtener el avatar",
            "ru": "Пользователь для получения аватара"
        },
        type: 1,
        options: [
            {
                name: 'user',
                description: 'User',
                description_localizations: {
                    "fr": "Utilisateur",
                    "es-ES": "Usuario",
                    "ru": "пользователь"
                },
                type: 6,
                required: true
            },
        ]
    },
]
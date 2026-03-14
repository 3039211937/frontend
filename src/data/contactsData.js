const contacts = [
    {
        id: 1,
        name: 'Anthony',
        last_time_connected: '16 de octubre del 2022',
        is_connected: false,
        profile_img: 'https://s2.abcstatics.com/abc/www/multimedia/deportes/2025/02/01/antony-RzmOyZ6ev9YD7AHTPnJpFeP-1200x840@diario_abc.jpg',
        state: 'VIVA ER BETI',
        messages: [
            {
                id: 1,
                author: 'YO',
                content: "Amo tu aura.",
                timestamp: '16:17'
            },
            {
                id: 2,
                author: 'Anthony',
                content:'Gracias, amigo. Espero vernos pronto',
                timestamp: '19:07',
            },
            {
                id: 1,
                author: 'YO',
                content: "Ojalá, pero la proxima contesta más rapido.",
                timestamp: '19:23',
            },
        ]
    },
    {
        id: 2,
        name: 'El Bicho',
        last_time_connected: 'ahora',
        is_connected: true,
        profile_img: 'https://content.imageresizer.com/images/memes/SIUUU-meme-2.jpg',
        state: '5 times Champions League Winner.',
        messages: [
            {
                id: 1,
                author: 'YO',
                content: "Bicho, algo que decir para la afición?",
                timestamp: '16:17'
            },
            {
                id: 2,
                author: 'El Bicho',
                content: "MUCHA GRASHIAS AFISHION ESTO ES PARA VOSOTROS SIUUUUUUUUUUUU",
                timestamp: '16:18'
            }
        ]
    },
    {
        id: 3,
        name: 'Edu',
        last_time_connected: "23 de noviembre de 2019",
        is_connected: false,
        profile_img: 'https://www.futbox.com/img/v1/343/bce/23d/810/86e62e1060ed218456a5.png',
        state: 'Vamos a ser bicampeones de la Libertadores!',
        messages: [
            {
                id: 1,
                author: 'Edu',
                content: 'Amigo, sabías cual es el número que no se vende?',
                timestamp: "06:26",
            },
            {
                id: 2,
                author: 'YO',
                content: 'Cual?',
                timestamp: "06:27",
            },
                {
                id: 3,
                author: 'Edu',
                content: 'El 90',
                timestamp: "06:28",
            },
                {
                id: 4,
                author: 'YO',
                content: 'Amigo, conseguite un laburo, por favor',
                timestamp: "06:29",
            }
        ]
    }
]

export default contacts
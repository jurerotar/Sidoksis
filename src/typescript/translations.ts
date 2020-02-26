/**
 * Additional mobile app specific translations
 */
export default function translations():object {
    return {
        sl: {
            /**
             * Text shown on top of every task
             */
            docTitle: 'ID dokumenta',
            /**
             * Text on details element
             */
            taskCount: 'Število nalog',
            /**
             * Texts shown in popup previous comments section
             */
            comments: {
                author: 'Avtor',
                date: 'Datum',
                comment: 'Komentar',
                noComments: 'Za nalogo ni komentarjev.'
            },
            /**
             * Texts displayed in popup textarea section
             */
            textarea: {
                confirmSubtitleText: 'Potrdi',
                rejectSubtitleText: 'Zavrni (obvezno)',
                confirmPlaceholderText: 'Vnesite komentar (neobvezno)',
                rejectPlaceholderText: 'Vnesite razlog zavrnitve (obvezno)'
            },
            /**
             * Details elements displayed in footer, add new inputs or remove previous to show more/less
             */
            footer: [
                {
                    title: 'Zahtevaj pomoč',
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur eum voluptatibus natus tenetur doloribus assumenda perferendis? Repellat voluptatibus beatae voluptate explicabo similique, ratione illo quas, animi maiores illum recusandae asperiores.'
                },
                {
                    title: 'Dokumentacija',
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur eum voluptatibus natus tenetur doloribus assumenda perferendis? Repellat voluptatibus beatae voluptate explicabo similique, ratione illo quas, animi maiores illum recusandae asperiores.'
                },
                {
                    title: 'Prijavi napako',
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur eum voluptatibus natus tenetur doloribus assumenda perferendis? Repellat voluptatibus beatae voluptate explicabo similique, ratione illo quas, animi maiores illum recusandae asperiores.'
                }
            ],
            /**
             * Text displayed in copyright bar
             */
            copyright: 'Vse pravice pridržane @ Sidoksis d.o.o.',
            /**
             * Text that will be displayed on specific document type
             */
            documentTypeDescriptions: {
                'AbsenceRequest': 'Potrdite ali zavrnite prošnje za dopust.',
                'Contracts': 'Pogodbe opis',
                'ISO': 'ISO opis',
            },
            /**
             * Custom text on buttons
             */
            buttonCustomLabel: {
                'Confirm': '',
                'Reject': '',
                'Comments': '',
                'View': ''
            },
            /**
             * Custom text for button subtitles (text above buttons)
             */
            buttonCustomSubtitle: {
                'Confirm': '',
                'Reject': '',
                'Comments': '',
                'View': ''
            },
            noticeCustomSubtitle: 'Rok',
            /**
             * Custom text for task expired notice
             */
            noticeExpiredCustomText: 'Rok je pretečen',
            /**
             * Custom text for tasks before expiration
             */
            noticeTimeLeftWarningCustomText: 'Opozorilo: imate še',
            /**
             * Custom text for remaining time left notice
             */
            noticeTimeLeftCustomText: 'Imate še',
        },
        cr: {

        },
        mk: {

        }
    }
}
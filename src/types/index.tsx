export type providerFormBlock = {

    "meta": {

        "name": string,

        "Description": string,

        "version": string,

        "url": string,

        "status": string

    },

    "pages": {

        "name": string,

        "title": string,

        "description": string,

        "actions": {

            "type": "continue" | "cancel",

            "label": string,

            "message"?: string

        }[],

        "sections": [

            {

                "name": string,

                "description": string,

                "fields": [

                    {

                        "id": string,

                        "name": string,

                        "type": "short_text" | "date" | "time" | "date_time" | "integer" | "number" | "phone" | "email" | "checkbox" |
                        "radio" | "label" | "audio" | "video" | "video",

                        "label": string,

                        "description": string,

                        "options"?: {

                            "id": string,

                            "label": string,

                            "value": string

                        }[],

                        "validation": {

                            "required": boolean,

                            "minimum"?: string,

                            "maximum"?: string,

                            "number_of_lines"?: number,

                            "decimal_points"?: number,

                            "allowed"?: string



                        }

                    },
                ]

            }

        ]

    }[]
};

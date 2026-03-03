import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    "editor": {
                        "placeholder": "Write something incredible...",
                        "toggle_title": "Toggle title...",
                        "toggle_empty": "This content can be hidden in the toggle",
                        "toolbar": {
                            "block_type": {
                                "normal_text": "Normal Text",
                                "h1": "Heading 1",
                                "h2": "Heading 2",
                                "h3": "Heading 3",
                                "quote": "Quote",
                                "callout": "Callout",
                                "code_block": {
                                    "code_block": "Code",
                                    "auto_detect": "Auto-detect",
                                    "search_language": "Search language",
                                    "no_results": "Nothing found",
                                    "copy_content": "Copy content",
                                    "copy_success": "Content copied to clipboard"
                                }
                            },
                            "bold": "Bold",
                            "italic": "Italic",
                            "underline": "Underline",
                            "strikethrough": "Strikethrough",
                            "code": "Code",
                            "text_color": "Text color",
                            "highlight_color": "Highlight color",
                            "alignment": "Alignment",
                            "bulleted_list": {
                                "bulleted_list": "Bulleted List",
                                "dots": "Dots",
                                "circles": "Circles",
                                "squares": "Squares",
                                "mix": "Mix"
                            },
                            "ordered_list": {
                                "ordered_list": "Ordered List",
                                "numbers": "Numbers (1, 1.1)",
                                "letters": "Letters (a, b, c)",
                                "roman": "Roman Numerals (i, ii, iii)",
                                "mix": "Mix (1, a, i)"
                            },
                            "todo_list": "To-do list",
                            "toggle_block": "Toggle content",
                            "change_light_theme": "Change to light theme",
                            "change_dark_theme": "Change to dark theme",
                        },
                        "options_menu": {
                            "options_menu": "Options menu",
                            "export": {
                                "export": "Export",
                                "modal_title": "Export Document",
                                "modal_instructions": "Select the desired format:",
                                "modal_cancel": "Cancel",
                                "modal_export": "Export now",
                                "export_success": "Document exported successfully!"
                            },
                            "import": "Import",
                            "import_success": "Document imported successfully!",
                        }
                    }
                }
            },
            es: {
                translation: {
                    "editor": {
                        "placeholder": "Escribe algo increíble...",
                        "toggle_title": "Título del toggle...",
                        "toggle_empty": "Este contenido se podrá ocultar con el desplegable",
                        "toolbar": {
                            "block_type": {
                                "normal_text": "Texto Normal",
                                "h1": "Título 1",
                                "h2": "Título 2",
                                "h3": "Título 3",
                                "quote": "Cita",
                                "callout": "Destacado",
                                "code_block": {
                                    "code_block": "Código",
                                    "auto_detect": "Auto-detectar",
                                    "search_language": "Buscar lenguaje",
                                    "no_results": "No hay resultados",
                                    "copy_content": "Copiar código",
                                    "copy_success": "Código copiado al portapapeles"
                                }
                            },
                            "bold": "Negrita",
                            "italic": "Cursiva",
                            "underline": "Subrayado",
                            "strikethrough": "Tachado",
                            "code": "Código",
                            "text_color": "Color de texto",
                            "highlight_color": "Color de resaltado",
                            "alignment": "Alineación",
                            "bulleted_list": {
                                "bulleted_list": "Lista de viñetas",
                                "dots": "Puntos",
                                "circles": "Circulos",
                                "squares": "Cuadrados",
                                "mix": "Mix"
                            },
                            "ordered_list": {
                                "ordered_list": "Lista ordenada",
                                "numbers": "Números (1, 1.1)",
                                "letters": "Letras (a, b, c)",
                                "roman": "Números romanos (i, ii, iii)",
                                "mix": "Mix (1, a, i)"
                            },
                            "todo_list": "Lista de tareas",
                            "toggle_block": "Contenido desplegable",
                            "change_light_theme": "Cambiar a modo claro",
                            "change_dark_theme": "Cambiar a modo oscuro",
                        },
                        "options_menu": {
                            "options_menu": "Opciones",
                            "export": {
                                "export": "Exportar",
                                "modal_title": "Exportar Documento",
                                "modal_instructions": "Selecciona el formato deseado:",
                                "modal_cancel": "Cancelar",
                                "modal_export": "Exportar ahora",
                                "export_success": "¡Documento exportado con éxito!"
                            },
                            "import": "Importar",
                            "import_success": "¡Documento importado con éxito!",
                        }
                    }
                }
            }
        },
        lng: "en", // Default language
        fallbackLng: "en",
        interpolation: { escapeValue: false }
    });

export default i18n;
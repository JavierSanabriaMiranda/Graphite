// front/src/services/db/welcomeContent.js
export const getWelcomeNote = (lang) => {
  const content = {
    es: {
      welcome_note: {
        icon: "👋",
        title: "¡Bienvenido a Graphite!",
        body: JSON.stringify({
          "type": "doc",
          "content": [
            {
              "type": "heading",
              "attrs": {
                "textAlign": null,
                "level": 2
              },
              "content": [
                {
                  "type": "text",
                  "text": "¡Tu herramienta de gestión de notas!"
                }
              ]
            },
            {
              "type": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "text": "Graphite es un editor de texto que te ayudará a organizar tu información y tus ideas."
                }
              ]
            },
            {
              "type": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "text": "Este es un editor de texto enriquecido lo que significa que puedes hacer cosas tan chulas como estas:"
                }
              ]
            },
            {
              "type": "bulletList",
              "attrs": {
                "listStyle": "default"
              },
              "content": [
                {
                  "type": "listItem",
                  "content": [
                    {
                      "type": "paragraph",
                      "attrs": {
                        "textAlign": null
                      },
                      "content": [
                        {
                          "type": "text",
                          "marks": [
                            {
                              "type": "bold"
                            }
                          ],
                          "text": "Texto en negrita"
                        }
                      ]
                    }
                  ]
                },
                {
                  "type": "listItem",
                  "content": [
                    {
                      "type": "paragraph",
                      "attrs": {
                        "textAlign": null
                      },
                      "content": [
                        {
                          "type": "text",
                          "marks": [
                            {
                              "type": "italic"
                            }
                          ],
                          "text": "Texto en cursiva"
                        }
                      ]
                    }
                  ]
                },
                {
                  "type": "listItem",
                  "content": [
                    {
                      "type": "paragraph",
                      "attrs": {
                        "textAlign": null
                      },
                      "content": [
                        {
                          "type": "text",
                          "marks": [
                            {
                              "type": "underline"
                            }
                          ],
                          "text": "Texto subrayado"
                        }
                      ]
                    }
                  ]
                },
                {
                  "type": "listItem",
                  "content": [
                    {
                      "type": "paragraph",
                      "attrs": {
                        "textAlign": null
                      },
                      "content": [
                        {
                          "type": "text",
                          "marks": [
                            {
                              "type": "strike"
                            }
                          ],
                          "text": "Texto tachado"
                        }
                      ]
                    }
                  ]
                },
                {
                  "type": "listItem",
                  "content": [
                    {
                      "type": "paragraph",
                      "attrs": {
                        "textAlign": null
                      },
                      "content": [
                        {
                          "type": "text",
                          "marks": [
                            {
                              "type": "code"
                            }
                          ],
                          "text": "Código"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "type": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "text": "Y eso no es todo, tambien tienes una gran variedad de "
                },
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "textStyle",
                      "attrs": {
                        "fontFamily": null,
                        "color": "#eab308"
                      }
                    }
                  ],
                  "text": "colores"
                },
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "textStyle",
                      "attrs": {
                        "fontFamily": null,
                        "color": null
                      }
                    }
                  ],
                  "text": ":"
                }
              ]
            },
            {
              "type": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "textStyle",
                      "attrs": {
                        "fontFamily": null,
                        "color": "#ef4444"
                      }
                    }
                  ],
                  "text": "Rojo"
                },
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "textStyle",
                      "attrs": {
                        "fontFamily": null,
                        "color": null
                      }
                    }
                  ],
                  "text": ", "
                },
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "textStyle",
                      "attrs": {
                        "fontFamily": null,
                        "color": "#3b82f6"
                      }
                    }
                  ],
                  "text": "azul"
                },
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "textStyle",
                      "attrs": {
                        "fontFamily": null,
                        "color": null
                      }
                    }
                  ],
                  "text": ", "
                },
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "textStyle",
                      "attrs": {
                        "fontFamily": null,
                        "color": "#22c55e"
                      }
                    }
                  ],
                  "text": "verde"
                },
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "textStyle",
                      "attrs": {
                        "fontFamily": null,
                        "color": null
                      }
                    }
                  ],
                  "text": ", "
                },
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "textStyle",
                      "attrs": {
                        "fontFamily": null,
                        "color": "#eab308"
                      }
                    }
                  ],
                  "text": "amarillo"
                },
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "textStyle",
                      "attrs": {
                        "fontFamily": null,
                        "color": null
                      }
                    }
                  ],
                  "text": ", "
                },
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "textStyle",
                      "attrs": {
                        "fontFamily": null,
                        "color": "#a855f7"
                      }
                    }
                  ],
                  "text": "morado"
                },
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "textStyle",
                      "attrs": {
                        "fontFamily": null,
                        "color": null
                      }
                    }
                  ],
                  "text": ", y "
                },
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "textStyle",
                      "attrs": {
                        "fontFamily": null,
                        "color": "#ff2ee3"
                      }
                    }
                  ],
                  "text": "todos los que quieras!"
                }
              ]
            },
            {
              "type": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "textStyle",
                      "attrs": {
                        "fontFamily": null,
                        "color": null
                      }
                    }
                  ],
                  "text": "Además puedes añadir diferentes bloques muy guays como:"
                }
              ]
            },
            {
              "type": "blockquote",
              "content": [
                {
                  "type": "paragraph",
                  "attrs": {
                    "textAlign": null
                  },
                  "content": [
                    {
                      "type": "text",
                      "marks": [
                        {
                          "type": "italic"
                        }
                      ],
                      "text": "Una cita para contar cosas que dijo gente importante hace mucho tiempo..."
                    }
                  ]
                }
              ]
            },
            {
              "type": "callout",
              "attrs": {
                "emoji": "⭐"
              },
              "content": [
                {
                  "type": "paragraph",
                  "attrs": {
                    "textAlign": null
                  },
                  "content": [
                    {
                      "type": "text",
                      "text": "Un destacado para mostrar texto con un estilo que llame más la atención"
                    }
                  ]
                }
              ]
            },
            {
              "type": "codeBlock",
              "attrs": {
                "language": "java"
              },
              "content": [
                {
                  "type": "text",
                  "text": "// O incluso código para mostrar tus habilidades como programador\nprivate void main(String args[]) {\n\tSystem.out.println(\"Hola Mundo!\");\n}"
                }
              ]
            },
            {
              "type": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "text": "Además, tambien puedes ocultar cosas para que no te molesten usando los contenidos desplegables"
                }
              ]
            },
            {
              "type": "toggleBlock",
              "attrs": {
                "isOpen": false
              },
              "content": [
                {
                  "type": "toggleTitle",
                  "content": [
                    {
                      "type": "text",
                      "text": "Este es un contenido desplegable"
                    }
                  ]
                },
                {
                  "type": "toggleContent",
                  "content": [
                    {
                      "type": "paragraph",
                      "attrs": {
                        "textAlign": null
                      },
                      "content": [
                        {
                          "type": "text",
                          "text": "Y dentro guarda una lista de tareas por completar"
                        }
                      ]
                    },
                    {
                      "type": "taskList",
                      "content": [
                        {
                          "type": "taskItem",
                          "attrs": {
                            "checked": true
                          },
                          "content": [
                            {
                              "type": "paragraph",
                              "attrs": {
                                "textAlign": null
                              },
                              "content": [
                                {
                                  "type": "text",
                                  "text": "Instalar Graphite"
                                }
                              ]
                            }
                          ]
                        },
                        {
                          "type": "taskItem",
                          "attrs": {
                            "checked": false
                          },
                          "content": [
                            {
                              "type": "paragraph",
                              "attrs": {
                                "textAlign": null
                              },
                              "content": [
                                {
                                  "type": "text",
                                  "text": "Crear tu primera nota"
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "type": "paragraph",
              "attrs": {
                "textAlign": null
              }
            }
          ]
        })
      },
      subnote: {
        icon: "👋",
        title: "Subnota!",
        body: JSON.stringify({
          type: "doc",
          content: [
            { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Y esto es una subnota" }] },
            { type: "paragraph", content: [{ type: "text", text: "Graphite te permite guardar notas dentro de otras notas. ¡Tendrás que jugar un poco con ello!" }] },
            {
              type: "bulletList", content: [
                { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Usa la barra lateral para organizar tus espacios." }] }] },
                { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Atajos de teclado para formato rápido." }] }] }
              ]
            }
          ]
        })
      }

    },
    en: {
      welcome_note: {
        icon: "👋",
        title: "Your note taking application!",
        body: JSON.stringify({
          "type": "doc",
          "content": [
            {
              "type": "heading",
              "attrs": {
                "textAlign": null,
                "level": 2
              },
              "content": [
                {
                  "type": "text",
                  "text": "Welcome to Graphite!"
                }
              ]
            },
            {
              "type": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "text": "Graphite is a text editor designed to help you organize your information and ideas."
                }
              ]
            },
            {
              "type": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "text": "This is a rich text editor, which means you can do cool things like these:"
                }
              ]
            },
            {
              "type": "bulletList",
              "attrs": {
                "listStyle": "default"
              },
              "content": [
                {
                  "type": "listItem",
                  "content": [
                    {
                      "type": "paragraph",
                      "attrs": {
                        "textAlign": null
                      },
                      "content": [
                        {
                          "type": "text",
                          "marks": [
                            {
                              "type": "bold"
                            }
                          ],
                          "text": "Bold text"
                        }
                      ]
                    }
                  ]
                },
                {
                  "type": "listItem",
                  "content": [
                    {
                      "type": "paragraph",
                      "attrs": {
                        "textAlign": null
                      },
                      "content": [
                        {
                          "type": "text",
                          "marks": [
                            {
                              "type": "italic"
                            }
                          ],
                          "text": "Italic text"
                        }
                      ]
                    }
                  ]
                },
                {
                  "type": "listItem",
                  "content": [
                    {
                      "type": "paragraph",
                      "attrs": {
                        "textAlign": null
                      },
                      "content": [
                        {
                          "type": "text",
                          "marks": [
                            {
                              "type": "underline"
                            }
                          ],
                          "text": "Underlined text"
                        }
                      ]
                    }
                  ]
                },
                {
                  "type": "listItem",
                  "content": [
                    {
                      "type": "paragraph",
                      "attrs": {
                        "textAlign": null
                      },
                      "content": [
                        {
                          "type": "text",
                          "marks": [
                            {
                              "type": "strike"
                            }
                          ],
                          "text": "Strikethrough text"
                        }
                      ]
                    }
                  ]
                },
                {
                  "type": "listItem",
                  "content": [
                    {
                      "type": "paragraph",
                      "attrs": {
                        "textAlign": null
                      },
                      "content": [
                        {
                          "type": "text",
                          "marks": [
                            {
                              "type": "code"
                            }
                          ],
                          "text": "Inline code"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "type": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "text": "And that's not all, you also have a wide variety of "
                },
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "textStyle",
                      "attrs": {
                        "fontFamily": null,
                        "color": "#eab308"
                      }
                    }
                  ],
                  "text": "colors"
                },
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "textStyle",
                      "attrs": {
                        "fontFamily": null,
                        "color": null
                      }
                    }
                  ],
                  "text": ":"
                }
              ]
            },
            {
              "type": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "textStyle",
                      "attrs": {
                        "fontFamily": null,
                        "color": "#ef4444"
                      }
                    }
                  ],
                  "text": "Red"
                },
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "textStyle",
                      "attrs": {
                        "fontFamily": null,
                        "color": null
                      }
                    }
                  ],
                  "text": ", "
                },
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "textStyle",
                      "attrs": {
                        "fontFamily": null,
                        "color": "#3b82f6"
                      }
                    }
                  ],
                  "text": "blue"
                },
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "textStyle",
                      "attrs": {
                        "fontFamily": null,
                        "color": null
                      }
                    }
                  ],
                  "text": ", "
                },
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "textStyle",
                      "attrs": {
                        "fontFamily": null,
                        "color": "#22c55e"
                      }
                    }
                  ],
                  "text": "green"
                },
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "textStyle",
                      "attrs": {
                        "fontFamily": null,
                        "color": null
                      }
                    }
                  ],
                  "text": ", "
                },
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "textStyle",
                      "attrs": {
                        "fontFamily": null,
                        "color": "#eab308"
                      }
                    }
                  ],
                  "text": "yellow"
                },
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "textStyle",
                      "attrs": {
                        "fontFamily": null,
                        "color": null
                      }
                    }
                  ],
                  "text": ", "
                },
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "textStyle",
                      "attrs": {
                        "fontFamily": null,
                        "color": "#a855f7"
                      }
                    }
                  ],
                  "text": "purple"
                },
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "textStyle",
                      "attrs": {
                        "fontFamily": null,
                        "color": null
                      }
                    }
                  ],
                  "text": ", and "
                },
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "textStyle",
                      "attrs": {
                        "fontFamily": null,
                        "color": "#ff2ee3"
                      }
                    }
                  ],
                  "text": "as many as you want!"
                }
              ]
            },
            {
              "type": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "textStyle",
                      "attrs": {
                        "fontFamily": null,
                        "color": null
                      }
                    }
                  ],
                  "text": "Furthermore, you can add various cool blocks such as:"
                }
              ]
            },
            {
              "type": "blockquote",
              "content": [
                {
                  "type": "paragraph",
                  "attrs": {
                    "textAlign": null
                  },
                  "content": [
                    {
                      "type": "text",
                      "marks": [
                        {
                          "type": "italic"
                        }
                      ],
                      "text": "A quote to share things that important people said a long time ago..."
                    }
                  ]
                }
              ]
            },
            {
              "type": "callout",
              "attrs": {
                "emoji": "⭐"
              },
              "content": [
                {
                  "type": "paragraph",
                  "attrs": {
                    "textAlign": null
                  },
                  "content": [
                    {
                      "type": "text",
                      "text": "A callout to highlight text with a style that grabs more attention"
                    }
                  ]
                }
              ]
            },
            {
              "type": "codeBlock",
              "attrs": {
                "language": "java"
              },
              "content": [
                {
                  "type": "text",
                  "text": "// Or even code to showcase your programming skills\nprivate void main(String args[]) {\n\tSystem.out.println(\"Hello World!\");\n}"
                }
              ]
            },
            {
              "type": "paragraph",
              "attrs": {
                "textAlign": null
              },
              "content": [
                {
                  "type": "text",
                  "text": "Additionally, you can also hide content to keep things tidy using toggle blocks"
                }
              ]
            },
            {
              "type": "toggleBlock",
              "attrs": {
                "isOpen": false
              },
              "content": [
                {
                  "type": "toggleTitle",
                  "content": [
                    {
                      "type": "text",
                      "text": "This is a toggle block"
                    }
                  ]
                },
                {
                  "type": "toggleContent",
                  "content": [
                    {
                      "type": "paragraph",
                      "attrs": {
                        "textAlign": null
                      },
                      "content": [
                        {
                          "type": "text",
                          "text": "And inside, it holds a task list to complete"
                        }
                      ]
                    },
                    {
                      "type": "taskList",
                      "content": [
                        {
                          "type": "taskItem",
                          "attrs": {
                            "checked": true
                          },
                          "content": [
                            {
                              "type": "paragraph",
                              "attrs": {
                                "textAlign": null
                              },
                              "content": [
                                {
                                  "type": "text",
                                  "text": "Install Graphite"
                                }
                              ]
                            }
                          ]
                        },
                        {
                          "type": "taskItem",
                          "attrs": {
                            "checked": false
                          },
                          "content": [
                            {
                              "type": "paragraph",
                              "attrs": {
                                "textAlign": null
                              },
                              "content": [
                                {
                                  "type": "text",
                                  "text": "Create your first note"
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "type": "paragraph",
              "attrs": {
                "textAlign": null
              }
            }
          ]
        }),
      },
      subnote: {
        icon: "👋",
        title: "Subnote!",
        body: JSON.stringify({
          type: "doc",
          content: [
            { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "And this is a subnote" }] },
            { type: "paragraph", content: [{ type: "text", text: "Graphite allows you to create notes into notes. Have fun with it!" }] },
            {
              type: "bulletList", content: [
                { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Use sidebar to organize your workspace" }] }] },
                { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Keyboard shortcuts for fast formatting" }] }] }
              ]
            }
          ]
        })
      }
    }
  };

  return content[lang] || content['en'];
};
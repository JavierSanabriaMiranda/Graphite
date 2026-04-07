/**
 * Content of the pages inserted on db when a user is authenticated for the first time
 * @param {String} lang - lang of the app to select the welcome notes language
 */
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
                  "marks": [
                    {
                      "type": "textStyle",
                      "attrs": {
                        "fontFamily": "Inter, var(--font-emoji)",
                        "color": null
                      }
                    }
                  ],
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
                  "marks": [
                    {
                      "type": "textStyle",
                      "attrs": {
                        "fontFamily": "Inter, var(--font-emoji)",
                        "color": null
                      }
                    }
                  ],
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
                  "marks": [
                    {
                      "type": "textStyle",
                      "attrs": {
                        "fontFamily": "Inter, var(--font-emoji)",
                        "color": null
                      }
                    }
                  ],
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
                              "type": "textStyle",
                              "attrs": {
                                "fontFamily": "Inter, var(--font-emoji)",
                                "color": null
                              }
                            },
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
                              "type": "textStyle",
                              "attrs": {
                                "fontFamily": "Inter, var(--font-emoji)",
                                "color": null
                              }
                            },
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
                              "type": "textStyle",
                              "attrs": {
                                "fontFamily": "Inter, var(--font-emoji)",
                                "color": null
                              }
                            },
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
                              "type": "textStyle",
                              "attrs": {
                                "fontFamily": "Inter, var(--font-emoji)",
                                "color": null
                              }
                            },
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
                              "type": "textStyle",
                              "attrs": {
                                "fontFamily": "Inter, var(--font-emoji)",
                                "color": null
                              }
                            },
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
                  "marks": [
                    {
                      "type": "textStyle",
                      "attrs": {
                        "fontFamily": "Inter, var(--font-emoji)",
                        "color": null
                      }
                    }
                  ],
                  "text": "Y eso no es todo, tambien tienes una gran variedad de "
                },
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "textStyle",
                      "attrs": {
                        "fontFamily": "Inter, var(--font-emoji)",
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
                        "fontFamily": "Inter, var(--font-emoji)",
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
                        "fontFamily": "Inter, var(--font-emoji)",
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
                        "fontFamily": "Inter, var(--font-emoji)",
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
                        "fontFamily": "Inter, var(--font-emoji)",
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
                        "fontFamily": "Inter, var(--font-emoji)",
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
                        "fontFamily": "Inter, var(--font-emoji)",
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
                        "fontFamily": "Inter, var(--font-emoji)",
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
                        "fontFamily": "Inter, var(--font-emoji)",
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
                        "fontFamily": "Inter, var(--font-emoji)",
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
                        "fontFamily": "Inter, var(--font-emoji)",
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
                        "fontFamily": "Inter, var(--font-emoji)",
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
                        "fontFamily": "Inter, var(--font-emoji)",
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
                        "fontFamily": "Inter, var(--font-emoji)",
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
                          "type": "textStyle",
                          "attrs": {
                            "fontFamily": "Inter, var(--font-emoji)",
                            "color": null
                          }
                        },
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
                      "marks": [
                        {
                          "type": "textStyle",
                          "attrs": {
                            "fontFamily": "Inter, var(--font-emoji)",
                            "color": null
                          }
                        }
                      ],
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
                  "marks": [
                    {
                      "type": "textStyle",
                      "attrs": {
                        "fontFamily": "Inter, var(--font-emoji)",
                        "color": null
                      }
                    }
                  ],
                  "text": "Además, tambien puedes ocultar cosas para que no te molesten usando los contenidos desplegables"
                }
              ]
            },
            {
              "type": "toggleBlock",
              "attrs": {
                "isOpen": true
              },
              "content": [
                {
                  "type": "toggleTitle",
                  "content": [
                    {
                      "type": "text",
                      "marks": [
                        {
                          "type": "textStyle",
                          "attrs": {
                            "fontFamily": "Inter, var(--font-emoji)",
                            "color": null
                          }
                        }
                      ],
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
                          "marks": [
                            {
                              "type": "textStyle",
                              "attrs": {
                                "fontFamily": "Inter, var(--font-emoji)",
                                "color": null
                              }
                            }
                          ],
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
                                  "marks": [
                                    {
                                      "type": "textStyle",
                                      "attrs": {
                                        "fontFamily": "Inter, var(--font-emoji)",
                                        "color": null
                                      }
                                    }
                                  ],
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
                                  "marks": [
                                    {
                                      "type": "textStyle",
                                      "attrs": {
                                        "fontFamily": "Inter, var(--font-emoji)",
                                        "color": null
                                      }
                                    }
                                  ],
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
            {
              "type": "heading",
              "attrs": {
                "textAlign": null,
                "level": 2
              },
              "content": [
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "textStyle",
                      "attrs": {
                        "fontFamily": "Inter, var(--font-emoji)",
                        "color": null
                      }
                    }
                  ],
                  "text": "Y esto es una subnota"
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
                        "fontFamily": "Inter, var(--font-emoji)",
                        "color": null
                      }
                    }
                  ],
                  "text": "Graphite te permite guardar notas dentro de otras notas. ¡Tendrás que jugar un poco con ello!"
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
                              "type": "textStyle",
                              "attrs": {
                                "fontFamily": "Inter, var(--font-emoji)",
                                "color": null
                              }
                            }
                          ],
                          "text": "Usa la barra lateral para organizar tus espacios."
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
                              "type": "textStyle",
                              "attrs": {
                                "fontFamily": "Inter, var(--font-emoji)",
                                "color": null
                              }
                            }
                          ],
                          "text": "Atajos de teclado para formato rápido."
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
                  "marks": [
                    {
                      "type": "textStyle",
                      "attrs": {
                        "fontFamily": "Inter, var(--font-emoji)",
                        "color": null
                      }
                    }
                  ],
                  "text": "Your note management tool!"
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
                        "fontFamily": "Inter, var(--font-emoji)",
                        "color": null
                      }
                    }
                  ],
                  "text": "Graphite is a text editor that will help you organize your information and ideas."
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
                        "fontFamily": "Inter, var(--font-emoji)",
                        "color": null
                      }
                    }
                  ],
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
                              "type": "textStyle",
                              "attrs": {
                                "fontFamily": "Inter, var(--font-emoji)",
                                "color": null
                              }
                            },
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
                              "type": "textStyle",
                              "attrs": {
                                "fontFamily": "Inter, var(--font-emoji)",
                                "color": null
                              }
                            },
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
                              "type": "textStyle",
                              "attrs": {
                                "fontFamily": "Inter, var(--font-emoji)",
                                "color": null
                              }
                            },
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
                              "type": "textStyle",
                              "attrs": {
                                "fontFamily": "Inter, var(--font-emoji)",
                                "color": null
                              }
                            },
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
                              "type": "textStyle",
                              "attrs": {
                                "fontFamily": "Inter, var(--font-emoji)",
                                "color": null
                              }
                            },
                            {
                              "type": "code"
                            }
                          ],
                          "text": "Code"
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
                  "marks": [
                    {
                      "type": "textStyle",
                      "attrs": {
                        "fontFamily": "Inter, var(--font-emoji)",
                        "color": null
                      }
                    }
                  ],
                  "text": "And that's not all, you also have a wide variety of "
                },
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "textStyle",
                      "attrs": {
                        "fontFamily": "Inter, var(--font-emoji)",
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
                        "fontFamily": "Inter, var(--font-emoji)",
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
                        "fontFamily": "Inter, var(--font-emoji)",
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
                        "fontFamily": "Inter, var(--font-emoji)",
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
                        "fontFamily": "Inter, var(--font-emoji)",
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
                        "fontFamily": "Inter, var(--font-emoji)",
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
                        "fontFamily": "Inter, var(--font-emoji)",
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
                        "fontFamily": "Inter, var(--font-emoji)",
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
                        "fontFamily": "Inter, var(--font-emoji)",
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
                        "fontFamily": "Inter, var(--font-emoji)",
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
                        "fontFamily": "Inter, var(--font-emoji)",
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
                        "fontFamily": "Inter, var(--font-emoji)",
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
                        "fontFamily": "Inter, var(--font-emoji)",
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
                        "fontFamily": "Inter, var(--font-emoji)",
                        "color": null
                      }
                    }
                  ],
                  "text": "Plus, you can add different very cool blocks such as:"
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
                          "type": "textStyle",
                          "attrs": {
                            "fontFamily": "Inter, var(--font-emoji)",
                            "color": null
                          }
                        },
                        {
                          "type": "italic"
                        }
                      ],
                      "text": "A quote to tell things that important people said a long time ago..."
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
                      "marks": [
                        {
                          "type": "textStyle",
                          "attrs": {
                            "fontFamily": "Inter, var(--font-emoji)",
                            "color": null
                          }
                        }
                      ],
                      "text": "A callout to show text with a style that draws more attention"
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
                  "text": "// Or even code to show off your programming skills\nprivate void main(String args[]) {\n\tSystem.out.println(\"Hello World!\");\n}"
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
                        "fontFamily": "Inter, var(--font-emoji)",
                        "color": null
                      }
                    }
                  ],
                  "text": "Additionally, you can also hide things so they don't bother you using collapsible content"
                }
              ]
            },
            {
              "type": "toggleBlock",
              "attrs": {
                "isOpen": true
              },
              "content": [
                {
                  "type": "toggleTitle",
                  "content": [
                    {
                      "type": "text",
                      "marks": [
                        {
                          "type": "textStyle",
                          "attrs": {
                            "fontFamily": "Inter, var(--font-emoji)",
                            "color": null
                          }
                        }
                      ],
                      "text": "This is collapsible content"
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
                          "marks": [
                            {
                              "type": "textStyle",
                              "attrs": {
                                "fontFamily": "Inter, var(--font-emoji)",
                                "color": null
                              }
                            }
                          ],
                          "text": "And inside it keeps a list of tasks to complete"
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
                                  "marks": [
                                    {
                                      "type": "textStyle",
                                      "attrs": {
                                        "fontFamily": "Inter, var(--font-emoji)",
                                        "color": null
                                      }
                                    }
                                  ],
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
                                  "marks": [
                                    {
                                      "type": "textStyle",
                                      "attrs": {
                                        "fontFamily": "Inter, var(--font-emoji)",
                                        "color": null
                                      }
                                    }
                                  ],
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
            {
              "type": "heading",
              "attrs": {
                "textAlign": null,
                "level": 2
              },
              "content": [
                {
                  "type": "text",
                  "marks": [
                    {
                      "type": "textStyle",
                      "attrs": {
                        "fontFamily": "Inter, var(--font-emoji)",
                        "color": null
                      }
                    }
                  ],
                  "text": "And this is a subnote"
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
                        "fontFamily": "Inter, var(--font-emoji)",
                        "color": null
                      }
                    }
                  ],
                  "text": "Graphite allows you to save notes inside other notes. You'll have to play with it!"
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
                              "type": "textStyle",
                              "attrs": {
                                "fontFamily": "Inter, var(--font-emoji)",
                                "color": null
                              }
                            }
                          ],
                          "text": "Use the sidebar to organize your workspace."
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
                              "type": "textStyle",
                              "attrs": {
                                "fontFamily": "Inter, var(--font-emoji)",
                                "color": null
                              }
                            }
                          ],
                          "text": "Shortcuts for quick formatting."
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
      }
    }
  };

  return content[lang] || content['en'];
};
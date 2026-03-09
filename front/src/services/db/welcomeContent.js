// front/src/services/db/welcomeContent.js
export const getWelcomeNote = (lang) => {
  const content = {
    es: {
      title: "¡Bienvenido a Graphite!",
      body: JSON.stringify({
        type: "doc",
        content: [
          { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Tu nueva herramienta de pensamiento" }] },
          { type: "paragraph", content: [{ type: "text", text: "Graphite es un editor de notas diseñado para ser rápido y local. Todo lo que escribes se guarda en tu ordenador." }] },
          { type: "bulletList", content: [
            { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Usa la barra lateral para organizar tus espacios." }] }] },
            { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Atajos de teclado para formato rápido." }] }] }
          ]}
        ]
      })
    },
    en: {
      title: "Welcome to Graphite!",
      body: JSON.stringify({
        type: "doc",
        content: [
          { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Your new thinking tool" }] },
          { type: "paragraph", content: [{ type: "text", text: "Graphite is a note editor designed to be fast and local. Everything you write stays on your computer." }] },
          { type: "bulletList", content: [
            { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Use the sidebar to organize your workspaces." }] }] },
            { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Keyboard shortcuts for fast formatting." }] }] }
          ]}
        ]
      })
    }
  };

  return content[lang] || content['en'];
};
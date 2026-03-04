// src/data/emojis.js

export const EMOJI_CATEGORIES = [
  { id: 'smileys', label: 'emojis.categories.smileys', icon: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 14a4 4 0 0 1-4-4h8a4 4 0 0 1-4 4z' },
  { id: 'animals', label: 'emojis.categories.animals', icon: 'M12 3l1.45 4.45L18 9l-4.55 1.55L12 15l-1.55-4.45L6 9l4.45-1.45L12 3z' },
  { id: 'food', label: 'emojis.categories.food', icon: 'M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z' },
  { id: 'travel', label: 'emojis.categories.travel', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
  { id: 'objects', label: 'emojis.categories.objects', icon: 'M12 2v2M5 5l1.5 1.5M2 12h2M5 19l1.5-1.5M12 22v-2M19 19l-1.5-1.5M22 12h-2M19 5l-1.5 1.5' },
  { id: 'symbols', label: 'emojis.categories.symbols', icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
];

export const EMOJI_DATA = [
  // SMILEYS & PEOPLE
  { id: 'grinning', char: '😀', category: 'smileys' },
  { id: 'joy', char: '😂', category: 'smileys' },
  { id: 'sweat_smile', char: '😅', category: 'smileys' },
  { id: 'wink', char: '😉', category: 'smileys' },
  { id: 'blush', char: '😊', category: 'smileys' },
  { id: 'heart_eyes', char: '😍', category: 'smileys' },
  { id: 'star_eyes', char: '🤩', category: 'smileys' },
  { id: 'thinking', char: '🤔', category: 'smileys' },
  { id: 'neutral', char: '😐', category: 'smileys' },
  { id: 'sunglasses', char: '😎', category: 'smileys' },
  { id: 'cry', char: '😢', category: 'smileys' },
  { id: 'puke', char: '🤮', category: 'smileys' },
  { id: 'exploding', char: '🤯', category: 'smileys' },
  { id: 'hands_up', char: '🙌', category: 'smileys' },
  { id: 'clap', char: '👏', category: 'smileys' },
  { id: 'thumbs_up', char: '👍', category: 'smileys' },
  { id: 'heart', char: '❤️', category: 'smileys' },

  // ANIMALS & NATURE
  { id: 'dog', char: '🐶', category: 'animals' },
  { id: 'cat', char: '🐱', category: 'animals' },
  { id: 'fox', char: '🦊', category: 'animals' },
  { id: 'lion', char: '🦁', category: 'animals' },
  { id: 'unicorn', char: '🦄', category: 'animals' },
  { id: 'whale', char: '🐳', category: 'animals' },
  { id: 'dragon', char: '🐲', category: 'animals' },
  { id: 'sparkles', char: '✨', category: 'animals' },
  { id: 'cloud', char: '☁️', category: 'animals' },
  { id: 'sun', char: '☀️', category: 'animals' },
  { id: 'moon', char: '🌙', category: 'animals' },
  { id: 'tree', char: '🌳', category: 'animals' },
  { id: 'clover', char: '🍀', category: 'animals' },

  // FOOD & DRINK
  { id: 'apple', char: '🍎', category: 'food' },
  { id: 'banana', char: '🍌', category: 'food' },
  { id: 'pizza', char: '🍕', category: 'food' },
  { id: 'burger', char: '🍔', category: 'food' },
  { id: 'taco', char: '🌮', category: 'food' },
  { id: 'ice_cream', char: '🍦', category: 'food' },
  { id: 'cake', char: '🍰', category: 'food' },
  { id: 'coffee', char: '☕', category: 'food' },
  { id: 'beer', char: '🍺', category: 'food' },
  { id: 'wine', char: '🍷', category: 'food' },

  // TRAVEL & PLACES
  { id: 'rocket', char: '🚀', category: 'travel' },
  { id: 'plane', char: '✈️', category: 'travel' },
  { id: 'car', char: '🚗', category: 'travel' },
  { id: 'earth', char: '🌍', category: 'travel' },
  { id: 'mountain', char: '⛰️', category: 'travel' },
  { id: 'beach', char: '🏖️', category: 'travel' },
  { id: 'island', char: '🏝️', category: 'travel' },
  { id: 'house', char: '🏠', category: 'travel' },

  // OBJECTS
  { id: 'laptop', char: '💻', category: 'objects' },
  { id: 'mobile', char: '📱', category: 'objects' },
  { id: 'camera', char: '📷', category: 'objects' },
  { id: 'bulb', char: '💡', category: 'objects' },
  { id: 'book', char: '📖', category: 'objects' },
  { id: 'pencil', char: '✏️', category: 'objects' },
  { id: 'hammer', char: '🔨', category: 'objects' },
  { id: 'package', char: '📦', category: 'objects' },
  { id: 'calendar', char: '📅', category: 'objects' },

  // SYMBOLS
  { id: 'fire', char: '🔥', category: 'symbols' },
  { id: 'star', char: '⭐', category: 'symbols' },
  { id: 'check', char: '✅', category: 'symbols' },
  { id: 'cross', char: '❌', category: 'symbols' },
  { id: 'warning', char: '⚠️', category: 'symbols' },
  { id: 'info', char: 'ℹ️', category: 'symbols' },
  { id: 'target', char: '🎯', category: 'symbols' },
  { id: 'party', char: '🎉', category: 'symbols' },
  { id: 'lightning', char: '⚡', category: 'symbols' },
  { id: 'sound', char: '🔊', category: 'symbols' },
];
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS USERS (
    user_id TEXT PRIMARY KEY, 
    username TEXT,
    email TEXT UNIQUE NOT NULL,
    session_token TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_sync_at DATETIME,
    is_dirty INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS WORKSPACES (
    workspace_id TEXT PRIMARY KEY,
    owner_id TEXT REFERENCES USERS(user_id),
    name TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_dirty INTEGER DEFAULT 0,
    is_deleted INTEGER DEFAULT 0,
    UNIQUE(owner_id, name)
);

CREATE TABLE IF NOT EXISTS NOTES (
    note_id TEXT PRIMARY KEY,
    workspace_id TEXT REFERENCES WORKSPACES(workspace_id) ON DELETE CASCADE,
    parent_id TEXT REFERENCES NOTES(note_id) ON DELETE SET NULL,
    title TEXT,
    icon TEXT,
    content TEXT,
    note_path TEXT,
    is_favorite INTEGER DEFAULT 0,
    is_editable INTEGER DEFAULT 1,
    is_dirty INTEGER DEFAULT 0,
    is_deleted INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    note_version INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS NOTE_LINKS (
    source_id TEXT REFERENCES NOTES(note_id) ON DELETE CASCADE,  
    target_id TEXT REFERENCES NOTES(note_id) ON DELETE CASCADE,
    PRIMARY KEY (source_id, target_id)
);
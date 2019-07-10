class EventModel{
    constructor(dao){
        this.dao = dao
    }

    createTable(){
        const sql = `
            CREATE TABLE IF NOT EXISTS events (
                id INTEGER PRIMARY KEY NOT NULL,
                type TEXT,
                actor_id INTEGER,
                repo_id INTEGER,
                created_at TEXT DEFAULT (datetime('now','utc')),
                CONSTRAINT event_fk_actor_id FOREIGN KEY (actor_id)
                    REFERENCES actors(id) ON UPDATE CASCADE ON DELETE CASCADE,
                CONSTRAINT event_fk_repo_id FOREIGN KEY (repo_id)
                    REFERENCES repo(id) ON UPDATE CASCADE ON DELETE CASCADE
            )
        `
        return this.dao.run(sql);
    }

    create(id, type, actor_id, repo_id, created_at){
        return this.dao.run(
            `INSERT INTO events (id, type, actor_id, repo_id, created_at)
                VALUES (?, ?, ?, ?, ?)`,
                [id, type, actor_id, repo_id, created_at]
        )
    }

    deleteAll(){
        return this.dao.run(
            `DELETE FROM events`
        )
    }

    getById(actor_id) {
        return this.dao.all(
            `SELECT * FROM events WHERE actor_id = ? ORDER BY id ASC`,
            [actor_id]
        )
    }

    getAll() {
        return this.dao.all(`SELECT * FROM events ORDER BY id ASC`)
    }
}

module.exports = EventModel
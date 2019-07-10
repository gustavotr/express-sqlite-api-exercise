class EventModel{
    constructor(dao){
        this.dao = dao
    }

    createTable(){
        const sql = `
            CREATE TABLE IF NOT EXISTS events (
                id INTEGER UNIQUE,
                type TEXT,
                actor_id INTEGER,
                repo_id INTEGER,
                created_at TEXT
            )
        `
        return this.dao.run(sql);
    }

    insert(id, type, actor_id, repo_id, created_at){
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

    getById(id) {
        return this.dao.get(
            `SELECT * FROM events WHERE id = ? ORDER BY id ASC`,
            [id]
        )
    }

    getAll() {
        return this.dao.all(
            `SELECT 
                E.*,
                A.login,
                A.avatar_url,
                R.name,
                R.url 
            FROM events E 
                LEFT JOIN actors A ON A.id = E.actor_id 
                LEFT JOIN repo R ON R.id = E.repo_id 
            ORDER BY E.id ASC`
        )
    }

    getAllByActorId(id, orderByEventDate){
        return this.dao.all(
            `SELECT
                E.*,
                A.login,
                A.avatar_url,
                R.name,
                R.url
            FROM events E
                INNER JOIN actors A ON A.id = E.actor_id
                LEFT JOIN repo R ON R.id = E.repo_id
            WHERE E.actor_id = ?
            ORDER BY ${(orderByEventDate) ? 'E.created_at ASC' : 'E.id ASC'}`, 
            [id]
        )
    }
}

module.exports = EventModel
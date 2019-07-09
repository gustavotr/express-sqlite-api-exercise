class ActorModel{
    constructor(dao){
        this.dao = dao
    }

    createTable(){
        const sql = `
            CREATE TABLE IF NOT EXISTS actors (
                id INTEGER PRIMARY KEY NOT NULL,
                login TEXT,
                avatar_url TEXT
            )
        `
        return this.dao.run(sql);
    }

    create(id, login, avatar_url){
        return this.dao.run(
            `INSERT INTO actors (id, login, avatar_url)
                VALUES (?, ?, ?)`,
                [id, login, avatar_url]
        )
    }

    deleteAll(){
        return this.dao.run(
            `DELETE FROM actors WHERE 1`
        )
    }

    getById(id) {
        return this.dao.get(
            `SELECT * FROM actors WHERE id = ?`,
            [id]
        )
    }

    getAllActors(){
        return this.dao.all(
            `SELECT A.*, COUNT(E.actor_id) as total_events FROM actors A INNER JOIN events E ON A.id = E.actor_id
                GROUP BY E.actor_id ORDER BY total_events DESC, E.created_at DESC, login ASC`
        )
    }

    updateAvatarUrl(id, avatar_url){
        return this.dao.run(
            `UPDATE actors SET avatar_url = ? WHERE id = ?`,
            [id, avatar_url]
        )
    }

    getStreak(){
        return this.dao.all(
            `SELECT A.* FROM actors A INNER JOIN events E ON A.id = E.actor_id
                GROUP BY E.actor_id ORDER BY COUNT(E.actor_id) DESC, E.created_at DESC, login ASC`
        )
    }
}

module.exports = ActorModel
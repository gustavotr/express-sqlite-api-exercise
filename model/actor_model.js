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

    updateAvatarUrl(id, avatar_url){
        return this.dao.run(
            `UPDATE actors SET avatar_url = ? WHERE id = ?`,
            [id, avatar_url]
        )
    }
}

module.exports = ActorModel
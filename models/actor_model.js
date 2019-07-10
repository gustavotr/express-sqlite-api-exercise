class ActorModel{
    constructor(dao){
        this.dao = dao
    }

    createTable(){
        return this.dao.run(`
            CREATE TABLE IF NOT EXISTS actors (
                id INTEGER UNIQUE,
                login TEXT,
                avatar_url TEXT
            )
        `);
    }

    createTemp() {
        return this.dao.run(`
            CREATE TABLE IF NOT EXISTS temp_actors (
                id INTEGER UNIQUE,
                login TEXT,
                avatar_url TEXT,
                max_streak INTEGER,
                last_event date
            )
        `);
    }

    insert(id, login, avatar_url){
        return this.dao.run(
            `INSERT INTO actors (id, login, avatar_url)
                VALUES (?, ?, ?)`,
                [id, login, avatar_url]
        )
    }

    deleteAll(){
        return this.dao.run(`DELETE FROM actors`)
    }

    getById(id) {
        return this.dao.get(
            `SELECT * FROM actors WHERE id = ?`,
            [id]
        )
    }

    insertTempStreak(id, login, avatar_url, max_streak, last_event) {        
        return this.dao.run(
            `INSERT INTO temp_actors(id, login, avatar_url, max_streak, last_event) 
                VALUES(?,?,?,?,?)`,
            [id, login, avatar_url, max_streak, last_event]);
    }

    getAllStreaks() {
        return this.dao.all(`
            SELECT * FROM temp_actors
            ORDER BY max_streak DESC, last_event DESC, login ASC
        `);
    }

    all(){
        return this.dao.all(`SELECT * FROM actors`)
    }

    allOrderedByEvents(){
        return this.dao.all(
            `SELECT A.* FROM actors A INNER JOIN events E ON A.id = E.actor_id
                GROUP BY E.actor_id ORDER BY COUNT(E.actor_id) DESC, E.created_at DESC, A.login ASC`
        )
    }

    updateAvatarUrl(id, avatar_url){
        return this.dao.run(
            `UPDATE actors SET avatar_url = ? WHERE id = ?`,
            [avatar_url, id]
        )
    }

    getStreak(){
        return this.dao.all(
            `SELECT A.id, A.login, A.avatar_url FROM actors A INNER JOIN events E ON A.id = E.actor_id
                GROUP BY E.actor_id ORDER BY COUNT(E.actor_id) DESC, E.created_at DESC, A.login ASC`
        )
    }

    getEventsForStreak(){
        return this.dao.all(
            `SELECT * FROM events ORDER BY actor_id, created_at`               
        )
    }
}

module.exports = ActorModel
class RepoModel{
    constructor(dao){
        this.dao = dao
    }

    createTable(){
        const sql = `
            CREATE TABLE IF NOT EXISTS repo (
                id INTEGER PRIMARY KEY NOT NULL,
                name TEXT,
                url TEXT
            )
        `
        return this.dao.run(sql);
    }

    create(id, name, url){
        return this.dao.run(
            `INSERT INTO repo (id, name, url)
                VALUES (?, ?, ?)`,
                [id, name, url]
        )
    }

    getById(id) {
        return this.dao.all(
            `SELECT * FROM repo WHERE id = ?`,
            [id]
        )
    }

    deleteAll(){
        return this.dao.run(
            `DELETE FROM repo WHERE 1`
        )
    }
}

module.exports = RepoModel
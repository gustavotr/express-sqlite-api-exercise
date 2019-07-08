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
}

module.exports = RepoModel
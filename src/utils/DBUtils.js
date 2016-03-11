export function DBUtils() {

    const sqlite3 = require('sqlite3').verbose();
    const path = require('path');
    const dbPath = path.resolve('./retroDB.db');
    console.log('DBPath : ' + dbPath);

    this.getDB = function() {
        return new sqlite3.Database(dbPath);
    }

    this.getAllSurveyResults = function(res) {
        this.setApiHeaders(res);
        let db = this.getDB();
        db.all("SELECT * FROM answers", function(err, row) {
            if (!err) {
                console.log(row.length);
                res.send(row);
            } else {
                res.send(err);
            }
        });
        db.close();
    };

    this.setApiHeaders = function(res) {
        res.setHeader('Content-Type', 'application/json');
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    };

    this.processAvgData = function(rows) {
        let data = [];
        for (let i in rows) {
            let obj1 = rows[i];
            data.push({
                a1: obj1.fun,
                a2: obj1.performance,
                a3: obj1.planning,
                a4: obj1.focus,
                ts: obj1.sprint_date,
            });
        }
        return data;
    };


    this.getAllSurveyCount = function(res) {
        this.setApiHeaders(res);
        let db = this.getDB();
        db.all("SELECT * FROM answer_per_survey", function(err, row) {
            if (!err) {
                res.send(row);
            } else {
                res.send(err);
                console.log(err);
            }
        });
        db.close();
    };


    this.getTeamAverages = function(res) {
        this.setApiHeaders(res);
        let db = this.getDB();
        let processData = this.processAvgData;
        db.all("SELECT * FROM team_average", function(err, row) {
            if (!err) {
                console.log('Sending rows : ' + row.length);
                res.send(processData(row));
            } else {
                console.log(err);
                res.send(err);
            }
        });
        db.close();
    };

    this.getSurveyResultsByDate = function(sprint_date, res) {
        this.setApiHeaders(res);
        let db = this.getDB();
        db.all("SELECT answerid, a1, a2, a3, a4, date(createdOn) as ts FROM answers where date(createdOn) == '" + sprint_date + "'", function(err, row) {
            if (!err) {
                console.log(row.length);
                res.send(row);
            } else {
                res.send(err);
            }
        });
        db.close();
    };


    this.insertSurveyAnswers = function(results, response) {
        this.setApiHeaders(response);
        let db = this.getDB();
        let stmt = db.prepare('insert into answers (a1, a2, a3, a4) values (?, ?, ?, ?)');

        const template = 'insert into answers (a1, a2, a3, a4) values (';
        for (var i in results) {
            let row = results[i];
            stmt.run(row[0], row[1], row[2], row[3]);
        }
        stmt.finalize();
        db.close();
        response.send({'OK' : 'OK'});
    };

    this.cleanSurveyResultsByDate = function(sprint_date, res) {
        this.setApiHeaders(res);
        let db = this.getDB();
        db.run("delete from answers where date(createdOn) = '" + sprint_date + "'", function(err, row) {
            if (!err) {
                res.send({success : 'Deleted survey for ' + sprint_date});
            } else {
                res.send(err);
            }
        });
        db.close();
    };
}

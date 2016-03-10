export function DBUtils() {

    const sqlite3 = require('sqlite3').verbose();
    const path = require('path');
    const dbPath = path.resolve('./retroDB.db');
    console.log('DBPath : ' + dbPath);

    this.getDB = function() {
        return new sqlite3.Database(dbPath);
    }

    this.getAllSurveyResults = function(res) {

        let db = this.getDB();
        res.setHeader('Content-Type', 'application/json');
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

        let db = this.getDB();
        db.all("SELECT * FROM answer_per_survey", function(err, row) {
            res.setHeader('Content-Type', 'application/json');
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

        let db = this.getDB();
        let processData = this.processAvgData;
        db.all("SELECT * FROM team_average", function(err, row) {
            res.setHeader('Content-Type', 'application/json');
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
}

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
                console.log(row);
                res.send(row);
            } else {
                res.send(err);
            }
        });
        db.close();
    };


    this.getAllSurveyCount = function(res) {

        let db = this.getDB();
        db.all("SELECT * FROM answer_per_survey", function(err, row) {
            res.setHeader('Content-Type', 'application/json');
            if (!err) {
                res.send(row);
            } else {
                res.send(err);
            }
        });
        db.close();
    };


    this.getTeamAverages = function(res) {

        let db = this.getDB();
        db.all("SELECT * FROM team_average", function(err, row) {
            res.setHeader('Content-Type', 'application/json');
            if (!err) {
                res.send(row);
            } else {
                res.send(err);
            }
        });
        db.close();
    };
}

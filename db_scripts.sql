-- db_scripts.sql

create table answers ( 
	answerid INTEGER primary key AUTOINCREMENT, 
	a1 INTEGER, 
	a2 INTEGER, 
	a3 INTEGER, 
	a4 INTEGER, 
	createdOn datetime default current_timestamp
);


create view team_average as 
select avg(a1) as fun, avg(a2) as performance, avg(a3) as planning, avg(a4) as focus, 
date(createdOn) as sprint_date from answers group by date(createdOn);

 
create view answer_per_survey as 
SELECT date(createdOn) as sprint_date, count(*) as count FROM answers group by date(createdOn) order by date(createdOn) desc;
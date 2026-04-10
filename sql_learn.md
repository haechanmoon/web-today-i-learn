문제 정답

1번 
```sql
select distinct crew_id, nickname FROM attendance;

CREATE TABLE crew (
                      crew_id INT NOT NULL,
                      nickname VARCHAR(50) NOT NULL,
                      PRIMARY KEY (crew_id)
);

INSERT INTO crew (crew_id, nickname)
SELECT DISTINCT crew_id, nickname FROM attendance;

```

2번

```sql

alter table attendance drop column nickname

```

3번

```sql
alter table attendance
ADD CONSTRAINT fk_attendance_crew
FOREIGN KEY (crew_id) REFERENCES crew(crew_id);
```

4번
```sql
ALTER TABLE crew ADD UNIQUE (nickname);
```

5번
```sql
select nickname from crew
where nickname like '디%';
```
6번
```sql
SELECT * FROM attendance 
WHERE crew_id = (SELECT crew_id FROM crew WHERE nickname = '어셔');
```
7번
```sql
INSERT INTO crew (crew_id, nickname) VALUES (13, '어셔');
INSERT INTO attendance (crew_id, attendance_date, start_time, end_time)
VALUES (
               (SELECT crew_id FROM crew WHERE nickname = '어셔'),
               '2025-03-06',
               '09:31',
               '18:01'
       );
```
8번
```sql
INSERT INTO crew (crew_id, nickname) VALUES (14, '주니')
UPDATE attendance
SET start_time = '10:00:00'
WHERE attendance_date = '2025-03-12'
  AND crew_id = (SELECT crew_id FROM crew WHERE nickname = '주니');

```

9번
```sql
delete from attendance
where attendance_date = '2025-03-12' and
    crew_id = (
    select crew.crew_id from crew
                    where nickname = '아론');
```

10번
```sql
select c.nickname, a.attendance_date, a.start_time, a.end_time
from attendance a
join crew c on a.crew_id = c.crew_id;
```

11번
```sql
select * from attendance
where crew_id = (select crew_id
                            from crew where nickname = '검프');
```

12번
```sql
select c.nickname, a.attendance_date, a.end_time  from attendance a
join crew_db.crew c on a.crew_id = c.crew_id
where a.attendance_date = '2025-03-05'
order by end_time desc
limit 1;
```

13번
```sql
select crew_id, count(*) as total_days  from attendance
group by crew_id;
```

14번
```sql
select crew_id, count(start_time) from attendance
group by crew_id;
```

15번
```sql
select attendance_date, count(crew_id) from attendance
group by attendance_date;
```

16번
```sql
select c.nickname as 닉네임, min(a.start_time) as 가장빠른, max(a.end_time) as 가장늦은 from attendance a join crew_db.crew c on a.crew_id = c.crew_id
group by a.crew_id;
```

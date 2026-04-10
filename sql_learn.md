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

#  SQL 실습 및 생각해보기

##  SQL 실습 관련

### 1. 기본키란 무엇이고 왜 필요한가?
> **출제 의도:** 테이블에서 각 레코드를 고유하게 식별하는 기본키의 개념과 중요성을 이해해보자. 실제 데이터를 다룰 때 식별자가 없다면 어떤 문제가 발생할지 생각해보고, 기본키 선택이 데이터베이스 설계에 미치는 영향을 고민해보자.

### 2. MySQL에서 사용되는 `AUTO_INCREMENT`는 왜 필요할까?
> **출제 의도:** 일일이 ID 값을 지정해야 하는 번거로움을 줄이고 중복 없는 고유값을 자동으로 생성하는 기능의 필요성을 파악해보자.

### 3. 학생이 등교는 했지만 하교 버튼을 누르지 않았을 때, end_time에 NULL이 저장된다. NULL 값을 처리할 때 주의할 점은?
> **출제 의도:** NULL 처리는 SQL 학습에서 자주 혼란을 주는 개념이다. 특히 프론트엔드에서 NULL 데이터를 어떻게 표시할지는 실무적으로 중요한 문제이다.

### 4. crew와 attendance 테이블의 관계를 ER 다이어그램으로 시각화해보자. 이 관계를 일상 생활의 예시로 비유한다면 어떤 것이 있을까?
> **출제 의도:** 일대다 관계를 실생활에서 찾아보면서(예: 학생-수강과목, 고객-주문 등) 관계형 모델의 기본 개념을 체득해보자.

---

### 5. 출석 시스템에서 동시에 100명이 등교 버튼을 누른다면 어떤 일이 일어날까? 이 문제를 2026 공통강의 - DB에서 배운 트랜잭션과 ACID 속성으로 설명해보자.
> **출제 의도:** 실습에서 직접 다룬 INSERT/UPDATE가 실제 운영 환경에서는 동시성 문제를 일으킬 수 있다. 원자성(Atomicity)과 격리성(Isolation)이 왜 필요한지 출석 시스템의 맥락에서 구체적으로 떠올려보자.

### 6. 출석 데이터가 파일(CSV)이 아닌 데이터베이스에 저장되는 이유는 무엇일까? 파일 시스템으로 출석을 관리했다면 어떤 문제가 생길까?
> **출제 의도:** 2026 공통강의 - DB에서 배운 파일 시스템의 한계(데이터 중복, 일관성, 동시 접근, 보안)를 출석 시스템이라는 구체적인 사례에 적용해보자.

### 7. 출석 데이터를 관계형 DB가 아닌 NoSQL(예: MongoDB)로 저장한다면 테이블 구조가 어떻게 달라질까? 어떤 장단점이 있을까?
> **출제 의도:** 2026 공통강의 - DB에서 배운 RDBMS vs NoSQL 비교를 실제 데이터에 적용해보자. 출석 데이터처럼 구조가 명확한 경우와, 크루 프로필처럼 자유로운 구조가 필요한 경우를 비교해보자.

---

## 🧐 더 생각해 보기 (심화)

### 1. 왜 crew 테이블에서 nickname을 기본키로 하지 않은 걸까? attendance 테이블에 attendance_id가 존재하는 이유는 무엇일까?
> **출제 의도:** 자연키(nickname)와 대리키(crew_id, attendance_id)의 차이점과 선택 기준을 이해해보자. 업무적 의미가 있는 데이터(nickname)는 미래에 변경될 가능성이 있어 기본키로 적합하지 않을 수 있다.
- 답변: 닉네임은 언제든 사용자가 변경할 수 있는 비즈니스 데이터이므로, 값이 변하지 않아야 하는 기본키의 조건에 부적합합니다. 따라서 의미를 갖지 않는 대리키를 사용하여 안전하게 식별합니다.

### 2. 데이터베이스 제약 조건 중 RESTRICT, CASCADE는 무엇인가?
> **출제 의도:** 외래키 관계에서 참조 무결성을 유지하기 위한 다양한 전략을 이해해보자. 예를 들어 사용자가 탈퇴할 때 그 사용자의 게시글도 함께 삭제해야 할지, 아니면 유지해야 할지와 같은 실제 의사결정에 이 개념이 어떻게 적용되는지 고민해보자.
- 답변: 부모 데이터 삭제 시 참조 무결성을 유지하는 방법입니다. RESTRICT는 자식 데이터(출석)가 있으면 삭제를 막고 에러를 발생시킵니다. CASCADE는 부모 삭제 시 연결된 자식 데이터도 연쇄적으로 함께 삭제합니다.

### 3. 다음 두 쿼리는 동일한 결과를 반환하지만 성능에 차이가 있다. 어떤 차이가 있으며, 어떤 상황에서 각각 유리할까?

```sql
-- 쿼리 1: 서브쿼리 사용
SELECT * FROM attendance 
WHERE crew_id IN (SELECT crew_id FROM crew WHERE nickname LIKE '네%');

-- 쿼리 2: JOIN 사용
SELECT a.* FROM attendance a 
JOIN crew c ON a.crew_id = c.crew_id 
WHERE c.nickname LIKE '네%';
```

- 답변: * 서브쿼리: 필터링할 조건의 데이터 양이 매우 적을 때 유리합니다.

JOIN: 대부분의 경우 옵티마이저가 인덱스를 활용해 더 최적화된 실행 계획을 세울 수 있어 대용량 데이터 조회 시 성능이 더 좋습니다.


### 4.attendance 테이블을 완전히 정규화하면 어떤 장점이 있을까? 반대로 일부 비정규화를 적용한다면 어떤 쿼리 성능 이점을 얻을 수 있을까?

> **출제 의도**: 정규화와 성능 사이의 균형은 데이터베이스 설계의 핵심 과제이다.
- 답변: 완전히 정규화하면 데이터 중복과 불일치를 원천 차단하여 무결성이 높아집니다. 반대로 비정규화를 하면 매번 JOIN을 할 필요가 없어 읽기 성능이 크게 향상됩니다.
### 5.출석 시스템이 수백 명의 사용자에 의해 동시에 접근된다면, 연결 풀링(connection pooling)은 무엇이고 왜 필요한가?

> **출제 의도**: 데이터베이스 연결 관리는 웹 애플리케이션 성능에 큰 영향을 미치는 요소이다.
- 답변: DB와 연결을 맺고 끊는 작업은 서버 자원 소모가 큽니다. 미리 일정 수의 연결을 만들어 풀에 보관해 두고 돌려쓰면, 동시 요청이 쏟아져도 빠르고 안정적으로 처리할 수 있습니다.

### 6.실습에서 수행한 INSERT, UPDATE, DELETE를 하나의 트랜잭션으로 묶는다면 어떻게 작성할 수 있을까? 만약 DELETE 도중 오류가 발생하면 앞서 수행한 INSERT와 UPDATE는 어떻게 되어야 할까?

> **출제 의도**: 2026 공통강의 - DB에서 배운 트랜잭션의 Commit/Rollback 개념을 실습 문제와 직접 연결해보자.
- 답변: START TRANSACTION;으로 시작하여 작업을 진행합니다. 도중에 오류가 발생하면 원자성 보장을 위해 ROLLBACK;을 실행하여, 앞서 성공한 INSERT와 UPDATE 작업도 모두 실행 전 상태로 되돌려야 합니다. 전부 성공했을 때만 COMMIT; 합니다.

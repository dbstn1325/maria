# express & pug & MYSQL 연동 연습 (진료 상담 예약)


### Precondition
<img width="425" alt="555" src="https://user-images.githubusercontent.com/78465062/144005402-6724e800-93ea-4088-9106-267cc0e16de3.png">


- node, mysql, pug 설치 완료
- localhost에 데이터 저장할 데이터베이스 생성되어 있음 (코드에는 : user_database, patient_database)
- localhost의 MySQL 데이터베이스에 데이터 insert 되어 있음
- 회원가입 및 로그인 과정 시 비밀번호 암호화 처리 과정(bcrypt)
- nodemon, babel-node 설정을 통해 컴파일 간편화
- nodejs의 view engine 'pug'와 MYSQL간 연동에 관한 자료는 pug 공식문서 참고(https://pugjs.org/api/getting-started.html)



### 실행
.env 파일 내 설정에 따라 수정
- MYSQL > USER_DATABASE > HOST, PORT, USER, PASSWORD, DATABASE 설정 (패스워드 없다면 설정해야 함) 
- MYSQL > PATIENT_DB > HOST, PORT, USER, PASSWORD, DATABASE, DATESTRINGS 설정 (패스워드 없다면 설정해야 함)

```bash
cd mysql
npm install
npm start
```

### 실행 후 데이터베이스 
>USER_DATABASE
<img width="596" alt="2" src="https://user-images.githubusercontent.com/78465062/144003436-f364c70b-6a23-4b96-9024-62714908de5f.png">


>PATIENT_DB

<img width="476" alt="1" src="https://user-images.githubusercontent.com/78465062/144003399-586c403a-aadf-4240-946e-845a894303c3.png">


### 추후 개발해나가야 할 점
- 특정 예약 환자를 삭제하고 다시 예약 등록을 함. 이를 PATIENT_DB를 MYSQL Client로 보았을 때, 삭제된 ID를 제외하고 자동으로 초기화시켜, 생성된 ID가 다음ID로 이어지게 구현함. 하지만 이렇게만 할 경우 환자가 많아질수록 ID고유값이 무분별하게 낭비될 확률이 높음. 좀 더 좋은 방법으로 무분별한 ID 사용을 막을 필요가 있음. 

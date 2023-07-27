//express : node환경의 서버프로그램을 만들 때 사용하는 프레임워크

// 1. npm init 해주기
// 2. npm install express 해주기

const express = require('express');

const app = express();

const db = require('./models'); //"./models/index" 에서 index생략 가능
const {Member} = db;
//let members = require('./members'); 를 위처럼 수정

app.use(express.json()); // middleware (새 직원 정보 추가)

app.get('/api/members', async (req, res) => {       // 특정 팀만 조회
    //const team = req.query.team;
    const { team } = req.query;
    if (team) {
        const teamMembers = await Member.findAll({where: { team }});  // 모델과 테이블 연동후 작업
        res.send(teamMembers);
    } else {
        const members = await Member.findAll(); // 모델과 테이블 연동후 작업
        res.send(members); // 전체 직원정보 출력
    }
    //res.send(members);
});
//http://localhost:3000/api/members?team=engineering
//http://localhost:3000/api/members?team=sales

app.get('/api/members/:id', async(req, res) => {       // 고객 한명한명 값
    //const id = req.params.id;            값 가져오기  (express에서 유용하게 쓰임) 
    const { id } = req.params;
    const member = await Member.findOne( {where : {id }})                    // 모델과 테이블 연동후 작업
    if (member) {           // 해당 고객정보가 있다면
        res.send(member);   // 그 직원정보를 res에 담아
    } else {                 // 없다면
        res.status(404).send({message : 'There is no member with the id!!'});     // 요청한정보 없는 상태
    }
});

app.post('/api/members', async (req, res) => {  // post 리퀘스트
    //console.log(req.body);
    const newMember = req.body
    const member = Member.build(newMember); // 모델과 테이블 연동후 작업
    await member.save()                    // 모델과 테이블 연동후 작업    
    res.send(newMember);
})
// 플러그인 rest client


app.put('/api/members/:id', async (req, res) => {  // 기존 직원 정보 수정
    const { id } = req.params;
    const newInfo = req.body;
    const result = await Member.update(newInfo, { where : {id}})
    if (result[0]) {                                              // 모델과 테이블 연동후 작업  
        res.send({ message : `${result[0]} row(s) affected`})    // 모델과 테이블 연동후 작업  
    }
     else {
        res.status(404).send({ message: 'There is no member with the id!' })
    }
});
// 1) npm run dev
// 2) test.http 가서 ### 친후 PUST :~~~
// 3) 바꾸고싶은 객체 복사 후 내용 수정

// 직원수정 또다른방법
//app.put('/api/members/:id', async (req, res) => {
//    const {id} = req.params;
//    const newInfo = req.body;
//    const member = await Member.findOne({ where : {id}});
//    Object.keys(newInfo).forEach((prop) => {
//        member[prop] =  newInfo[prop]
//    });
//    await member.save();
//    res.send(member); 
//})


app.delete('/api/members/:id', async(req, res) => { //기존 직원 정보 삭제
    const { id } = req.params;
    const deleteCount = await Member.destroy({ where : {id}}); // 모델과 테이블 연동후 작업
    if (deleteCount) {
        res.send({ message : `${deleteCount} row(s) deleted` });
    } else {
        res.status(404).send({ message : 'There is no member with the id!'})
    }
});
// 1) npm run dev
// 2) test.http에서 ### 후 DELETE http://~~/지우고싶은멤버 숫자
// 3) send req 클릭

app.listen(3000, () => {
    console.log('서버가 돌아가는 중이에요 >__<!!')
});

// http://localhost:3000/hello

// 2) members.js -> 직원정보 DB
// resource : 정보, 자원   (조회, 추가, 갱신, 삭제)


// 3) npm install nodemon --sav-dev   : 실시간 반영됨
// npx nodemon app.js
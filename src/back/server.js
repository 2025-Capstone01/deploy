const express = require("express");
const cors = require("cors");
const app = express();

//가격 하락 시 알림 및 기록이 자동으로 반응하지 않는 문제를 방지하기 위한 자동 알림 검사
const cron = require('node-cron');
const axios = require('axios');

// 라우터 불러오기
const searchRouter = require("./routes/search");
const likesRouter = require('./routes/likes');
const categoryRouter = require('./routes/categories');
const alertRouter = require('./routes/alert');
const userRouter = require('./routes/user');

// ✅ CORS 설정: 오직 https://pricewing.xyz만 허용
const corsOptions = {
    origin: ['https://pricewing.xyz', 'http://localhost:3000'],
    credentials: true
};

// 미들웨어 설정
app.use(cors(corsOptions));               // CORS 허용 (프론트엔드 요청 받을 수 있게)
app.use(express.json());        // JSON 요청 파싱

// 검색 API 라우터 연결 (/api/search → search.js 처리)
app.use("/api/search", searchRouter);
app.use('/api/likes', likesRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/alerts', alertRouter);
app.use('/api/users', userRouter);


// 매 1분마다 알림 체크
cron.schedule('*/1 * * * *', async () => {
    try {
        const res = await axios.get('http://localhost:5050/api/alerts/check');
        console.log('✅ 자동 알림 체크 실행됨:', res.data);
    } catch (err) {
        console.error('❌ 알림 체크 실패:', err.message);
    }
});

// 서버 실행
app.listen(5050, '0.0.0.0',() => {
    console.log("백엔드 서버 실행 중 http://0.0.0.0:5050");
});

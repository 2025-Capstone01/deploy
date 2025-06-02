const express = require('express');
const router = express.Router();
const pool = require('../db');

// 사용자 등록 API
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [results] = await pool.query(
            'SELECT * FROM user WHERE email = ?',
            [email]
        );

        // 이미 존재해도 user_id를 응답해줌 (중복 저장 안하지만, 프론트는 user_id 필요하므로)
        if (results.length > 0) {
            console.log('이미 존재하는 사용자:', email);
            return res.status(200).json({
                message: '이미 존재하는 사용자입니다.',
                user_id: results[0].user_id
            });
        }

        // 신규 사용자 등록
        const [insertResult] = await pool.query(
            'INSERT INTO user (email, user_password) VALUES (?, ?)',
            [email, password]
        );

        console.log('새로운 사용자 저장 완료:', email);
        res.status(200).json({
            message: '새로운 사용자가 저장되었습니다.',
            user_id: insertResult.insertId
        });

    } catch (err) {
        console.error('저장 실패:', err.message);
        return res.status(500).json({ error: err.message });
    }
});

// 이메일로 user_id 조회 (로그인 후 user_id 확보용)
router.get('/id', async (req, res) => {
    const { email } = req.query;

    try {
        const [rows] = await pool.query(
            'SELECT user_id FROM user WHERE email = ?',
            [email]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }

        res.json({ user_id: rows[0].user_id });
    } catch (err) {
        console.error('user_id 조회 실패:', err);
        res.status(500).json({ message: '서버 오류' });
    }
});

module.exports = router;
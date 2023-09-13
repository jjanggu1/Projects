const express = require('express');
const db = require('../db'); //db연결
const bcrypt = require('bcrypt'); //암호화 관련 모듈

const router = express.Router();

router.post('/pullUserData', async(req, res)=> { //회원정보 수정할때 보여줄 데이터 가져다주기
    const email = req.body.email;

    db.query(`select USER_NICKNAME, USER_PHONE from weavewego.user where USER_EMAIL= ?;`, email, (err, results)=> {
        if(err) {
            res.send({ // 에러 발생 시
                'code':400,
                'failed': 'error occurred',
                'error': err
            })
        } else {
            if(results.length > 0) { //결과값이 있으면
                res.send({
                    'code':200,
                    'nick': results[0].USER_NICKNAME,
                    'phone': results[0].USER_PHONE
                })
            } else { //결과값이 없으면
                res.send({
                    'code':204,
                    
                })
            }
        }
    })
})
//---------------회원정보 수정후 데이터 받아오기
router.post('/pullUserData2', async(req, res)=> { //회원정보 수정할때 보여줄 데이터 가져다주기
    const email = req.body.email;

    db.query(`select USER_NICKNAME, USER_IMAGE, USER_PROVIDER from weavewego.user where USER_EMAIL= ?;`, email, (err, results)=> {
        if(err) {
            res.send({ // 에러 발생 시
                'code':400,
                'failed': 'error occurred',
                'error': err
            })
        } else {
            if(results.length > 0) { //결과값이 있으면
                res.send({
                    'code':200,
                    'nick': results[0].USER_NICKNAME,
                    'image': results[0].USER_IMAGE,
                    'provider': results[0].USER_PROVIDER
                })
            } else { //결과값이 없으면
                res.send({
                    'code':204,
                    
                })
            }
        }
    })
})
//---------------------------회원정보 수정 쿼리------------------------------------
router.post('/updateProfile', async(req, res) => {
    const email = req.body.email;
    const nick = req.body.nickname;
    const phone_num = req.body.phone_num;
    const pw = req.body.password;

    let encryptedpw = null;

    if (pw !== "") {
        encryptedpw = await bcrypt.hash(pw, 12); // 비밀번호가 null이 아닌 경우에만 암호화
    }
    let query = `UPDATE weavewego.user SET`;
    let queryParams = [];

    if (nick) { //닉네임이 전달이 되면 쿼리에 추가
        query += ` USER_NICKNAME = ?,`;
        queryParams.push(nick);
    }

    if (phone_num) { //전화번호가 전달이 되면 쿼리에 추가
        query += ` USER_PHONE = ?,`;
        queryParams.push(phone_num);
    }

    if (encryptedpw !== null) { //비밀번호가 전달이 되면 쿼리에 추가
        query += ` USER_PW = ?,`;
        queryParams.push(encryptedpw);
    }

    query = query.slice(0, -1); // 마지막 쉼표 제거 쿼리에 추가
    query += ` WHERE USER_EMAIL = ?`;
    queryParams.push(email);

    db.query(query, queryParams, (err) => {
        if (err) {
            res.send({
                'code': 400,
                'failed': 'error occurred',
                'error': err
            });
        } else {
            console.log(query);
            console.log(queryParams);
            res.send({
                'code': 200,
                'message': '회원정보 수정 완료'
            });
        }
    });
});



module.exports = router;
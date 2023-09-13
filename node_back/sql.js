module.exports = {
    //-------------------main.js-------------------------------------
    getLikeCourse: {
        query: `SELECT board.BRD_ID, board.BRD_WRITER, board.BRD_HASHTAG, (select USER_NICKNAME from user where BRD_WRITER = USER_EMAIL) as BRD_NICK, board.BRD_TITLE, date_format(board.BRD_CREATED_AT, '%Y-%m-%d') as BRD_CREATED, board.BRD_REV, board.BRD_VIEWCOUNT, (SELECT IMG_PATH FROM weavewego.image 
            WHERE weavewego.image.IMG_NUM = weavewego.board.BRD_ID LIMIT 1) AS IMG_PATH, COUNT(likelist.LL_ID) as likecount
            FROM weavewego.board left JOIN weavewego.likelist ON board.BRD_ID = likelist.LL_NUM 
            where board.BRD_OPEN = 1
            GROUP BY board.BRD_ID, board.BRD_WRITER, board.BRD_HASHTAG, board.BRD_NICK, board.BRD_TITLE
            order by likecount desc;`
    },
    getViewsCourse: {
        query: `SELECT board.BRD_ID, board.BRD_WRITER, board.BRD_HASHTAG, board.BRD_NICK, board.BRD_TITLE, date_format(board.BRD_CREATED_AT, '%Y-%m-%d') as BRD_CREATED, board.BRD_REV, board.BRD_VIEWCOUNT, (SELECT IMG_PATH FROM weavewego.image 
                WHERE weavewego.image.IMG_NUM = weavewego.board.BRD_ID LIMIT 1) AS IMG_PATH, COUNT(likelist.LL_ID) as likecount
                FROM weavewego.board left JOIN weavewego.likelist ON board.BRD_ID = likelist.LL_NUM 
                where board.BRD_OPEN = 1
                GROUP BY board.BRD_ID, board.BRD_WRITER, board.BRD_HASHTAG, board.BRD_NICK, board.BRD_TITLE
                order by board.BRD_VIEWCOUNT desc;`
    },
    getNewestCourse: {
        query: `SELECT board.BRD_ID, board.BRD_WRITER, board.BRD_HASHTAG, board.BRD_NICK, board.BRD_TITLE, date_format(board.BRD_CREATED_AT, '%Y-%m-%d') as BRD_CREATED, board.BRD_REV ,board.BRD_VIEWCOUNT, (SELECT IMG_PATH FROM weavewego.image 
                WHERE weavewego.image.IMG_NUM = weavewego.board.BRD_ID LIMIT 1) AS IMG_PATH, COUNT(likelist.LL_ID) as likecount
                FROM weavewego.board left JOIN weavewego.likelist ON board.BRD_ID = likelist.LL_NUM 
                where board.BRD_OPEN = 1
                GROUP BY board.BRD_ID, board.BRD_WRITER, board.BRD_HASHTAG, board.BRD_NICK, board.BRD_TITLE
                order by board.BRD_CREATED_AT desc;`
    },
    likeCourse: {
        query: `insert into weavewego.likelist set ?`
    },
    dislikeCourse: {
        query: `delete from weavewego.likelist where LL_ID = ? AND LL_NUM = ?`
    },
    increase: {
        query: `UPDATE weavewego.board
                SET BRD_VIEWCOUNT = BRD_VIEWCOUNT + 1
                WHERE BRD_ID = ?;`
    }
    //----------------------------------------------------------
}
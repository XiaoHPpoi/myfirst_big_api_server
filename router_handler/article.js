
//文章的处理函数模块

//发布文章的处理函数
exports.addArticle = (req, res) => {
    // 导入处理路径的 path 核心模块
    const path = require('path')

    const articleInfo = {
    // 标题、内容、状态、所属的分类Id
    ...req.body,
    // 文章封面在服务器端的存放路径
    cover_img: path.join('/uploads', req.file.filename),
    // 文章发布时间
    pub_date: new Date(),
    // 文章作者的Id
    author_id: req.user.id,
    }
    const sql = `insert into ev_articles set ?`
    // 导入数据库操作模块
    const db = require('../db/index')

    // 执行 SQL 语句
    db.query(sql, articleInfo, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)

    // 执行 SQL 语句成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return res.cc('发布文章失败！')

    // 发布文章成功
    res.cc('发布文章成功', 0)
    })
}
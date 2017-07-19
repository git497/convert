# convert-service

- http server使用[restify](https://github.com/restify/node-restify)
- 通过http使用unoconv执行文件转换
- 存储使用LevelDB
- 发送到服务端的请求会放到任务队列，任务队列通过level-jobs简单实现



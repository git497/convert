# convert-service

- HTTP Server使用[restify](https://github.com/restify/node-restify)
- 使用[unoconv](https://github.com/dagwieers/unoconv)执行文件转换
- 存储使用[LevelDB](https://github.com/google/leveldb)
- 发送到服务端的请求会放到任务队列，任务队列通过[level-jobs](https://github.com/pgte/level-jobs)简单实现



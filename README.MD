<p align="center">
    <img alt="logo" src="https://gaojianghua.oss-cn-hangzhou.aliyuncs.com/wt.png" width="120" height="120" style="margin-bottom: 10px;">
</p>
<h3 align="center" style="margin: 30px 0 30px;font-weight: bold;font-size:40px;">Wolffy Tools</h3>

## 说明

Wolffy Tools，是基于日常业务封装的JS工具包，方便业务开发。



## cache
~~~ts
import wolffy from 'wolffy'

let minCache = wolffy.MinCache(
    1200 // 过期时间
)
~~~

## check
~~~ts
import wolffy from 'wolffy'

let check = wolffy.Check
~~~

## filters
~~~ts
import wolffy from 'wolffy'

let filters = wolffy.Filters
~~~

## webSocket
~~~ts
import wolffy from 'wolffy'

let options = {
    https: '',
    data: {},
    config: {
        // 心跳间隔、重连websocket间隔，5秒
	    interval: 5000,
	    // 重连最大次数
	    maxReconnectMaxTime: 5,
	    // URL 地址
	    // 生产环境
	    // baseURL: 'gaojianghua.cn/socket/ws',
	    // 测试环境
	    // baseURL: '127.0.0.1:8888/api/socket/ws',
	    // 本地环境
	    baseURL: 'localhost:8888/api/socket/ws',
    }
}

let socket = new wolffy.socket(options)
~~~

## SQLite
~~~ts
import wolffy from 'wolffy'

let sqlite = wolffy.SQLite
~~~

## Tools
~~~ts
import wolffy from 'wolffy'

let tools = wolffy.Tools
~~~


## webworker
根据业务自行创建 worker.js：
~~~ts
// WebWorker的业务逻辑处理, 在初始化WebWorker实例时将该文件路径传入进去即可。

// 监听主线程消息
self.addEventListener('message', (event) => {
  const data = event.data;

  // 在这里进行耗时操作或其他需要在 Worker 中处理的任务

  // 处理完后发送消息给主线程
  self.postMessage(data);
});
~~~
~~~ts
import wolffy from 'wolffy'

let worker = new wolffy.worker('./worker.js')
~~~
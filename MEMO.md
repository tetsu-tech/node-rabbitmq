# memo

###  これ読んだ
  - https://betterprogramming.pub/implementing-rabbitmq-with-node-js-93e15a44a9cc

### msgの中身

```js
{
  fields: {
    // consumerごとにunique
    consumerTag: 'amq.ctag-7NnTaXmzlMY40NhHPVZiBw',
    // consumerがmessageを受け取るごとにincrementする
    deliveryTag: 3,
    // ackされていないmessageを受け取るとtrueになる
    // consumeしたsubscriberが終了しないと他のsubscriberがconsumeできない
    redelivered: false,
    exchange: '',
    routingKey: 'user-messages'
  },
  properties: {
    contentType: undefined,
    contentEncoding: undefined,
    headers: {},
    deliveryMode: undefined,
    priority: undefined,
    correlationId: undefined,
    replyTo: undefined,
    expiration: undefined,
    messageId: undefined,
    timestamp: undefined,
    type: undefined,
    userId: undefined,
    appId: undefined,
    clusterId: undefined
  },
  content: <Buffer 7b 22 6e 61 6d 65 22 3a 22 74 65 74 73 75 22 7d>
}
```


```
Error: Channel closed by server: 403 (ACCESS-REFUSED) with message "ACCESS_REFUSED - access to exchange 'amq.default' in vhost 'nrkscbaq' refused for user 'nrkscbaq'"
    at Channel.C.accept (/Users/tetsuo.yamamoto/Desktop/amqp/node_modules/amqplib/lib/channel.js:422:17)
    at Connection.mainAccept [as accept] (/Users/tetsuo.yamamoto/Desktop/amqp/node_modules/amqplib/lib/connection.js:64:33)
    at TLSSocket.go (/Users/tetsuo.yamamoto/Desktop/amqp/node_modules/amqplib/lib/connection.js:478:48)
    at TLSSocket.emit (node:events:527:28)
    at emitReadable_ (node:internal/streams/readable:578:12)
    at processTicksAndRejections (node:internal/process/task_queues:82:21)
Emitted 'error' event on ChannelModel instance at:
    at Connection.emit (node:events:527:28)
    at Connection.C.onSocketError (/Users/tetsuo.yamamoto/Desktop/amqp/node_modules/amqplib/lib/connection.js:353:10)
    at Connection.emit (node:events:527:28)
    at TLSSocket.go (/Users/tetsuo.yamamoto/Desktop/amqp/node_modules/amqplib/lib/connection.js:481:12)
    at TLSSocket.emit (node:events:527:28)
    at emitReadable_ (node:internal/streams/readable:578:12)
    at processTicksAndRejections (node:internal/process/task_queues:82:21) {
  code: 403,
  classId: 60,
  methodId: 40
}
```



```
/Users/tetsuo.yamamoto/Desktop/amqp/node_modules/amqplib/lib/channel.js:160
    throw new IllegalOperationError(msg, stack);
    ^
IllegalOperationError: Channel closed
    at Channel.<anonymous> (/Users/tetsuo.yamamoto/Desktop/amqp/node_modules/amqplib/lib/channel.js:160:11)
    at Channel.C.ack (/Users/tetsuo.yamamoto/Desktop/amqp/node_modules/amqplib/lib/channel_model.js:219:8)
    at Timeout._onTimeout (/Users/tetsuo.yamamoto/Desktop/amqp/src/consumer.js:18:21)
    at listOnTimeout (node:internal/timers:559:17)
    at processTimers (node:internal/timers:502:7) {
  stackAtStateChange: 'Stack capture: Connection closed: 320 (CONNECTION-FORCED) with message "CONNECTION_FORCED - Too many unacked messages (max 1000)"\n' +
    '    at Object.accept (/Users/tetsuo.yamamoto/Desktop/amqp/node_modules/amqplib/lib/connection.js:90:15)\n' +
    '    at Connection.mainAccept [as accept] (/Users/tetsuo.yamamoto/Desktop/amqp/node_modules/amqplib/lib/connection.js:64:33)\n' +
    '    at TLSSocket.go (/Users/tetsuo.yamamoto/Desktop/amqp/node_modules/amqplib/lib/connection.js:478:48)\n' +
    '    at TLSSocket.emit (node:events:527:28)\n' +
    '    at emitReadable_ (node:internal/streams/readable:578:12)\n' +
    '    at processTicksAndRejections (node:internal/process/task_queues:82:21)'
}
```
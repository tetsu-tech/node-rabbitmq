const { getChannel } = require('../common');

(async () => {
  const channel = await getChannel();

  const RCP_QUEUE_NAME = 'rpc_queue';
  // rpc_queueが存在することを確認
  channel.assertQueue(RCP_QUEUE_NAME, {
    durable: false
  });

  // 同時に処理するqueueは1つまでに限定
  channel.prefetch(1);
  console.log(' [x] Awaiting RPC requests');

  // rpc_queueをconsumeしておいてリクエストが来るのを待つ
  channel.consume(RCP_QUEUE_NAME, function (msg) {
    const num = parseInt(msg.content.toString());

    console.log(" [.] fib(%d)", num);

    // 計算を実行
    const result = fibonacci(num);

    // responseをcallback queueに返す
    channel.sendToQueue(
      msg.properties.replyTo,
      Buffer.from(result.toString()),
      {
        correlationId: msg.properties.correlationId
      }
    );

    channel.ack(msg);
  });
})();

const fibonacci = (n) => {
  if (n == 0 || n == 1) {
    return n;
  } else {
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
}

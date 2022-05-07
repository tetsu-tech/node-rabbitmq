const { getChannel } = require('../common');


const getVariablesFromArgs = () => {
  const args = process.argv.slice(2);

  if (args.length == 0) {
    console.log("Usage: rpc_client.js num");
    process.exit(1);
  }

  const num = parseInt(args[0]);

  return {
    num,
  }
}

(async () => {
  const channel = await getChannel();

  const RCP_QUEUE_NAME = 'rpc_queue';
  // rpc_queueが存在することを確認
  channel.assertQueue(RCP_QUEUE_NAME, {
    durable: false
  });
  
  // callback queueを取得
  const result = await channel.assertQueue('', {
    exclusive: true
  })

  const { num } = getVariablesFromArgs();
  
  // レスポンスを特定するためのcorrelationIdを作成
  const correlationId = generateUuid();

  // callback queueをconsumeしておいてresponseが返ってくるのを待つ
  channel.consume(result.queue, function (msg) {
    // correlationIdが同じ場合のみ処理する（それ以外の場合は無視）
    if (msg.properties.correlationId == correlationId) {
      console.log(' [.] Got %s', msg.content.toString());

      setTimeout(function() {
        channel.ack(msg);
        connection.close();
        process.exit(0)
      }, 500);
    }
  })

  // rpc_queueにリクエストを送信
  channel.sendToQueue(RCP_QUEUE_NAME,
    Buffer.from(num.toString()),
    {
      correlationId: correlationId,
      // callback queueの名前をreplyToに入れて送る
      replyTo: result.queue
    }
  );
})();

const generateUuid = () => {
  return Math.random().toString() +
    Math.random().toString() +
    Math.random().toString();
}

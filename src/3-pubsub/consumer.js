const { getChannel } = require('../common');

(async () => {
  const channel = await getChannel();

  const EXCHANGE_NAME = 'logs';
  channel.assertExchange(EXCHANGE_NAME, 'fanout', {
    durable: false
  });

  // temporary queueを取得
  const result = await channel.assertQueue('', {
    exclusive: true
  });

  console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", result.queue);

  // MEMO: queueとexchangeを紐づけるbindingを作成
  channel.bindQueue(result.queue, EXCHANGE_NAME, '');

  channel.consume(result.queue, function (msg) {
    if (msg.content) {
      console.log(" [x] %s", msg.content.toString());
    }
    channel.ack(msg);
  });
})();

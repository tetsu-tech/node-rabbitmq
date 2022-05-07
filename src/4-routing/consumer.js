const { getChannel } = require('../common');

const getFromArgs = () => {
  var args = process.argv.slice(2);

  if (args.length == 0) {
    console.log("Usage: receive_logs_direct.js [info] [warning] [error]");
    process.exit(1);
  }

  return args;
}
(async () => {
  console.log(' [*] Waiting for logs. To exit press CTRL+C');
  
  const channel = await getChannel();
  const EXCHANGE_NAME = 'direct_logs';

  // exchangeの存在を確認、なければ作る
  channel.assertExchange(EXCHANGE_NAME, 'direct', {
    durable: false
  });

  // queueを作成
  const result = await channel.assertQueue('', {
    exclusive: true
  });

  const args = getFromArgs();
  // serverityごとにqueueとexchangeを紐づけるbindingを作成
  args.forEach(function(severity) {
    channel.bindQueue(result.queue, EXCHANGE_NAME, severity);
  });

  //  queueのconsumeを開始
  channel.consume(result.queue, function (msg) {
    console.log('msg', msg)
    console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
    channel.ack(msg);
  });
})();

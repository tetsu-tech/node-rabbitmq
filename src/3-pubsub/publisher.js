const { getChannel } = require('../common');

const getFromArgs = () => {
  const msg = process.argv.slice(2).join(' ') || 'Hello World!';

  return {
    msg,
  }
}

(async () => {
  const channel = await getChannel()
  const { msg } = getFromArgs();

  const EXCHANGE_NAME = 'logs';
  // exchangeの存在を確認、なければ作る
  channel.assertExchange(EXCHANGE_NAME, 'fanout', {
    durable: false
  });

  // exchangeにmessageをpublish
  channel.publish(EXCHANGE_NAME, '', Buffer.from(msg));
  console.log(" [x] Sent %s", msg);

  // 500ms時間をおいてプログラムを終了
  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
})();

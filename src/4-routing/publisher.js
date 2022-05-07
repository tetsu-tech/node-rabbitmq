const { getChannel } = require('../common');

const getVariablesFromArgs = () => {
  const args = process.argv.slice(2);
  const msg = args.slice(1).join(' ') || 'Hello World!';
  const severity = (args.length > 0) ? args[0] : 'info';

  return {
    msg,
    severity,
  }
}

(async () => {
  const channel = await getChannel();
  const { msg, severity } = getVariablesFromArgs();
  const EXCHANGE_NAME = 'direct_logs';

  // exchangeの存在を確認、なければ作る
  channel.assertExchange(EXCHANGE_NAME, 'direct', {
    durable: false
  });

  // exchangeにmessageをpublishする
  channel.publish(EXCHANGE_NAME, severity, Buffer.from(msg));
  console.log(" [x] Sent %s: '%s'", severity, msg);

  // 500ms時間をおいてプログラムを終了
  setTimeout(function () {
    connection.close();
    process.exit(0)
  }, 500);
})();

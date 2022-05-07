const { getChannel } = require('../common');

(async () => {
  const channel = await getChannel();

  const queue = 'task_queue';
  const msg = process.argv.slice(2).join(' ') || "Hello World!";

  // This makes sure the queue is declared before attempting to consume from it
  channel.assertQueue(queue, {
    durable: true
  });

  // 100個Messageを送る
  new Array(100).fill(0).map((_, index) => index).forEach(e => {
    channel.sendToQueue(queue, Buffer.from(msg + e), {
      persistent: true
    });
  })

  console.log(" [x] Sent '%s'", msg);
})()

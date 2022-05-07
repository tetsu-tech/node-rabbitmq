const { getChannel } = require('../common');
const queue = 'task_queue';

(async () => {
	console.log('before connect')

	const channel = await getChannel();

	// This makes sure the queue is declared before attempting to consume from it
	channel.assertQueue(queue, {
		durable: true
	});

	// 1度に1つのMessageしかDispatchしないように（処理中は他のworkerにMessageを送信する）
	channel.prefetch(1);
	channel.consume(queue, function (msg) {
		console.log(" [x] Received %s", msg.content.toString());

		setTimeout(function () {
			console.log(" [x] Done");
			channel.ack(msg);
		}, 1 * 1000);
	});
})();

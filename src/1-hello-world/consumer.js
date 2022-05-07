const { getChannel } = require('../common');

(async () => {
	console.log('before connect')

	const channel = await getChannel();

	await channel.consume('user-messages', function (msg) {
		console.log('consume');
		console.log('.....');

		setTimeout(function () {
			// ackを返す
			channel.ack(msg)
			console.log("Message:", msg.content.toString());
		}, 4000);
	}
	);

	console.log('after connect')
})();

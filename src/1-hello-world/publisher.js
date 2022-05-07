const { getChannel } = require('../common');

(async () => {
	console.log('start')
	const channel = await getChannel();

	const reuslt = await channel.assertQueue("user-messages");

	// MEMO: assertQueue { queue: 'user-messages', messageCount: 5, consumerCount: 0 }
	console.log('assertQueue', reuslt)

	const data = {
		name: 'tetsu2',
		hobby: 'game',
		age: 25,
	};


	let status = true;
	while (status) {
		const result = await channel.sendToQueue(
			"user-messages",
			Buffer.from(
				JSON.stringify(data)
			),
		);
		console.log('published', result)
		status = result;
		await sleep(5);
	}

	console.log('end')
})()

const sleep = (time) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve()
		}, time)
	})
}

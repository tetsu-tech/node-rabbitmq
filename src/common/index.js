const getChannel = async () => {
  const CONN_URL = 'amqps://nrkscbaq:mmVTS_4A85fOU9eWHm7ZwWVliS_5JSnn@mustang.rmq.cloudamqp.com/nrkscbaq'
  const connection = await amqp.connect(CONN_URL);
  const channel = await connection.createChannel();

  return channel;
}

module.exports = {
  getChannel
}

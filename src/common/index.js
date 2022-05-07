const getChannel = async () => {
  const CONN_URL = '書き換える'
  const connection = await amqp.connect(CONN_URL);
  const channel = await connection.createChannel();

  return channel;
}

module.exports = {
  getChannel
}

module.exports = function(type, time, timestamp, aws) {

  var docClient = new aws.DynamoDB.DocumentClient();
  var table = 'log30';

  console.log(type, time, timestamp);

  var params = {
    TableName: table,
    Item: {
      "type": type,
      "time": time,
      "timestamp": timestamp
    }
  };

  docClient.put(params, function(err, data) {
    if (err)
      console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
  });
}

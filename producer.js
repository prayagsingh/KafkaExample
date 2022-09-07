const {Kafka} = require("kafkajs");
const doQuery = require("./query");

// 0 is nodejs application
// 1 is the file 
// 2 is the args that we pass
//const msg = process.argv[2];

run();

async function run() {
    try {

        // create a kafka object
        const kafka = new Kafka({
            "clientId" : "myapp", //tell client what is your client app for uniquely identifing the client
            "brokers" : ["localhost:9092"], //we can mention multiple broker
        })

        // creating producer object and connecting it to kafka broker
        const producer = kafka.producer();
        console.log("connecting ...");
        await producer.connect();
        console.log("connected ...");

        //const queryResponse = await doQuery();
        
        //console.log("query Response is: ", JSON.stringify(queryResponse.data, 2, ' '));
        //console.log(Object.keys(queryResponse.data)[0]);
        //msg = Object.keys(queryResponse.data)[0];
        // A-M its Partition 0 and N-Z its Partition 1
        // taking first letter of the args and is its less than then Partition 0 else Parition 1
        // let partition;
        // if (msg = "requesters") {
        //     partition = 0;
        // } else if (msg = "creators") {
        //     partition = 1;
        // } else if (msg = "appointments") {
        //     partition = 2;
        // } else if (msg = "ratings") {
        //     partition = 3;
        // }
        //const partition = msg[0] < "N" ? 0 : 1;
        // const result = await producer.send({
        //     "topic" : "Users",
        //     "messages" : [{
        //         "value" : msg,
        //         "partition" : partition
        //     }]
        // });
        //const message = JSON.stringify(queryResponse.data, 2, ' ');
        
        const result = await producer.send({
            "topic" : "Users",
            "messages" : [{
                "value" : JSON.stringify((await doQuery()).data),
                "partition" : 0
            }]
        });
        
        console.log(`Producer sent the data successfully and the response is: ${JSON.stringify(result)}`);
        //await producer.disconnect();
    }
    catch(ex) {
        console.error(`some thing bad happened ${ex}`);
    }

    finally {
        //process.exit(0);
    }
}
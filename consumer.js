const {Kafka} = require("kafkajs");

run();

async function run() {
    try {

        // create a kafka object
        const kafka = new Kafka({
            "clientId" : "myapp", //tell client what is your client app for uniquely identifing the client
            "brokers" : ["localhost:9092"], //we can mention multiple broker
        })

        // creating consumer object and connecting it to kafka broker
        const consumer = kafka.consumer({
            "groupId" : "test"
        });
        console.log("connecting ...");
        await consumer.connect();
        console.log("connected ...");

        await consumer.subscribe({
            "topic" : "Users",
            "fromBeginning" : true, // set it to false if you want to read the latest data only
        });

        // keep it running and pulled the data continously
        await consumer.run({
            "eachMessage" : async result => {
                console.log(`Received message: ${result.message.value} on partition: ${result.partition}`);
                //console.log(`Received Partition: ${result.partition}`);
                //console.log(`Received Topic: ${result.topic}`);
                //console.log(`Received Heartbeat: ${result.heartbeat.name}`);
            }
        })

    }
    catch(ex) {
        console.error(`some thing bad happened ${ex}`);
    }

    finally {}
}
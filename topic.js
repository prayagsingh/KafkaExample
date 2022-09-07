const {Kafka} = require("kafkajs");

run();

async function run() {
    try {

        // create a kafka object
        const kafka = new Kafka({
            "clientId" : "myapp", //tell client what is your client app for uniquely identifing the client
            "brokers" : ["localhost:9092"], //we can mention multiple broker
        })

        // creating admin object and connecting it to kafka broker
        const admin = kafka.admin(); // require admin interface to create the topics
        console.log("connecting ...");
        await admin.connect();
        console.log("connected ...");

        // create topics
        console.log("Creating topics ...");
        await admin.createTopics({
            "topics" : [{
                "topic" : "Events",
                "numPartitions" : 3, // OrderBook, Margin, ProtocolVault
            }]
        })

        console.log("Topics created successfully ...");
        await admin.disconnect();
    }
    catch(ex) {
        console.error(`some thing bad happened ${ex}`);
    }

    finally {
        process.exit(0);
    }
}
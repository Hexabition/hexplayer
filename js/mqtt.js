class MqttHandler {
    constructor(hostname, port, config) {
        this.topic = `/tablet/${config.id}`
        this.client = new Paho.MQTT.Client(hostname, port, config.id);
        this.client.onConnectionLost = this.onConnectionLost;
        this.client.onMessageArrived = this.onMessageArrived;
    }
    connect() {
        console.log('MQTT: Connecting ...')
        this.client.connect({
            reconnect: true,
            invocationContext: this,
            onSuccess(ctx) {
                console.log('MQTT: Connected')
                ctx.invocationContext.client.subscribe(ctx.invocationContext.topic)
            },
            onFailure(ctx, errorCode, errorMessage) {
                console.log(`MQTT: [${errorCode}] Error: ${errorMessage}`)
            }
        })
    }
    onConnectionLost(res) {
        if (res.errorCode !== 0) {
            console.log(`MQTT: Connection Lost: ${res.errorMessage}`)
            console.log('MQTT: Reconnecting ... ')
        }
    }
    onMessageArrived(message) {
        console.log(`MQTT: Message: ${message.payloadString}`);
    }
    publishPlaying(playing){
        let payload = playing ? 'PLAYING' : 'STOPPED'
        this.client.publish(this.topic, payload, 0, true)
    }
}
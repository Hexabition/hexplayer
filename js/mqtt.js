class MqttHandler {
    constructor(config) {
        this.config = config
        if (config.people) {
            this.topic = `/hexabition/cell/${config.id}`
        } else if (config.animation) {
            this.topic = `/hexabition/animation`
        }
        console.log(this.topic)
        this.client = new Paho.MQTT.Client(config.mqtt.hostname, config.mqtt.port, '/', config.mqtt.id.toString());
        this.client.onConnectionLost = this.onConnectionLost;
        this.client.onMessageArrived = this.onMessageArrived;
        this.client.disconnectedPublishing = true;
        this.playing = false;
        this.connected = false;
    }
    connect(success) {
        console.log('MQTT: Connecting ...')
        this.client.connect({
            reconnect: true,
            invocationContext: this,
            onSuccess(ctx) {
                console.log('MQTT: Connected');
                ctx.invocationContext.client.subscribe(ctx.invocationContext.topic);
                ctx.invocationContext.connected = true;
                ctx.invocationContext.onPlaying(ctx.invocationContext.playing);
                success();
            },
            onFailure(ctx, errorCode, errorMessage) {
                console.log(`MQTT: [${errorCode}] Error: ${errorMessage}`)
            }
        })
    }
    onConnectionLost(res) {
        if (res.errorCode !== 0) {
            this.connected = false;
            console.log(`MQTT: Connection Lost: ${res.errorMessage}`)
            console.log('MQTT: Reconnecting ... ')
        }
    }
    onMessageArrived(message) {
        console.log(`MQTT: Message Incoming: ${message.payloadString}`);
        if (config.animation) {
            if (message.payloadString == 'SYNC') {
                controller.syncAnimation();
            }
        }
    }
    onPlaying(playing){
        if (config.animation) { return }
        this.playing = playing;
        if(!this.connected) { 
            console.log(`MQTT: Message Error: Client not Connected!`);
            return
        }
        let payload = playing ? '#00FF': '#FF00';
        console.log(`MQTT: Message Outgoing: ${payload}`);
        let message = new Paho.MQTT.Message(payload);
        message.destinationName = this.topic;
        this.client.publish(message)
    }
}
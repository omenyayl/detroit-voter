const URL = "ws://34.194.119.38:8000/votes/1";

export default class VoterSocketService {

    constructor (onOpen, onMessage) {
        this.ws = new WebSocket(URL);
        console.log(onOpen);
        this.ws.onopen = onOpen;
        this.ws.onmessage = onMessage;
    }

    sendAction(action) {
        let msg = JSON.stringify({
            action
        });
        console.log(`msg: ${msg}`);

        this.ws.send(msg);
    }

    disconnect() {
        this.ws.close();
    }

}

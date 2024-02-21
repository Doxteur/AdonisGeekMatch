// app/Services/Ws.ts
import { Server } from 'socket.io';
import AdonisServer from '@ioc:Adonis/Core/Server';

console.log('on passe dans ws');

class Ws {
    public io: Server;
    private booted = false;

    public boot() {
        console.log('on passe dans ws boot');
        if (this.booted) {
            return;
        }
        this.booted = true;
        this.io = new Server(AdonisServer.instance!, {
            cors: {
                origin: '*',
            },
        });
    }
}

export default new Ws();

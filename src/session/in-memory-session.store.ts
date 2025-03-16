import { Store } from 'express-session';

export class InMemorySessionStore extends Store {
    private sessions: Map<string, string> = new Map();

    constructor() {
        super();
    }

    get(sid: string, callback: (err: any, session?: any | null) => void): void {
        console.log(`Getting session for SID: ${sid}`);
        console.log('Current Sessions:', this.sessions);
        const session = this.sessions.get(sid);
        if (session) {
            callback(null, JSON.parse(session));
        } else {
            callback(null, null);
        }
    }

    set(sid: string, session: any, callback?: (err?: any) => void): void {
        this.sessions.set(sid, JSON.stringify(session));
        console.log(`Session set for SID: ${sid}`);
        console.log('Current Sessions:', this.sessions);
        callback && callback(null);
    }

    destroy(sid: string, callback?: (err?: any) => void): void {
        this.sessions.delete(sid);
        callback && callback(null);
    }
}

import * as Y from 'yjs'
import { SupabaseClient } from '@supabase/supabase-js'
import { RealtimeChannel } from '@supabase/realtime-js'
import { Observable } from 'lib0/observable'

export interface SupabaseProviderOptions {
    client: SupabaseClient
}

export class SupabaseProvider extends Observable<string> {
    private supabase: SupabaseClient
    private roomName: string
    private doc: Y.Doc
    private channel: RealtimeChannel | null = null

    constructor(roomName: string, yDoc: Y.Doc, options: SupabaseProviderOptions) {
        super()
        this.roomName = roomName
        this.supabase = options.client
        this.doc = yDoc

        this.connect()
    }
    
    async connect() {
        this.channel = this.supabase.channel(`room:${this.roomName}`)
    }

    async disconnect() {
        this.channel?.unsubscribe()
    }

    destory () {
        if(this.channel) {
            this.disconnect()
        }
    }
}


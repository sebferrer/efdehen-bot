import 'reflect-metadata';
import { Injectable } from 'injection-js';
import { catchError, map, Observable, of } from 'rxjs';
import { IChannel } from '../models/channel.model';
import * as CHANNELS_JSON from './channels-static.json';

const CHANNELS: IChannel[] = (CHANNELS_JSON as any).default;

@Injectable()
export class ChannelsService {

    constructor(
        // private readonly http: HttpClient,
        // private readonly dbContext: DbContext
    ) { }

    public getAllChannels(): Observable<IChannel[]> {
        return of(CHANNELS).pipe(
            catchError(() => of(null))
        );
    }

    public getChannel(key: string): Observable<IChannel> {
        return this.getAllChannels().pipe(
            map(channels => channels.find(channel => channel.key === key))
        ).pipe(
            catchError(() => of(null))
        );
    }

    public getChannels(keys: string[]): Observable<IChannel[]> {
        return this.getAllChannels().pipe(
            map(channels => channels.filter(channel => keys.includes(channel.key)))
        ).pipe(
            catchError(() => of(null))
        );
    }
}

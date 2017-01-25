import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MetadataService {
    constructor(private http: Http) { }

    getComponents(): {} {
        this.http.post('/test', null);
        return {
            "button": {
                "name": "Button",
                "properties": {
                    "text": { "type": "text" },
                    "url": { "type": "text" }
                }
            }
        };
    }
}

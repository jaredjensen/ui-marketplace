import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ContentService {
    constructor(private http: Http) { }

    getContent(): {} {
        this.http.post('/test', null);
        return {
            "button1": {
                "text": "Google",
                "url": "http://www.google.com"
            }
        };
    }

    getManifest(): any[] {
        return [{
            "layout": "full",
            "sections": [{
                "components": [{
                    "name": "button",
                    "content": "button1"
                }]
            }]
        }];
    }
}

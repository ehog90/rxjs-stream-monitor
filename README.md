# RxJS Stream Monitor
## Simple utility to monitor the status of an observable

### Requirements

rxjs 5+

### Install.

```bash
npm install rxjs-stream-monitor --save

```

### How to use.

Propably you are familiar with this pattern in Angular if you are querying for some data

```typescript

public class SomeComponent {
    // ...

    public loadSomeData() {
       this.isDataLoading = true;
       this.dataQueryError = null;
       this.data = null;
       
       this.httpDataService.querySomeData()
          .subscribe(response => {
             this.data = response;
             this.isDataLoading = false;
          }, 
          error => {
             this.dataQueryError = error;
             this.isDataLoading = false;
          });
    }
}

```

With this library, you can simplify the status monitoring like this:

```typescript

import { createMonitor, monitor } from "rxjs-stream-monitor";

public class SomeComponent {
    // ...
    public queryMonitor = createMonitor();

    public loadSomeData() {
       this.httpDataService.querySomeData()
          .pipe(monitor(this.queryMonitor))
          .subscribe(response => {
             this.data = response;
          })
    }
}

```

### Example of status binding in Angular.

In the Angular template, you can bind the status to loading indicators like this: 


```html
<div class="loading" *ngIf="queryMonitor.isActive"></div>
<div class="error" *ngIf="queryMonitor.isEr">Error: {{queryMonitor.error}}</div>

```

Even you can get the number of messages received if you are piping it to an infinit observable / observable with multiple values:


```html
<div class="message-count">Messages Received: {{queryMonitor.pumps}}</div>
```

### You can also use this library for handling status of Promises.

This is useful when you are mixing Promises and Observables.

```typescript

import { createMonitor, monitorPromise } from "rxjs-stream-monitor";

public class SomeComponent {
    // ...
    public queryMonitor = createMonitor();

    public async loadSomeData() {
       const query: Promise<any> = this.httpDataService.querySomeDataUsingPromiseApi();
       const result = await monitorPromise(this.queryMonitor, query);
    }
}
```
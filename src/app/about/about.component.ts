import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, ObservableInput, concat, fromEvent, interval, merge, noop, of, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // const interval$ = interval(1000);

    // interval$.subscribe(val=>console.log("Stream: " + val));

    // const timer$ = timer(3000,1000);

    // const sub = timer$.subscribe(val=>console.log("Stream 2 => " + val),
    //                              err=>console.log(err),
    //                              ()=>console.log("completed!"));

    // setTimeout(()=>{sub.unsubscribe();console.log("completed!");},5000)

    // const click$ = fromEvent(document,"click");

    // click$.subscribe(
    //   evt=>console.log(evt),
    //   err=>console.log(err),
    //   ()=>console.log("click completed!"));

    // const source1$ = of(1,2,3);
    // const source2$ = of(4,5,6);
    // const source3$ = of(7,8,9);

    // const result$ = concat(source1$,source2$,source3$);

    // result$.subscribe(val=>console.log(val));

    // const interval1$ = interval(1000);
    // const interval2$ = interval1$
    // .pipe(
    //   map(val=>10*val)
    // )
    // const result1$ = merge(interval1$,interval2$);

    // result1$.subscribe(val=>console.log(val))

    // const interval1$ = interval(1000);
    // const sub = interval1$.subscribe(console.log);

    // setTimeout(()=>{
    //   sub.unsubscribe()
    // },5000)

    const http$ = createHttpObservable('api/courses');
    const sub = http$.subscribe(console.log);
    setTimeout(()=>sub.unsubscribe(),0);

  }

}

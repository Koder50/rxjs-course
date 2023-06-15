import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {from, interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, concat, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap, withLatestFrom} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';
import { Store } from '../common/store.service';
import { HttpClient } from '@angular/common/http';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnerCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;

    courses$: Observable<Course[]>;

    constructor(private store: Store) {

    }

    ngOnInit() {

        // const http$ = createHttpObservable('/api/courses');

        // const courses$: Observable<Course[]> = http$
        //     .pipe(
        //         tap(() => console.log("HTTP request executed")),
        //         map(res => Object.values(res["payload"]) ),
        //         shareReplay(),
        //         retryWhen(errors =>
        //             errors.pipe(
        //             delayWhen(() => timer(2000)
        //             )
        //         ) )
        //     );

        // this.beginnerCourses$ = courses$
        //     .pipe(
        //         map(courses => courses
        //             .filter(course => course.category == 'BEGINNER'))
        //     );

        // this.advancedCourses$ = courses$
        //     .pipe(
        //         map(courses => courses
        //             .filter(course => course.category == 'ADVANCED'))
        //     );



        // const courses$ = this.store.courses$;

        // this.beginnerCourses$ = this.store.selectBeginnerCourses();

        // this.advancedCourses$ = this.store.selectAdvancedCourses();

        // const http$ = from(fetch('api/courses').then(response => {

        //     if (response.ok) {
        //         return response.json();
        //     }
        //     else console.log("Request not successful");
        // }));
        // const courses$: Observable<Course[]> = http$
        // .pipe(
        //     tap(val=>console.log(val)),
        //     map(res=>Object.values(res["payload"])),
        //     tap(console.log),
        //     shareReplay()
        // )
        // courses$.subscribe(courses=>console.log("All courses: ",courses));




        // let url: string = 'api/courses';

        // const http$ = from(fetch(url)
        // .then(response=>{
        //     if(response.ok) {
        //         return response.json()
        //     }else console.error("In request" + url +", there is an error")
        // } 
        // ))

        // const courses$: Observable<Course[]> = http$
        // .pipe(
        //     map(courses=>courses["payload"])
        // )
        // // courses$ 
        // // .subscribe(val=>console.log("All courses: ",val));

        // this.beginnerCourses$ = courses$
        // .pipe(
        //     map(courses=>
        //         courses.filter(val=>val.category=="BEGINNER")
        //     )
            
        // )    

        // this.beginnerCourses$ 
        // .subscribe(val=>console.log("All courses: ",val));

        // this.advancedCourses$ = courses$
        // .pipe(
        //     map(courses=>
        //         courses.filter(val=>val.category=="ADVANCED")
        //     )
            
        // )    

        const url: string = "api/courses";

        const http$ = from(fetch(url)
        .then(response=>{
            if(response.ok) {
                return response.json()
            }
            else console.error("An error occured!")
        }))

        this.courses$=http$
        .pipe(
            map(courses=>courses["payload"])
        )

        this.beginnerCourses$ = this.filterCoursesByCategory("BEGINNER");

        this.advancedCourses$ = this.filterCoursesByCategory("ADVANCED");
        
    }

    filterCoursesByCategory(category: string) {
        return this.courses$
        .pipe(
            map(courses=>
                courses.filter(courses=>courses.category==category)),
                shareReplay()
                
        )
    }

}

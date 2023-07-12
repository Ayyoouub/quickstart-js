/**
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Firestore, doc, docData, } from '@angular/fire/firestore';
import { Restaurant } from '../restaurant-card/restaurant';

@Component({
  selector: 'app-restuarant-page',
  templateUrl: './restuarant-page.component.html',
  styleUrls: ['./restuarant-page.component.css']
})
export class RestuarantPageComponent implements OnInit {
  restaurantID: string = "";
  restaurantData: Observable<Restaurant> = new Observable();
  constructor(private route: ActivatedRoute, private firestore: Firestore = Inject(Firestore)) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.restaurantID = id;
    const docRef = doc(this.firestore, `restaurants/${id}`);

    this.restaurantData = docData(docRef, { idField: "id" }) as Observable<Restaurant>;
    console.log(this.restaurantData)
  }
}

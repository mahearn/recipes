import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';

import { DataStorageService } from './shared/data-storage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

    constructor(private dataStorageService: DataStorageService) {}

    onSaveData() {
        this.dataStorageService.storeRecipes()
            .subscribe(
                (response: Response) => {
                    alert('Data saved successfully!');
                },
                (error) => {
                    alert('Error saving data: ' + error);
                }
            );
    }

    onGetData() {
        this.dataStorageService.getRecipes();
    }

    ngOnInit() {

    }

    ngOnDestroy() {

    }

}

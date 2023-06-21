import { Component } from '@angular/core';
import { data } from './../assets/data';

interface Item {
  label1: string;
  label2: string;
  metric1: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  uniqueLabel1Values: any;
  dropdownLoadTime: any;
  displayTimeDifference: any;
  filteredData: Item[] = [];
  constructor() {
    this.dropdownLoadTime = new Date();
    this.loadUniqueLabel1Values();
  }

  selectedLabel1: any;
  sortedData: Item[] = [];
  items: Item[] = data;

  loadUniqueLabel1Values(): void {
    const label1Set = new Set<string>();
    this.items.forEach((item) => {
      label1Set.add(item.label1);
    });
    this.uniqueLabel1Values = Array.from(label1Set);
    this.calculateTimeDifference();
  }

  filterAndSortData(): void {
    if (this.selectedLabel1) {
      this.filteredData = this.items
        .filter((item) => item.label1 === this.selectedLabel1)
        .sort((a, b) => Math.abs(b.metric1) - Math.abs(a.metric1))
        .slice(0, 12);
    } else {
      this.filteredData = this.items
        .sort((a, b) => Math.abs(b.metric1) - Math.abs(a.metric1))
        .slice(0, 12);
    }
    console.log(this.filteredData);
  }

  calculateTimeDifference(): void {
    console.log(this.dropdownLoadTime);
    if (this.dropdownLoadTime) {
      const currentTime = new Date();
      const timeDifference =
        currentTime.getTime() - this.dropdownLoadTime.getTime();
      this.displayTimeDifference = timeDifference;
      console.log(timeDifference);
    }
  }
}

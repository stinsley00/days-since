import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drama-tracker',
  templateUrl: './drama-tracker.component.html',
  styleUrls: ['./drama-tracker.component.scss']
})
export class DramaTrackerComponent implements OnInit {
  lastResetDate: Date | null = null;
  resetHistory: string[] = [];
  timeSinceLastDrama: { years: number, days: number, hours: number, minutes: number, seconds: number } = {
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  ngOnInit(): void {
    this.loadLastResetDate();
    this.loadResetHistory();
    this.updateTimeSinceLastDrama();
    setInterval(() => this.updateTimeSinceLastDrama(), 1000); // Update every second
  }

  resetCounter(): void {
    this.lastResetDate = new Date();
    this.resetHistory.push(this.lastResetDate.toLocaleString());
    this.saveLastResetDate();
    this.saveResetHistory();
    this.updateTimeSinceLastDrama();
  }

  updateTimeSinceLastDrama(): void {
    if (this.lastResetDate) {
      const now = new Date();
      let diffTime = Math.abs(now.getTime() - this.lastResetDate.getTime());

      const seconds = Math.floor((diffTime / 1000) % 60);
      const minutes = Math.floor((diffTime / (1000 * 60)) % 60);
      const hours = Math.floor((diffTime / (1000 * 60 * 60)) % 24);
      const days = Math.floor((diffTime / (1000 * 60 * 60 * 24)) % 365);
      const years = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));

      this.timeSinceLastDrama = { years, days, hours, minutes, seconds };
    } else {
      this.timeSinceLastDrama = { years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  }

  saveLastResetDate(): void {
    if (this.lastResetDate) {
      localStorage.setItem('lastResetDate', this.lastResetDate.toISOString());
    }
  }

  loadLastResetDate(): void {
    const savedDate = localStorage.getItem('lastResetDate');
    if (savedDate) {
      this.lastResetDate = new Date(savedDate);
    }
  }

  saveResetHistory(): void {
    localStorage.setItem('resetHistory', JSON.stringify(this.resetHistory));
  }

  loadResetHistory(): void {
    const savedHistory = localStorage.getItem('resetHistory');
    if (savedHistory) {
      this.resetHistory = JSON.parse(savedHistory);
    }
  }
}

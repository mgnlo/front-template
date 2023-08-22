import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  static instance: ConfigService;
  private config: any;

  constructor() {
    if (!ConfigService.instance) {
      ConfigService.instance = this;
    }
    return ConfigService.instance;
  }

  public loadConfig() {
    return fetch('./assets/config.json')
      .then(response => response.json())
      .then(config => {
        console.log(config);
        this.config = config;
      })
      .catch((err: any) => {
        console.error(err);
      });
  }

  getConfig() {
    return this.config;
  }

  static getInstance() {
    if (ConfigService.instance) {
      return ConfigService.instance;
    }

    ConfigService.instance = new ConfigService();
    return ConfigService.instance;
  }
}
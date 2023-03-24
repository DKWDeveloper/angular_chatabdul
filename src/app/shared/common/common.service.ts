import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  /**
   * This function used to set selected language to local storage.
   * @param language 
   */
  setSelectedLanguage(language: string) {
    localStorage.setItem('selectedLanguage', language);
  }

  /**
   * This function used to get selected language.
   */
  getSelectedLanguage(): any {
    return localStorage.getItem('selectedLanguage');
  }

  
}

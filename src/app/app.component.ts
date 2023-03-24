import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs';
import { AppService } from './app.service';
import { ChatRequest } from './chatRequest';
import { ChatResponse } from './chatResponse';
import { CommonService } from './shared/common/common.service';
import { IConstants } from './shared/IConstants';

import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'chatabdul';
  buttonText = IConstants.ASK_ABDUL_EN;
  chatResp?: ChatResponse;
  browserLang: any = 'ENGLISH';
  chatReq = new ChatRequest();
  loader: boolean = false;
  requiredText: boolean = false;
  showCopy: boolean = false;
  disableSearchButton: boolean = false;
  selectedLanguage: string = 'ENGLISH';
  language = ['English', 'Hindi', 'ARABIC']
  arabicLang: boolean = false;

  @ViewChild('responseBox')
  scrollContainer!: ElementRef;

  constructor(
    public translate: TranslateService,
    public title1: Title,
    public appService: AppService,
    private commonService: CommonService
  ) {
  }

  ngOnInit(): void {
    this.translate.addLangs(['English', 'Hindi', 'ARABIC']);
    this.selectedLanguage = this.commonService.getSelectedLanguage() ? this.commonService.getSelectedLanguage() : 'ENGLISH';
    if (this.commonService.getSelectedLanguage()) {
      this.translate.use(this.commonService.getSelectedLanguage());
    } else {
      this.translate.setDefaultLang('ENGLISH');
      this.translate.use('ENGLISH');
    }
    if (this.commonService.getSelectedLanguage() === 'ARABIC') {
      this.arabicLang = true;
    }
  }

  /**
   * to get abdul response.
   */
  getChat(): void {
    let ele = document.getElementById('questionBox');
    if (!this.chatReq.text) {
      this.requiredText = true;
    } else {
      this.requiredText = false;
      this.loader = true;
      this.disableSearchButton = true;
      this.setButtonText();
      this.appService.getChatResponse(this.chatReq, this.browserLang)
        .subscribe(data => {
          if (this.browserLang === 'ENGLISH') {
            this.buttonText = IConstants.ASK_ABDUL_EN;
          } else {
            this.buttonText = IConstants.ASK_ABDUL_HIN;
          }
          this.loader = false;
          this.disableSearchButton = false;
          this.chatResp = data;
        }, (error) => {
          this.loader = false;
          this.disableSearchButton = false;
          if (this.browserLang === 'ENGLISH') {
            this.buttonText = IConstants.ASK_ABDUL_EN;
            this.chatResp = { data: IConstants.ABDUL_NOT_AVAILABLE_EN };
          } else {
            this.buttonText = IConstants.ASK_ABDUL_HIN;
            this.chatResp = { data: IConstants.ABDUL_NOT_AVAILABLE_HIN };
          }

        })
    }
  }

  setButtonText() {
    if (this.browserLang === 'ENGLISH') {
      this.buttonText = IConstants.ABDUL_THINKING_EN;
    } else {
      this.buttonText = IConstants.ABDUL_THINKING_HIN;
    }

  }

  /**
   * To get response if any given common query selected.
   * @param event
   */
  commonQuery(event: any) {
    this.chatReq.text = event.target.innerText;
    this.getChat()
  }

  /**
   * show copy icon on response box hover
   */
  mouseHovering() {
    this.showCopy = true;
  }

  /**
   * hide copy icon on response box hover
   */
  mouseLeft() {
    this.showCopy = false;
  }

  /**
   * To copy Text from Textbox
   */
  copyAbdulResponse(val: any): void {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val.innerText;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  /**
   * This function used to when user change the language from the dropdown.
   * @param value
   */
  onChangeLanguage(value: any): void {
    this.commonService.setSelectedLanguage(value);
    if (value === 'ARABIC') {
      this.arabicLang = true;
    } else {
      this.arabicLang = false;
      this.translate.use(value);
      this.browserLang = value;
      if (this.browserLang === 'ENGLISH') {
        this.buttonText = IConstants.ASK_ABDUL_EN;
      } else {
        this.buttonText = IConstants.ASK_ABDUL_HIN;
      }
    }
  }


/**This life cycle does scroll automatically down */
  ngAfterViewChecked() {
    if (this.scrollContainer && this.scrollContainer.nativeElement) {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }

  }
}

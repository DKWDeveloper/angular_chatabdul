import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/app.service';
import { ChatRequest } from 'src/app/chatRequest';
import { ChatResponse } from 'src/app/chatResponse';
import { CommonService } from '../common/common.service';

@Component({
  selector: 'app-arabic-lang-template',
  templateUrl: './arabic-lang-template.component.html',
  styleUrls: ['./arabic-lang-template.component.css']
})
export class ArabicLangTemplateComponent {
  title = 'chatabdul';
  buttonText = 'اسأل عبدال';
  chatResp?: ChatResponse;
  browserLang: any = 'en';
  chatReq = new ChatRequest();
  loader: boolean = false;
  requiredText: boolean = false;
  showCopy: boolean = false;
  disableSearchButton: boolean = false;
  selectedLanguage: string = 'en';
  language = ['English', 'Hindi', 'ARABIC']

  constructor(
    public translate: TranslateService,
    public title1: Title,
    public appService: AppService,
    private commonService: CommonService
    // private route: ActivatedRoute
    ) {
      // this.route.params.pipe(first()).subscribe(param => {
      //   console.log("param", param)
      // })
  }

  ngOnInit(): void {
    this.translate.addLangs(['English', 'Hindi', 'ARABIC']);
    this.translate.setDefaultLang('ARABIC');
    this.translate.use('ARABIC');
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
      this.buttonText = 'عبدال يفكر';
      this.appService.getChatResponse(this.chatReq, this.browserLang)
        .subscribe(data => {
          this.buttonText = 'اسأل عبدال';
          this.loader = false;
          this.disableSearchButton = false;
          this.chatResp = data;
        }, (error) => {
          this.loader = false;
          this.disableSearchButton = false;
          this.buttonText = 'اسأل عبدال';
          this.chatResp = { data: 'حاليا عبدال غير متوفر. يرجى المحاولة لاحقا'};

        })
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
}

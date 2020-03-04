import { Component, Input } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(public translate: TranslateService) {
    translate.addLangs(["en", "sv", "nl"]);
    const browserLang = translate.getBrowserLang();
    let defaultLanguage;
    if (translate.getLangs().indexOf(browserLang) >= 0) {
      defaultLanguage = browserLang;
    } else {
      defaultLanguage = "en";
    }
    translate.setDefaultLang(defaultLanguage);
    translate.use(defaultLanguage);
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}

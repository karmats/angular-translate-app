import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "angular-translate-app";

  constructor(public translate: TranslateService) {
    translate.addLangs(["en", "sv", "nl"]);
    translate.setDefaultLang("en");
    console.log(translate.getLangs());
  }

  switchLang(lang: string) {
    console.log("Using", lang);
    this.translate.use(lang);
  }
}

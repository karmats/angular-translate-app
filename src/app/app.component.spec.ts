import { TestBed, async } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { AppComponent } from "./app.component";
import {
  TranslateModule,
  TranslateLoader,
  TranslateService
} from "@ngx-translate/core";
import { httpLoaderFactory } from "./app.module";
import { HttpClient } from "@angular/common/http";

const TRANSLATIONS_EN = require("../assets/i18n/en.json");
const TRANSLATIONS_SV = require("../assets/i18n/sv.json");

describe("AppComponent", () => {
  let translate: TranslateService;
  let http: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: httpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      providers: [TranslateService]
    }).compileComponents();

    translate = TestBed.get(TranslateService);
    http = TestBed.get(HttpTestingController);
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it("should load translations", async(() => {
    spyOn(translate, "getBrowserLang").and.returnValue("en");
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.debugElement.nativeElement;

    // the DOM should be empty for now since the translations haven't been rendered yet
    expect(compiled.querySelector("a").textContent).toEqual("");

    http.expectOne("/assets/i18n/en.json").flush(TRANSLATIONS_EN);
    http.expectNone("/assets/i18n/sv.json");

    // Finally, assert that there are no outstanding requests.
    http.verify();

    fixture.detectChanges();
    // the content should be translated to english now
    expect(compiled.querySelector("a").textContent.trim()).toEqual(
      TRANSLATIONS_EN.Sitetitle
    );

    translate.use("sv");
    http.expectOne("/assets/i18n/sv.json").flush(TRANSLATIONS_SV);

    // Finally, assert that there are no outstanding requests.
    http.verify();

    // the content has not changed yet
    expect(compiled.querySelector("a").textContent.trim()).toEqual(
      TRANSLATIONS_EN.Sitetitle
    );

    fixture.detectChanges();
    // the content should be translated to french now
    expect(compiled.querySelector("a").textContent.trim()).toEqual(
      TRANSLATIONS_SV.Sitetitle
    );
  }));
});

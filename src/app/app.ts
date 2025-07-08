import { Component, OnInit } from '@angular/core';
import { Model } from "survey-core";
import { surveyJson } from "../json"
import { SurveyModule } from "survey-angular-ui";
import { LayeredDarkPanelless } from "survey-core/themes";


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['../styles.css'],
  standalone: true,
  imports: [ SurveyModule ],
})
export class AppComponent implements OnInit {
  title = 'My First';
  surveyModel!: Model;
  ngOnInit() {
    const survey = new Model(surveyJson);
    survey.applyTheme(LayeredDarkPanelless);
    this.surveyModel = survey;
  }
}
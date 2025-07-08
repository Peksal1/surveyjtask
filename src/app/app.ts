import { Component, OnInit } from '@angular/core';
import { Model, FunctionFactory } from "survey-core";
import { surveyJson } from "../json";
import { SurveyModule } from "survey-angular-ui";
import { LayeredDarkPanelless } from "survey-core/themes";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['../styles.css'],
  standalone: true,
  imports: [SurveyModule],
})
export class AppComponent implements OnInit {
  title = 'Project Budget Tracker';
  surveyModel!: Model;

  ngOnInit() {
    // Register custom functions before creating the survey model
    this.registerCustomFunctions();

    const survey = new Model(surveyJson);
    survey.applyTheme(LayeredDarkPanelless);
    survey.showCompleteButton = false;

    let addBtn: HTMLElement | null = null;

    survey.onAfterRenderQuestion.add((_, options) => {
      if (options.question.name === "form_actions_row") {
        const clearBtnEl = options.htmlElement.querySelector("#clearFormBtn");
        const addBtnEl = options.htmlElement.querySelector("#addEntryBtn");

        if (clearBtnEl instanceof HTMLElement) {
          clearBtnEl.addEventListener("click", () => this.handleClearForm(survey));
        }

        if (addBtnEl instanceof HTMLElement) {
          addBtn = addBtnEl;
          addBtn.addEventListener("click", () => this.handleAddEntry(survey));
        }

        this.updateAddButtonVisibility(survey, addBtn);
      }
    });

    survey.onValueChanged.add(() => {
      this.updateAddButtonVisibility(survey, addBtn);
    });

    this.surveyModel = survey;
  }

  private registerCustomFunctions() {
    // Function to sum amounts for a specific project
    FunctionFactory.Instance.register("projectSum", (params: any[]) => {
      if (!params || params.length < 2) return 0;
      
      const entries = params[0];
      const projectId = params[1];
      
      if (!Array.isArray(entries)) return 0;
      
      return entries
        .filter((entry: any) => entry.project === projectId)
        .reduce((sum: number, entry: any) => {
          const amount = parseFloat(entry.amount) || 0;
          return sum + amount;
        }, 0);
    });

    // Function to calculate total sum of all entries
    FunctionFactory.Instance.register("totalSum", (params: any[]) => {
      if (!params || params.length < 1) return 0;
      
      const entries = params[0];
      
      if (!Array.isArray(entries)) return 0;
      
      return entries.reduce((sum: number, entry: any) => {
        const amount = parseFloat(entry.amount) || 0;
        return sum + amount;
      }, 0);
    });
  }

  private updateAddButtonVisibility(survey: Model, addBtn: HTMLElement | null) {
    if (!addBtn) return;

    const project = survey.getValue("project");
    const category = survey.getValue("category");
    const amount = survey.getValue("amount");

    const shouldShow = !!project && !!category && !!amount;
    addBtn.style.display = shouldShow ? "inline-block" : "none";
  }

  private handleAddEntry(survey: Model) {
    const project = survey.getValue("project");
    const category = survey.getValue("category");
    const amount = parseFloat(survey.getValue("amount"));

    if (project && category && !isNaN(amount)) {
      const currentEntries = survey.getValue("entries") || [];
      const newEntry = {
        project,
        category,
        amount,
        timestamp: new Date().toLocaleString()
      };
      survey.setValue("entries", [...currentEntries, newEntry]);

      survey.setValue("project", undefined);
      survey.setValue("category", undefined);
      survey.setValue("amount", undefined);
    }
  }

  private handleClearForm(survey: Model) {
    survey.setValue("project", undefined);
    survey.setValue("category", undefined);
    survey.setValue("amount", undefined);
  }
}
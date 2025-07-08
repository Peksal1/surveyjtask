export const surveyJson = {
  title: "Project Budget Tracker",
  description: "Track project expenses and budgets",
  pages: [
    {
      name: "main_page",
      elements: [
        {
          type: "panel",
          name: "entry_panel",
          title: "Add New Entry",
          elements: [
            {
              type: "dropdown",
              name: "project",
              title: "Project:",
              isRequired: true,
              width: "30%",
              choices: [
                { value: "project_a", text: "Project A" },
                { value: "project_b", text: "Project B" },
                { value: "project_c", text: "Project C" }
              ]
            },
            {
              type: "dropdown",
              name: "category",
              title: "Category:",
              isRequired: true,
              width: "30%",
              startWithNewLine: false,
              visibleIf: "{project} notempty",
              choices: [
                { value: "category_a", text: "Category A" },
                { value: "category_b", text: "Category B" },
                { value: "category_c", text: "Category C" }
              ]
            },
            {
              type: "text",
              name: "amount",
              title: "Amount:",
              isRequired: true,
              width: "25%",
              inputType: "number",
              startWithNewLine: false
            },
            {
              type: "html",
              name: "form_actions_row",
              html: `
                <div style="display: flex; justify-content: space-between; gap: 1rem;">
                  <button type="button" class="btn btn-danger" id="clearFormBtn">Clear Form</button>
                  <button type="button" class="btn btn-primary" id="addEntryBtn" style="display: none;">Add Entry</button>
                </div>
              `
            }
          ]
        },
        {
          type: "panel",
          name: "entries_panel",
          title: "Project Entries",
          visibleIf: "{entries.length} > 0",
          elements: [
            {
              type: "matrixdynamic",
              name: "entries",
              titleLocation: "hidden",
              columns: [
                {
                  name: "project",
                  title: "Project",
                  cellType: "dropdown",
                  choices: [
                    { value: "project_a", text: "Project A" },
                    { value: "project_b", text: "Project B" },
                    { value: "project_c", text: "Project C" }
                  ],
                  allowClear: 'false'
                },
                {
                  name: "category",
                  title: "Category",
                  cellType: "dropdown",
                  choices: [
                    { value: "category_a", text: "Category A" },
                    { value: "category_b", text: "Category B" },
                    { value: "category_c", text: "Category C" }
                  ],
                  allowClear: 'false',
                },
                {
                  name: "amount",
                  title: "Amount",
                  cellType: "text",
                  inputType: "number"
                },
                {
                  name: "timestamp",
                  title: "Date Added",
                  cellType: "expression",
                  expression: "{row.timestamp}"
                }
              ],
              allowAddRows: false,
              allowRemoveRows: true,
              showHeader: true
            }
          ]
        },
        {
          type: "panel",
          name: "summary_panel",
          title: "Project Summary",
          visibleIf: "{entries.length} > 0",
          elements: [
            {
              type: "expression",
              name: "project_a_total",
              title: "Project A Total: ",
              expression: "projectSum({entries}, 'project_a')",
              displayStyle: "currency",
              currency: "USD",
              visibleIf: "hasEntriesForProject({entries}, 'project_a')",
              titleLocation: "left"
            },
            {
              type: "expression",
              name: "project_b_total",
              title: "Project B Total: ",
              expression: "projectSum({entries}, 'project_b')",
              displayStyle: "currency",
              currency: "USD",
              visibleIf: "hasEntriesForProject({entries}, 'project_b')",
              titleLocation: "left"
            },
            {
              type: "expression",
              name: "project_c_total",
              title: "Project C Total: ",
              expression: "projectSum({entries}, 'project_c')",
              displayStyle: "currency",
              currency: "USD",
              visibleIf: "hasEntriesForProject({entries}, 'project_c')",
              titleLocation: "left"
            },
            {
              type: "expression",
              name: "grand_total",
              title: "Grand Total: ",
              expression: "totalSum({entries})",
              displayStyle: "currency",
              currency: "USD",
              titleLocation: "left"
            }
          ]
        }
      ]
    }
  ],
};
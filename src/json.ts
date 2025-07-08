export const surveyJson  = {
    "title": "Surve Test",
    "description": "My first Survey project",
    "logoWidth": "auto",
    "logoHeight": "80",
    "completedHtml": "<div style=\"max-width:688px;text-align:center;margin: 16px auto;\">\n\n<div style=\"padding:0 24px;\">\n<h4>Thank you for choosing us.</h4>\n<br>\n<p>Dear {firstname-for-complete-page}, we're thrilled to have you on board and excited to be a part of your upcoming journey. Your reservation is confirmed, and we can't wait to make your travel experience exceptional.</p>\n</div>\n\n</div>\n",
    "pages": [
     {
      "name": "page1",
      elements: [
         {
           type: 'dropdown',
           name: 'project',
           title: 'Project:',
           isRequired: true,
           width: '30%',
           minWidth: '200px',
           choices: [
             { value: 'project_a', text: 'Project A' },
             { value: 'project_b', text: 'Project B' },
             { value: 'project_c', text: 'Project C' },
           ],
           renderAs: 'select',
           validators: [
             {
               type: 'expression',
               text: 'This project has reached the maximum number of entries (10)',
               expression: 'validateProjectSelection({project}, {entries})',
             },
           ],
         },
         {
           type: 'dropdown',
           name: 'category',
           title: 'Category:',
           isRequired: true,
           width: '30%',
           minWidth: '200px',
           startWithNewLine: false,
           choices: [
             { value: 'category_a', text: 'Category A' },
             { value: 'category_b', text: 'Category B' },
             { value: 'category_c', text: 'Category C' },
           ],
           renderAs: 'select',
           visibleIf: '{project} notempty',
         },
         {
           type: 'text',
           name: 'amount',
           title: 'Amount:',
           isRequired: true,
           width: '25%',
           minWidth: '150px',
           startWithNewLine: false,
           inputType: 'number',
           validators: [
             {
               type: 'expression',
               text: 'Amount must be at least $0.01',
               expression: 'validateMinAmount({amount}, 0.01)',
             },
             {
               type: 'expression',
               text: 'Amount must be within budget range ($1 - $10,000)',
               expression: 'isWithinBudget({amount}, 1, 10000)',
             },
           ],
         },
       ]
     },
    ],
    "calculatedValues": [{
       "name": "firstname-for-complete-page",
       "expression": "iif({first-name} notempty, {first-name}, guests)"
    }],
    "showPrevButton": false,
    "questionErrorLocation": "bottom",
    "widthMode": "static",
    "width": "904"
   };
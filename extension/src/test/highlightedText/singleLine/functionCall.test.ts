const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TextEditorObj } from '../../../shared/types/tests';
import { TestUtil } from '../../util/testUtil';
import * as vscode from 'vscode';

suite.only('Highlighted Function Call Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Single Line', [
    // WORK
    // {
    //   lines: [
    //     {
    //       input: `typeof dog && myFunc()`,
    //       output: `!typeof dog || !myFunc()`,
    //     },
    //   ],
    //   selection: {
    //     start: new vscode.Position(0, 7),
    //     end: new vscode.Position(0, 18),
    //   },
    // },
    {
      lines: [
        {
          input: 'if (dog && myFunc()) { console.log(2) }',
          output: 'if (dog && !myFunc()) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 15),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && myFunc()) { console.log(2) }',
          output: 'if (dog && !myFunc()) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 17),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && myFunc()) { console.log(2) }',
          output: 'if (dog && !myFunc()) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 18),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && myFunc()) { console.log(2) }',
          output: 'if (dog && !myFunc()) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 19),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && myFunc()) { console.log(2) }',
          output: 'if (dog && !myFunc()) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 17),
        end: new vscode.Position(0, 19),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && myFunc()) { console.log(2) }',
          output: 'if (dog && !myFunc()) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 17),
        end: new vscode.Position(0, 18),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && myFunc()) { console.log(2) }',
          output: 'if (dog && !myFunc()) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 18),
        end: new vscode.Position(0, 19),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && myFunc( )) { console.log(2) }',
          output: 'if (dog && !myFunc( )) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 17),
        end: new vscode.Position(0, 19),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && myFunc( )) { console.log(2) }',
          output: 'if (dog && !myFunc( )) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 18),
        end: new vscode.Position(0, 20),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && myFunc( )) { console.log(2) }',
          output: 'if (dog && !myFunc( )) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 17),
        end: new vscode.Position(0, 20),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && myFunc( )) { console.log(2) }',
          output: 'if (dog && !myFunc( )) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 18),
        end: new vscode.Position(0, 19),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && myFunc(cat)) { console.log(2) }',
          output: 'if (dog && !myFunc(cat)) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 17),
        end: new vscode.Position(0, 22),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && myFunc(cat)) { console.log(2) }',
          output: 'if (dog && !myFunc(cat)) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 18),
        end: new vscode.Position(0, 21),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && myFunc(cat)) { console.log(2) }',
          output: 'if (dog && !myFunc(cat)) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 17),
        end: new vscode.Position(0, 21),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && myFunc(cat)) { console.log(2) }',
          output: 'if (dog && !myFunc(cat)) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 18),
        end: new vscode.Position(0, 22),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && myFunc((cat))) { console.log(2) }',
          output: 'if (dog && !myFunc((cat))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 18),
        end: new vscode.Position(0, 19),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && myFunc((cat))) { console.log(2) }',
          output: 'if (dog && !myFunc((cat))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 18),
        end: new vscode.Position(0, 20),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && myFunc(((cat)))) { console.log(2) }',
          output: 'if (dog && !myFunc(((cat)))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 19),
        end: new vscode.Position(0, 20),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && myFunc(((cat)))) { console.log(2) }',
          output: 'if (dog && !myFunc(((cat)))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 20),
        end: new vscode.Position(0, 22),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && myFunc(((cat)))) { console.log(2) }',
          output: 'if (dog && !myFunc(((cat)))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 20),
        end: new vscode.Position(0, 24),
      },
    },
  ]);
});

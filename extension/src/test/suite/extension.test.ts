const mocha = require('../../../node_modules/mocha/lib/mocha.js');
import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {
  vscode.window.showInformationMessage('Start all tests.');

  let textEditor: vscode.TextEditor;
  const COMMAND_EXECUTION_TIME_ML = 10;

  mocha.before(() => {
    return new Promise((resolve) => {
      vscode.workspace.openTextDocument().then((textDocument) => {
        vscode.window.showTextDocument(textDocument).then((textEditorArg) => {
          textEditor = textEditorArg;
          resolve(true);
        });
      });
    });
  });

  mocha.beforeEach(async () => {
    return new Promise((resolve) => {
      textEditor
        ?.edit((editBuild) => {
          for (let i = 0; i < textEditor.document.lineCount; i += 1) {
            const range = new vscode.Range(new vscode.Position(i, 0), new vscode.Position(i + 1, 0));
            editBuild.delete(range);
          }
        })
        .then(() => {
          resolve(true);
        });
    });
  });

  function runInversionTests(
    testProps: {
      lines: { input: string; output: string }[];
      selection: { start: vscode.Position; end: vscode.Position };
    }[],
  ) {
    testProps.forEach(({ lines, selection }) => {
      test(`Multi line inversion test for input`, (done) => {
        textEditor
          .edit((editBuild) => {
            // insert text
            lines.forEach((line) => {
              editBuild.insert(new vscode.Position(0, 0), line.input);
            });
          })
          .then(() => {
            // select text
            textEditor.selection = new vscode.Selection(selection.start, selection.end);
            // execute the inversion command
            vscode.commands.executeCommand('condition-inverter.helloWorld').then(() => {
              // wait for command to perform its operation
              setTimeout(() => {
                // select text on the first line
                textEditor.selection = new vscode.Selection(selection.start, selection.end);
                // compare result
                lines.forEach((line, index) => {
                  const resultTextOutput = textEditor.document.lineAt(index).text;
                  assert.strictEqual(resultTextOutput, line.output);
                });
                done();
              }, COMMAND_EXECUTION_TIME_ML);
            });
          });
      });
    });
  }

  runInversionTests([
    {
      lines: [
        {
          input: `if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }`,
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 80),
        end: new vscode.Position(0, 80),
      },
    },
    {
      lines: [
        {
          input: `if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }`,
          output: 'if (!dog || !cat && !mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 40),
        end: new vscode.Position(0, 40),
      },
    },
    {
      lines: [
        {
          input: `if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }`,
          output: 'if (!dog || !cat && !mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 10),
        end: new vscode.Position(0, 10),
      },
    },
    {
      lines: [
        {
          input: `if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }`,
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 46),
        end: new vscode.Position(0, 46),
      },
    },
    {
      lines: [
        {
          input: `if (dog && cat || mouse) { console.log(2) }`,
          output: 'if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 0),
      },
    },
    {
      lines: [
        {
          input: `if (dog && cat || mouse) { console.log(2) }`,
          output: 'if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 2),
        end: new vscode.Position(0, 2),
      },
    },
    {
      lines: [
        {
          input: `if (dog && cat || mouse) { console.log(2) }`,
          output: 'if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 43),
        end: new vscode.Position(0, 43),
      },
    },
    {
      lines: [
        {
          input: `if (dog && cat || mouse) { console.log(2) }`,
          output: 'if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 10),
        end: new vscode.Position(0, 24),
      },
    },
    {
      lines: [
        {
          input: `if (dog && cat || mouse) { console.log(2) }\n`,
          output: 'if (!dog || !cat && !mouse) { console.log(2) }',
        },
        {
          input: `if (mouse && cat) { console.log(2) }\n`,
          output: 'if (!mouse || !cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(2, 38),
      },
    },
  ]);
});
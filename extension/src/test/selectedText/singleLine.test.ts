const mocha = require('../../../node_modules/mocha/lib/mocha.js');
import { TextEditorObj } from '../../shared/types/tests';
import { TestUtil } from '../util/testUtil';
import * as vscode from 'vscode';

suite.only('Selected Text Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Single Line', [
    {
      lines: [
        {
          input: 'if (dog) { console.log(2) }',
          output: 'if (!dog) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 4),
      },
    },
    {
      lines: [
        {
          input: 'if (dog) { console.log(2) }',
          output: 'if (!dog) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 5),
      },
    },
    {
      lines: [
        {
          input: 'if (dog) { console.log(2) }',
          output: 'if (!dog) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 6),
        end: new vscode.Position(0, 6),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog && cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 4),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog && cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 5),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog && cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 6),
        end: new vscode.Position(0, 6),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog && cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 7),
        end: new vscode.Position(0, 7),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog || cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog || cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 9),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog || cat || mouse) { console.log(2) }',
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
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && !cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 11),
        end: new vscode.Position(0, 11),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat && mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 15),
        end: new vscode.Position(0, 15),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat && mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 16),
        end: new vscode.Position(0, 16),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat && mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 17),
        end: new vscode.Position(0, 17),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 18),
        end: new vscode.Position(0, 18),
      },
    },
    {
      lines: [
        {
          input: 'if (!dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 4),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && !cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 11),
        end: new vscode.Position(0, 11),
      },
    },
    {
      lines: [
        {
          input: 'let dog &&= cat',
          output: 'let dog &&= cat',
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: 'if (cat & mouse) { console.log(2) }',
          output: 'if (!(cat & mouse)) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: 'if (cat & mouse) { console.log(2) }',
          output: 'if (!(cat & mouse)) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 9),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: 'if (cat | mouse) { console.log(2) }',
          output: 'if (!(cat | mouse)) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: 'if (cat | mouse) { console.log(2) }',
          output: 'if (!(cat | mouse)) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 9),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: 'if (!(cat | mouse)) { console.log(2) }',
          output: 'if (cat | mouse) { console.log(2) }',
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
          input: 'if (!(cat | mouse)) { console.log(2) }',
          output: 'if (cat | mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 11),
        end: new vscode.Position(0, 11),
      },
    },
    {
      lines: [
        {
          input: 'if (!(cat & mouse)) { console.log(2) }',
          output: 'if (cat & mouse) { console.log(2) }',
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
          input: 'if (!(cat & mouse)) { console.log(2) }',
          output: 'if (cat & mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 11),
        end: new vscode.Position(0, 11),
      },
    },
    {
      lines: [
        {
          input: 'if (cat + mouse) { console.log(2) }',
          output: 'if (!(cat + mouse)) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: 'if (cat + mouse) { console.log(2) }',
          output: 'if (!(cat + mouse)) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 9),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: 'if (!(cat + mouse)) { console.log(2) }',
          output: 'if (cat + mouse) { console.log(2) }',
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
          input: 'if (!(cat + mouse)) { console.log(2) }',
          output: 'if (cat + mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 11),
        end: new vscode.Position(0, 11),
      },
    },
    {
      lines: [
        {
          input: 'if (cat &&= mouse) { console.log(2) }',
          output: 'if (!(cat &&= mouse)) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 6),
        end: new vscode.Position(0, 6),
      },
    },
    {
      lines: [
        {
          input: 'if (cat &&= mouse) { console.log(2) }',
          output: 'if (!(cat &&= mouse)) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 7),
        end: new vscode.Position(0, 7),
      },
    },
    {
      lines: [
        {
          input: 'if (cat  &&= mouse) { console.log(2) }',
          output: 'if (!(cat  &&= mouse)) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: 'if (cat &&= mouse) { console.log(2) }',
          output: 'if (!(cat &&= mouse)) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: 'if (cat &&= mouse) { console.log(2) }',
          output: 'if (!(cat &&= mouse)) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 9),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: 'if (cat &&= mouse) { console.log(2) }',
          output: 'if (!(cat &&= mouse)) { console.log(2) }',
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
          input: 'if (cat &&= mouse) { console.log(2) }',
          output: 'if (!(cat &&= mouse)) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 11),
        end: new vscode.Position(0, 11),
      },
    },
    {
      lines: [
        {
          input: 'if (cat === mouse) { console.log(2) }',
          output: 'if (cat !== mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: 'if (cat === mouse) { console.log(2) }',
          output: 'if (cat !== mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 9),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: 'if (cat === mouse) { console.log(2) }',
          output: 'if (cat !== mouse) { console.log(2) }',
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
          input: 'if (cat === mouse) { console.log(2) }',
          output: 'if (cat !== mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 11),
        end: new vscode.Position(0, 11),
      },
    },
    {
      lines: [
        {
          input: 'if (cat !== mouse) { console.log(2) }',
          output: 'if (cat === mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: 'if (cat !== mouse) { console.log(2) }',
          output: 'if (cat === mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 9),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: 'if (cat !== mouse) { console.log(2) }',
          output: 'if (cat === mouse) { console.log(2) }',
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
          input: 'if (cat !== mouse) { console.log(2) }',
          output: 'if (cat === mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 11),
        end: new vscode.Position(0, 11),
      },
    },
    {
      lines: [
        {
          input: 'if (cat <= mouse) { console.log(2) }',
          output: 'if (cat > mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: 'if (cat <= mouse) { console.log(2) }',
          output: 'if (cat > mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 9),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: 'if (cat <= mouse) { console.log(2) }',
          output: 'if (cat > mouse) { console.log(2) }',
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
          input: 'if (cat >= mouse) { console.log(2) }',
          output: 'if (cat < mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: 'if (cat >= mouse) { console.log(2) }',
          output: 'if (cat < mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 9),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: 'if (cat >= mouse) { console.log(2) }',
          output: 'if (cat < mouse) { console.log(2) }',
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
          input: 'if (cat < mouse) { console.log(2) }',
          output: 'if (cat >= mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: 'if (cat < mouse) { console.log(2) }',
          output: 'if (cat >= mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 9),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: 'if (cat > mouse) { console.log(2) }',
          output: 'if (cat <= mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: 'if (cat > mouse) { console.log(2) }',
          output: 'if (cat <= mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 9),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: 'if (cat << mouse) { console.log(2) }',
          output: 'if (!(cat << mouse)) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: 'if (cat << mouse) { console.log(2) }',
          output: 'if (!(cat << mouse)) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 9),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: 'if (cat << mouse) { console.log(2) }',
          output: 'if (!(cat << mouse)) { console.log(2) }',
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
          input: 'if (cat >> mouse) { console.log(2) }',
          output: 'if (!(cat >> mouse)) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: 'if (cat >> mouse) { console.log(2) }',
          output: 'if (!(cat >> mouse)) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 9),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: 'if (cat >> mouse) { console.log(2) }',
          output: 'if (!(cat >> mouse)) { console.log(2) }',
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
          input: 'if (cat >>> mouse) { console.log(2) }',
          output: 'if (!(cat >>> mouse)) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: 'if (cat >>> mouse) { console.log(2) }',
          output: 'if (!(cat >>> mouse)) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 9),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: 'if (cat >>> mouse) { console.log(2) }',
          output: 'if (!(cat >>> mouse)) { console.log(2) }',
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
          input: 'if (cat >>> mouse) { console.log(2) }',
          output: 'if (!(cat >>> mouse)) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 11),
        end: new vscode.Position(0, 11),
      },
    },

    {
      lines: [
        {
          input: 'if (cat >>>= mouse) { console.log(2) }',
          output: 'if (!(cat >>>= mouse)) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: 'if (cat >>>= mouse) { console.log(2) }',
          output: 'if (!(cat >>>= mouse)) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 9),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: 'if (cat >>>= mouse) { console.log(2) }',
          output: 'if (!(cat >>>= mouse)) { console.log(2) }',
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
          input: 'if (cat >>>= mouse) { console.log(2) }',
          output: 'if (!(cat >>>= mouse)) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 11),
        end: new vscode.Position(0, 11),
      },
    },
    {
      lines: [
        {
          input: 'if (cat >>>= mouse) { console.log(2) }',
          output: 'if (!(cat >>>= mouse)) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 12),
      },
    },
    {
      lines: [
        {
          input: 'if (!(cat >>>= mouse)) { console.log(2) }',
          output: 'if (cat >>>= mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 12),
      },
    },
    // WORK
    // {
    //   lines: [
    //     {
    //       input: 'if (cat <= mouse) { console.log(2) }',
    //       output: 'if (cat < mouse) { console.log(2) }',
    //     },
    //   ],
    //   selection: {
    //     start: new vscode.Position(0, 11),
    //     end: new vscode.Position(0, 11),
    //   },
    // },
    // {
    //   lines: [
    //     {
    //       input: 'if fishif and catif: print("2") if ifcat and dogif: print("2")',
    //       output: 'if fishif and catif: print("2") if !ifcat or !dogif: print("2")',
    //     },
    //   ],
    //   selection: {
    //     start: new vscode.Position(0, 48),
    //     end: new vscode.Position(0, 48),
    //   },
    // },
  ]);
});

import { StatementTraversalCallbackUtil } from '../../../shared/functionality/statementTraversalCallbackUtil';
import { Position } from '../../../shared/types/invertHighlightedText/invertHighlightedText';
import { FindStatementAtSelectionEnd } from '../traversal/findStatementAtSelectionEnd';
import { FindStatementFullRange } from '../../shared/traversal/findStatementFullRange';
import { IsCursorOnIfWord } from './isCursorOnIfWord';
import { Range, TextEditor } from 'vscode';

export class SelectionEndIfRange {
  private static isEndStatementSameAsStart(endStatementPosition: Position, startStatementRange: Range | null): boolean {
    return Boolean(
      startStatementRange &&
        endStatementPosition.line === startStatementRange.start.line &&
        endStatementPosition.character === startStatementRange.start.character,
    );
  }

  private static getStatementEndPosition(editor: TextEditor, start: Position, end: Position): Position | null {
    const cursorOnIfWordStartIndex = StatementTraversalCallbackUtil.traverse(IsCursorOnIfWord.getIndexIfTrue, editor, end.line, end.character, false);
    if (cursorOnIfWordStartIndex === -1) {
      return FindStatementAtSelectionEnd.upwardLineTraversal(editor, end.line, start, end);
    }
    return { line: end.line, character: cursorOnIfWordStartIndex };
  }

  private static findEndSelectionStatementRange(editor: TextEditor, startStatementRange: Range | null): Range | null {
    const startPosition = startStatementRange?.end || editor.selection.start;
    const endStatementPosition = SelectionEndIfRange.getStatementEndPosition(editor, startPosition, editor.selection.end);
    if (endStatementPosition && !SelectionEndIfRange.isEndStatementSameAsStart(endStatementPosition, startStatementRange)) {
      const { text } = editor.document.lineAt(endStatementPosition.line);
      return FindStatementFullRange.findFromStartPosition(editor, endStatementPosition.line, endStatementPosition, text);
    }
    return null;
  }

  private static doesSelectionEndAfterStartStatementEnds(selectionEnd: Position, startStatementRangeEnd: Position): boolean {
    const { line: startIfEndLine, character: startIfEndChar } = startStatementRangeEnd;
    const { line: selectionEndLine, character: selectionEndChar } = selectionEnd;
    return startIfEndLine < selectionEndLine || (startIfEndLine === selectionEndLine && startIfEndChar < selectionEndChar);
  }

  public static get(editor: TextEditor, startStatementRange: Range | null): Range | null {
    if (!startStatementRange || SelectionEndIfRange.doesSelectionEndAfterStartStatementEnds(editor.selection.end, startStatementRange.end)) {
      return SelectionEndIfRange.findEndSelectionStatementRange(editor, startStatementRange);
    }
    return null;
  }
}

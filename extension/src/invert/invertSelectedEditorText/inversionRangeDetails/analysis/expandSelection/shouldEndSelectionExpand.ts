import { SPACE_JSON, STATEMENT_JSON } from 'shared/inverter/src/shared/consts/statements';
import { TraversalUtil } from 'shared/inverter/src/shared/functionality/traversalUtil';
import { ConditionIndicatorValidator } from '../shared/conditionIndicatorValidator';
import { LineTokenTraversalUtils } from '../shared/lineTokenTraversalUtils';
import { CurlyBracketSyntaxUtil } from '../shared/curlyBracketSyntaxUtil';
import { RangeCreator } from '../../../shared/functionality/rangeCreator';
import { FindNextNonSpaceToken } from '../shared/findNextNonSpaceToken';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';
import { IsTextHighlighted } from '../shared/isTextHighlighted';
import { TextEditor, Position, Selection } from 'vscode';

export class ShouldEndSelectionExpand {
  private static isStopToken(lineTokens: Tokens, nonSpaceTokenIndex: number): boolean {
    return (
      ConditionIndicatorValidator.isTokenIndexPartOfConditionIndicator(lineTokens, nonSpaceTokenIndex, false) ||
      lineTokens[nonSpaceTokenIndex] === ';' ||
      CurlyBracketSyntaxUtil.isScopeOpenToken(lineTokens, nonSpaceTokenIndex)
    );
  }
  private static isNextCharLeftAndUpwardsCondition(editor: TextEditor, line: number, endChar?: number): boolean {
    endChar ??= editor.document.lineAt(line).range.end.character;
    const lineTokens = LineTokenTraversalUtils.getLineTokensBeforeCharNumber(editor, line, endChar);
    const nonSpaceTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(lineTokens, lineTokens.length - 1, false);
    if (nonSpaceTokenIndex > -1) {
      return IsTextHighlighted.check(editor.selection)
        ? ShouldEndSelectionExpand.isStopToken(lineTokens, nonSpaceTokenIndex)
        : STATEMENT_JSON[lineTokens[nonSpaceTokenIndex] as keyof typeof STATEMENT_JSON];
    }
    if (line - 1 < 0) return false;
    return ShouldEndSelectionExpand.isNextCharLeftAndUpwardsCondition(editor, line - 1);
  }

  private static isTokensEndConditionIndicator(editor: TextEditor, line: number, lineTokens: Tokens): boolean {
    // if |(  or  && |dog
    const isNextNonSpaceTokenCondition = ShouldEndSelectionExpand.isNextCharLeftAndUpwardsCondition(editor, line, lineTokens.join('').length);
    if (isNextNonSpaceTokenCondition) return true;
    return ConditionIndicatorValidator.isTokenIndexPartOfConditionIndicator(lineTokens, lineTokens.length - 1, false);
  }

  private static considerOpenBracketConditionIndicator(fullLineTokens: Tokens, nonSpaceTokenIndex: number, selection: Selection): boolean {
    return (
      fullLineTokens[nonSpaceTokenIndex] === '(' &&
      (IsTextHighlighted.check(selection) ||
        TraversalUtil.getSiblingNonSpaceTokenIndex(fullLineTokens, nonSpaceTokenIndex + 1) === fullLineTokens.length)
    );
  }

  private static isEndAfterConditionIndicator(editor: TextEditor, line: number, endChar?: number): boolean {
    endChar ??= editor.document.lineAt(line).range.end.character;
    const lineTokens = LineTokenTraversalUtils.getLineTokensBeforeCharNumber(editor, line, endChar);
    const nonSpaceTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(lineTokens, lineTokens.length - 1, false);
    if (nonSpaceTokenIndex > -1) {
      const fullLineTokens = LineTokenTraversalUtils.getFullLineTokens(editor, line);
      if (ShouldEndSelectionExpand.considerOpenBracketConditionIndicator(fullLineTokens, nonSpaceTokenIndex, editor.selection)) {
        return ShouldEndSelectionExpand.isTokensEndConditionIndicator(editor, line, lineTokens.slice(0, nonSpaceTokenIndex - 1));
      }
      return ShouldEndSelectionExpand.isStopToken(fullLineTokens, nonSpaceTokenIndex);
    }
    if (line - 1 < 0) return false;
    return ShouldEndSelectionExpand.isEndAfterConditionIndicator(editor, line - 1);
  }

  // prettier-ignore
  private static isLeftTokenOnSameLineConditionIndicator(
      editor: TextEditor, highlightEnd: Position, lineTokens: Tokens, fullLineTokens: Tokens, siblingLeftTokenIndex: number): boolean {
    // prettier-ignore
    const analysisTokens = ShouldEndSelectionExpand.considerOpenBracketConditionIndicator(
        fullLineTokens, siblingLeftTokenIndex, editor.selection)
      ? lineTokens.slice(0, siblingLeftTokenIndex) : lineTokens;
    const isIndicator = ShouldEndSelectionExpand.isTokensEndConditionIndicator(editor, highlightEnd.line, analysisTokens);
      if (IsTextHighlighted.check(editor.selection)) {
      return isIndicator;
    }
    // when selection cursor is beside an open bracket after a statment - do not invert, otherwise invert
    // if |(dog)  =  if |(dog)
    // if |dog  =  if |!dog
    const nextSiblingIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(fullLineTokens, siblingLeftTokenIndex + 1);
    return isIndicator && fullLineTokens[nextSiblingIndex] === '(';
  }

  // cannot simply use nonSpaceTokensAfterEnd like nonSpaceTokensBeforeStart in isStartOnOrBEforeConditionIndicator as we do not want to invert
  // conditions like if |(dog) into if |(!dog), hence the logic here takes care of it simply here
  private static isImmediateTokenConditionIndicator(editor: TextEditor, highlightEnd: Position): boolean {
    const lineTokens = LineTokenTraversalUtils.getLineTokensBeforeCharNumber(editor, highlightEnd.line, highlightEnd.character);
    const siblingLeftTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(lineTokens, lineTokens.length - 1, false);
    const fullLineTokens = LineTokenTraversalUtils.getFullLineTokens(editor, highlightEnd.line);
    if (siblingLeftTokenIndex === -1 && IsTextHighlighted.check(editor.selection)) {
      // when text is highlighted and there are no non space characters before end of selection, traverse upwards to check if the above line
      // ends with a '(' symbol and if it does, do not proceed to invert text after the end selection
      const leftNonSpaceToken = FindNextNonSpaceToken.getLeftAndUpwards(editor, highlightEnd.line, 0);
      if (leftNonSpaceToken === '(') return true;
    }
    // prettier-ignore
    return ShouldEndSelectionExpand.isLeftTokenOnSameLineConditionIndicator(
      editor, highlightEnd, lineTokens, fullLineTokens, siblingLeftTokenIndex);
  }

  public static check(editor: TextEditor, highlightEnd: Position): boolean {
    const charAfterEnd = editor.document.getText(
      RangeCreator.create(highlightEnd, { line: highlightEnd.line, character: highlightEnd.character + 1 }),
    );
    if (Object.keys(SPACE_JSON).indexOf(charAfterEnd) === -1 && charAfterEnd !== '') {
      return ShouldEndSelectionExpand.isImmediateTokenConditionIndicator(editor, highlightEnd);
    }
    return ShouldEndSelectionExpand.isEndAfterConditionIndicator(editor, highlightEnd.line, highlightEnd.character);
  }
}

import { TraversalUtil } from '../../../shared/functionality/traversalUtil';
import { EvaluationState } from '../../../shared/types/evaluationState';
import { Tokens } from '../../../shared/types/tokens';

export class EvaluateAndPrepareOutsideStatement {
  private static getStartTokenIndex(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    if (index === 0) {
      return index;
    }
    const previousIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, index - 1, false);
    const previousToken = tokens[previousIndex];
    if (previousToken === '=' || previousToken === ';' || previousToken === ',') return index;
    if (previousToken === '(') {
      const closeBracketIndex = TraversalUtil.getIndexOfClosingBracket(tokens, previousIndex, 1);
      evaluationState.currentStatementEndIndex = closeBracketIndex - 1;
      return index;
    }
    return EvaluateAndPrepareOutsideStatement.getStartTokenIndex(tokens, previousIndex, evaluationState);
  }

  public static init(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    evaluationState.currentStatementEndIndex = tokens.length - 1;
    evaluationState.currentStatementStartIndex = EvaluateAndPrepareOutsideStatement.getStartTokenIndex(tokens, index, evaluationState);
    evaluationState.isCurrentlyEvaluatingConditions = true;
    return evaluationState.currentStatementStartIndex;
  }
}
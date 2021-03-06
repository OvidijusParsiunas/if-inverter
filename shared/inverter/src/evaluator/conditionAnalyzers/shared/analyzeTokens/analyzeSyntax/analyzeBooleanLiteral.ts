import { EvaluationState } from '../../../../../shared/types/evaluationState';
import { Token, Tokens } from '../../../../../shared/types/tokens';

export class AnalyzeBooleanLiteral {
  public static updateStateForBoolean(evaluationState: EvaluationState): void {
    evaluationState.invertBooleanLiteral = true;
  }

  private static doesTokenEndNumber(token: Token): boolean {
    return token === ' ' || token === ')' || token === '&' || token === '|';
  }

  private static findNumberEndIndex(tokens: Tokens, index: number): number {
    if (AnalyzeBooleanLiteral.doesTokenEndNumber(tokens[index]) || index >= tokens.length - 1) {
      return index;
    }
    return AnalyzeBooleanLiteral.findNumberEndIndex(tokens, index + 1);
  }

  // boolean numbers are considered to being 0 and 1
  public static updateStateForBooleanNumber(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const nextToken = tokens[index + 1];
    if (AnalyzeBooleanLiteral.doesTokenEndNumber(nextToken)) {
      evaluationState.invertBooleanLiteral = true;
      return index;
    }
    return AnalyzeBooleanLiteral.findNumberEndIndex(tokens, index);
  }
}

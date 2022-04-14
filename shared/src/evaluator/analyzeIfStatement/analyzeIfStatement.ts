import { AnalyzeStandaloneStatements } from './analyzeTokens/analyzeStandaloneStatement';
import { EvaluationStateUtil } from '../evaluationState/evaluationStateUtil';
import { EvaluationState } from '../../shared/types/evaluationState';
import { AnalyzeTokens } from './analyzeTokens/analyzeTokens';
import { Tokens } from '../../shared/types/tokens';

export class AnalyzeIfStatement {
  private static finishEvaluatingIfStatement(tokens: Tokens, evaluationState: EvaluationState): void {
    AnalyzeStandaloneStatements.markStandaloneStatementsForInversion(tokens, evaluationState.currentIfStatementCloseBracketIndex, evaluationState);
    evaluationState.isCurrentlyEvaluatingIfStatement = false;
    evaluationState.comparisonOperatorFound = false;
    EvaluationStateUtil.refreshBooleanState(evaluationState);
  }

  public static analyze(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    if (evaluationState.currentIfStatementCloseBracketIndex > index) {
      return AnalyzeTokens.analyze(tokens, index, evaluationState);
    }
    AnalyzeIfStatement.finishEvaluatingIfStatement(tokens, evaluationState);
    return index;
  }
}

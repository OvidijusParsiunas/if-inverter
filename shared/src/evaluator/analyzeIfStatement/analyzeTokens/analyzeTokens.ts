import { AnalyzeGreaterOrLessThanSign } from './analyzeSyntax/analyzeGreaterOrLessThanSign';
import { AnalyzeBrackatableSyntax } from './analyzeSyntax/analyzeBrackatableSyntax';
import { AnalyzeExclamationMark } from './analyzeSyntax/analyzeExclamationMark';
import { AnalyzeLogicalOperator } from './analyzeSyntax/analyzeLogicalOperator';
import { AnalyzeBooleanLiteral } from './analyzeSyntax/analyzeBooleanLiteral';
import { TraversalUtil } from '../../../shared/functionality/traversalUtil';
import { EvaluationState } from '../../../shared/types/evaluationState';
import { AnalyzeEqualsSign } from './analyzeSyntax/analyzeEqualsSign';
import { AnalyzeBracket } from './analyzeSyntax/analyzeBracket';
import { Tokens } from '../../../shared/types/tokens';

export class AnalyzeTokens {
  public static updateState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const currentToken = tokens[index];
    switch (currentToken) {
      case '!':
        return AnalyzeExclamationMark.updateState(tokens, index, evaluationState);
      case '(':
        AnalyzeBracket.updateStateForOpen(evaluationState);
        break;
      case ')':
        AnalyzeBracket.updateStateForClose(evaluationState);
        break;
      case '&':
      case '|':
        return AnalyzeLogicalOperator.updateState(tokens, index, evaluationState);
      case '<':
      case '>':
        return AnalyzeGreaterOrLessThanSign.updateState(tokens, index, evaluationState);
      case '=':
        return AnalyzeEqualsSign.updateState(tokens, index, evaluationState);
      case 'false':
      case 'true':
        AnalyzeBooleanLiteral.updateStateForBoolean(evaluationState);
        break;
      case '0':
      case '1':
        return AnalyzeBooleanLiteral.updateStateForBooleanNumber(tokens, index, evaluationState);
      case `'`:
      case '`':
      case '"':
        return TraversalUtil.getEndQuoteIndex(tokens, index + 1, currentToken);
      case '-':
      case '+':
      case '/':
      case '*':
      case '^':
      case '~':
        AnalyzeBrackatableSyntax.updateState(evaluationState);
        break;
      default: {
      }
    }
    return index;
  }
}

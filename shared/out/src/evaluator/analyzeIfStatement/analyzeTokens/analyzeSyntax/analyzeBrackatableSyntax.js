"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyzeBrackatableSyntax = void 0;
class AnalyzeBrackatableSyntax {
    static doesStatementBeforeArithmeticOperationHasBrackets(evaluationState) {
        return evaluationState.areBracketsAlreadyPresent && evaluationState.numberOfBracketsOpen === 0;
    }
    // this analyzes arithmetic and bitwise operators
    static analyze(evaluationState) {
        evaluationState.isOperationWrappableInBrackets = true;
        if (AnalyzeBrackatableSyntax.doesStatementBeforeArithmeticOperationHasBrackets(evaluationState)) {
            evaluationState.areBracketsAlreadyPresent = false;
        }
    }
}
exports.AnalyzeBrackatableSyntax = AnalyzeBrackatableSyntax;
//# sourceMappingURL=analyzeBrackatableSyntax.js.map
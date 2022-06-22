import { ConditionIndicatorBeforeStart } from './analysis/expandSelection/conditionIndicatorBeforeStart';
import { ConditionIndicatorAfterEnd } from './analysis/expandSelection/conditionIndicatorAfterEnd';
import { InversionRangeDetails } from '../../../../../shared/types/inversionRangeDetails';
import { FullWordRange } from './analysis/fullWordRange/fullWordRange';
import { RangeCreator } from '../../../../shared/rangeCreator';
import { TextEditor } from 'vscode';

export class InversionRangeDetailsFactory {
  // WORK - _ that is next to the string should be regarded as part of it
  public static create(editor: TextEditor): InversionRangeDetails {
    const fullWordRange = FullWordRange.extract(editor);
    const startPositionDetails = ConditionIndicatorBeforeStart.getStartPositionDetails(editor, fullWordRange);
    const endPositionDetails = ConditionIndicatorAfterEnd.getEndPositionDetails(editor, fullWordRange, startPositionDetails);
    return {
      range: RangeCreator.create(startPositionDetails.position, endPositionDetails.position),
      startOperatorPadding: startPositionDetails.startOperatorPadding || '',
      endOperatorPadding: endPositionDetails.endOperatorPadding || '',
    };
  }
}

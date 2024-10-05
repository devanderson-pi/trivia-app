import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

import { TriviaData } from '@/types/data';
import ErrorMessage from './ErrorMessage';
import Tag from './Tag';

interface QuestionProps extends PropsWithChildren {
  question: TriviaData;
  questionNumber: number;
  totalQuestions: number;
  errorMessage?: string;
}

const Question = ({
  question,
  questionNumber,
  totalQuestions,
  children,
  errorMessage,
}: QuestionProps) => {
  return (
    <div
      className={twMerge(
        'rounded-t-md border-b-2 border-primary bg-tertiary p-6',
        errorMessage && 'border-error'
      )}
    >
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <Tag dangerouslySetInnerHTML={{ __html: question.category }} />
          <Tag dangerouslySetInnerHTML={{ __html: question.difficulty }} />
        </div>

        <div>
          {questionNumber} of {totalQuestions}
        </div>
      </div>

      <fieldset className="mt-5">
        <legend
          className="mb-2"
          dangerouslySetInnerHTML={{
            __html: `${questionNumber}. ${question.question}`,
          }}
        />

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        {children}
      </fieldset>
    </div>
  );
};

export default Question;

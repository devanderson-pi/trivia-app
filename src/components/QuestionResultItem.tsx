import Tag from './Tag';
import { TriviaData } from '@/types/data';

interface QuestionResultItemProps {
  index: number;
  question: TriviaData;
}

const QuestionResultItem = ({ index, question }: QuestionResultItemProps) => {
  const isCorrect = question.selected_answer === question.correct_answer;
  const borderClass = isCorrect ? 'border-success' : 'border-error';

  const getAnswerClass = (answer: string) => {
    const isAnswerCorrect = answer === question.correct_answer;
    const isSelected = answer === question.selected_answer;

    if (isSelected) {
      return isCorrect ? 'font-bold text-success' : 'text-error';
    }

    return isAnswerCorrect ? 'font-bold text-success' : '';
  };

  return (
    <li className={`rounded-t-md border-b-2 bg-tertiary p-6 ${borderClass}`}>
      <div className="flex flex-wrap gap-2">
        <Tag dangerouslySetInnerHTML={{ __html: question.category }} />
        <Tag dangerouslySetInnerHTML={{ __html: question.difficulty }} />
      </div>

      <p
        className="mt-5"
        dangerouslySetInnerHTML={{
          __html: `${index + 1}. ${question.question}`,
        }}
      />

      <div className="my-2">
        {isCorrect ? (
          <strong>Correct! Well done!</strong>
        ) : (
          <>
            <strong className="font-normal">
              Incorrect. The correct answer is&nbsp;
              <span className="font-bold">{question.correct_answer}</span>
            </strong>
          </>
        )}
      </div>

      <ul>
        {question.answers.map(answer => (
          <li
            className={getAnswerClass(answer)}
            dangerouslySetInnerHTML={{ __html: answer }}
            key={answer}
          />
        ))}
      </ul>
    </li>
  );
};

export default QuestionResultItem;

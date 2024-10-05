'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from '@/components/Button';
import Heading from '@/components/Heading';
import Question from '@/components/Question';
import { TriviaData } from '@/types/data';

type FormData = {
  questions: { selected_answer: string }[];
};

const schema = yup.object().shape({
  questions: yup
    .array()
    .of(
      yup.object().shape({
        selected_answer: yup.string().required('Please select an answer'),
      })
    )
    .required(),
});

export default function Questions() {
  const {
    control,
    formState: { errors, isSubmitted, isValid },
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: {
      questions: [],
    },
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [triviaData, setTriviaData] = useState<TriviaData[]>([]);

  const onSubmit: SubmitHandler<FormData> = ({ questions }) => {
    let score = 0;

    const data = questions.map(({ selected_answer }, index) => {
      if (triviaData[index].correct_answer === selected_answer) {
        score += 1;
      }

      return { ...triviaData[index], selected_answer };
    });

    sessionStorage.setItem(
      'latestUserResponses',
      JSON.stringify({ data, score })
    );

    router.replace('/results');
  };

  useEffect(() => {
    const loadData = () => {
      const storedData = sessionStorage.getItem('triviaData');

      if (storedData) {
        setTriviaData(JSON.parse(storedData));
      }

      setLoading(false);
    };

    loadData();
  }, []);

  if (triviaData.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <p>No questions available.</p>

            <Link
              className="hover:underline"
              href="/"
            >
              Go back to the homepage
            </Link>
          </>
        )}
      </div>
    );
  }

  return (
    <>
      <Heading className="mb-6">Trivia Questions</Heading>

      <form
        className="flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {triviaData.map((question, index) => {
          return (
            <Question
              key={index}
              question={question}
              questionNumber={index + 1}
              totalQuestions={triviaData.length}
              errorMessage={
                errors?.questions?.[index]?.selected_answer?.message
              }
            >
              <Controller
                control={control}
                name={`questions.${index}.selected_answer`}
                render={({ field }) => (
                  <>
                    {question.answers.map(answer => (
                      <div
                        className="flex gap-2"
                        key={answer}
                      >
                        <input
                          {...field}
                          checked={field.value === answer}
                          id={`question-${index}-answer-${answer}`}
                          type="radio"
                          value={answer}
                        />

                        <label
                          dangerouslySetInnerHTML={{ __html: answer }}
                          htmlFor={`question-${index}-answer-${answer}`}
                        />
                      </div>
                    ))}
                  </>
                )}
              />
            </Question>
          );
        })}

        <Button
          disabled={isSubmitted && !isValid}
          type="submit"
        >
          Submit Answers
        </Button>
      </form>
    </>
  );
}

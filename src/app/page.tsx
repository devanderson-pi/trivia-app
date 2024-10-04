'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { shuffle } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import * as yup from 'yup';

import Button from '@/components/Button';
import ErrorMessage from '@/components/ErrorMessage';
import Heading from '@/components/Heading';
import { TriviaData, TriviaResponse } from '@/types/data';

type FormData = { amount?: string };

yup.addMethod(yup.string, 'integer', function () {
  return this.test('integer', 'Must be a whole number', value => {
    return /^-?\d+$/.test(value ?? '');
  }).test('positive', 'Must be a positive number', value => Number(value) > 0);
});

const schema = yup.object({
  amount: yup.string().required('Please enter a number').integer(),
});

export default function Home() {
  const {
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    register,
    reset,
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const router = useRouter();

  const [latestUserResponses, setLatestUserResponses] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async ({ amount }) => {
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=${amount}`
      );

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const triviaResponse: TriviaResponse = await response.json();

      if (!triviaResponse.results || triviaResponse.results.length === 0) {
        throw new Error('No trivia questions found');
      }

      const triviaData: TriviaData[] = triviaResponse.results.map(item => {
        const answers = shuffle([
          item.correct_answer,
          ...item.incorrect_answers,
        ]);

        return {
          ...item,
          answers,
          selected_answer: '',
        };
      });

      sessionStorage.setItem('triviaData', JSON.stringify(triviaData));

      router.push('/questions');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setLatestUserResponses(!!sessionStorage.getItem('latestUserResponses'));
  }, []);

  return (
    <div className="md:flex md:min-h-screen md:flex-col md:items-center md:justify-center">
      <Heading>Trivia Time: Bring It On!</Heading>

      <p className="my-6 text-lg">
        Choose how many questions you want and let&apos;s see how you do!
      </p>

      <form
        className="mb-12 w-full max-w-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-3">
          <label
            className="text-sm font-medium"
            htmlFor="amount"
          >
            Number of Questions:
          </label>

          <input
            type="text"
            {...register('amount')}
            className={twMerge(
              'rounded-t-md border-b-2 border-primary px-3 py-2 text-secondary shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-50',
              errors.amount && 'border-error focus-visible:ring-error'
            )}
            data-testid="amount"
            id="amount"
          />
        </div>

        {errors.amount && (
          <ErrorMessage className="mt-3">{errors.amount.message}</ErrorMessage>
        )}

        {isValid && (
          <div className="mt-8 flex flex-col gap-2 md:flex-row md:justify-center">
            <Button
              onClick={() => reset({ amount: '' })}
              type="button"
              variant="danger"
            >
              Cancel
            </Button>

            <Button
              disabled={isSubmitting}
              isLoading={isSubmitting}
              loadingText="Submitting..."
              type="submit"
            >
              Get Trivia Questions
            </Button>
          </div>
        )}
      </form>

      {latestUserResponses && (
        <Link
          className="hover:underline"
          href="/results"
        >
          See results from your last quiz
        </Link>
      )}
    </div>
  );
}

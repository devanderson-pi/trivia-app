'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Button from '@/components/Button';
import Heading from '@/components/Heading';
import QuestionResultItem from '@/components/QuestionResultItem';
import { UserResponses } from '@/types/data';

export default function Results() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [userResponses, setUserResponses] = useState<UserResponses>(null);

  useEffect(() => {
    const loadData = () => {
      const storedResponses = sessionStorage.getItem('latestUserResponses');

      if (storedResponses) {
        setUserResponses(JSON.parse(storedResponses));
      }

      setLoading(false);
    };

    loadData();
  }, []);

  if (!userResponses) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <p>No results available.</p>

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
    <div className="flex flex-col">
      <Heading>Quiz Results</Heading>

      <p className="my-6 text-2xl">
        Your score: {userResponses.score} / {userResponses.data.length}
      </p>

      <ul className="space-y-6">
        {userResponses.data.map((question, index) => (
          <QuestionResultItem
            index={index}
            key={index}
            question={question}
          />
        ))}
      </ul>

      <Button
        className="my-12"
        onClick={() => router.push('/')}
      >
        Take another quiz
      </Button>
    </div>
  );
}

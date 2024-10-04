import Heading from '@/components/Heading';

export default function Home() {
  return (
    <div className="md:flex md:min-h-screen md:flex-col md:items-center md:justify-center">
      <Heading>Trivia Time: Bring It On!</Heading>

      <p className="my-6 text-lg">
        Choose how many questions you want and let&apos;s see how you do!
      </p>
    </div>
  );
}

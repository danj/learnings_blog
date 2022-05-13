import Link from 'next/link';
import DNJ from './dnj';

export default function Header({ name }) {
  return (
    <header className="pt-20 pb-12">
        <DNJ/>
      <p className="text-2xl dark:text-white text-center">
        <Link href="/">
          <a>{name}</a>
        </Link>
      </p>
    </header>
  );
}

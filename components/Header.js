import Link from 'next/link';
import DNJ from './dnj';
import CustomLink from "./CustomLink";

export default function Header({ name }) {
  return (
    <header className="pt-20 pb-12">
        <CustomLink href="/"><DNJ/></CustomLink>
    </header>
  );
}

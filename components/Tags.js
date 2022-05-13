import Link from 'next/link';
import DNJ from './dnj';
import CustomLink from "./CustomLink";

export default function Tags({ tags }) {
    if (tags) {
        const res = tags.split(/\s*,\s*/).map((tag) =>
            (<CustomLink key={tag} href={`/tags/${tag}`}>
                #{tag}{' '}
            </CustomLink>))
        return res;
    } else {
        return (<></>)
    }
}

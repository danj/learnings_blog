import Link from 'next/link';
import DNJ from './dnj';

export default function Tags({ tags }) {
    if (tags) {
        const res = tags.split(/\s*,\s*/).map((tag) =>
            (<Link href={'/tags/' + tag}>
                <a>#{tag} </a>
            </Link>))
        return res;
    } else {
        return (<></>)
    }
}

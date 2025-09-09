import Link from 'next/link';

export default function Header() {
    return (
        <header>
            <Link href={'/'}>index</Link>
            &nbsp;
            <Link href={'/search'}>search</Link>
            &nbsp;
            <Link href={'/drug/1'}>drug</Link>
        </header>
    );
}

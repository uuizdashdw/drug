import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="px-3.5 py-12">
            <Link href={'https://github.com/uuizdashdw'} target="_blank" rel="noopener noreferrer">
                <p className="text-brand-500 text-base font-bold">제작 : @uuizdashdw</p>
            </Link>
        </footer>
    );
}

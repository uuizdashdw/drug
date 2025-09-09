import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
    return (
        <header className="item-center flex justify-between py-3.5">
            <div>
                <Link href={'/'}>
                    <Image src={'/images/logo.png'} alt="logo" width={100} height={10} />
                </Link>
            </div>
            <ul className="flex items-center gap-32">
                <li>
                    <Link href={'/'}>홈</Link>
                </li>
                <li>
                    <Link href={'/search'}>의약품 찾기</Link>
                </li>
                <li>
                    <Link href={'/drug/1'}>drug</Link>
                </li>
            </ul>

            <ul className="flex items-center gap-12">
                <li>
                    <Link href={'/auth/signin'} className="text-sm">
                        로그인
                    </Link>
                </li>
                <li>
                    <Link href={'/auth/signup'} className="text-sm">
                        회원가입
                    </Link>
                </li>
            </ul>
        </header>
    );
}

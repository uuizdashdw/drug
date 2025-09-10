import { ImageAndItemProps } from '@/types/drug';
import Image from 'next/image';

export default function ImageAndItem({ itemName, itemImage }: ImageAndItemProps) {
    return (
        <>
            <h1 className="mb-16 text-center text-3xl font-bold">{itemName}</h1>

            <div className="mb-20 flex justify-center">
                <Image
                    src={itemImage ?? '/images/no_image.png'}
                    alt={itemName}
                    width={500}
                    height={500}
                    sizes="80vw" // 뷰포트 너비 기준으로 반응
                    className="h-auto w-2xl"
                />
            </div>
        </>
    );
}

'use client';

import { DrugItemProps } from '@/types/drug';
import Image from 'next/image';

export default function DrugItem({ drug }: DrugItemProps) {
    return (
        <div>
            <div>
                <Image src={drug?.ITEM_IMAGE} alt={drug?.ITEM_IMAGE} width={300} height={500} />
                <p>{drug?.ITEM_NAME}</p>
            </div>
        </div>
    );
}

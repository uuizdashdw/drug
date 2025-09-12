import { getPharmacyList } from '@/api/pharmacy';
import ImageAndItem from '@/components/drug/detail/ImageAndItem';
import BusinessHour from '@/components/pharmacy/detail/BusinessHour';
import PharmBaiscInfo from '@/components/pharmacy/detail/PharmBasicInfo';
import { ImageAndItemProps } from '@/types/drug';
import { DetailPharmacyItemProps, PharmacyItem, PharmBaiscInfoProps } from '@/types/pharmacy';

export default async function DetailPharmacyItem({ params }: DetailPharmacyItemProps) {
    const { id } = await params;
    const detailPharmacyItem: PharmacyItem = JSON.parse(decodeURIComponent(id));

    console.log(' 약국 상세 정보 :: ', detailPharmacyItem);

    const imageAndItemProps = {
        itemName: detailPharmacyItem?.dutyName,
        itemImage: null,
    } as ImageAndItemProps;

    const pharmBaiscInfo = {
        address: detailPharmacyItem?.dutyAddr,
        postNumber: detailPharmacyItem?.postCdn1 + '-' + detailPharmacyItem?.postCdn2,
        telNumber: detailPharmacyItem?.dutyTel1,
        etc: detailPharmacyItem?.dutyEtc,
    } as PharmBaiscInfoProps;

    return (
        <div className="p-4">
            <ImageAndItem {...imageAndItemProps} />

            <div className="mx-auto w-2xl">
                <PharmBaiscInfo {...pharmBaiscInfo} />

                <hr className="my-24 border-t border-gray-300" />

                <BusinessHour pharmacy={detailPharmacyItem} />
            </div>
        </div>
    );
}

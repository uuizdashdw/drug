import ImageAndItem from '@/components/drug/detail/ImageAndItem';
import PharmBaiscInfo from '@/components/pharmacy/detail/PharmBasicInfo';
import { ImageAndItemProps } from '@/types/drug';
import { DetailPharmacyItemProps, PharmacyItem, PharmBaiscInfoProps } from '@/types/pharmacy';

export default async function DetailPharmacyItem({ params }: DetailPharmacyItemProps) {
    const { id } = await params;
    const detailPharmacyItem: PharmacyItem = JSON.parse(decodeURIComponent(id));

    const imageAndItemProps = {
        itemName: detailPharmacyItem?.yadmNm,
        itemImage: null,
    } as ImageAndItemProps;

    const pharmBaiscInfo = {
        address: detailPharmacyItem?.addr,
        postNumber: String(detailPharmacyItem?.postNo),
        telNumber: detailPharmacyItem?.telno,
    } as PharmBaiscInfoProps;

    return (
        <div className="p-4">
            <ImageAndItem {...imageAndItemProps} />

            <div className="mx-auto w-2xl">
                <PharmBaiscInfo {...pharmBaiscInfo} />

                {/* <hr className="my-24 border-t border-gray-300" /> */}
            </div>
        </div>
    );
}

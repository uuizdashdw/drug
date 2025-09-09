interface DrugItemProps {
    params: Promise<{ id: string }>;
}

export default async function DrugItem({ params }: DrugItemProps) {
    const { id } = await params;
    return <div>drug [{id}] 페이지</div>;
}

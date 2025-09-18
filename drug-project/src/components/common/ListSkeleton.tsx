export default function ListSkeleton() {
    return (
        <div className="mb-32">
            <ul className="grid grid-cols-5 justify-items-center gap-x-4 gap-y-10">
                {Array.from({ length: 20 }).map((_, idx) => (
                    <li key={idx} className="flex w-full flex-col items-center space-y-2">
                        <div className="relative h-36 w-full overflow-hidden rounded-xl bg-gray-200">
                            <div className="absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                        </div>

                        <p className="h-5 w-3/4 rounded-md bg-gray-200" />
                    </li>
                ))}
            </ul>
        </div>
    );
}

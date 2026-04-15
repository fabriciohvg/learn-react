import { Skeleton } from "@/components/ui/skeleton";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

export default function FormatTotal({
  quantity,
  isPending,
}: {
  quantity: number;
  isPending: boolean;
}) {
  return (
    <div className="flex items-center gap-2 font-bold">
      <span>Total: </span>
      <span className="tabular-nums">
        {isPending ? (
          <Skeleton className="h-6 w-16 bg-muted-foreground/20" />
        ) : (
          formatter.format(quantity * 9999)
        )}
      </span>
    </div>
  );
}

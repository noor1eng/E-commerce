import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
export default function PaginationCom({ totalPages, page, setPage }) {
  return (
    <div className="flex justify-center cursor-pointer">
      <Pagination>
        <PaginationContent className="gap-1">
          <PaginationItem>
            <PaginationPrevious
              onClick={page > 1 ? () => setPage((p) => p - 1) : undefined}
              className={page === 1 && "pointer-events-none opacity-40"}
              style={{ borderRadius: "100%" }}
            />
          </PaginationItem>

          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                isActive={page === i + 1}
                onClick={() => setPage(i + 1)}
                className="rounded-full w-9 h-9 text-xs"
                style={{
                  background: page === i + 1 ? "#111827" : "#fff",
                  color: page === i + 1 ? "#fff" : "#374151",
                  border: "1px solid",
                  borderColor: page === i + 1 ? "#111827" : "#e5e7eb",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={
                page < totalPages ? () => setPage((p) => p + 1) : undefined
              }
              className={`
                ${page === totalPages} ? "pointer-events-none opacity-40" : ""
           `}
              style={{ borderRadius: "100%" }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

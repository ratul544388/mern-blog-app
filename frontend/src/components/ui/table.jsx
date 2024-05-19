import { cn } from "../../lib/utils";

const Table = ({ headings, data }) => {
  return (
    <div className="overflow-x-auto min-h-[250px] ring-1 ring-border rounded-md">
      <table className="w-full px-4">
        <thead className="border-b ">
          <tr className="hover:bg-secondary transition-colors">
            {headings.map(({ key, value, className }) => (
              <th
                className={cn(
                  "py-2 first:pl-3 pr-10 font-medium text-start",
                  className
                )}
                key={key}
              >
                {value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="w-full">
          {data.map((item) => {
            return (
              <tr key={item.id} className="hover:bg-accent transition-colors ">
                {Object.entries(item).map(([key, value], index) => {
                  return (
                    <td
                      className={cn(
                        "first:hidden py-2 pr-10",
                        index === 1 && "pl-3",
                      )}
                      key={key}
                    >
                      {value}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="py-16 flex items-center justify-center ring-1 ring-border rounded-md text-muted-foreground">
          No results found
        </div>
      )}
    </div>
  );
};

export default Table;

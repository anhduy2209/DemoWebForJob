const SkeletonRow = () => (
  <tr className="animate-pulse border-b">
    {[...Array(7)].map((_, idx) => (
      <td key={idx} className="px-4 py-3">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </td>
    ))}
  </tr>
);

export default SkeletonRow;

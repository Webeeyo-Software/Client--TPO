import { View, Text, TouchableOpacity } from "react-native";

type PaginationProps = {
  current: number;
  total: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({ current, total, onPageChange }) => {
  // Helper function to build array of pages including ellipsis
  const getPages = () => {
    const pages = [];

    if (total <= 5) {
      // If total pages are 5 or less, show all
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      // Always show first page
      pages.push(1);

      // Show ellipsis if current page is far from second page
      if (current > 3) pages.push("...");

      // Determine left and right page numbers around current
      const startPage = Math.max(2, current - 1);
      const endPage = Math.min(total - 1, current + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Show ellipsis if current page is far from last second page
      if (current < total - 2) pages.push("...");

      // Always show last page
      pages.push(total);
    }

    return pages;
  };

  const pages = getPages();

  return (
    <View className="flex-row justify-center items-center mt-4 space-x-2 gap-5 pb-11">
      {pages.map((p, index) => (
        <TouchableOpacity
          key={index}
          disabled={p === "..."}
          onPress={() => typeof p === "number" && onPageChange(p)}
          className={`w-12 h-12 rounded-full justify-center items-center ${
            p === current ? "bg-blue-500" : "bg-gray-200"
          }`}
        >
          <Text className={`${p === current ? "text-white" : "text-gray-700"} text-sm`}>{p}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

import { Search } from "lucide-react";

type SearchInputProps = {
  value?: string;
  onChange?: HTMLInputElement;
};

export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="flex justify-between items-center space-x-4">
      <input
        type="text"
        placeholder="Search pokemon"
        className="w-[500px] w-min-[200px] p-4 rounded-lg shadow-lg h-12 focus:outline-0 text-gray-500 bg-white z-10"
      />
      <div className="bg-[#FF5350] rounded-lg shadow-lg h-12 flex justify-center items-center w-12">
        <Search size={20} />
      </div>
    </div>
  );
}

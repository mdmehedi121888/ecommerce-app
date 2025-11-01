import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [allProducts, setAllProducts] = useState([]);

  // Filters
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [sortOption, setSortOption] = useState("relevant");

  // Toggle for mobile filter view
  const [filterOpen, setFilterOpen] = useState(false);

  const categories = ["Men", "Women", "Kids"];
  const subCategories = ["Topwear", "Bottomwear", "Winterwear"];

  // Handle filter toggle
  const handleFilterChange = (filterList, setFilterList, value) => {
    if (filterList.includes(value)) {
      setFilterList(filterList.filter((item) => item !== value));
    } else {
      setFilterList([...filterList, value]);
    }
  };

  // ✅ Filter + Search + Sort logic
  useEffect(() => {
    let filteredProducts = [...products];

    // 🔍 Search filter (only if showSearch is true)
    if (showSearch && search.trim() !== "") {
      filteredProducts = filteredProducts.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    // Subcategory filter
    if (selectedSubCategories.length > 0) {
      filteredProducts = filteredProducts.filter((p) =>
        selectedSubCategories.includes(p.subCategory)
      );
    }

    // Sorting
    if (sortOption === "low-high") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-low") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    setAllProducts(filteredProducts);
  }, [
    products,
    selectedCategories,
    selectedSubCategories,
    sortOption,
    search,
    showSearch,
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Our Collection
        </h2>

        {/* Sort */}
        <div className="flex items-center space-x-2">
          <label htmlFor="sort" className="text-gray-700 font-medium">
            Sort by:
          </label>
          <select
            id="sort"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="relevant">Relevant</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Filters Sidebar */}
        <div className="md:col-span-1 bg-white shadow-lg rounded-xl p-4 md:p-6 border border-gray-100">
          {/* Filters Header with toggle on small screens */}
          <h3
            className="text-xl font-semibold text-gray-800 mb-4 md:mb-6 flex justify-between items-center cursor-pointer md:cursor-default"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            Filters
            <span className="md:hidden text-pink-500 font-bold text-3xl">
              {filterOpen ? "-" : "+"}
            </span>
          </h3>

          {/* Categories & Subcategories */}
          <div className={`${filterOpen ? "block" : "hidden"} md:block`}>
            {/* Categories */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 mb-2">Categories</h4>
              {categories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center space-x-2 text-gray-600 mb-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() =>
                      handleFilterChange(
                        selectedCategories,
                        setSelectedCategories,
                        cat
                      )
                    }
                    className="accent-pink-500"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>

            {/* Subcategories */}
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">
                Subcategories
              </h4>
              {subCategories.map((sub) => (
                <label
                  key={sub}
                  className="flex items-center space-x-2 text-gray-600 mb-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedSubCategories.includes(sub)}
                    onChange={() =>
                      handleFilterChange(
                        selectedSubCategories,
                        setSelectedSubCategories,
                        sub
                      )
                    }
                    className="accent-pink-500"
                  />
                  <span>{sub}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {allProducts.length > 0 ? (
            allProducts.map((product) => (
              <ProductItem
                key={product._id}
                id={product._id}
                name={product.name}
                price={product.price}
                image={product.image[0]}
              />
            ))
          ) : (
            <p className="text-gray-600 col-span-full text-center mt-10">
              No products found for selected filters or search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;

import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if (!newProduct || !newProduct.name || !newProduct.price || !newProduct.image) {
            return { success: false, message: "Please fill in all fields" };
        }
        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct)
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };
        set((state) => (
            { products: [...state.products, data.data] }));
        return {success: true, message: "Product created successfully"};
    }
    // addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
    // removeProduct: (id) => set((state) => ({ products: state.products.filter((product) => product.id !== id) })),
    // updateProduct: (updatedProduct) => set((state) => ({
    //     products: state.products.map((product) =>
    //         product.id === updatedProduct.id ? updatedProduct : product
    //     ),
    // })),
}));
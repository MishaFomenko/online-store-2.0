
class PurchasesByUser {
    constructor(purchaseRecords) {
        this.purchaseRecords = purchaseRecords;
    };

    async getProdsFromPurchaseRecords(allData, getDocs, query, collection, db, where) {
        const purchasedProds = [];
        const recsPromises = this.purchaseRecords.docs.map(async (rec) => {
            const prodRecord = rec.data();
            const prodsPromises = allData.docs.map(async (document) => {
                const purchased = await getDocs(query(collection(db, 'store', document.id, 'searchProductDetails'), where('asin', '==', prodRecord.productID)));
                purchased.docs.map((prod) => {
                    const purchasedData = prod.data();
                    const fullPurchaseData = {
                        ...purchasedData,
                        ...prodRecord,
                    }
                    purchasedProds.push(fullPurchaseData);
                });
            });
            await Promise.all(prodsPromises);
        });
        await Promise.all(recsPromises);
        return purchasedProds;
    };
};

class PurchaseRecords {
    constructor(productsPurchased) {
        this.productsPurchased = productsPurchased;
    };

    async addPurchaseRecords(addDoc, collection, db) {
        const purchaseRecords = this.productsPurchased.cart.map((prod) => {
            const purchasedProduct = {
                userID: this.productsPurchased.uid,
                quantity: prod.quantity,
                date: this.productsPurchased.date,
                productID: prod.asin,
            };
            return purchasedProduct;
        });
        await Promise.all(
            purchaseRecords.map((purchaseRecord) => {
                return addDoc(collection(db, 'purchases'), purchaseRecord);
            })
        );
    };
};

export { PurchasesByUser, PurchaseRecords };